// 位置（九宮格錨點＋XY 微調＋安全邊界）：node test/position.mjs [16:9|9:16]　（先 npm run build；沙箱設 CHROME_PATH）
// 對每個「非滿版」版型各一句：^tl／^br／^mc 時，文字範圍（app 自己的 groupRect）應貼齊對應的安全邊界或置中（容許 3% 誤差，內容比畫面大的方向除外）；
// 再用少數版型檢查：句子自己的 ^錨點:X:Y 覆蓋全域、全域微調疊加、微調不會把內容推出畫面、滿版版型忽略位置。
import { chromium } from 'playwright';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
const aspect = process.argv[2] || '16:9', [W, H] = aspect === '9:16' ? [540, 960] : [960, 540], fps = 5;
const PAGE = pathToFileURL(resolve(process.env.PAGE || 'dist/index.html')).href + `?render=1&fps=${fps}`;
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH, args: ['--no-sandbox', '--enable-unsafe-swiftshader'] });
let pass = 0, fail = 0; const ok = (c, m) => { c ? pass++ : (fail++, console.log('✗ ' + m)) };
const tc = t => { const ms = Math.round(t * 1000), z = (n, l = 2) => String(n).padStart(l, '0'); return `${z(Math.floor(ms / 3600000))}:${z(Math.floor(ms / 60000) % 60)}:${z(Math.floor(ms / 1000) % 60)},${z(ms % 1000, 3)}` };
const TXT = '歌詞測試字', SLOT = 3.2, TOL = 0.03;
const DRIFT = ['orbit', 'parallax-depth'];   // 文字本身會隨時間大幅移動（軌道／視差），量測時刻與定位時刻位置不同，容許 6%
const open = async () => { const p = await (await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 })).newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); await p.goto(PAGE); await p.evaluate(() => window.__ready); p.errs = errs; return p };
// 把一串「標記＋文字」各排一句，依序渲染，並在每句中段量測文字範圍（相對舞台）
async function measure(p, tags, cfg = {}) {
  const srt = tags.map((t, i) => `${i + 1}\n${tc(.2 + SLOT * i)} --> ${tc(3.2 + SLOT * i)}\n${t} ${TXT}\n`).join('\n');
  await p.evaluate(([s, c]) => window.__loadProject({ srt: s, config: c }), [srt, { posAnchor: '', posX: 0, posY: 0, posSafe: 6, ...cfg }]);   // 專案設定是「合併」進目前設定，所以位置相關鍵每次都要明確重設
  const want = new Map(tags.map((_, i) => [Math.round((.2 + SLOT * i + 1.9) * fps), i])), out = [];
  for (let f = 0; f <= Math.max(...want.keys()); f++) {
    await p.evaluate(t => window.__renderFrame(t), f / fps);
    if (want.has(f)) out[want.get(f)] = await p.evaluate(() => { const G = groupRect(document.querySelector('#L')); return G ? { ...G, vw: SWd(), vh: SHd(), full: false } : null });
  }
  return out;
}
const p0 = await open();
const { lays, full } = await p0.evaluate(() => ({ lays: [...new Set(LAYOUTS)], full: [...FULLBLEED] }));
const safe = await p0.evaluate(() => (CONFIG.posSafe == null ? 6 : +CONFIG.posSafe) / 100);
ok(p0.errs.length === 0, '載入不應有錯誤');
await p0.close();
const flow = lays.filter(l => !full.includes(l));

// A. 全版型 × 三個錨點
const P = await open(), res = {};
for (const a of ['tl', 'br', 'mc']) res[a] = await measure(P, flow.map(l => `#${l}^${a}`));
const near = (v, w, tol) => Math.abs(v - w) <= tol;
flow.forEach((l, i) => {
  for (const a of ['tl', 'br', 'mc']) {
    const r = res[a][i]; if (!r) { ok(false, `${l} ^${a} 量不到文字範圍`); continue }
    const { vw, vh } = r, mx = safe * vw, my = safe * vh, uw = r.r - r.l, uh = r.b - r.t, k = DRIFT.includes(l) ? 2 : 1, tx = k * TOL * vw, ty = k * TOL * vh;
    const fitW = uw <= vw - 2 * mx, fitH = uh <= vh - 2 * my;
    if (fitW) { const e = a === 'tl' ? near(r.l, mx, tx) : a === 'br' ? near(r.r, vw - mx, tx) : near((r.l + r.r) / 2, vw / 2, tx); ok(e, `${l} ^${a} 水平位置不對：${JSON.stringify(r)}`) }
    if (fitH) { const e = a === 'tl' ? near(r.t, my, ty) : a === 'br' ? near(r.b, vh - my, ty) : near((r.t + r.b) / 2, vh / 2, ty); ok(e, `${l} ^${a} 垂直位置不對：${JSON.stringify(r)}`) }
  }
  const a = res.tl[i], b = res.br[i]; if (a && b && (a.r - a.l) < a.vw * .9 && (a.b - a.t) < a.vh * .9) ok(a.l <= b.l + 1 && a.t <= b.t + 1 && (a.l < b.l - 1 || a.t < b.t - 1), `${l} ^tl 應在 ^br 的左上方：${JSON.stringify([a.l, a.t, b.l, b.t])}`);
});
await P.close();

// B. 微調與覆蓋（用 center／lowerleft／wipe 三個基本版型）
const Q = await open(), base = ['center', 'lowerleft', 'wipe'];
const b0 = await measure(Q, base.map(l => `#${l}`)), ov = await measure(Q, base.map(l => `#${l}^br:0:0`), { posAnchor: 'tl' });
const gl = await measure(Q, base.map(l => `#${l}`), { posAnchor: 'tl', posX: 10, posY: 10 }), gl0 = await measure(Q, base.map(l => `#${l}`), { posAnchor: 'tl' });
const xy = await measure(Q, base.map(l => `#${l}^mc:20:-20`)), mc = await measure(Q, base.map(l => `#${l}^mc`));
const huge = await measure(Q, base.map(l => `#${l}^mc:500:500`));
base.forEach((l, i) => {
  const vw = b0[i].vw, vh = b0[i].vh;
  const wide = (mc[i].r - mc[i].l) > vw * .9 || (mc[i].b - mc[i].t) > vh * .9;   // 內容本身就快撐滿畫面的方向，定位與夾限都不介入（見 position.js）
  if (!wide) ok(ov[i].l > vw * .3 && ov[i].t > vh * .4, `${l} 句子 ^br 應覆蓋全域 tl：${JSON.stringify(ov[i])}`);
  ok(near(gl[i].l - gl0[i].l, vw * .1, vw * .02) && near(gl[i].t - gl0[i].t, vh * .1, vh * .02), `${l} 全域微調 +10% 應疊加在錨點上：${gl[i].l - gl0[i].l},${gl[i].t - gl0[i].t}`);
  ok(near(xy[i].l - mc[i].l, vw * .2, vw * .02) && near(xy[i].t - mc[i].t, -vh * .2, vh * .02), `${l} ^mc:20:-20 應相對正中位移 (+20%,-20%)：${xy[i].l - mc[i].l},${xy[i].t - mc[i].t}`);
  if (!wide) ok(huge[i].l >= -vw * .02 && huge[i].t >= -vh * .02 && huge[i].r <= vw * 1.02 && huge[i].b <= vh * 1.02, `${l} 極端微調不得把內容推出畫面：${JSON.stringify(huge[i])}`);
});
// C. 滿版版型忽略位置：不同錨點的畫面一樣（量測不到範圍或範圍相同）
const fl = full.filter(l => lays.includes(l)), f1 = await measure(Q, fl.map(l => `#${l}`)), f2 = await measure(Q, fl.map(l => `#${l}^br`));
fl.forEach((l, i) => ok(JSON.stringify(f1[i]) === JSON.stringify(f2[i]), `${l}（滿版）應忽略位置：${JSON.stringify(f1[i])} vs ${JSON.stringify(f2[i])}`));
await Q.close();
console.log(`位置 ${aspect}｜版型 ${flow.length} 個（另有滿版 ${fl.length} 個）｜通過 ${pass}、失敗 ${fail}`); await browser.close(); process.exit(fail ? 1 : 0);
