// lint：node test/lint.mjs（不需瀏覽器，只需 npm install）
//
// 三道檢查：
//  A. 全域作用域 lint（主機＋卡帶，照建置順序串接後一起檢查）：重複宣告、未定義名稱、頂層先用後宣告。
//     core/ 的檔案共用同一個全域作用域、沒有 import，逐檔 lint 會把跨檔引用全當成未定義，所以必須串接。
//  B. 卡帶專用的嚴格 lint（每個卡帶檔單獨檢查）：卡帶只准碰 Console 與傳進來的 ctx，
//     不准用網路、儲存、計時器、亂數、時間、外部資源、動態執行——這些是「確定性」與「安全」的底線。
//  C. 結構與命名：一檔一卡帶、資料夾＝種類、檔名＝id、檔名只用 ASCII 小寫與連字號。
import fs from 'node:fs';
import path from 'node:path';
import { Linter } from 'eslint';
import * as espree from 'espree';
import globals from 'globals';
import { ROOT, sources, cartFiles } from '../tools/build.mjs';

let problems = 0;
const report = (where, rule, msg) => { problems++; console.log(`${where}  ${rule}  ${msg}`); };

// ───────── A. 全域作用域 lint ─────────
const parts = sources();
const code = parts.map(p => p.text).join('');
const starts = []; let line = 1;
for (const p of parts) { starts.push({ f: p.path, line }); line += (p.text.match(/\n/g) || []).length; }
const where = n => { let s = starts[0]; for (const x of starts) { if (x.line <= n) s = x; else break; } return `${s.f}:${n - s.line + 1}`; };
{
  const config = [{
    files: ['**/*.js'],
    languageOptions: { ecmaVersion: 'latest', sourceType: 'script', globals: { ...globals.browser, ...globals.es2021 } },
    linterOptions: { reportUnusedDisableDirectives: false },
    rules: {
      'no-redeclare': 'error', 'no-undef': 'error', 'no-const-assign': 'error', 'no-func-assign': 'error',
      'no-dupe-keys': 'error', 'no-dupe-args': 'error', 'no-duplicate-case': 'error', 'no-dupe-else-if': 'error',
      'no-global-assign': 'error', 'no-self-assign': 'error', 'no-unsafe-negation': 'error', 'no-unreachable': 'error',
      'use-isnan': 'error', 'valid-typeof': 'error',
      // 頂層先用後宣告（會在載入時 TDZ 爆掉）；函式內的引用不算（執行時才碰到）
      'no-use-before-define': ['error', { functions: false, classes: true, variables: false }],
    },
  }];
  const bad = new Linter().verify(code, config, 'bundle.js').filter(m => m.severity === 2 || m.fatal);
  for (const m of bad) report(`${where(m.line)}:${m.column}`, m.ruleId || 'parse', m.message);
  console.log(`A 全域作用域：${parts.length} 個來源檔（${parts.filter(p => p.kind === 'cart').length} 個卡帶）${bad.length ? '✗ ' + bad.length + ' 個問題' : '✓'}`);
}

// ───────── B. 卡帶專用嚴格規則 ─────────
const BAN_GLOBALS = [
  ['window', '卡帶不可直接碰 window；需要的資料都在 ctx'], ['self', '同上'], ['globalThis', '同上'], ['top', '同上'], ['parent', '同上'], ['frames', '同上'],
  ['localStorage', '卡帶不可讀寫儲存'], ['sessionStorage', '同上'], ['indexedDB', '同上'], ['caches', '同上'],
  ['fetch', '卡帶不可連網'], ['XMLHttpRequest', '同上'], ['WebSocket', '同上'], ['EventSource', '同上'], ['navigator', '同上（含 sendBeacon）'],
  ['Worker', '卡帶不可建立執行緒'], ['SharedWorker', '同上'], ['importScripts', '同上'], ['Image', 'new Image() 會載入外部資源'], ['Audio', '同上'],
  ['location', '卡帶不可導向或讀網址'], ['history', '同上'], ['open', '卡帶不可開新視窗'], ['alert', '卡帶不可彈窗'], ['confirm', '同上'], ['prompt', '同上'],
  ['setTimeout', '不是時間的純函數：時間由主機驅動，請用 ctx.anim() 的延遲'], ['setInterval', '同上'], ['requestAnimationFrame', '同上'], ['cancelAnimationFrame', '同上'],
  ['performance', '不是時間的純函數'], ['Date', '不是時間的純函數（new Date()／Date.now()）'],
  ['eval', '禁止動態執行'], ['Function', '禁止動態執行'],
].map(([name, message]) => ({ name, message }));
const urlRe = '/url\\(/i';
const CART_RULES = {
  'no-undef': 'error', 'no-redeclare': 'error', 'no-const-assign': 'error', 'no-unreachable': 'error', 'no-dupe-keys': 'error',
  'no-eval': 'error', 'no-implied-eval': 'error', 'no-new-func': 'error', 'no-script-url': 'error',
  'no-restricted-globals': ['error', ...BAN_GLOBALS],
  'no-restricted-properties': ['error',
    { object: 'Math', property: 'random', message: '亂數請用 ctx.random(種子)（時間的純函數，離線渲染才逐格可重現）' },
    ...['body', 'head', 'documentElement', 'querySelector', 'querySelectorAll', 'getElementById', 'getElementsByClassName', 'getElementsByTagName', 'cookie', 'write', 'writeln', 'location', 'defaultView', 'domain']
      .map(property => ({ object: 'document', property, message: '卡帶只能操作 ctx 給的容器，不可碰 document 其他部分；建立元素用 document.createElement' })),
  ],
  'no-restricted-syntax': ['error',
    { selector: 'ImportExpression', message: '禁止動態載入' },
    { selector: 'ImportDeclaration', message: '卡帶沒有 import；只用 Console 與 ctx' },
    { selector: 'MemberExpression[property.name="constructor"]', message: '禁止經由 constructor 取得 Function' },
    { selector: 'MemberExpression[property.name="__proto__"]', message: '禁止操作原型鏈' },
    { selector: 'AssignmentExpression[left.property.name=/^(innerHTML|outerHTML|srcdoc|src|href|srcset|action|formAction|data|poster)$/]', message: '禁止以字串注入 HTML 或載入外部資源；請用 createElement／textContent' },
    { selector: 'CallExpression[callee.property.name=/^(insertAdjacentHTML|createContextualFragment|write|writeln)$/]', message: '禁止以字串注入 HTML' },
    { selector: 'CallExpression[callee.property.name="setAttribute"][arguments.0.value=/^(on|src|href|xlink:href|srcdoc|action|formaction|data)/i]', message: '禁止設定會載入資源或執行程式的屬性' },
    { selector: `Literal[value=${urlRe}]`, message: '禁止 CSS url()（可能載入外部資源）；請用漸層、SVG 或 clip-path' },
    { selector: `TemplateElement[value.raw=${urlRe}]`, message: '禁止 CSS url()（可能載入外部資源）；請用漸層、SVG 或 clip-path' },
    { selector: 'Literal[value=/@import/i]', message: '禁止 @import' },
  ],
};
const CART_GLOBALS = { ...globals.es2021, Console: 'readonly', document: 'readonly' };
const cartConfig = [{ files: ['**/*.js'], languageOptions: { ecmaVersion: 'latest', sourceType: 'script', globals: CART_GLOBALS }, linterOptions: { reportUnusedDisableDirectives: false }, rules: CART_RULES }];

const files = cartFiles(), linter = new Linter();
// 範本（carts/_template/）不參與建置，但同樣要守嚴格規則，否則新貢獻者照抄就會踩雷
const templates = fs.existsSync(path.join(ROOT, 'carts/_template')) ? fs.readdirSync(path.join(ROOT, 'carts/_template')).filter(f => f.endsWith('.cart.js')).map(f => `carts/_template/${f}`) : [];
for (const rel of [...files, ...templates]) {
  const text = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  for (const m of linter.verify(text, cartConfig, rel).filter(m => m.severity === 2 || m.fatal)) report(`${rel}:${m.line}:${m.column}`, m.ruleId || 'parse', m.message);
}

// ───────── C. 結構與命名 ─────────
const KIND_DIRS = ['layout', 'enter', 'exit', 'fx', 'style', 'scene', 'pack'];
for (const rel of files) {
  const [, dir, ...rest] = rel.split('/'), base = rest.join('/');
  if (!KIND_DIRS.includes(dir) || rest.length !== 1) { report(rel, 'cart-layout', `卡帶必須放在 carts/<種類>/<id>.cart.js（種類：${KIND_DIRS.join('、')}），不可再分子資料夾`); continue; }
  const id = base.replace(/\.cart\.js$/, '');
  let ast; try { ast = espree.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'), { ecmaVersion: 'latest', sourceType: 'script' }); } catch (e) { report(rel, 'parse', e.message); continue; }
  const calls = ast.body.filter(n => n.type === 'ExpressionStatement' && n.expression.type === 'CallExpression'
    && n.expression.callee.type === 'MemberExpression' && n.expression.callee.object.name === 'Console' && n.expression.callee.property.name === 'cart');
  if (calls.length !== 1) { report(rel, 'one-cart-per-file', `一個檔案必須恰好有一個頂層 Console.cart(...) 呼叫（目前 ${calls.length} 個）`); continue; }
  const arg = calls[0].expression.arguments[0];
  if (!arg || arg.type !== 'ObjectExpression') { report(rel, 'cart-arg', 'Console.cart() 的參數必須是物件字面值'); continue; }
  const prop = k => { const p = arg.properties.find(x => x.type === 'Property' && (x.key.name === k || x.key.value === k)); return p && p.value.type === 'Literal' ? p.value.value : undefined; };
  if (prop('kind') !== dir) report(rel, 'cart-kind', `kind 是 ${JSON.stringify(prop('kind'))}，但檔案在 carts/${dir}/（兩者必須一致）`);
  if (dir === 'pack') { if (prop('id') !== id) report(rel, 'cart-id', `id 是 ${JSON.stringify(prop('id'))}，但檔名是 ${id}（兩者必須一致）`); }
  else if (prop('id') !== id) report(rel, 'cart-id', `id 是 ${JSON.stringify(prop('id'))}，但檔名是 ${id}（兩者必須一致）`);
}
// 檔名：core/ carts/ tools/ test/ render/ examples/ 只用 ASCII、小寫、連字號
const NAME_ROOTS = ['core', 'carts', 'tools', 'test', 'render', 'examples'];
const walk = (dir, out = []) => { for (const e of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) { const rel = `${dir}/${e.name}`; e.isDirectory() ? walk(rel, out) : out.push(rel); } return out; };
for (const r of NAME_ROOTS.filter(r => fs.existsSync(path.join(ROOT, r)))) {
  for (const rel of walk(r)) { const base = path.posix.basename(rel); if (!/^[a-z0-9_][a-z0-9._-]*$/.test(base)) report(rel, 'file-name', '檔名只能用 ASCII 小寫、數字、連字號、點、底線（中文放在內容裡）'); }
}

console.log(`B 卡帶嚴格規則／C 結構與命名：${files.length} 個卡帶、${templates.length} 個範本 ${problems ? '' : '✓'}`);
console.log(problems ? `\n✗ lint：共 ${problems} 個問題` : '\n✓ lint：沒有問題');
process.exit(problems ? 1 : 0);
