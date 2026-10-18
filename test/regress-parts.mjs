// 逐部件回歸：舊版 html 與新版 html 對「每個場景／進場／退場／特效／樣式」各渲染一句並比對截圖雜湊（應全相同）。
// 與 regress.mjs（@demo＋全版型）互補：搬遷一批部件成卡帶後兩支都要 0 差異。
// 用法：node test/regress-parts.mjs 舊.html 新.html [16:9|9:16] [scene,enter,exit,fx,style]
import { chromium } from 'playwright';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { readFileSync, writeFileSync } from 'node:fs';
const [oldF, newF, aspect = '16:9', kindArg = 'scene,enter,exit,fx,style'] = process.argv.slice(2);
if (!oldF || !newF) { console.log('用法：node test/regress-parts.mjs 舊.html 新.html [16:9|9:16] [種類,…]'); process.exit(2) }
const kinds = kindArg.split(','), [W, H] = aspect === '9:16' ? [540, 960] : [960, 540], fps = 5, SLOT = 4, TXT = '{街}頭的{霓虹}與雨';
const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH, args: ['--no-sandbox', '--enable-unsafe-swiftshader'] } : { args: ['--enable-unsafe-swiftshader'] });
const sha = b => createHash('sha1').update(b).digest('hex');
const tc = t => { const ms = Math.round(t * 1000), z = (n, l = 2) => String(n).padStart(l, '0'); return `${z(Math.floor(ms / 3600000))}:${z(Math.floor(ms / 60000) % 60)}:${z(Math.floor(ms / 1000) % 60)},${z(ms % 1000, 3)}` };
const open = async f => { const p = await (await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 })).newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(pathToFileURL(resolve(f)).href + `?render=1&fps=${fps}`); await p.evaluate(() => window.__ready); return { p, errs } };
const tagFor = { scene: n => `#center&${n}:100`, enter: n => `#center+${n}`, exit: n => `#center+fade+${n}`, fx: n => `#center~${n}`, style: n => `#center@${n}` };
// 取樣：句首 +0.2 開始；進場在開頭、退場在結尾（最後 0.4 秒），其他取中段與近尾端
const sample = { scene: [1.2, 2.6], enter: [.3, .6], exit: [2.9, 3.05], fx: [1.2, 2.5], style: [.5, 2.0] };
async function run(file, parts) {
  const { p, errs } = await open(file);
  if (!parts) parts = await p.evaluate(() => ({ scene: [...SCENE_NAMES], enter: [...new Set(ENTERS)], exit: [...new Set(EXITS)], fx: [...new Set(FXS)], style: [...new Set([...Object.keys(ST), ...Object.keys(STC)])] }));
  const jobs = []; for (const k of kinds) for (const n of parts[k] || []) jobs.push([k, n]);
  const srt = jobs.map(([k, n], i) => `${i + 1}\n${tc(.2 + SLOT * i)} --> ${tc(3.2 + SLOT * i)}\n${tagFor[k](n)} ${TXT}\n`).join('\n');
  await p.evaluate(s => window.__loadProject({ srt: s, config: {} }), srt);
  const want = new Map(); jobs.forEach(([k], i) => sample[k].forEach((s, j) => want.set(Math.round((.2 + SLOT * i + s) * fps), [i, j])));
  const out = {}, last = Math.max(...want.keys());
  for (let f = 0; f <= last; f++) { await p.evaluate(t => window.__renderFrame(t), f / fps); if (want.has(f)) { const [i, j] = want.get(f); (out[i] ||= [])[j] = sha(await p.screenshot()) } }
  await p.context().close(); return { jobs, out, parts, errs };
}
const a = oldF.endsWith('.json') ? JSON.parse(readFileSync(oldF, 'utf8')) : await run(oldF), b = await run(newF, a.parts);
// 金標準：舊檔參數可直接給 .json（先前用 WRITE_GOLDEN=路徑 存下的雜湊）；M4 刪除 legacy/ 後以此當回歸基準（同一台機器／同版 Chromium 才可比對）
if (process.env.WRITE_GOLDEN) { const { errs: _e, ...g } = b; writeFileSync(process.env.WRITE_GOLDEN, JSON.stringify(g)); console.log('已寫入金標準 ' + process.env.WRITE_GOLDEN) }
const diff = a.jobs.map(([k, n], i) => [k, n, (a.out[i] || []).join() !== (b.out[i] || []).join()]).filter(x => x[2]).map(x => x[0] + ':' + x[1]);
console.log(`${aspect}｜逐部件 ${a.jobs.length} 個（${kinds.join('、')}）｜不同 ${diff.length}${diff.length ? '：' + diff.join(' ') : ''}｜錯誤 舊${(a.errs || []).length} 新${b.errs.length}`);
await browser.close(); process.exit(diff.length || b.errs.length ? 1 : 0);
