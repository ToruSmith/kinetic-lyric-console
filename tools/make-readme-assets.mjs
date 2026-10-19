// 重拍 README 用的畫面素材 → assets/readme/{hero.gif, layouts.jpg, outputs.png}
// 用法：node tools/make-readme-assets.mjs [--out assets/readme] [--font 字型檔]
// 需要：Node.js、ffmpeg、npm ci，以及 npx playwright install chromium
//       （或設環境變數 CHROME_PATH 指向現成的 Chrome／Chromium）。
// 歌詞全部是自創的合成內容；畫面用與離線渲染相同的 __loadProject／__renderFrame 產生，所以和實際輸出一致。
// 素材會提交進 repo（和縮圖精靈圖一樣，見 CLAUDE.md 第 3 條）；只有版型或畫面改版後才需要重拍。
import { chromium } from 'playwright';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, writeFileSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from './build.mjs';
import { applyChroma, parseKey } from '../render/chroma.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = Object.fromEntries(process.argv.slice(2).reduce((a, x, i, all) => {
  if (x.startsWith('--')) a.push([x.slice(2), all[i + 1] && !all[i + 1].startsWith('--') ? all[i + 1] : true]);
  return a; }, []));
const out = resolve(args.out && args.out !== true ? args.out : join(root, 'assets/readme'));
const W = 1280, H = 720, FPS = 30;
const die = m => { console.error('錯誤：' + m); process.exit(1); };
if (spawnSync('ffmpeg', ['-version']).error) die('找不到 ffmpeg（終端機輸入 ffmpeg -version 要能執行）。');

// 圖上的標籤需要 CJK 字型：--font 指定，或用 fc-match 找；都沒有就不畫標籤（圖仍可用，說明改寫在 README 圖說裡）
let font = args.font && args.font !== true ? resolve(args.font) : null;
if (!font) { const r = spawnSync('fc-match', ['-f', '%{file}', 'Noto Sans CJK TC:bold'], { encoding: 'utf8' }); if (!r.error && r.stdout && existsSync(r.stdout)) font = r.stdout; }

const ts = s => { const ms = Math.round(s * 1000), p = (n, l = 2) => String(n).padStart(l, '0'); return `${p(Math.floor(ms / 3600000))}:${p(Math.floor(ms / 60000) % 60)}:${p(Math.floor(ms / 1000) % 60)},${p(ms % 1000, 3)}`; };
const toSrt = rows => rows.map(([a, b, t], i) => `${i + 1}\n${ts(a)} --> ${ts(b)}\n${t}\n`).join('\n');
const ff = a => { const r = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', ...a], { stdio: ['ignore', 'inherit', 'inherit'] }); if (r.status) die('ffmpeg 失敗：' + a.slice(-1)[0]); };

// 不用 shake／glitch／flicker 等快速明暗的效果（見手冊的光敏提醒）
const BASE = { bpm: 96, font: '黑體', accent: '#9ec5ff', bgMode: 'gradient', dim: 30, speed: 0.9, textShadow: true, weight: 400, spacing: 0.08, particles: 24, pMode: 'dots', vignette: 0.35, grain: 0, aspect: 'fill' };
const HERO = [
  [0.3, 2.7, '#center+blur-in+fade~float 城市慢慢亮起來'],
  [2.9, 5.3, '#pv-lyric+fade+fade^bl 風吹過{月台}(末班車)'],
  [5.5, 7.9, '#longshadow+zoomin+fade 向前走'],
  [8.1, 10.5, '#mirror-reflect+blur-in+fade&glow-ring 倒影裡的{星空}'],
];
const SHOTS = [   // 版型拼圖：由左而右、由上而下
  ['#justify-stack+fade+fade 夜風吹過月台', { weight: 700, accent: '#9aa7ff', particles: 12 }],
  ['#hud-frame+fade+fade 夜間航行', { font: '等寬', accent: '#6ff3ff', bgMode: 'solid', bgColor: '#050b14', dim: 0, particles: 0 }],
  ['#poster+zoomin+fade&halftone:50 {夏天}||SUMMER', { weight: 700, accent: '#ff7a1a' }],
  ['#longshadow+zoomin+fade 向前走', { weight: 800, accent: '#ffcf33', particles: 0 }],
  ['#mirror-reflect+blur-in+fade&glow-ring 倒影裡的{星空}', { accent: '#6ff3ff' }],
  ['#marker+fade+fade 這一刻我只想{擁抱}你', { weight: 600, accent: '#ffd23f' }],
];

const tmp = mkdtempSync(join(tmpdir(), 'klc-readme-'));
build();
const browser = await chromium.launch({ ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}),
  args: ['--font-render-hinting=none', '--disable-lcd-text', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] })
  .catch(e => die('無法啟動 Chromium：' + e.message + '\n請先執行 npx playwright install chromium，或設定 CHROME_PATH。'));
const openPage = async () => {
  const pg = await (await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 })).newPage();
  pg.on('pageerror', e => console.error('頁面錯誤：', e.message));
  await pg.goto(pathToFileURL(join(root, 'dist/index.html')).href + `?render=1&fps=${FPS}`);
  await pg.evaluate(() => window.__ready);
  return pg;
};
// 渲染第 0 ~ last 格（必須依序，不能跳格），在 pick 指定的格數截圖；回傳截圖函式需要的檔名
async function shoot(rows, config, picks) {   // picks: {格數: 檔名}
  const pg = await openPage();
  await pg.evaluate(p => window.__loadProject(p), { srt: toSrt(rows), config, fonts: [] });
  const last = Math.max(...Object.keys(picks).map(Number));
  for (let i = 0; i <= last; i++) {
    await pg.evaluate(t => window.__renderFrame(t, null), i / FPS);
    if (picks[i]) writeFileSync(picks[i], await pg.screenshot({ type: 'png', omitBackground: !!config.alphaOnly }));
  }
  await pg.context().close();
}

// ① hero 動圖：每 3 格取 1 格（10 fps），約 11 秒
{
  const d = join(tmp, 'hero'); mkdirSync(d);
  const picks = {}; let n = 0;
  for (let i = 0; i < Math.ceil(11 * FPS); i += 3) picks[i] = join(d, `f${String(n++).padStart(4, '0')}.png`);
  console.log(`hero：${n} 張`);
  await shoot(HERO, { ...BASE, particles: 14, trans: 'crossfade' }, picks);
  mkdirSync(out, { recursive: true });
  // 色數少、拜耳抖色：GIF 要小（目標 ≤3 MB）又不能在暗色光暈出現色帶
  ff(['-framerate', '10', '-i', join(d, 'f%04d.png'), '-vf', 'scale=640:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=40:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=2:diff_mode=rectangle', '-loop', '0', join(out, 'hero.gif')]);
}
// ② 版型拼圖
{
  const files = [];
  for (const [i, [line, cfg]] of SHOTS.entries()) { const f = join(tmp, `s${i}.png`); files.push(f); await shoot([[0.2, 3.4, line]], { ...BASE, ...cfg }, { [Math.round(2.0 * FPS)]: f }); console.log('版型', i + 1); }
  const sc = files.map((_, i) => `[${i}:v]scale=640:360[v${i}]`).join(';');
  ff([...files.flatMap(f => ['-i', f]), '-filter_complex', `${sc};[v0][v1][v2]hstack=3[r1];[v3][v4][v5]hstack=3[r2];[r1][r2]vstack`, '-frames:v', '1', '-q:v', '3', join(out, 'layouts.jpg')]);
}
// ③ 同一句話的三種輸出：完整畫面／透明字層（疊在棋盤格上）／綠幕
{
  const row = [[0.2, 3.4, '#pv-lyric+fade+fade^bc 風吹過{月台}(末班車)']], cfg = { ...BASE, vignette: 0.12 }, at = Math.round(2.0 * FPS);
  const m = ['final', 'alpha', 'chroma'].map(k => join(tmp, `m-${k}.png`));
  await shoot(row, cfg, { [at]: m[0] });
  await shoot(row, { ...cfg, alphaOnly: true }, { [at]: m[1] });
  await shoot(row, applyChroma(cfg, parseKey('#00ff00')), { [at]: m[2] });
  const lab = t => font ? `,drawtext=fontfile=${font}:text='${t}':fontsize=24:fontcolor=white:box=1:boxcolor=black@0.55:boxborderw=8:x=12:y=12` : '';
  const g = "if(eq(mod(floor(X/40)+floor(Y/40),2),0),84,120)";
  ff(['-i', m[0], '-i', m[1], '-i', m[2], '-f', 'lavfi', '-i', `color=c=black:s=${W}x${H},format=rgb24,geq=r='${g}':g='${g}':b='${g}'`,
    '-filter_complex', `[3:v]trim=end_frame=1,setpts=PTS-STARTPTS[chk];[1:v]format=rgba[al];[chk][al]overlay=format=auto,format=rgb24[alc];[0:v]scale=640:360${lab('完整畫面（背景＋文字）')}[p1];[alc]scale=640:360${lab('透明字層  --alpha')}[p2];[2:v]scale=640:360${lab('綠幕  --chroma')}[p3];[p1][p2][p3]hstack=3`,
    '-frames:v', '1', join(out, 'outputs.png')]);
}
await browser.close();
rmSync(tmp, { recursive: true, force: true });
console.log('完成：' + out + '（hero.gif、layouts.jpg、outputs.png）');
