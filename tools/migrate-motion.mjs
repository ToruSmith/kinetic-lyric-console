// 一次性搬遷工具（M3-b）：把舊版「進場／退場／持續特效」表項目轉成 carts/{enter,exit,fx}/<id>.cart.js，並從來源檔移除。
// 支援的寫法：ew()/ec()/ecL() 進場、ENTER_X[...]=、Object.assign(EXTRA_EX|EXIT_C|FXH,{…})、FXH.x=、const FXH={…}／EXTRA_EX={…} 初始表。
// 函式本文逐字保留；本文用到的主機小工具改成從 ctx 取（A→ctx.anim、cl→ctx.charEls()…）；無法轉換的（依賴主機內部、window 等）留在原檔並列出。
// 用法：node tools/migrate-motion.mjs <檔>…   （M4 刪除 legacy 時一併移除）
import fs from 'node:fs';
import path from 'node:path';
import * as espree from 'espree';
import * as eslintScope from 'eslint-scope';
import { ROOT } from './build.mjs';

const parse = (t, o = {}) => espree.parse(t, { ecmaVersion: 'latest', sourceType: 'script', range: true, comment: true, ...o });
const files = process.argv.slice(2).map(r => ({ rel: r, abs: path.join(ROOT, r), src: fs.readFileSync(path.join(ROOT, r), 'utf8') }));
const ST_ONLY = process.env.SKIP_STYLE !== '0';

// 手冊中文名：| `id` | 說明 |
const manual = fs.readFileSync(path.join(ROOT, 'legacy/動態歌詞字幕工具_功能手冊與SRT標記指南.md'), 'utf8');
const ZH = {}; for (const m of manual.matchAll(/^\|\s*`([a-z0-9-]+)`\s*\|\s*([^|]+?)\s*\|\s*$/gm)) if (!ZH[m[1]]) ZH[m[1]] = m[2].replace(/[◆★◇]/g, '').replace(/\s+/g, ' ').trim();

// ---- 檔內小工具收集（const NAME=init，任一層區塊內）----
const helperText = {}, helperFile = {};
const NOT_HELPER = new Set(['CLOCK_OK', 'CLOCK_KF', 'HOLD', 'sp', 'spL', 'bt', 'btL', 'tel', 'cl', 'FXH', 'EXTRA_EX', 'EXTRA_FK', 'EXIT_C', 'ENTER_X']);
const MANUAL_HELPER = { CLOCK_DIAG: 'const CLOCK_DIAG = ["polygon(-1% 0,0% 0,-30% 100%,-1% 100%)", "polygon(-1% 0,130% 0,100% 100%,-1% 100%)"];' };
for (const f of files) {
  f.ast = parse(f.src);
  const walk = body => { for (const n of body) { if (n.type === 'BlockStatement') walk(n.body); else if (n.type === 'VariableDeclaration') for (const d of n.declarations) if (d.id.type === 'Identifier' && d.init && !NOT_HELPER.has(d.id.name)) { helperText[d.id.name] = `const ${d.id.name} = ${f.src.slice(d.init.range[0], d.init.range[1])};`; helperFile[d.id.name] = f.rel } } };
  walk(f.ast.body);
}
Object.assign(helperText, MANUAL_HELPER);

const GLOBAL_OK = new Set(['Math', 'Array', 'Number', 'String', 'Object', 'JSON', 'isFinite', 'isNaN', 'Infinity', 'NaN', 'Set', 'Map', 'parseInt', 'parseFloat', 'Boolean', 'document', 'undefined']);
const CTX_BOUND = { A: 'const A = ctx.anim;', sp: 'const sp = () => ctx.speed;', spL: 'const spL = () => ctx.speed;', bt: 'const bt = () => ctx.beatMs();', btL: 'const btL = () => ctx.beatMs();', cl: 'const cl = () => ctx.charEls();', tel: 'const tel = () => ctx.textEls();', getComputedStyle: 'const getComputedStyle = ctx.computed;' };
const textFix = t => t.replace(/60000\s*\/\s*CONFIG\.bpm/g, 'ctx.beatMs()').replace(/\bCONFIG\.spacing\b/g, 'ctx.config.spacing').replace(/\bCONFIG\.bpm\b/g, 'ctx.config.bpm').replace(/\bCONFIG\.speed\b/g, 'ctx.config.speed');
const freeOf = (code, params = []) => { const sc = eslintScope.analyze(parse(`(function(${params.join(',')}){${code}})`), { ecmaVersion: 2022 }); return [...new Set(sc.globalScope.through.map(r => r.identifier.name))] };

// 解析一段程式碼的依賴：回傳 {ctxPre[], outer[], unknown[]}；outer 是檔內小工具（遞迴），ctxPre 是 ctx 綁定小工具
function resolve(code, params, allowCtx) {
  const ctxPre = new Set(), outer = [], unknown = [], seen = new Set();
  const visit = (c, ps) => { for (const n of freeOf(c, ps)) {
    if (GLOBAL_OK.has(n) || seen.has(n)) continue; seen.add(n);
    if (n === 'CONFIG') { if (/CONFIG\.(?!bpm\b|speed\b|spacing\b)/.test(c) || /CONFIG\s*[^.\s]/.test(c.replace(/CONFIG\./g, ''))) unknown.push('CONFIG(其他欄位)'); continue }
    if (allowCtx.includes(n) && CTX_BOUND[n]) { ctxPre.add(n); continue }
    if (helperText[n]) { const t = helperText[n]; visit(t.replace(/^const [^=]+=\s*/, '').replace(/;$/, ''), []); outer.push(n); continue }
    unknown.push(n) } };
  visit(code, params);
  return { ctxPre: [...ctxPre], outer: [...new Set(outer)], unknown };
}
// 刪一整個陳述式：它獨佔一行（只剩空白／註解）才整行刪；同行還有別的陳述式就只刪它自己
const stmtCut = (src, n) => {
  const ls = src.lastIndexOf('\n', n.range[0] - 1) + 1, before = src.slice(ls, n.range[0]);
  const tail = /^[ \t]*(\/\*[^\n]*?\*\/)?[ \t]*(\n|$)/.exec(src.slice(n.range[1]));
  return !/\S/.test(before) && tail ? [ls, n.range[1] + tail[0].length] : [n.range[0], n.range[1]];
};
const dedent = t => { t = t.replace(/^\n/, '').replace(/\s+$/, ''); const ls = t.split('\n'); const m = Math.min(...ls.slice(1).filter(l => l.trim()).map(l => /^ */.exec(l)[0].length), 1e9); return m === 1e9 || m === 0 ? t : [ls[0], ...ls.slice(1).map(l => l.slice(Math.min(m, /^ */.exec(l)[0].length)))].join('\n') };
const indent = (t, n) => t.split('\n').map(l => l ? ' '.repeat(n) + l : l).join('\n');

// 收集項目
const entries = [];   // {kind,id,file,range(s),fields...}
const pushLists = []; // {node,list,file}
for (const f of files) {
  const S = (n) => f.src.slice(n.range[0], n.range[1]);
  const commentAfter = n => { const m = /^[ \t]*[,;]?[ \t]*(\/\*[^\n]*?\*\/)?/.exec(f.src.slice(n.range[1])); return m && m[1] ? m[1].replace(/^\/\*\s*|\s*\*\/$/g, '') : '' };
  const addEntry = e => entries.push({ file: f, ...e });
  const statements = [];
  const flat = body => body.forEach(n => n.type === 'BlockStatement' ? flat(n.body) : statements.push(n));
  flat(f.ast.body);
  const fnParts = fn => ({ params: fn.params.map(p => p.name), body: fn.body.type === 'BlockStatement' ? S(fn.body).slice(1, -1) : `return (${S(fn.body)});` });
  const handleTable = (table, obj, stmtNode) => {
    for (const p of obj.properties) {
      if (p.type !== 'Property') continue;
      const id = p.key.name || p.key.value, v = p.value, cm = commentAfter(p);
      const base = { id, node: p, stmt: stmtNode, comment: cm };
      if (table === 'EXTRA_EX') addEntry({ ...base, kind: 'exit', part: 'keyframes', src: S(v) });
      else if (table === 'EXIT_C') { const fn = fnParts(v); addEntry({ ...base, kind: 'exit', part: 'perChar', ...fn }) }
      else if (table === 'FXH') { const fn = fnParts(v); addEntry({ ...base, kind: 'fx', part: 'play', ...fn }) }
      else if (table === 'ST' && !ST_ONLY) { /* 樣式暫不搬 */ }
    }
  };
  for (const n of statements) {
    if (n.type === 'ExpressionStatement' && n.expression.type === 'CallExpression') {
      const c = n.expression, cal = c.callee;
      if (cal.type === 'Identifier' && ['ew', 'ec', 'ecL'].includes(cal.name) && c.arguments[0]?.type === 'Literal') {
        const [a0, a1, a2, a3] = c.arguments, id = a0.value, cm = commentAfter(n);
        if (cal.name === 'ew') addEntry({ kind: 'enter', id, part: 'keyframes', src: S(a1), opts: a2 ? S(a2) : '', stmt: n, comment: cm });
        else addEntry({ kind: 'enter', id, part: 'perChar', pc: S(a1), fb: S(a2), gap: a3 ? S(a3) : '70', stmt: n, comment: cm });
      } else if (cal.type === 'MemberExpression' && cal.object.name === 'Object' && cal.property.name === 'assign' && c.arguments[0]?.type === 'Identifier' && c.arguments[1]?.type === 'ObjectExpression') handleTable(c.arguments[0].name, c.arguments[1], n);
      else if (cal.type === 'MemberExpression' && /^(ENTERS|EXITS|FXS)$/.test(cal.object?.name) && cal.property.name === 'push') pushLists.push({ node: n, kind: { ENTERS: 'enter', EXITS: 'exit', FXS: 'fx' }[cal.object.name], file: f });
    } else if (n.type === 'ExpressionStatement' && n.expression.type === 'AssignmentExpression' && n.expression.left.type === 'MemberExpression') {
      const L = n.expression.left, R = n.expression.right, tbl = L.object.name, id = L.computed ? L.property.value : L.property.name;
      if ((tbl === 'ENTER_X' || tbl === 'FXH') && /Function/.test(R.type)) {
        const fn = fnParts(R); addEntry({ kind: tbl === 'FXH' ? 'fx' : 'enter', id, part: 'play', ...fn, stmt: n, comment: commentAfter(n) });
      }
    } else if (n.type === 'VariableDeclaration') {
      for (const d of n.declarations) if ((d.id.name === 'FXH' || d.id.name === 'EXTRA_EX') && d.init?.type === 'ObjectExpression') handleTable(d.id.name, d.init, null);
    }
  }
}

// 以 (kind,id) 合併；產生 cart 文字
const groups = new Map(); for (const e of entries) { const k = e.kind + ':' + e.id; (groups.get(k) || groups.set(k, []).get(k)).push(e) }
const done = [], skipped = [], removeNodes = [];
const AUTH = f => /jizura|motion-and-layouts-b/.test(f) ? 'hakoniwa (JIZURA) / kinetic-lyric-console' : 'kinetic-lyric-console';
const esc = s => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
for (const [key, parts] of groups) {
  const { kind, id, file } = parts[0];
  let outerAll = [], fields = [], ok = true, why = '';
  const bodyOf = (kindName, e) => {
    const ctxMap = { enter: ['el', 'charEls', 'duration'], fx: ['el', 'duration'], perChar: ['el', 'index', 'count', 'random'] }[kindName];
    const allow = kindName === 'perChar' ? ['A'] : ['A', 'sp', 'spL', 'bt', 'btL', 'cl', 'tel', 'getComputedStyle'];
    const params = e.params, code = e.body;
    const r = resolve(code, params, allow);
    if (r.unknown.length) { ok = false; why = r.unknown.join(','); return null }
    outerAll.push(...r.outer);
    const binds = params.map((p, i) => `const ${p} = ctx.${ctxMap[i]};`);
    const pre = [...r.ctxPre.map(n => CTX_BOUND[n]), ...binds];
    return `(ctx) {\n${indent([...pre, dedent(textFix(code))].join('\n'), 2)}\n}`;
  };
  let comment = parts.find(p => p.comment)?.comment || '';
  for (const e of parts) {
    if (e.kind === 'enter' && e.part === 'keyframes') {
      const r = resolve(`return (${e.src})`, [], []); if (r.unknown.length) { ok = false; why = r.unknown.join(','); break }
      outerAll.push(...r.outer); fields.push(`keyframes: ${textFix(e.src)},`);
      if (e.opts) { const m = /^\{\s*easing\s*:\s*("[^"]*"|'[^']*')\s*\}$/.exec(e.opts.trim()); if (!m) { ok = false; why = '進場選項 ' + e.opts; break } fields.push(`easing: ${m[1]},`) }
    } else if (e.kind === 'enter' && e.part === 'perChar') {
      const r = resolve(`return [${e.pc},${e.fb}]`, [], []); if (r.unknown.length) { ok = false; why = r.unknown.join(','); break }
      outerAll.push(...r.outer); fields.push(`perChar: {\n    gap: ${e.gap}, // 每字延遲（毫秒）\n    keyframes: ${e.pc},\n    fallback: ${e.fb},\n  },`);
    } else if (e.kind === 'enter' && e.part === 'play') { const b = bodyOf('enter', e); if (!ok) break; fields.push(`play${b},`) }
    else if (e.kind === 'fx' && e.part === 'play') { const b = bodyOf('fx', e); if (!ok) break; fields.push(`play${b},`) }
    else if (e.kind === 'exit' && e.part === 'keyframes') {
      const r = resolve(`return (${e.src})`, [], []); if (r.unknown.length) { ok = false; why = r.unknown.join(','); break }
      outerAll.push(...r.outer); fields.push(`keyframes: ${e.src},`);
    } else if (e.kind === 'exit' && e.part === 'perChar') { const b = bodyOf('perChar', e); if (!ok) break; fields.push(`perChar${b},`) }
  }
  if (!ok) { skipped.push(`${key}（${why}）`); continue }
  const zh = ZH[id] || comment.split(/[：:（(]/)[0].trim() || id;
  const outer = [...new Set(outerAll)].map(n => helperText[n]).join('\n');
  const out = `/* ${zh} */\n${outer ? outer + '\n' : ''}Console.cart({\n  kind: '${kind}', id: '${id}', apiVersion: 1,\n  label: { zh: '${esc(zh)}' },\n  author: '${AUTH(file.rel)}', license: 'MIT',${/jizura/.test(file.rel) ? "\n  source: 'https://github.com/852wa/JIZURA'," : ''}\n  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告\n${fields.map(x => indent(x, 2)).join('\n')}\n});\n`;
  fs.mkdirSync(path.join(ROOT, 'carts', kind), { recursive: true });
  fs.writeFileSync(path.join(ROOT, 'carts', kind, id + '.cart.js'), out);
  done.push(key); removeNodes.push(...parts);
}

// ---- 從來源檔移除已搬項目 ----
const doneSet = new Set(done);
for (const f of files) {
  let src = f.src; const cuts = [];
  const lineStart = i => src.lastIndexOf('\n', i - 1) + 1;
  const mine = removeNodes.filter(e => e.file === f);
  const byStmt = new Map(); for (const e of mine) if (e.stmt) (byStmt.get(e.stmt) || byStmt.set(e.stmt, []).get(e.stmt)).push(e);
  // 整句型（ew/ec/ENTER_X=/FXH.x=）：整行刪
  for (const e of mine) if (e.stmt && e.stmt.type === 'ExpressionStatement' && !(e.node)) cuts.push(stmtCut(src, e.stmt))
  // 物件屬性型
  for (const e of mine) if (e.node) {
    const p = e.node, s = p.range[0], t = p.range[1], tail = /^[ \t]*,?[ \t]*(\/\*[^\n]*?\*\/)?[ \t]*(\n)?/.exec(src.slice(t));
    const sameLine = !/\S/.test(src.slice(lineStart(s), s));
    const lastOne = /^\s*\}/.test(src.slice(t));
    if (sameLine && tail[0].length && !lastOne) cuts.push([lineStart(s), t + tail[0].length]);
    else cuts.push([s, t + (/^[ \t]*,/.exec(src.slice(t))?.[0].length || 0)]);
  }
  // 依範圍由後往前套用
  cuts.sort((a, b) => b[0] - a[0]); for (const [a, b] of cuts) src = src.slice(0, a) + src.slice(b);
  f.out = src;
}
// 第二輪：重新解析，清掉空的 Object.assign(…,{}) 與 push 清單裡已搬的名稱
const migratedBy = { enter: new Set(), exit: new Set(), fx: new Set() }; for (const k of doneSet) { const [kd, id] = k.split(':'); migratedBy[kd].add(id) }
for (const f of files) {
  let src = f.out;
  for (let pass = 0; pass < 3; pass++) {
    let ast; try { ast = parse(src) } catch (e) { fs.writeFileSync('/tmp/claude-0/-home-claude/b6d003b6-5977-5ad9-b4a7-ddd1309d03c1/scratchpad/bad-' + path.basename(f.rel), src); console.error('清除後語法錯誤', f.rel, e.message, e.lineNumber); process.exit(1) }
    const flat = []; const fl = b => b.forEach(n => n.type === 'BlockStatement' ? fl(n.body) : flat.push(n)); fl(ast.body);
    const cuts = [];
    for (const n of flat) {
      if (n.type !== 'ExpressionStatement' || n.expression.type !== 'CallExpression') continue;
      const c = n.expression, cal = c.callee;
      if (cal.type === 'MemberExpression' && cal.object.name === 'Object' && cal.property.name === 'assign' && c.arguments[1]?.type === 'ObjectExpression' && !c.arguments[1].properties.length) cuts.push(stmtCut(src, n));
      if (cal.type === 'MemberExpression' && /^(ENTERS|EXITS|FXS)$/.test(cal.object?.name) && cal.property.name === 'push') {
        const kd = { ENTERS: 'enter', EXITS: 'exit', FXS: 'fx' }[cal.object.name], keep = c.arguments.filter(a => !(a.type === 'Literal' && migratedBy[kd].has(a.value)));
        if (keep.length === c.arguments.length) continue;
        if (!keep.length) cuts.push(stmtCut(src, n));
        else cuts.push([c.arguments[0].range[0], c.arguments[c.arguments.length - 1].range[1], keep.map(a => src.slice(a.range[0], a.range[1])).join(',')]);
      }
    }
    if (!cuts.length) break;
    cuts.sort((a, b) => b[0] - a[0]); for (const [a, b, r] of cuts) src = src.slice(0, a) + (r || '') + src.slice(b);
  }
  fs.writeFileSync(f.abs, src);
}
console.log(`已搬 ${done.length} 個：${done.join(' ')}`);
if (skipped.length) console.log(`留在原檔 ${skipped.length} 個：\n  ${skipped.join('\n  ')}`);
