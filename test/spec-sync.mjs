// 規格書同步檢查：node test/spec-sync.mjs　比對「功能手冊」與 LAYOUTS／SCENE_NAMES／風格包／CONFIG 鍵（實驗室項目除外，且不得被規格書當正式項目列出）。
import { chromium } from 'playwright';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
const PAGE = process.env.PAGE || 'dist/index.html';   // 建置結果；可用環境變數 PAGE 指定別的檔
// 功能手冊（docs/manual.md）只涵蓋舊版既有的部件（名單凍結在 test/manual-baseline.json）；之後新增的卡帶由 docs/catalog.md 自動產生清單，不要求寫進手冊
const MANUAL = process.env.MANUAL || 'docs/manual.md';
const md = fs.readFileSync(MANUAL, 'utf8');
const BASE = JSON.parse(fs.readFileSync(new URL('./manual-baseline.json', import.meta.url), 'utf8'));
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH, args: ['--no-sandbox'] });
const p = await browser.newPage(); await p.goto(pathToFileURL(resolve(PAGE)).href + '?render=1'); await p.evaluate(() => window.__ready);
const I = await p.evaluate(() => ({ L: LAYOUTS.filter(l => !LAB_LAYOUTS.has(l)), LAB: [...LAB_LAYOUTS], S: SCENE_NAMES.filter(n => !SCENES[n].lab), SL: SCENE_NAMES.filter(n => SCENES[n].lab), P: [...STYLE_PACKS], EN: ENTERS, EX: EXITS, FX: FXS, K: ['sceneAll', 'layoutPool', 'sceneMax', 'sceneBudget', 'beatShake', 'beatZoom', 'beatTilt', 'beatHue', 'autoAccent'] }));
{ // 新卡帶（不在舊版名單內）不要求寫進手冊；依「種類」分開比對，避免不同種類同名（例：版型 marker 與樣式 marker）互相誤傷
  const NEW = await p.evaluate(BASE => { const o = {}; for (const c of Console.carts) { const old = c.kind === 'style' ? [...BASE.st, ...BASE.stc] : (BASE[c.kind] || []); if (!old.includes(c.name)) (o[c.kind] ||= []).push(c.name) } return o }, BASE);
  const kindOf = { L: 'layout', LAB: 'layout', S: 'scene', SL: 'scene', P: 'pack', EN: 'enter', EX: 'exit', FX: 'fx' };
  for (const k of Object.keys(kindOf)) { const ex = new Set(NEW[kindOf[k]] || []); I[k] = I[k].filter(n => !ex.has(n)); } }
let fail = 0, pass = 0; const has = n => md.includes('`' + n + '`'), t = (c, m) => { c ? pass++ : (fail++, console.log('✗ ' + m)) };
I.L.forEach(n => t(has(n), '規格書缺版型 ' + n)); I.S.forEach(n => t(has(n), '規格書缺場景 ' + n)); I.EN.forEach(n => t(has(n), '規格書缺進場 ' + n)); I.EX.forEach(n => t(has(n), '規格書缺退場 ' + n)); I.FX.forEach(n => t(has(n), '規格書缺特效 ' + n));
I.K.forEach(n => t(has(n), '規格書缺設定鍵 ' + n)); I.P.forEach(n => t(md.includes('`' + n + '`'), '規格書缺風格包 ' + n));
const m = md.match(/共 \*\*(\d+) 種版型\*\*/); t(m && +m[1] === I.L.length, `規格書版型數 ${m && m[1]} ≠ ${I.L.length}`);
const m2 = md.match(/(\d+) 種場景層/); t(m2 && +m2[1] === I.S.length, `規格書場景數 ${m2 && m2[1]} ≠ ${I.S.length}`);
const labSec = md.slice(md.indexOf('### 3.1 實驗室版型'), md.indexOf('### 3.1 實驗室版型') + 400); I.LAB.forEach(n => t(labSec.includes('`' + n + '`'), '實驗室版型應列在 3.1：' + n));
const tbl = md.slice(0, md.indexOf('### 3.1 實驗室版型')); I.LAB.forEach(n => t(!tbl.includes('`' + n + '`'), '實驗室版型不得出現在正式清單：' + n));
// README 首頁的數字（執行期總數、卡帶數與分類）必須與實際一致；核心內建項目不做成卡帶，所以「卡帶數」本來就小於「總數」
{
  const rd = fs.readFileSync(new URL('../README.md', import.meta.url), 'utf8');
  const R = await p.evaluate(() => ({ L: LAYOUTS.length, S: SCENE_NAMES.length, EN: ENTERS.length, EX: EXITS.length, FX: FXS.length, ST: Object.keys(ST).length + Object.keys(STC).length, P: [...STYLE_PACKS].length }));
  const tot = rd.match(/共 (\d+) 種版型、(\d+) 種場景層、(\d+) 種進場、(\d+) 種退場、(\d+) 種持續特效、(\d+) 種逐字樣式、(\d+) 個風格包/);
  t(!!tot, 'README 找不到「共 N 種版型…」總數那一行（格式改了？請同步改這個測試）');
  if (tot) [R.L, R.S, R.EN, R.EX, R.FX, R.ST, R.P].forEach((n, i) => t(+tot[i + 1] === n, `README 總數第 ${i + 1} 項 ${tot[i + 1]} ≠ 實際 ${n}`));
  const kinds = ['layout', 'enter', 'exit', 'fx', 'style', 'scene', 'pack'], cnt = kinds.map(k => fs.readdirSync(new URL('../carts/' + k, import.meta.url)).filter(f => f.endsWith('.cart.js')).length);
  const cm = rd.match(/其中 (\d+) 個已做成獨立卡帶檔\*\*（每個效果一個檔案：版型 (\d+)、進場 (\d+)、退場 (\d+)、持續特效 (\d+)、文字樣式 (\d+)、場景 (\d+)、風格包 (\d+)/);
  t(!!cm, 'README 找不到「其中 N 個已做成獨立卡帶檔…」那一行');
  if (cm) { t(+cm[1] === cnt.reduce((a, b) => a + b, 0), `README 卡帶總數 ${cm[1]} ≠ 實際 ${cnt.reduce((a, b) => a + b, 0)}`); cnt.forEach((n, i) => t(+cm[i + 2] === n, `README ${kinds[i]} 卡帶數 ${cm[i + 2]} ≠ 實際 ${n}`)); }
}
const sc = md.slice(md.indexOf('### 7.6'), md.indexOf('## 8. 全域設定')); I.SL.forEach(n => t(!sc.includes('| `' + n + '` |'), '實驗室場景不得列入 7.6 表：' + n));
console.log(`規格書同步｜通過 ${pass}、失敗 ${fail}`); await browser.close(); process.exit(fail ? 1 : 0);
