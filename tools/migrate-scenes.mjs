// 一次性搬遷工具（M3-a）：把 core/legacy 裡的 regScene(...) 逐個轉成 carts/scene/<id>.cart.js，並自來源檔移除。
// 轉換保持 draw 函式本文逐字不變，只在開頭補上它用到的小工具（al/S/PI/TAU/lw/MONO）；之後由逐部件像素對照證明沒變。
// 用法：node tools/migrate-scenes.mjs core/legacy/scenes-extra.js [...]   （M4 刪除 legacy/ 時一併移除本工具）
import fs from 'node:fs';
import * as espree from 'espree';
import * as eslintScope from 'eslint-scope';
import { ROOT } from './build.mjs';
import path from 'node:path';

const ZH = { 'crop-marks': '裁切標記', crosshair: '照準線', 'dimension-lines': '寸法線', 'edge-ticks': '邊緣刻度' };
const AUTHOR = f => /jizura/.test(f) ? { author: 'hakoniwa (JIZURA) / kinetic-lyric-console', source: 'https://github.com/852wa/JIZURA' } : { author: 'kinetic-lyric-console' };
const HELPERS = {
  al: 'const al = u.fade;', S: 'const S = Math.sin;', PI: 'const PI = Math.PI;', TAU: 'const TAU = Math.PI * 2;',
  MONO: "const MONO = 'ui-monospace,Consolas,Menlo,monospace';",
  sr: 'const sr = u.random;', hashN: 'const hashN = u.hash;',
  lw: 'const lw = (c, p, k, m) => { c.lineWidth = Math.max(m || 1, p.H * k); };',
};
const made = [];
for (const rel of process.argv.slice(2)) {
  const file = path.join(ROOT, rel), src = fs.readFileSync(file, 'utf8');
  const ast = espree.parse(src, { ecmaVersion: 'latest', sourceType: 'script', range: true, comment: true });
  const cuts = [];
  for (const n of ast.body) {
    if (n.type !== 'ExpressionStatement' || n.expression.type !== 'CallExpression' || n.expression.callee.name !== 'regScene') continue;
    const [idN, layerN, groupN, defN, fnN, optN] = n.expression.arguments;
    const id = idN.value, fn = fnN, text = src.slice(n.range[0], n.range[1]);
    // 標題註解：函式開頭 `{ /* 名稱：說明 */`
    const cm = /^\s*\/\*\s*([^：:*]+?)\s*[：:]\s*([\s\S]*?)\s*\*\//.exec(src.slice(fn.body.range[0] + 1, fn.body.range[0] + 400));
    const zh = ZH[id] || (cm ? cm[1].trim() : id), desc = cm ? cm[2].trim() : '';
    let lab = false, cost = '輕';
    if (optN) {
      if (optN.type === 'Identifier' && optN.name === 'LAB') lab = true;
      else if (optN.type === 'ObjectExpression') for (const p of optN.properties) { const k = p.key.name || p.key.value; if (k === 'lab') lab = !!p.value.value; if (k === 'cost') cost = p.value.value }
      else throw new Error(`${id}: 不認得的 options`);
    }
    // 函式本文 → draw(c,p,u) 的本文
    const params = fn.params.map(p => p.name);
    let body = fn.body.type === 'BlockStatement' ? src.slice(fn.body.range[0] + 1, fn.body.range[1] - 1) : `return (${src.slice(fn.body.range[0], fn.body.range[1])});`;
    // 找出未宣告的自由名稱，補上對應小工具
    const wrapped = `(function(${params.join(',')}){${body}})`;
    const sc = eslintScope.analyze(espree.parse(wrapped, { ecmaVersion: 'latest', range: true }), { ecmaVersion: 2022 });
    const free = [...new Set(sc.globalScope.through.map(r => r.identifier.name))];
    const globalsOK = new Set(['Math', 'Array', 'Number', 'String', 'Object', 'JSON', 'isFinite', 'isNaN', 'Infinity', 'NaN', 'Set', 'Map', 'parseInt', 'parseFloat', 'Float32Array', 'Uint8Array', 'Boolean', 'Date']);
    if (free.includes('CONFIG')) { if (/CONFIG\.(?!bpm\b)/.test(body)) throw new Error(id + ': CONFIG 除 bpm 外還有別的用途'); body = body.replace(/CONFIG\.bpm/g, 'u.bpm()'); free.splice(free.indexOf('CONFIG'), 1) }
    const need = free.filter(x => !globalsOK.has(x)), pre = [], unknown = [];
    for (const x of need) HELPERS[x] ? pre.push(HELPERS[x]) : unknown.push(x);
    if (unknown.length) { console.error(`✗ ${id} 用到未知名稱：${unknown.join(',')}，跳過（留在原檔）`); continue }
    const rename = params[0] !== 'c' || params[1] !== 'p';
    if (rename) { console.error(`✗ ${id} 參數名 (${params}) 非 (c,p)，跳過`); continue }
    const wantsU = need.includes('al') ? '' : '';
    const meta = AUTHOR(rel);
    const out = `/* ${zh}：${desc} */
Console.cart({
  kind: 'scene', id: '${id}', apiVersion: 1,
  label: { zh: '${zh}' },
  author: '${meta.author}', license: 'MIT',${meta.source ? `\n  source: '${meta.source}',` : ''}
  layer: '${layerN.value}', group: '${groupN.value}', amount: ${defN.value}, cost: '${cost}',${lab ? '\n  lab: true,' : ''}
  // 逐句隨機的主題表（RND_SCN_TH）暫時仍在 core/ui/randomizer.js，維持舊的挑選順序；M4 改由這裡的 rand 宣告
  draw(c, p, u) {
${pre.map(l => '    ' + l).join('\n')}${pre.length ? '\n' : ''}${body.replace(/^\n/, '').replace(/\n?$/, '\n').replace(/^/gm, '    ').replace(/^ {4}$/gm, '')}  },
});
`;
    fs.mkdirSync(path.join(ROOT, 'carts/scene'), { recursive: true });
    fs.writeFileSync(path.join(ROOT, `carts/scene/${id}.cart.js`), out);
    // 連同前面緊貼的單行註解一起移除，整行（含換行）
    cuts.push([n.range[0], n.range[1] + (src[n.range[1]] === '\n' ? 1 : 0)]);
    made.push(id);
  }
  let res = src; for (const [a, b] of cuts.reverse()) res = res.slice(0, a) + res.slice(b);
  fs.writeFileSync(file, res);
}
console.log(`已搬 ${made.length} 個場景：${made.join(' ')}`);
