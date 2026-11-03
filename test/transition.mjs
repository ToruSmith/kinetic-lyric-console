// 逐句轉場測試：node test/transition.mjs
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
const PAGE = process.env.PAGE || 'dist/index.html', W = 480, H = 270;
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH, args: ['--no-sandbox', '--enable-unsafe-swiftshader'] });
const sha = b => createHash('sha1').update(b).digest('hex');
const srt = second => `1\n00:00:00,200 --> 00:00:01,200\n#center+fade+fade 一\n\n2\n00:00:01,200 --> 00:00:02,600\n${second} 二\n`;
async function run(tag, config = {}, wait = 0) {
  const p = await (await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 })).newPage();
  const warns = []; p.on('console', m => { if (m.type() === 'warning') warns.push(m.text()); });
  await p.goto(pathToFileURL(resolve(PAGE)).href + '?render=1&fps=10'); await p.evaluate(() => window.__ready);
  await p.evaluate(([s, c]) => window.__loadProject({ srt: s, config: { particles: 0, grain: 0, ...c } }), [srt(tag), config]);
  const out = []; for (let f = 0; f <= 18; f++) { await p.evaluate(t => window.__renderFrame(t), f / 10); if (wait) await p.waitForTimeout(wait); if (f === 13 || f === 14) out.push(sha(await p.screenshot())); }
  const info = await p.evaluate(() => ({ list: sceneList(subs[1]).map(x => x.n), problems: tagProblems(subs), bad: tagProblems(parseSRT('1\n00:00:00,000 --> 00:00:01,000\n#center&trans-boom 歌\n')), round: subs[1].scene }));
  await p.context().close(); return { h: out.join(), warns, ...info };
}
const plain = await run('#center+fade+fade'), cross = await run('#center+fade+fade', { trans: 'crossfade' });
// 逐句值等於全域設成同一種轉場的畫面，且與沒有轉場不同
const per = await run('#center+fade+fade&trans-crossfade');
assert.equal(per.h, cross.h); assert.notEqual(per.h, plain.h);
// 逐句值優先於全域
assert.equal((await run('#center+fade+fade&trans-cut', { trans: 'crossfade' })).h, plain.h);
// 不算場景、不取消全域底層場景、沒有未知場景警告
const under = await run('#center+fade+fade&trans-wipe', { sceneAll: 'halftone:60' });
assert.deepEqual(under.list, ['halftone']); assert.deepEqual(under.warns, []); assert.deepEqual(under.problems, []);
assert.deepEqual((await run('#center+fade+fade&halftone:60,trans-zoom')).list, ['halftone']);
assert.equal(under.bad.length, 1); assert.equal(under.bad[0].kind, '轉場');
// 逐格確定：渲染快慢不影響畫面
for (const t of ['flash', 'crossfade', 'wipe', 'zoom']) assert.equal((await run(`#center+fade+fade&trans-${t}`)).h, (await run(`#center+fade+fade&trans-${t}`, {}, 40)).h, t);
await browser.close();
console.log('逐句轉場｜通過');
