// 字級換算表：量測每個版型在「基準字級」下主文字的實際字級（佔畫面高的比例），寫入 core/kernel/size-calib.js。
//   node tools/gen-size-calib.mjs            量測並寫入（需要 Chromium；先 node tools/build.mjs）
//   node tools/gen-size-calib.mjs --check    只比對：版型清單與表格一致（不需要瀏覽器，給 npm run check 用）
// 用途：標記 $h8＝「主文字的字級約為畫面高的 8%」，各版型看起來一樣大（見 core/kernel/parse.js 的 sbKs）。
// 量法：可見文字逐行外框高度的中位數，除以同字體 100px 參考字的外框高度＝實際字級（含縮放、transform）。
// 版型改了字級算法後重跑這支，和縮圖一樣把產生的檔案一起提交。
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { ROOT, build } from './build.mjs';
import { collectNames } from './lib-names.mjs';

const OUT = path.join(ROOT, 'core/kernel/size-calib.js'), REF = 0.25, TXT = '歌詞測試字', W = 960, H = 540;

if (process.argv.includes('--check')) {
  const src = fs.readFileSync(OUT, 'utf8'), have = new Set([...src.matchAll(/"([\w-]+)":/g)].map(m => m[1]));
  const lays = collectNames().U.layout.map(e => e.name), miss = lays.filter(n => !have.has(n));
  if (miss.length) { console.error(`✗ size-calib.js 缺少 ${miss.length} 個版型：${miss.join('、')}\n  請執行 node tools/gen-size-calib.mjs`); process.exit(1); }
  console.log(`✓ core/kernel/size-calib.js 涵蓋全部 ${lays.length} 個版型`); process.exit(0);
}

const { loadPlaywright, pickBrowser } = await import(pathToFileURL(path.join(ROOT, 'render/pw.mjs')).href);
const { pw } = await loadPlaywright(), exe = pickBrowser(pw.chromium, process.env.CHROME_PATH);
build();
const browser = await pw.chromium.launch({ ...(exe ? { executablePath: exe } : {}), args: ['--no-sandbox', '--enable-unsafe-swiftshader'] });
const p = await (await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 })).newPage();
await p.goto(pathToFileURL(path.join(ROOT, 'dist/index.html')).href + '?render=1&fps=10'); await p.evaluate(() => window.__ready);
const lays = await p.evaluate(() => [...new Set(LAYOUTS)]), cal = {};
for (const lay of lays) {
  await p.evaluate(s => window.__loadProject({ srt: `1\n00:00:00,000 --> 00:00:06,000\n${s}\n`, config: { particles: 0, bigRatio: .25, textScale: 100, posAnchor: '', posX: 0, posY: 0 } }), `#${lay} ${TXT}`);
  for (let f = 0; f <= 30; f += 3) await p.evaluate(t => window.__renderFrame(t), f / 10);
  const h = await p.evaluate(() => {   // 主文字：所有可見文字逐行外框高度的中位數（{} 強調字、裝飾小字只佔少數，不影響中位數），換算成字級
    const hs = [], w = document.createTreeWalker(L, NodeFilter.SHOW_TEXT); let n;
    while ((n = w.nextNode())) {
      if (!n.textContent.trim()) continue; const el = n.parentElement, cs = getComputedStyle(el); if (cs.visibility === 'hidden' || el.closest('[data-nm]')) continue;
      const r = document.createRange(); r.selectNodeContents(n); for (const q of r.getClientRects()) if (q.width >= 1 && q.height >= 1) hs.push(...Array([...n.textContent.trim()].length).fill(q.height));
    }
    hs.sort((a, b) => a - b); if (!hs.length) return 0;
    const ref = document.createElement('span'); ref.textContent = '歌'; ref.style.cssText = `position:absolute;font-size:100px;font-family:${FONTS[CONFIG.font] || CONFIG.font};line-height:1`; document.body.appendChild(ref);
    const rr = document.createRange(); rr.selectNodeContents(ref); const k = rr.getBoundingClientRect().height / 100; ref.remove();
    return hs[hs.length >> 1] / (k || 1);
  });
  cal[lay] = h > 0 ? +(h / H).toFixed(4) : null;   // null＝量不到（文字畫在畫布上），執行時改用中位數
}
await browser.close();
const vals = Object.values(cal).filter(v => v != null).sort((a, b) => a - b); cal['@median'] = vals[vals.length >> 1];
const body = Object.keys(cal).sort().map(k => `"${k}":${cal[k]}`).join(',');
fs.writeFileSync(OUT, `/* ===== [SIZE] 字級換算表（由 tools/gen-size-calib.mjs 量測產生，勿手改）=====
   每個版型在「大字比例 ${REF}、整體縮放 100%、16:9」時，主文字的實際字級佔畫面高的比例。$h 絕對字高用它換算（parse.js 的 sbKs）。
   畫在畫布上量不到的版型不在表內，改用 "@median"。 */
const SIZE_REF=${REF};
const SIZE_CAL={${body}};
`);
console.log(`✓ 已寫入 ${path.relative(ROOT, OUT)}：${vals.length}/${lays.length} 個版型量得到（中位數 ${cal['@median']}）`);
