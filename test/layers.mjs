// 分層輸出（__layer：text＝透明文字層、amb＝氛圍層）：node test/layers.mjs　（先 npm run build；沙箱設 CHROME_PATH）
//   文字層：四角完全透明、文字處不透明，且不含場景畫布（開／不開氛圍場景，文字層逐像素相同）。
//   氛圍層：完全沒有文字（換一句不同的字，畫面逐像素相同），但氛圍場景還在（與沒開場景的畫面不同）。
import { chromium } from 'playwright';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
const aspect = process.argv[2] || '16:9', [W, H] = aspect === '9:16' ? [540, 960] : [960, 540], fps = 5;
const PAGE = pathToFileURL(resolve(process.env.PAGE || 'dist/index.html')).href + `?render=1&fps=${fps}`;
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH, args: ['--no-sandbox', '--enable-unsafe-swiftshader'] });
let pass = 0, fail = 0; const ok = (c, m) => { c ? pass++ : (fail++, console.log('✗ ' + m)) };
const sha = b => createHash('sha1').update(b).digest('hex');
const dec = await (await browser.newContext()).newPage();
const pixels = b64 => dec.evaluate(async b => { const im = new Image(); await new Promise((r, j) => { im.onload = r; im.onerror = j; im.src = 'data:image/png;base64,' + b }); const cv = document.createElement('canvas'); cv.width = im.width; cv.height = im.height; const g = cv.getContext('2d'); g.drawImage(im, 0, 0); return { w: im.width, h: im.height, d: [...g.getImageData(0, 0, im.width, im.height).data] } }, b64);
const tc = t => { const ms = Math.round(t * 1000), z = (n, l = 2) => String(n).padStart(l, '0'); return `${z(Math.floor(ms / 3600000))}:${z(Math.floor(ms / 60000) % 60)}:${z(Math.floor(ms / 1000) % 60)},${z(ms % 1000, 3)}` };
// 在一個全新頁面渲染到第 1.9 秒，回傳指定層的截圖
async function shot(tag, text, cfg, layer) {
  const p = await (await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 })).newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(PAGE); await p.evaluate(() => window.__ready);
  await p.evaluate(([s, c]) => window.__loadProject({ srt: s, config: c }), [`1\n${tc(.2)} --> ${tc(3.2)}\n${tag} ${text}\n`, cfg]);
  for (let f = 0; f <= Math.round(2.1 * fps); f++) await p.evaluate(t => window.__renderFrame(t), f / fps);
  await p.evaluate(m => window.__layer(m), layer);
  const png = await p.screenshot({ omitBackground: layer === 'text' }); await p.context().close();
  return { png, errs };
}
const SCENE = { sceneAll: 'halftone:80,burst:60', particles: 60, dim: 40 };
for (const tag of ['#center', '#lowerleft', '#neon', '#glow-cards', '#pv-lyric']) {
  // 文字層
  const t = await shot(tag, '{街}頭的{霓虹}與雨', SCENE, 'text'), im = await pixels(t.png.toString('base64')), d = im.d;
  const A = (x, y) => d[(y * im.w + x) * 4 + 3];
  ok([[0, 0], [im.w - 1, 0], [0, im.h - 1], [im.w - 1, im.h - 1]].every(([x, y]) => A(x, y) === 0), `${tag} 文字層四角應完全透明`);
  let opaque = 0;
  for (let y = 0; y < im.h; y++) for (let x = 0; x < im.w; x++) { const a = A(x, y); if (a > 200) opaque++ }
  ok(opaque > 300, `${tag} 文字層應有不透明的文字（${opaque}）`);
  const t0 = await shot(tag, '{街}頭的{霓虹}與雨', { dim: 40 }, 'text');
  ok(sha(t.png) === sha(t0.png), `${tag} 文字層不應含氛圍場景（開／不開場景，文字層應逐像素相同）`);
  ok(t.errs.length === 0, `${tag} 文字層不應有頁面錯誤`);
  // 氛圍層
  const a1 = await shot(tag, '{街}頭的{霓虹}與雨', SCENE, 'amb'), a2 = await shot(tag, '完全不同的另一句話ABC', SCENE, 'amb'), a0 = await shot(tag, '{街}頭的{霓虹}與雨', { dim: 40 }, 'amb');
  ok(sha(a1.png) === sha(a2.png), `${tag} 氛圍層不應含文字（換一句字畫面應逐像素相同）`);
  ok(sha(a1.png) !== sha(a0.png), `${tag} 氛圍層應含氛圍場景（開／不開場景應不同）`);
  ok(a1.errs.length + a2.errs.length === 0, `${tag} 氛圍層不應有頁面錯誤`);
}
// 一般輸出與兩層都不同；兩層都是同一專案的不同切面
{ const n = await shot('#center', '{街}頭的{霓虹}與雨', SCENE, ''), t = await shot('#center', '{街}頭的{霓虹}與雨', SCENE, 'text'), a = await shot('#center', '{街}頭的{霓虹}與雨', SCENE, 'amb');
  ok(new Set([sha(n.png), sha(t.png), sha(a.png)]).size === 3, '一般／文字層／氛圍層三者應互不相同'); }
console.log(`分層 ${aspect}｜通過 ${pass}、失敗 ${fail}`); await browser.close(); process.exit(fail ? 1 : 0);
