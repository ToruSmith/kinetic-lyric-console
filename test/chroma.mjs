// 綠幕（render/chroma.mjs ＋ 頁面的 html.chroma）：node test/chroma.mjs　（先 npm run build；沙箱設 CHROME_PATH）
// 純函式：parseKey／applyChroma。畫面：開了氛圍場景、粒子、暗角、文字陰影…的專案套用綠幕後，背景每個像素都必須是鍵色，且文字確實畫出來。
import { chromium } from 'playwright';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { parseKey, applyChroma, CHROMA_OFF, DEFAULT_KEY } from '../render/chroma.mjs';
let pass = 0, fail = 0; const ok = (c, m) => { c ? pass++ : (fail++, console.log('✗ ' + m)) };
const throws = (f, m) => { try { f(); ok(false, m + '（應丟錯）') } catch (e) { ok(/不合法/.test(e.message), m + '：' + e.message) } };

for (const [v, w] of [[true, DEFAULT_KEY], ['', DEFAULT_KEY], [undefined, DEFAULT_KEY], [null, DEFAULT_KEY], ['#FF00AA', '#ff00aa'], ['ff00aa', '#ff00aa'], ['#0f0', '#00ff00'], ['F0A', '#ff00aa'], [' #123456 ', '#123456']]) ok(parseKey(v) === w, `parseKey(${JSON.stringify(v)}) → ${w}（實際 ${(() => { try { return parseKey(v) } catch (e) { return 'ERR' } })()}）`);
for (const v of ['red', '#12', '#12345', '#gggggg', '#1234567', 12, 'rgb(0,0,0)']) throws(() => parseKey(v), `parseKey(${JSON.stringify(v)})`);
const base = { bpm: 100, dim: 60, particles: 80, bgMode: 'gradient', bgColor: '#123456', textShadow: true, scan: 0.3 }, before = JSON.stringify(base), c = applyChroma(base, '#00ff00');
ok(JSON.stringify(base) === before, 'applyChroma 不得修改傳入物件');
ok(c.chroma === '#00ff00' && c.bgMode === 'solid' && c.bgColor === '#00ff00' && c.bpm === 100, 'applyChroma 設定鍵色並保留其他設定');
ok(Object.keys(CHROMA_OFF).every(k => c[k] === CHROMA_OFF[k]), 'applyChroma 關閉會混色的設定');
ok(JSON.stringify(applyChroma(undefined, '#fff')) .includes('"chroma":"#fff"'), 'applyChroma 接受沒有 config');

// 畫面
const aspect = process.argv[2] || '16:9', [W, H] = aspect === '9:16' ? [540, 960] : [960, 540], fps = 5;
const PAGE = pathToFileURL(resolve(process.env.PAGE || 'dist/index.html')).href + `?render=1&fps=${fps}`;
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH, args: ['--no-sandbox', '--enable-unsafe-swiftshader'] });
const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
const dec = await (await browser.newContext()).newPage();
// 取 PNG 的像素（用瀏覽器的 canvas 解碼，不需額外套件）
const pixels = b64 => dec.evaluate(async b => { const im = new Image(); await new Promise((r, j) => { im.onload = r; im.onerror = j; im.src = 'data:image/png;base64,' + b }); const cv = document.createElement('canvas'); cv.width = im.width; cv.height = im.height; const g = cv.getContext('2d'); g.drawImage(im, 0, 0); return { w: im.width, h: im.height, d: [...g.getImageData(0, 0, im.width, im.height).data] } }, b64);
const tc = t => { const ms = Math.round(t * 1000), z = (n, l = 2) => String(n).padStart(l, '0'); return `${z(Math.floor(ms / 3600000))}:${z(Math.floor(ms / 60000) % 60)}:${z(Math.floor(ms / 1000) % 60)},${z(ms % 1000, 3)}` };
const KEY = '#3366cc', K = [0x33, 0x66, 0xcc];
const lays = ['center', 'lowerleft', 'neon', 'glow-cards', 'hud-frame', 'ripple-pool', 'pv-lyric'];
const cfg = applyChroma({ sceneAll: 'halftone:80,burst:60', particles: 80, dim: 70, vignette: 0.9, grain: 0.3, scan: 0.4, textShadow: true, bgMode: 'gradient' }, KEY);
const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); await p.goto(PAGE); await p.evaluate(() => window.__ready);
const srt = lays.map((l, i) => `${i + 1}\n${tc(.2 + 3.2 * i)} --> ${tc(3.2 + 3.2 * i)}\n#${l} {街}頭的{霓虹}與雨\n`).join('\n');
await p.evaluate(([s, c]) => window.__loadProject({ srt: s, config: c }), [srt, cfg]);
const want = new Map(lays.map((_, i) => [Math.round((.2 + 3.2 * i + 1.9) * fps), i]));
for (let f = 0; f <= Math.max(...want.keys()); f++) {
  await p.evaluate(t => window.__renderFrame(t), f / fps);
  if (!want.has(f)) continue;
  const l = lays[want.get(f)], im = await pixels((await p.screenshot()).toString('base64')), d = im.d;
  // 直式畫面的文字本來就會貼近左右邊，邊緣檢查只看上下邊
  let off = 0, nonKey = 0; const bad = [];
  for (let y = 0; y < im.h; y++) for (let x = 0; x < im.w; x++) { const i = (y * im.w + x) * 4, isKey = Math.abs(d[i] - K[0]) <= 1 && Math.abs(d[i + 1] - K[1]) <= 1 && Math.abs(d[i + 2] - K[2]) <= 1;
    if (!isKey) { nonKey++; const edge = y < im.h * .03 || y > im.h * .97 || (W > H && (x < im.w * .03 || x > im.w * .97)); if (edge && !['hud-frame'].includes(l)) { off++; if (bad.length < 3) bad.push([x, y, d[i], d[i + 1], d[i + 2]]) } } }
  ok(off === 0, `${l} 邊緣 3% 應全是鍵色（${off} 個像素不是）：${JSON.stringify(bad)}`);
  ok(nonKey > 200, `${l} 應畫出文字（非鍵色像素 ${nonKey}）`);
  // 非鍵色像素不得是「鍵色混其他色」的半透明陰影／光暈：統計與鍵色很接近但不相等的像素不應太多（抗鋸齒邊緣除外，容許文字像素的 6 倍）
  let soft = 0; for (let i = 0; i < d.length; i += 4) { const dd = Math.abs(d[i] - K[0]) + Math.abs(d[i + 1] - K[1]) + Math.abs(d[i + 2] - K[2]); if (dd > 6 && dd < 40) soft++ }
  ok(soft < nonKey * 0.6 + 200, `${l} 不應有大片近鍵色的光暈／陰影（${soft} / ${nonKey}）`);
}
ok(errs.length === 0, '不應有頁面錯誤：' + errs.join('|'));
console.log(`綠幕 ${aspect}｜通過 ${pass}、失敗 ${fail}`); await browser.close(); process.exit(fail ? 1 : 0);
