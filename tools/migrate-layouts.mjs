// 一次性搬遷工具（M3-d）：把 core/legacy 裡的版型（registerLayout／NL 表）轉成 carts/layout/<id>.cart.js 並自來源檔移除。
// 本文逐字保留；用到的主機小工具改由 ctx 取得（txtEl→ctx.text …）、共用排版小工具改由 ctx.lib 取得、只被單一版型用的檔內小工具複製進該卡帶。
// 依賴主機特殊內部（$、CSS、curFont、水波 GL、hlText…）的版型不搬，留在原檔並列出。
// 用法：node tools/migrate-layouts.mjs <legacy 檔>…   （M4 刪除 legacy 時一併移除本工具）
import fs from 'node:fs';
import path from 'node:path';
import * as espree from 'espree';
import * as eslintScope from 'eslint-scope';
import { ROOT } from './build.mjs';

const SCR = '/tmp/claude-0/-home-claude/b6d003b6-5977-5ad9-b4a7-ddd1309d03c1/scratchpad';
const flags = JSON.parse(fs.readFileSync(path.join(SCR, 'flags.json'), 'utf8'));
const parse = (t, o = {}) => espree.parse(t, { ecmaVersion: 'latest', sourceType: 'script', range: true, comment: true, ...o });
const allFiles = fs.readdirSync(path.join(ROOT, 'core/legacy')).map(f => 'core/legacy/' + f);
const targets = new Set(process.argv.slice(2));
const FILES = allFiles.map(rel => ({ rel, abs: path.join(ROOT, rel), src: fs.readFileSync(path.join(ROOT, rel), 'utf8') }));

const manual = fs.readFileSync(path.join(ROOT, 'legacy/動態歌詞字幕工具_功能手冊與SRT標記指南.md'), 'utf8');
const ZH = {}; for (const m of manual.matchAll(/^\|\s*`([a-z0-9-]+)`\s*\|\s*([^|]+?)\s*\|/gm)) if (!ZH[m[1]]) ZH[m[1]] = m[2].replace(/[◆★◇]/g, '').replace(/\s+/g, ' ').trim();

const BIND = {
  txtEl: 'const txtEl = ctx.text;', A: 'const A = ctx.anim;', SWd: 'const SWd = ctx.sw;', SHd: 'const SHd = ctx.sh;', D: 'const D = ctx.enterMs;', enter: 'const enter = ctx.enter;',
  chars: 'const chars = ctx.splitChars;', CE: 'const CE = ctx.centerIn;', fit: 'const fit = ctx.fit;', sr: 'const sr = ctx.random;', tK: 'const tK = ctx.shortK;',
  subs: 'const subs = ctx.sentences;', FONTS: 'const FONTS = ctx.fonts;', emFontCss: 'const emFontCss = ctx.fontCss;', sbKs: 'const sbKs = ctx.sizeScale;', hex6: 'const hex6 = ctx.hex6;', CONFIG: 'const CONFIG = ctx.config;',
};
const LIB = ['hair','tick','capSize','_jT','_jpx','_jN','_jFull','_jPunct','_jOpen','_jCw','_jBrk','_jFit','_jLate','_jIdx','_jRuns','_kKey','_kIn','_kCjk','_lEn','_lFam','_lW','_lCtx','_fz','_chs'];
const GLOBAL_OK = new Set(['Math','document','Boolean','Infinity','Array','Object','Set','String','Number','JSON','Map','parseFloat','parseInt','isFinite','isNaN','undefined','NaN','Date']);
const SKIP = new Set(['hanko', 'constellation', 'ink-bleed', 'ripple-pool', 'text-mask', 'particle-form']);   // 依賴主機特殊內部

// ---- 收集定義與版型 ----
const defs = {};   // 名稱 -> {code, expr}
const layouts = {};
for (const f of FILES) {
  f.ast = parse(f.src);
  const flat = []; const fl = b => b.forEach(n => n.type === 'BlockStatement' ? fl(n.body) : flat.push(n)); fl(f.ast.body); f.flat = flat;
  for (const n of flat) {
    if (n.type === 'VariableDeclaration') { for (const d of n.declarations) if (d.id.type === 'Identifier' && d.init && !/Function/.test(d.init.type) || (d.id.type === 'Identifier' && d.init && /Function/.test(d.init.type))) defs[d.id.name] = { code: `const ${d.id.name} = ${f.src.slice(d.init.range[0], d.init.range[1])};`, expr: f.src.slice(d.init.range[0], d.init.range[1]) } }
    else if (n.type === 'FunctionDeclaration') defs[n.id.name] = { code: f.src.slice(n.range[0], n.range[1]), expr: '(' + f.src.slice(n.range[0], n.range[1]) + ')' };
  }
  const S = n => f.src.slice(n.range[0], n.range[1]);
  const add = (id, fn, method, node, how, stmt, opt, optNode) => { if (!layouts[id]) layouts[id] = { id, f, fn, method, node, how, stmt, opt }; };
  for (const n of flat) {
    if (n.type === 'ExpressionStatement') {
      const e = n.expression;
      if (e.type === 'CallExpression' && e.callee.name === 'registerLayout' && e.arguments[0]?.type === 'Literal') add(e.arguments[0].value, e.arguments[1], false, null, 'reg', n, e.arguments[2]);
      else if (e.type === 'CallExpression' && e.callee.property?.name === 'assign' && e.arguments[0]?.name === 'NL' && e.arguments[1]?.type === 'ObjectExpression') for (const p of e.arguments[1].properties) add(p.key.name || p.key.value, p.value, p.method, p, 'prop', n);
    } else if (n.type === 'VariableDeclaration') for (const d of n.declarations) if (d.id.name === 'NL' && d.init?.type === 'ObjectExpression') for (const p of d.init.properties) add(p.key.name || p.key.value, p.value, p.method, p, 'prop', null);
  }
}
const freeOf = (code) => { const sc = eslintScope.analyze(parse(`(${code})`), { ecmaVersion: 2022 }); return [...new Set(sc.globalScope.through.map(r => r.identifier.name))] };
const dedent = t => { t = t.replace(/^\n/, '').replace(/\s+$/, ''); const ls = t.split('\n'); const m = Math.min(...ls.slice(1).filter(l => l.trim()).map(l => /^ */.exec(l)[0].length), 1e9); return m === 1e9 || m === 0 ? t : [ls[0], ...ls.slice(1).map(l => l.slice(Math.min(m, /^ */.exec(l)[0].length)))].join('\n') };
const indent = (t, n) => t.split('\n').map(l => l ? ' '.repeat(n) + l : l).join('\n');
const stmtCut = (src, n) => { const ls = src.lastIndexOf('\n', n.range[0] - 1) + 1, before = src.slice(ls, n.range[0]); const tail = /^[ \t]*(\/\*[^\n]*?\*\/)?[ \t]*(\n|$)/.exec(src.slice(n.range[1])); return !/\S/.test(before) && tail ? [ls, n.range[1] + tail[0].length] : [n.range[0], n.range[1]] };

const done = [], skipped = [];
for (const L of Object.values(layouts)) {
  if (!targets.has(L.f.rel)) continue;
  const id = L.id, f = L.f, src = f.src;
  if (SKIP.has(id)) { skipped.push(`${id}（主機特殊內部）`); continue }
  const fnSrc = src.slice(L.fn.range[0], L.fn.range[1]);
  const full = L.method ? 'function ' + fnSrc : fnSrc;
  let fnAst = parse(`(${full})`).body[0].expression; if (!/Function/.test(fnAst.type)) { skipped.push(`${id}（不是函式）`); continue }
  if (fnAst.params.some(p => p.type !== 'Identifier')) { skipped.push(`${id}（參數型式）`); continue }
  const params = fnAst.params.map(p => p.name);
  const fb = fnAst.body.type === 'BlockStatement' ? full.slice(fnAst.body.range[0] - 1, fnAst.body.range[1] - 1) : null;   // 因為前面補了 "("
  let body = fnAst.body.type === 'BlockStatement' ? full.slice(fnAst.body.range[0] - 1 + 1, fnAst.body.range[1] - 1 - 1) : `return (${full.slice(fnAst.body.range[0] - 1, fnAst.body.range[1] - 1)});`;
  // 解析依賴
  const binds = new Set(), lib = new Set(), copies = [], seen = new Set(), unknown = [];
  const visit = (code, ps, top) => { for (const n of freeOf(`function(${ps.join(',')}){${code}}`)) {
    if (GLOBAL_OK.has(n) || seen.has(n)) continue; seen.add(n);
    if (BIND[n]) { binds.add(n); continue }
    if (n === 'anims') { continue }
    if (LIB.includes(n)) { lib.add(n); continue }
    if (defs[n]) { const e = defs[n].expr; visit(e.replace(/^\(|\)$/g, '') === e ? `return (${e})` : `return ${e}`, [], false); copies.push(n); continue }
    unknown.push(n) } };
  visit(body, params, true);
  if (/\banims\b/.test(body)) { if (/anims(?!\.length)/.test(body.replace(/\banims\.length/g, ''))) unknown.push('anims(非 length)'); else body = body.replace(/\banims\.length\b/g, 'ctx.animCount()') }
  // 共用的複製小工具可能再用到 CE 等，已在 visit 內遞迴處理
  if (unknown.length) { skipped.push(`${id}（${unknown.join(',')}）`); continue }
  const P = ['sentence', 'host', 'root', 'bigSize', 'smallSize', 'duration', 'charEls'];
  const pb = params.length ? `let ${params.map((p, i) => `${p} = ctx.${P[i]}`).join(', ')};` : '';
  const copyText = [...new Set(copies)].map(n => defs[n].code.replace(/^const (\S+) = /, (m, a) => m)).join('\n');
  // CONFIG 用在被複製的小工具內時也需要綁定，已由 visit 蒐集到 binds
  const bindLines = [...binds].map(n => BIND[n]);
  const libLine = lib.size ? `const { ${[...lib].join(', ')} } = ctx.lib;` : '';
  const flag = flags[id] || {}, fl = ['brace', 'full', 'lab', 'ownSub'].filter(k => flag[k]).map(k => `${k}: true`);
  const zh = (ZH[id] || id).replace(/'/g, "\\'");
  const jizura = /jizura|pv|motion-and-layouts-b/.test(f.rel);
  const out = `/* ${zh} */
Console.cart({
  kind: 'layout', id: '${id}', apiVersion: 1,
  label: { zh: '${zh}' },
  author: '${jizura ? 'hakoniwa (JIZURA) / kinetic-lyric-console' : 'kinetic-lyric-console'}', license: 'MIT',${/jizura/.test(f.rel) ? "\n  source: 'https://github.com/852wa/JIZURA'," : ''}${fl.length ? `\n  flags: { ${fl.join(', ')} },` : ''}
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  render(ctx) {
${indent([pb, libLine, ...bindLines, copyText, dedent(body)].filter(Boolean).join('\n'), 4)}
  },
});
`;
  fs.mkdirSync(path.join(ROOT, 'carts/layout'), { recursive: true });
  fs.writeFileSync(path.join(ROOT, `carts/layout/${id}.cart.js`), out);
  done.push(id); L.migrated = true;
}

// ---- 來源檔移除 ----
for (const f of FILES) {
  if (!targets.has(f.rel)) continue;
  let src = f.src; const cuts = []; const mine = Object.values(layouts).filter(L => L.f === f && L.migrated);
  for (const L of mine) {
    if (L.how === 'reg') cuts.push(stmtCut(src, L.stmt));
    else { const p = L.node, s = p.range[0], t = p.range[1], tail = /^[ \t]*,?[ \t]*(\/\*[^\n]*?\*\/)?[ \t]*(\n)?/.exec(src.slice(t)), sameLine = !/\S/.test(src.slice(src.lastIndexOf('\n', s - 1) + 1, s)), last = /^\s*\}/.test(src.slice(t));
      if (sameLine && tail[0].length && !last) cuts.push([src.lastIndexOf('\n', s - 1) + 1, t + tail[0].length]); else cuts.push([s, t + (/^[ \t]*,/.exec(src.slice(t))?.[0].length || 0)]) }
  }
  cuts.sort((a, b) => b[0] - a[0]); for (const [a, b] of cuts) src = src.slice(0, a) + src.slice(b);
  const migrated = new Set(done);
  for (let pass = 0; pass < 3; pass++) {
    let ast; try { ast = parse(src) } catch (e) { fs.writeFileSync(SCR + '/bad-' + path.basename(f.rel), src); console.error('清除後語法錯誤', f.rel, e.message); process.exit(1) }
    const flat = []; const fl = b => b.forEach(n => n.type === 'BlockStatement' ? fl(n.body) : flat.push(n)); fl(ast.body);
    const cs = [];
    for (const n of flat) {
      if (n.type !== 'ExpressionStatement' || n.expression.type !== 'CallExpression') continue;
      const c = n.expression, cal = c.callee;
      if (cal.type === 'MemberExpression' && cal.object.name === 'Object' && cal.property.name === 'assign' && c.arguments[1]?.type === 'ObjectExpression' && !c.arguments[1].properties.length) cs.push(stmtCut(src, n));
      if (cal.type === 'MemberExpression' && cal.object?.name === 'LAYOUTS' && cal.property.name === 'push') {
        const keep = c.arguments.filter(a => !(a.type === 'Literal' && migrated.has(a.value)));
        if (keep.length === c.arguments.length) continue;
        if (!keep.length) cs.push(stmtCut(src, n)); else cs.push([c.arguments[0].range[0], c.arguments[c.arguments.length - 1].range[1], keep.map(a => src.slice(a.range[0], a.range[1])).join(',')]);
      }
    }
    if (!cs.length) break; cs.sort((a, b) => b[0] - a[0]); for (const [a, b, r] of cs) src = src.slice(0, a) + (r || '') + src.slice(b);
  }
  fs.writeFileSync(f.abs, src);
}
console.log(`已搬 ${done.length} 個版型：${done.join(' ')}`);
if (skipped.length) console.log(`留在原檔 ${skipped.length} 個：\n  ${skipped.join('\n  ')}`);
