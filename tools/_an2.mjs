import fs from 'node:fs'; import path from 'node:path'; import * as espree from 'espree'; import * as es from 'eslint-scope'; import { ROOT } from './build.mjs';
const parse = t => espree.parse(t, { ecmaVersion: 'latest', sourceType: 'script', range: true });
const leg = fs.readdirSync(path.join(ROOT, 'core/legacy')).map(f => 'core/legacy/' + f);
const def = {};   // name -> {code, rel}
const layouts = {}; // id -> {code, rel, meta}
const OK = new Set(['Math','document','Boolean','Infinity','Array','Object','Set','String','Number','JSON','Map','parseFloat','parseInt','isFinite','isNaN','undefined','NaN','window','Date']);
for (const rel of leg) {
  const src = fs.readFileSync(path.join(ROOT, rel), 'utf8'), ast = parse(src);
  const flat = []; const fl = b => b.forEach(n => n.type === 'BlockStatement' ? fl(n.body) : flat.push(n)); fl(ast.body);
  for (const n of flat) {
    if (n.type === 'VariableDeclaration') for (const d of n.declarations) if (d.id.type === 'Identifier' && d.init) def[d.id.name] = { code: `const ${d.id.name}=${src.slice(d.init.range[0], d.init.range[1])};`, rel, node: d.init, isFn: /Function/.test(d.init.type) };
    else if (n.type === 'FunctionDeclaration') def[n.id.name] = { code: src.slice(n.range[0], n.range[1]), rel, node: n, isFn: true };
    if (n.type === 'ExpressionStatement') {
      const e = n.expression;
      if (e.type === 'CallExpression' && e.callee.name === 'registerLayout') layouts[e.arguments[0].value] = { rel, src, fn: e.arguments[1], opt: e.arguments[2], meth: false };
      else if (e.type === 'CallExpression' && e.callee.property?.name === 'assign' && e.arguments[0]?.name === 'NL') for (const p of e.arguments[1].properties) layouts[p.key.name || p.key.value] = { rel, src, fn: p.value, meth: p.method };
    }
  }
}
const free = (code) => { const sc = es.analyze(parse(`(${code})`), { ecmaVersion: 2022 }); return [...new Set(sc.globalScope.through.map(r => r.identifier.name))] };
const codeOf = L => (L.meth ? 'function ' : '') + L.src.slice(L.fn.range[0], L.fn.range[1]);
const closure = (names, seen = new Set(), host = new Set()) => { for (const n of names) { if (OK.has(n) || seen.has(n)) continue; seen.add(n); if (def[n]) closure(free(def[n].isFn && def[n].node.type !== 'FunctionDeclaration' ? src2(def[n]) : def[n].code.replace(/^const [^=]+=/, '').replace(/;$/, '')), seen, host); else host.add(n) } return { seen, host } };
const src2 = d => d.code.replace(/^const [^=]+=/, '').replace(/;$/, '');
const rows = [], hostHist = {}, helperUse = {};
for (const [id, L] of Object.entries(layouts)) {
  let f; try { f = free(codeOf(L)) } catch (e) { console.log('ERR', id, e.message); continue }
  const { seen, host } = closure(f);
  const helpers = [...seen].filter(n => def[n]);
  rows.push({ id, rel: L.rel, host: [...host], helpers });
  for (const h of host) (hostHist[h] ||= []).push(id);
  for (const h of helpers) (helperUse[h] ||= []).push(id);
}
console.log('layouts', rows.length);
console.log('--- 主機名稱需求（遞迴後）'); for (const [k, v] of Object.entries(hostHist).sort((a, b) => b[1].length - a[1].length)) console.log(String(v.length).padStart(3), k, v.length < 5 ? v.join(',') : '');
console.log('--- 共用小工具使用數'); for (const [k, v] of Object.entries(helperUse).sort((a, b) => b[1].length - a[1].length)) if (v.length > 1) console.log(String(v.length).padStart(3), k, def[k].rel.replace('core/legacy/', ''));
fs.writeFileSync('/tmp/claude-0/-home-claude/b6d003b6-5977-5ad9-b4a7-ddd1309d03c1/scratchpad/rows.json', JSON.stringify(rows));
