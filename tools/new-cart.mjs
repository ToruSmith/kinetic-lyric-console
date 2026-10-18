// 新增卡帶：從範本複製一份到 carts/<kind>/<id>.cart.js，並把範本裡的 my-<kind> 換成你的 id。
//
//   node tools/new-cart.mjs <kind> <id> [--author 名字]
//   kind：layout enter exit fx style scene pack
//   id  ：小寫英數與連字號（也是檔名），不得與既有卡帶重複
//
// 建立後請改 label／內容，再跑 `npm run lint`、`npm run build`。
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, cartFiles } from './build.mjs';

const KINDS = ['layout', 'enter', 'exit', 'fx', 'style', 'scene', 'pack'];
const [kind, id, ...rest] = process.argv.slice(2);
const ai = rest.indexOf('--author'), author = ai >= 0 ? rest[ai + 1] : '';
const die = m => { console.error('✗ ' + m); process.exit(1) };

if (!KINDS.includes(kind) || !id) die(`用法：node tools/new-cart.mjs <${KINDS.join('|')}> <id> [--author 名字]`);
if (!/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(id)) die(`id「${id}」不合規則：小寫英數與連字號，字母開頭（例：my-cool-layout）`);

const exists = cartFiles().find(f => path.basename(f) === `${id}.cart.js` && f.split('/')[1] === kind);
if (exists) die(`已存在：${exists}`);
const sameName = cartFiles().find(f => path.basename(f) === `${id}.cart.js`);
if (sameName) console.warn(`! 注意：${sameName} 也用了同名 id；不同種類同名可能讓編輯器標籤混淆，建議換個名字。`);

const dir = path.join(ROOT, 'carts', kind);
fs.mkdirSync(dir, { recursive: true });
const out = path.join(dir, `${id}.cart.js`);
let text = fs.readFileSync(path.join(ROOT, 'carts/_template', `${kind}.cart.js`), 'utf8').split(`my-${kind}`).join(id);
if (author) text = text.replace(/author: *'[^']*'/, `author: '${author.replace(/'/g, '')}'`);
fs.writeFileSync(out, text);
console.log(`✓ 已建立 ${path.relative(ROOT, out)}\n  接下來：改 label 與內容 → npm run lint → npm run build（開 dist/index.html 試看看）`);
