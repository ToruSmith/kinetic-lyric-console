// 建置：core/ ＋ carts/ → dist/index.html（單檔，離線也能開）。
//
//   node tools/build.mjs                 建置到 dist/
//   node tools/build.mjs --out <資料夾>   建置到指定資料夾
//   node tools/build.mjs --same-as <html> 建置後與指定檔逐位元組比對（搬遷時用來證明沒改到內容）
//
// 組裝規則（順序就是全域作用域的宣告順序，所以主機部分要明確列出）：
//   1. core/order.json 依序列出主機檔案；
//   2. 特殊項目 "@carts" 代表「卡帶插入點」：此處依路徑排序放入所有 carts/**/*.cart.js，各自包成 IIFE。
//      卡帶彼此不得有順序依賴（合約規定只能透過 Console.cart() 登記），所以只需穩定排序。
//   3. 內容原樣串接，不改寫程式碼。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = rel => fs.readFileSync(path.join(ROOT, rel), 'utf8');
const posix = p => p.split(path.sep).join('/');

/** 列出所有卡帶檔（底線開頭的資料夾，如 _template，不參與建置）。 */
export function cartFiles() {
  const out = [];
  const walk = dir => {
    for (const e of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
      const rel = posix(path.join(dir, e.name));
      if (e.isDirectory()) { if (!e.name.startsWith('_')) walk(rel); }
      else if (e.name.endsWith('.cart.js')) out.push(rel);
    }
  };
  if (fs.existsSync(path.join(ROOT, 'carts'))) walk('carts');
  return out.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
}

/** 卡帶包成 IIFE：卡帶內宣告的名稱不會外洩到全域。 */
export const wrapCart = (rel, text) => `;(()=>{\n/* cart: ${rel} */\n${text.replace(/\n?$/, '\n')}})();\n`;

/** 依建置順序回傳所有 JS 來源：{ path, text, kind: 'core'|'cart', raw }。 */
export function sources() {
  const order = JSON.parse(read('core/order.json'));
  const out = [];
  for (const entry of order) {
    if (entry === '@carts') {
      for (const rel of cartFiles()) { const raw = read(rel); out.push({ path: rel, text: wrapCart(rel, raw), raw, kind: 'cart' }); }
    } else {
      const text = read(entry);
      out.push({ path: entry, text, raw: text, kind: 'core' });
    }
  }
  return out;
}

/** 組出完整 index.html 字串。 */
export function buildHtml() {
  const tpl = read('core/shell/index.template.html');
  const css = read('core/shell/style.css');
  const js = sources().map(s => s.text).join('');
  return tpl.replace('@@STYLE@@', () => css).replace('@@SCRIPT@@', () => js);
}

/** 寫出 dist；過渡期：縮圖精靈圖暫時取自 legacy/（M4 改為每卡帶自帶縮圖後移除）。 */
export function build(outDir = 'dist') {
  const dir = path.resolve(ROOT, outDir);
  fs.mkdirSync(dir, { recursive: true });
  const html = buildHtml();
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  const sheet = path.join(ROOT, 'legacy/thumbs/sheet.webp');
  if (fs.existsSync(sheet)) { fs.mkdirSync(path.join(dir, 'thumbs'), { recursive: true }); fs.copyFileSync(sheet, path.join(dir, 'thumbs/sheet.webp')); }
  return { dir, html };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const a = process.argv.slice(2), opt = n => { const i = a.indexOf(n); return i >= 0 ? a[i + 1] : null; };
  const { dir, html } = build(opt('--out') || 'dist');
  console.log(`✓ 已建置 ${path.relative(process.cwd(), path.join(dir, 'index.html'))}（${(html.length / 1024).toFixed(0)} KB，${sources().length} 個來源檔，${cartFiles().length} 個卡帶）`);
  const ref = opt('--same-as');
  if (ref) {
    const r = fs.readFileSync(path.resolve(ref), 'utf8');
    if (r !== html) { console.error(`✗ 與 ${ref} 不一致（長度 ${html.length} vs ${r.length}）`); process.exit(1); }
    console.log(`✓ 與 ${ref} 逐位元組相同`);
  }
}
