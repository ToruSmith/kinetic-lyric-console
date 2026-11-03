// 效果圖鑑測試：node test/gallery.mjs
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
const PAGE = process.env.PAGE || 'dist/index.html', url = pathToFileURL(resolve(PAGE)).href;
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH, args: ['--no-sandbox', '--enable-unsafe-swiftshader'] });
const errs = [];
async function open(q = '', vp = { width: 1280, height: 720 }) { const p = await (await browser.newContext({ viewport: vp })).newPage(); p.on('pageerror', e => errs.push(e.message)); await p.goto(url + q); await p.waitForTimeout(500); return p; }

let p = await open();
await p.evaluate(() => { CONFIG.autoPerf = false; window.__notes = []; const n0 = note; note = s => { __notes.push(s); n0(s); }; window.__before = { subs, srt: JSON.stringify(subs.map(s => [s.s, s.e, s.raw, s.lay, s.en])), sel: selIdx, cfg: JSON.stringify(CONFIG) }; });
await p.click('#galb'); await p.waitForTimeout(200);
assert.equal(await p.locator('#gal.on').count(), 1);
assert.ok(await p.locator('#gal .gc').count() >= 50, '進場清單');
// 每個項目都要有說明；語意資料是選填，新卡帶沒有 meta 也要能顯示與試看
const audit = await p.evaluate(() => GAL_KINDS.flatMap(([k]) => galItems(k).filter(x => !x.desc).map(x => `${k}:${x.name}`)));
assert.deepEqual(audit, []);
await p.locator('#gal .gc[data-id="enter:rise"]').click(); await p.waitForTimeout(800);
assert.match(await p.evaluate(() => subs[0].en + '|' + document.querySelector('#L').textContent), /^rise\|.*流星/);
await p.click('[data-gk="exit"]'); await p.fill('#galQ', '碎裂'); await p.waitForTimeout(100);
assert.ok(await p.locator('#gal .gc[data-id="exit:shatter"]').count());
await p.fill('#galQ', ''); await p.selectOption('#galE', 'low'); await p.selectOption('#galM', '抒情');
const f = await p.evaluate(() => [...document.querySelectorAll('#gal .gc')].map(e => e.dataset.id).filter(Boolean));
assert.ok(f.length && f.every(x => x.startsWith('exit:')));
assert.ok(await p.evaluate(ids => ids.every(i => { const n = i.split(':')[1], m = effectMeta('exit', n); return m.energy === 'low' && m.mood.includes('抒情'); }), f));
await p.selectOption('#galE', ''); await p.selectOption('#galM', '');
await p.locator('#gal .gc[data-id="exit:blur-out"] .gp').click();
await p.click('[data-gk="fx"]'); await p.locator('#gal .gc[data-id="fx:breathe"] .gp').click();
await p.fill('#gal .gm', '副歌用');
const txt = await p.evaluate(() => galCopyText(GAL.state.picks, GAL.state.memo));
assert.match(txt, /我在動態歌詞圖鑑選了/); assert.match(txt, /退場 `blur-out`/); assert.match(txt, /特效 `breathe`/); assert.match(txt, /備註：副歌用/); assert.match(txt, /\?pick=exit:blur-out,fx:breathe/);
await p.click('#gal .gr .primary'); await p.waitForTimeout(100); assert.match((await p.evaluate(() => __notes)).join(), /複製/);
// 所有效果都能試看而不報錯
const n = await p.evaluate(async () => { let c = 0; for (const [k] of GAL_KINDS) for (const x of galItems(k)) { subs = parseSRT(`1\n00:00:00,200 --> 00:00:03,200\n${galTag(k, x.name)} ${GAL_TEXT}\n`); vt = .8; cur = -2; step(performance.now(), .016); c++; } return c; });
assert.ok(n >= 313);
// Escape 關閉後完整還原
await p.keyboard.press('Escape'); await p.waitForTimeout(200);
assert.equal(await p.locator('#gal.on').count(), 0);
assert.ok(await p.evaluate(() => subs === __before.subs && JSON.stringify(subs.map(s => [s.s, s.e, s.raw, s.lay, s.en])) === __before.srt && selIdx === __before.sel && JSON.stringify(CONFIG) === __before.cfg));
await p.context().close();

// 開啟時擋住其他操作，真實字幕不會被範例句取代
p = await open();
await p.evaluate(() => { CONFIG.autoPerf = false; window.__s = subs; });
await p.click('#ed'); await p.waitForTimeout(200); await p.click('#galb'); await p.waitForTimeout(200);
for (const q of ['#play', '#exw', '#ed', '#tg', '#qkb']) assert.equal(await p.evaluate(q => { const e = document.querySelector(q), r = e.getBoundingClientRect(), t = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2); return t === e || e.contains(t); }, q), false, q);
assert.equal(await p.locator('#edm').isVisible(), false);
await p.evaluate(() => document.activeElement.blur());
await p.keyboard.press('Space'); await p.keyboard.press('ArrowRight'); await p.keyboard.press('Control+k'); await p.waitForTimeout(150);
assert.equal(await p.locator('#qk.on').count(), 0); assert.equal(await p.evaluate(() => playing), true); assert.ok(await p.evaluate(() => vt < 4));
await p.fill('#galQ', 'a b'); assert.equal(await p.inputValue('#galQ'), 'a b');
await p.mouse.click(900, 400); await p.waitForTimeout(200);
assert.equal(await p.locator('#gal.on').count(), 0); assert.ok(await p.evaluate(() => subs === __s)); assert.equal(await p.locator('#edm').isVisible(), true);
await p.context().close();

p = await open('?pick=enter:rise,fx:breathe,enter:rise,evil:x,enter:%3Cimg%20src%3Dx%20onerror%3Dalert(1)%3E,https://x.test/a.js');
assert.deepEqual(await p.evaluate(() => GAL.state.picks), ['enter:rise', 'fx:breathe']);
assert.equal(await p.locator('#gal.on').count(), 1); assert.equal(await p.locator('#gal img').count(), 0);
await p.context().close();

p = await open('', { width: 390, height: 780 }); await p.evaluate(() => GAL.open()); await p.waitForTimeout(200);
const b = await p.locator('#gal').boundingBox(); assert.ok(b.x >= 0 && b.x + b.width <= 390 && b.y >= 0 && b.y + b.height <= 780, '手機寬度不超出畫面');
await p.context().close();

p = await open('?render=1&fps=30'); await p.evaluate(() => window.__ready);
assert.equal(await p.locator('#gal').count(), 0); assert.equal(await p.evaluate(() => GAL.isOn()), false);
await browser.close();
assert.deepEqual(errs, []);
console.log('效果圖鑑｜通過');
