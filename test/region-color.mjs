// 限定區域／長句縮放／每句顏色／底板／絕對字高／快轉：node test/region-color.mjs　（先 npm run build；沙箱設 CHROME_PATH）
// 檢查：① ^box 下，大多數非滿版版型的文字落在框內；排完 BOX 一定還原（粒子畫布等不會拿到區域大小）
//       ② 長句（31 字）在常見版型不超出畫面；沒超出的短句不被縮放
//       ③ @c= a= sh= pal= 寫進句子根節點、只影響這一句；plate 自動對比；iris-frame 的 dim
//       ④ $h：不同版型同一個 $h 的實際字級接近；標記來回解析一致（$h、^box、顏色鍵）
//       ⑤ __advance 快轉後的畫面與逐格渲染逐位元相同（render/run.mjs 的 --start／--stills 依賴這點）
import { chromium } from 'playwright';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
const PAGE = pathToFileURL(resolve(process.env.PAGE || 'dist/index.html')).href;
const W = 960, H = 540, fps = 10;
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH, args: ['--no-sandbox', '--enable-unsafe-swiftshader'] });
let pass = 0, fail = 0; const ok = (c, m) => { c ? pass++ : (fail++, console.log('✗ ' + m)) };
const sha = b => createHash('sha1').update(b).digest('hex');
const open = async () => { const p = await (await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 })).newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); await p.goto(PAGE + `?render=1&fps=${fps}`); await p.evaluate(() => window.__ready); p.errs = errs; return p };
const one = (p, tag, cfg = {}) => p.evaluate(([s, c]) => window.__loadProject({ srt: `1\n00:00:00,000 --> 00:00:06,000\n${s}\n`, config: { particles: 0, posAnchor: '', posX: 0, posY: 0, regions: {}, palettes: {}, plate: '', plateAuto: true, autoFit: true, ...c } }), [tag, cfg]);
const at = async (p, t) => { for (let f = 0; f <= Math.round(t * fps); f += 5) await p.evaluate(x => window.__renderFrame(x), f / fps); };
const rect = p => p.evaluate(() => groupRect(document.querySelector('#L')));
const SHORT = '我們在夜色裡{奔跑}', LONG = '我們在夜色裡一直奔跑直到天亮也不肯停下腳步因為明天還很遠很遠';

const p = await open();
// ① 限定區域
{
  const lays = await p.evaluate(() => LAYOUTS.filter(x => !FULLBLEED.has(x)));
  const DRIFT = new Set(['parallax-depth', 'trail', 'falling', 'orbit', 'ripple-pool', 'particle-form', 'constellation']);   // 會擺動、飛入或畫在畫布上
  const B = { l: W * .55, t: H * .55, r: W * .95, b: H * .9 }, tol = W * .02; const out = [];
  for (const lay of lays) {
    if (DRIFT.has(lay)) continue;
    await one(p, `#${lay}^box:R ${LONG}`, { regions: { R: [55, 55, 40, 35] } }); await at(p, 3);
    const r = await rect(p);
    if (r && !(r.l >= B.l - tol && r.t >= B.t - tol && r.r <= B.r + tol && r.b <= B.b + tol)) out.push(lay);
  }
  ok(out.length === 0, '^box 下這些版型的文字跑出框：' + out.join('、'));
  ok(await p.evaluate(() => BOX === null && SWd() === document.querySelector('#stage').clientWidth), '排完一句後 BOX 要還原，SWd() 回到舞台寬');
  await one(p, `#stack^box:10:10:30:30 ${SHORT}`); await at(p, 3);
  ok(await p.evaluate(() => !!document.querySelector('#L .bx') && tagProblems(subs).length === 0), '數字區域：建立 .bx 框、沒有標記問題');
  await one(p, `#stack^box:沒有這個 ${SHORT}`); await at(p, 3);
  ok(await p.evaluate(() => !document.querySelector('#L .bx') && tagProblems(subs).some(q => q.kind === '區域')), '未定義的具名區域：不建框，載入提示列出來');
}
// ② 長句自動縮放；短句不縮放
{
  const bad = [];
  for (const lay of ['center', 'stack', 'ink-bleed', 'wave-path', 'glitch', 'blinds', 'wipe', 'longshadow', 'pv-lyric', 'split-flap']) {
    await one(p, `#${lay} ${LONG}`); await at(p, 3);
    const r = await rect(p); if (r && (r.l < -2 || r.r > W + 2 || r.t < -2 || r.b > H + 2)) bad.push(lay + JSON.stringify([r.l, r.r].map(Math.round)));
  }
  ok(!bad.length, '長句超出畫面：' + bad.join(' '));
  await one(p, `#center ${SHORT}`); await at(p, 3);
  ok(await p.evaluate(() => [...document.querySelectorAll('#L .w')].every(e => !e.style.scale)), '短句不應被縮放');
  await one(p, `#ink-bleed ${LONG}`, { autoFit: false }); await at(p, 3);
  ok(await p.evaluate(() => [...document.querySelectorAll('#L .w')].every(e => !e.style.scale)), 'autoFit:false 時不縮放');
}
// ③ 每句顏色與底板
{
  const srt = `1\n00:00:00,000 --> 00:00:02,000\n#center+fade+fade@neon,c=ff0000,a=00ff00,sh=none 一\n\n2\n00:00:02,000 --> 00:00:04,000\n#center+fade+fade 二\n\n3\n00:00:04,000 --> 00:00:06,000\n#center+fade+fade@pal=紙,a=0000ff 三\n`;
  await p.evaluate(s => window.__loadProject({ srt: s, config: { particles: 0, palettes: { 紙: { c: '2a1d14', a: 'c0392b', sh: '336699' } } } }), srt);
  const col = () => p.evaluate(() => { const e = document.querySelector('#L [data-t]'), w = document.querySelector('#L > .w'), cs = getComputedStyle(e); return { c: cs.color, a: w.style.getPropertyValue('--a').trim(), sh: w.style.textShadow } });
  await p.evaluate(() => window.__renderFrame(1)); let c = await col();
  ok(c.c === 'rgb(255, 0, 0)' && c.a === '#00ff00' && c.sh === 'none', '@c= a= sh=none 生效：' + JSON.stringify(c));
  await p.evaluate(() => window.__renderFrame(3)); c = await col();
  ok(c.c === 'rgb(255, 255, 255)' && c.a === '' && c.sh === '', '下一句沒有顏色鍵時維持全域：' + JSON.stringify(c));
  await p.evaluate(() => window.__renderFrame(5)); c = await col();
  ok(c.c === 'rgb(42, 29, 20)' && c.a === '#0000ff' && /51, 102, 153/.test(c.sh), '色組 pal= 生效，同句另寫的鍵優先：' + JSON.stringify(c));
  ok(await p.evaluate(() => applyStyles.toString().includes('ST[x]||STC[x]') && tagProblems(subs).length === 0), '顏色鍵不算未知樣式');
  const plate = await p.evaluate(() => [plateFor({ st: '' }, '#0b1020'), plateFor({ st: 'c=2a1d14' }, '#0b1020'), plateFor({ st: 'plate=123456' }, '#0b1020'), plateFor({ st: 'c=ffffff,plate=f3eee2' }, '#0b1020')]);
  ok(plate[0] === null && plate[1] === '#f3eee2' && plate[2] === '#123456' && plate[3] === '#141a28', '底板：預設不介入、深字配深底自動換淺、指定色、淺字配淺底換深：' + JSON.stringify(plate));
  await one(p, '#polaroid+fade+fade@c=2a1d14 深色字'); await at(p, 3);
  ok(await p.evaluate(() => [...document.querySelectorAll('#L [data-t]')].some(e => /243, 238, 226|f3eee2/i.test(e.style.background))), '拍立得：深色字時相片底改成淺色');
  await one(p, '#iris-frame+fade+fade@dim=40 光圈'); await at(p, 1);
  ok(await p.evaluate(() => [...document.querySelectorAll('#L div')].some(e => /rgba\(0,\s*0,\s*0,\s*0?\.40*\)/.test(e.style.boxShadow))), 'iris-frame 的 @dim=40');
}
// ④ $h 與來回解析
{
  const hs = {};
  for (const lay of ['center', 'stack', 'lowerleft', 'subtitle-box', 'slam', 'polaroid']) {
    await one(p, `#${lay}$h10 我們在夜色裡`, { bigRatio: .4, textScale: 160 }); await at(p, 3);
    hs[lay] = await p.evaluate(() => { const a = []; const w = document.createTreeWalker(L, NodeFilter.SHOW_TEXT); let n; while ((n = w.nextNode())) { if (!n.textContent.trim() || n.parentElement.closest('[data-nm]')) continue; const r = document.createRange(); r.selectNodeContents(n); for (const q of r.getClientRects()) if (q.height >= 1) a.push(...Array([...n.textContent.trim()].length).fill(q.height)) } a.sort((x, y) => x - y); const ref = document.createElement('span'); ref.textContent = '歌'; ref.style.cssText = `position:absolute;font-size:100px;font-family:${FONTS[CONFIG.font]};line-height:1`; document.body.appendChild(ref); const rr = document.createRange(); rr.selectNodeContents(ref); const k = rr.getBoundingClientRect().height / 100; ref.remove(); return a[a.length >> 1] / k / innerHeight * 100 });
  }
  const v = Object.values(hs), lo = Math.min(...v), hi = Math.max(...v);
  ok(lo > 7 && hi < 13.5, '$h10 的字級應在畫面高 7–13.5%（不受全域大字比例與縮放影響）：' + JSON.stringify(hs));
  const rt = await p.evaluate(() => { const x = parseTag('#stack+fade+fade^box:55:55:40:35$h8.5@neon,c=2a1d14,pal=紙 歌詞', 0, 2); reparse(x); return { tag: tag(x), capH: x.capH, pos: x.pos, st: x.st } });
  ok(rt.tag === '#stack+fade+fade^box:55:55:40:35$h8.5@neon,c=2a1d14,pal=紙 ' && rt.capH === 8.5, '標記來回一致：' + JSON.stringify(rt));
  const old = await p.evaluate(() => { const x = parseTag('#center+rise+fade^bc$0.4,130 歌', 0, 2); return [x.bigR, x.txtS, x.capH, x.pos] });
  ok(JSON.stringify(old) === '[0.4,130,0,"bc"]', '舊語法 $比例,縮放% 不受影響：' + JSON.stringify(old));
}
ok(p.errs.length === 0, '不應有頁面錯誤：' + p.errs.join(' / '));
await p.close();
// ⑤ 快轉與逐格渲染逐位元相同（含節拍、粒子、轉場）
{
  const proj = { srt: '@demo', config: { particles: 60 } }, T = 75;
  const a = await open(); await a.evaluate(x => window.__loadProject(x), proj);
  for (let i = 0; i <= T; i++) await a.evaluate(t => window.__renderFrame(t), i / fps);
  const ha = sha(await a.screenshot({ type: 'png' }));
  const b = await open(); await b.evaluate(x => window.__loadProject(x), proj);
  await b.evaluate(n => window.__advance(0, n), T); await b.evaluate(t => window.__renderFrame(t), T / fps);
  ok(ha === sha(await b.screenshot({ type: 'png' })), '__advance 快轉後的畫面應與逐格渲染相同');
  await a.close(); await b.close();
}
await browser.close();
console.log(`區域・顏色・字高・快轉｜通過 ${pass}、失敗 ${fail}`);
process.exit(fail ? 1 : 0);
