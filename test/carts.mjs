// 卡帶驗證：node test/carts.mjs [16:9|9:16]
// 環境：先 node tools/build.mjs；沙箱若已預裝 Chromium，設 CHROME_PATH=/opt/pw-browsers/chromium。
//
// 對 carts/ 底下「每一個」卡帶檢查（新增卡帶不需要改這支測試）：
//  1. 合約：manifest 驗證通過、登記到正確的既有登記表、沒有 Console.errors、selfCheck 乾淨、rand 資料進了適配表。
//  2. 有效果：用這個卡帶渲染的畫面，和不用的基準畫面不同。
//  3. 確定性：同一個專案在兩個全新頁面渲染同一格，逐像素相同（時間的純函數）。
//  4. 版型專屬：九宮格 9 個位置下，文字都在畫面內；文字確實畫出來。
//  5. 不連網、不丟錯。
// 另外用一組「壞 manifest」驗證主機會拒絕、且不會留下半登記的東西。
import { chromium } from 'playwright';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import fs from 'node:fs';
import { cartFiles } from '../tools/build.mjs';

const PAGE = process.env.PAGE || 'dist/index.html';
const aspect = process.argv[2] || '16:9', [W, H] = aspect === '9:16' ? [540, 960] : [960, 540], fps = 5;
const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH, args: ['--no-sandbox', '--enable-unsafe-swiftshader'] } : { args: ['--enable-unsafe-swiftshader'] });
const sha = b => createHash('sha1').update(b).digest('hex');
// 已知例外（舊版本來如此，非搬遷造成；regress-parts 證明與舊版逐像素相同）：直式 9:16 下 overexpose 的取樣畫面與 fade 完全相同
const KNOWN_SAME = { '9:16': ['enter:overexpose'] };
let pass = 0, fail = 0; const ok = (c, m) => { c ? pass++ : (fail++, console.log('✗ ' + m)) };

const open = async () => {
  const p = await (await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 })).newPage();
  const errs = [], net = [];
  p.on('pageerror', e => errs.push(e.message));
  p.on('console', m => m.type() === 'error' && errs.push(m.text()));
  p.on('request', r => { const u = r.url(); if (!/^(file|data|blob|about):/.test(u)) net.push(u); });
  await p.goto(pathToFileURL(resolve(PAGE)).href + `?render=1&fps=${fps}`); await p.evaluate(() => window.__ready);
  return { p, errs, net };
};
const srt = tag => `1\n00:00:00,200 --> 00:00:03,200\n${tag}\n`;
// 每張截圖用全新分頁：離線模式的種子亂數狀態不會跨 __loadProject 重置，同頁重複載入不可比
async function shot(tag, t, cfg = {}) {
  const o = await open();
  await o.p.evaluate(([s, c]) => window.__loadProject({ srt: s, config: c }), [srt(tag), cfg]);
  // 拍速預設 120 BPM（每拍 0.5 秒）：1.2 秒＝句首後剛好整數拍，隨拍特效在這格才在峰值
  // t 可為多個取樣時間（遞增）：有些效果只在某個時段可見（例如一次性的推近、掃光），單一時間點可能剛好看不出差別
  const ts = [].concat(t).map(x => Math.round(x * fps)), hs = [];
  for (let f = 0; f <= ts[ts.length - 1]; f++) { await o.p.evaluate(x => window.__renderFrame(x), f / fps); if (ts.includes(f)) hs.push(sha(await o.p.screenshot())) }
  const info = await o.p.evaluate(() => ({ text: document.querySelector('#L')?.innerText || '' }));
  await o.p.close();
  return { sha: hs.join('|'), errs: o.errs, net: o.net, ...info };
}

// ───── 1. 合約 ─────
const main = await open();
const files = cartFiles();
const carts = await main.p.evaluate(() => Console.carts.map(c => ({ ...c })));
ok(main.errs.length === 0, '載入時不應有錯誤：' + main.errs.join(' | '));
ok(await main.p.evaluate(() => Console.errors.length === 0), 'Console.errors 應為空：' + await main.p.evaluate(() => Console.errors.join(' | ')));
ok(carts.length === files.length, `登記數 ${carts.length} 應等於卡帶檔數 ${files.length}`);
ok((await main.p.evaluate(() => __selfCheck())).length === 0, 'selfCheck 應乾淨：' + (await main.p.evaluate(() => __selfCheck())).join(' | '));
ok((await main.p.evaluate(() => rndCheck())).length === 0, 'rndCheck 應乾淨');
const registered = await main.p.evaluate(cs => cs.map(c => {
  const n = c.name;
  const R = { layout: () => LAYOUTS.includes(n) && !!NL[n], enter: () => ENTERS.includes(n) && !!ENTER_X[n], exit: () => EXITS.includes(n) && !!(EXTRA_EX[n] || EXIT_C[n]),
    fx: () => FXS.includes(n) && !!(FXH[n] || EXTRA_FK[n]), style: () => !!(ST[n] || STC[n]), scene: () => !!SCENES[n] && SCENE_NAMES.includes(n), pack: () => STYLE_PACKS.has(n) && !!PRESETS[n] };
  return [c.kind + ':' + n, R[c.kind]()];
}), carts);
for (const [k, v] of registered) ok(v, '應登記到對應的既有登記表：' + k);
const randIn = await main.p.evaluate(() => ({ scene: RND_SCN_TH.neutral.split(' ').includes('drift-lines'), grp: RND_FX_GRP.cam.split(' ').includes('gentle-bob') && RND_FX_GRP.char.split(' ').includes('char-pulse'), dom: RND_FX_DOM.split(' ').includes('char-pulse') }));
ok(randIn.scene && randIn.grp && randIn.dom, 'rand 應併入逐句隨機的適配表：' + JSON.stringify(randIn));

// ───── 壞 manifest：主機必須拒絕，且不留下半登記 ─────
const neg = await main.p.evaluate(() => {
  const before = { lay: LAYOUTS.length, en: ENTERS.length, fx: FXS.length, sc: SCENE_NAMES.length, pk: STYLE_PACKS.size, carts: Console.carts.length, err: Console.errors.length };
  const ok0 = { kind: 'layout', apiVersion: 1, label: { zh: 'x' }, render() {} };
  const cases = [
    ['缺 label', { ...ok0, id: 'neg-a', label: undefined }],
    ['id 含大寫', { ...ok0, id: 'Neg-B' }],
    ['apiVersion 不符', { ...ok0, id: 'neg-c', apiVersion: 99 }],
    ['不認得的欄位', { ...ok0, id: 'neg-d', rnder() {} }],
    ['與既有版型同名', { ...ok0, id: 'center' }],
    ['rand 主題不合法', { kind: 'scene', id: 'neg-e', apiVersion: 1, label: { zh: 'x' }, layer: 'under', group: 'g', amount: 50, cost: '輕', draw() {}, rand: { theme: 'nope' } }],
    ['進場同時給 keyframes 與 play', { kind: 'enter', id: 'neg-f', apiVersion: 1, label: { zh: 'x' }, keyframes: [{ opacity: 0 }, { opacity: 1 }], play() {} }],
    ['fx 缺 duration', { kind: 'fx', id: 'neg-g', apiVersion: 1, label: { zh: 'x' }, keyframes: [{ opacity: 1 }, { opacity: 0 }] }],
    ['layout flags 拼錯', { ...ok0, id: 'neg-h', flags: { brase: true } }],
    ['重複登記', { kind: 'enter', id: 'focus-pull', apiVersion: 1, label: { zh: 'x' }, keyframes: [{ opacity: 0 }, { opacity: 1 }] }],
  ];
  const origErr = console.error; console.error = () => {};
  cases.forEach(([, d]) => Console.cart(d));
  console.error = origErr;
  const after = { lay: LAYOUTS.length, en: ENTERS.length, fx: FXS.length, sc: SCENE_NAMES.length, pk: STYLE_PACKS.size, carts: Console.carts.length, err: Console.errors.length };
  // 還原錯誤清單的影響不需要：這個頁面之後不再用
  return { names: cases.map(c => c[0]), before, after };
});
ok(neg.after.err - neg.before.err === neg.names.length, `10 個壞 manifest 都應被拒絕（新增錯誤 ${neg.after.err - neg.before.err}）`);
ok(neg.after.lay === neg.before.lay && neg.after.en === neg.before.en && neg.after.fx === neg.before.fx && neg.after.sc === neg.before.sc && neg.after.pk === neg.before.pk && neg.after.carts === neg.before.carts, '被拒絕的 manifest 不得留下任何登記：' + JSON.stringify(neg));
await main.p.close();

// ───── 範本必須真的能登記（否則新貢獻者照抄就壞）─────
{
  const tdir = 'carts/_template', tpls = fs.existsSync(tdir) ? fs.readdirSync(tdir).filter(f => f.endsWith('.cart.js')) : [];
  const o = await open();
  const r = await o.p.evaluate(src => { const e0 = Console.errors.length, c0 = Console.carts.length; src.forEach(t => new Function('Console', t)(Console)); return { errs: Console.errors.slice(e0), added: Console.carts.length - c0 } }, tpls.map(f => fs.readFileSync(`${tdir}/${f}`, 'utf8')));
  ok(r.errs.length === 0 && r.added === tpls.length, `範本應全部登記成功（${r.added}/${tpls.length}）：` + r.errs.join(' | '));
  await o.p.close();
}

// ───── 2–5. 逐卡帶渲染 ─────
const TXT = '測試文字 Kinetic';
const plan = c => {
  const demo = c.demo, id = c.name;
  switch (c.kind) {
    case 'layout': return { tag: demo || `#${id} ${TXT}`, base: `#center ${TXT}`, t: 2.0 };
    case 'enter': return { tag: `#center+${id} ${TXT}`, base: `#center+fade ${TXT}`, t: [0.3, 0.4, 0.5, 0.6, 0.7, 0.9] };
    case 'exit': return { tag: `#center+fade+${id} ${TXT}`, base: `#center+fade+fade ${TXT}`, t: 3.0 };
    case 'fx': return { tag: `#center~${id} ${TXT}`, base: `#center ${TXT}`, t: [0.4, 0.8, 1.2, 1.5] };
    case 'style': return { tag: `#center@${id} ${TXT}`, base: `#center ${TXT}`, t: 1.8 };
    case 'scene': return { tag: `#center&${id}:100 ${TXT}`, base: `#center ${TXT}`, t: 1.5 };
    case 'pack': return { tag: `#center ${TXT}`, base: `#center ${TXT}`, t: 1.5, cfg: true };
  }
};
const pageForPack = await open();
for (const c of carts) {
  const P = plan(c), name = c.kind + ':' + c.name;
  const cfg = P.cfg ? await pageForPack.p.evaluate(n => ({ ...PRESETS[n] }), c.name) : {};
  const [a, a2, base] = [await shot(P.tag, P.t, cfg), await shot(P.tag, P.t, cfg), await shot(P.base, P.t)];
  if (!(KNOWN_SAME[aspect] || []).includes(name)) ok(a.sha !== base.sha, `${name} 應改變畫面（與基準相同）`);
  ok(a.sha === a2.sha, `${name} 逐幀確定性（兩次渲染不同）`);
  ok(a.errs.length === 0 && a2.errs.length === 0, `${name} 渲染不應丟錯：` + a.errs.join(' | '));
  ok(a.net.length === 0, `${name} 不應連網：` + a.net.join(' '));
  if (c.kind === 'layout') {
    ok(a.text.replace(/\s/g, '').length > 0, `${name} 應畫出文字`);
    // 九宮格位置：文字都要在畫面內，且左上的整體位置在右下的左上方
    const rects = {};
    for (const anc of ['tl', 'tc', 'tr', 'ml', 'mc', 'mr', 'bl', 'bc', 'br']) {
      const tag = (P.tag.replace(/^#([\w-]+)/, `#$1^${anc}`));
      const o = await open();
      await o.p.evaluate(([s, cf]) => window.__loadProject({ srt: s, config: cf }), [srt(tag), {}]);
      for (let f = 0; f <= Math.round([].concat(P.t).pop() * fps); f++) await o.p.evaluate(x => window.__renderFrame(x), f / fps);
      const r = await o.p.evaluate(() => { const st = document.querySelector('#stage').getBoundingClientRect(); const els = [...document.querySelectorAll('#L [data-t], #L .ch')].filter(e => { const b = e.getBoundingClientRect(); return b.width > 0 && b.height > 0 });
        if (!els.length) return null; const bs = els.map(e => e.getBoundingClientRect()); const L = Math.min(...bs.map(b => b.left)), T = Math.min(...bs.map(b => b.top)), R = Math.max(...bs.map(b => b.right)), B = Math.max(...bs.map(b => b.bottom)); return { L, T, R, B, st: { l: st.left, t: st.top, r: st.right, b: st.bottom } } });
      await o.p.close();
      ok(!!r, `${name} ^${anc} 應有可量測的文字`); if (!r) continue; rects[anc] = r;
      ok(r.L >= r.st.l - 1 && r.T >= r.st.t - 1 && r.R <= r.st.r + 1 && r.B <= r.st.b + 1, `${name} ^${anc} 文字超出畫面：${JSON.stringify(r)}`);
    }
    if (rects.tl && rects.br) ok(rects.tl.T < rects.br.T && rects.tl.L < rects.br.L, `${name} ^tl 應在 ^br 的左上方`);
  }
}
await pageForPack.p.close();
console.log(`卡帶驗證 ${aspect}｜${carts.length} 個卡帶｜通過 ${pass}、失敗 ${fail}`);
await browser.close();
process.exit(fail ? 1 : 0);
