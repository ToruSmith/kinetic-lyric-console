// 效果可見性測試：node test/effects-visible.mjs
// 確認效果真的有畫面變化，並且動畫跨過足夠多格，不是只在一瞬間完成。
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
const PAGE = process.env.PAGE || 'dist/index.html', fps = 30, sha = b => createHash('sha1').update(b).digest('hex');
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH, args: ['--no-sandbox', '--enable-unsafe-swiftshader'] });
const cfg = { speed: 1, particles: 0, grain: 0, vignette: 0, glowAcc: 0, bgMode: 'solid', bgColor: '#334455', dim: 0, trans: 'cut', pulse: 0, bounce: 0 };
async function frames(tag, times, extra = {}) {
  const p = await (await browser.newContext({ viewport: { width: 480, height: 270 }, deviceScaleFactor: 1 })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'warning') errs.push(m.text()); });
  await p.goto(pathToFileURL(resolve(PAGE)).href + `?render=1&fps=${fps}`); await p.evaluate(() => window.__ready);
  await p.evaluate(([s, c]) => window.__loadProject({ srt: s, config: c }), [`1\n00:00:00,200 --> 00:00:03,200\n${tag} 夜色漸漸深了\n`, { ...cfg, ...extra }]);
  const out = []; let f = 0;
  for (const t of times) { for (; f <= Math.round(t * fps); f++) await p.evaluate(x => window.__renderFrame(x), f / fps); out.push(sha(await p.screenshot())); }
  await p.context().close(); assert.deepEqual(errs, [], tag); return out;
}
const range = (a, b, n) => Array.from({ length: n }, (_, i) => a + (b - a) * i / (n - 1));
const enterT = range(.2, .8, 13), exitT = range(2.7, 3.15, 10);
for (const n of ['open-h', 'iris', 'split-reveal', 'wipe', 'mask-up', 'wipe-diag', 'clock-wipe']) assert.ok(new Set(await frames(`#center+${n}+fade`, enterT)).size >= 3, `進場太短：${n}`);
for (const n of ['close-h', 'close-v', 'wipe-out', 'wipe-r-out', 'wipe-up-out', 'wipe-down-out', 'diag-wipe-out', 'backspace-out']) assert.ok(new Set(await frames(`#center+fade+${n}`, exitT)).size >= 3, `退場太短：${n}`);
const blink = await frames('#center+blink-in+fade', range(.2, .8, 13)); assert.ok(blink.slice(2, 9).some((h, i, a) => i && h !== a[i - 1]), 'blink-in 沒有閃爍');
const blank = (await frames('#center+checker-in+fade', [.2]))[0], ck = await frames('#center+checker-in+fade', range(.25, .7, 10));
assert.ok(new Set(ck).size >= 3 && ck.some(h => h !== blank), 'checker-in 沒有分段');
assert.ok(new Set(await frames('#center+fade+fade~rainbow', [1, 1.4, 1.8, 2.2])).size >= 3, 'rainbow 在白字上沒有變化');
const plain = (await frames('#center+fade+fade', [1.5]))[0];
for (const n of ['underline', 'strike', 'outline', 'neon']) assert.notEqual((await frames(`#center+fade+fade@${n}`, [1.5]))[0], plain, `樣式沒有效果：${n}`);
// 句子變長時，內距會讓量到的高度超過橫條本身；不能因此略過換算
{
  const p = await (await browser.newContext({ viewport: { width: 960, height: 540 }, deviceScaleFactor: 1 })).newPage();
  await p.goto(pathToFileURL(resolve(PAGE)).href + `?render=1&fps=${fps}`); await p.evaluate(() => window.__ready);
  for (const text of ['夜色漸漸深了', '{街}頭的{霓虹}與雨']) {
    await p.evaluate(s => window.__loadProject({ srt: s, config: {} }), `1\n00:00:00,200 --> 00:00:03,200\n#center+wipe+fade ${text}\n`);
    await p.evaluate(() => window.__renderFrame(1));
    const fit = await p.evaluate(() => anims.some(a => a.effect.getKeyframes().some(f => /^inset\(-?[\d.]+px -?[\d.]+px/.test(f.clipPath || '') && !/%/.test(f.clipPath))));
    assert.ok(fit, `遮罩沒有貼合文字：${text}`);
  }
  await p.context().close();
}
await browser.close();
console.log('效果可見性｜通過');
