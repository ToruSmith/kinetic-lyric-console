// 名稱來源（不需要瀏覽器）：合併「卡帶檔頭」與「手冊表格」，給 gen-cheatsheet 與 check-srt 共用。
//   1. carts/**/*.cart.js 的 kind / id / label / flags（卡帶是真實來源）；
//   2. docs/manual.md 的表格（尚未卡帶化的舊版核心項目，以及風格包的氣質說明）。
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, cartFiles } from './build.mjs';

export const read = rel => fs.readFileSync(path.join(ROOT, rel), 'utf8');
export const fail = msg => { console.error('✗ ' + msg); process.exit(1); };

// [kind, 顯示名, 符號, README 總數的順序]
export const KINDS = [['layout', '版型', '#'], ['enter', '進場', '+'], ['exit', '退場', '+'], ['fx', '持續特效', '~'], ['style', '樣式', '@'], ['scene', '場景', '&'], ['pack', '風格包', '']];
export const README_ORDER = ['layout', 'scene', 'enter', 'exit', 'fx', 'style', 'pack'];

export const backticks = line => [...line.matchAll(/`([^`]+)`/g)].map(m => m[1]);

export function collectNames() {
// ───────── 1. 手冊表格 ─────────
const manual = read('docs/manual.md');
function slice(text, from, to) {
  const a = text.indexOf(from); if (a < 0) fail(`手冊找不到章節「${from}」（標題改了？請同步改 tools/gen-cheatsheet.mjs）`);
  const b = text.indexOf(to, a + from.length); if (b < 0) fail(`手冊找不到章節「${to}」`);
  return text.slice(a, b);
}
const ROW = /^\| `([^`]+)` \| (.*) \|\s*$/gm;                       // | `名稱` | 說明 |
const rows = text => [...text.matchAll(ROW)].map(m => ({ name: m[1], desc: m[2].trim() }));
const SCENE_ROW = /^\| `([^`]+)` \| ([^|]+) \| (\d+) \| (.*) \|\s*$/gm; // | `名稱` | 層 | 預設強度 | 說明 |
const PACK_ROW = /^\| `([^`]+)` \| (?:[^|]*\|){4} (.*) \|\s*$/gm;    // | `名稱` | 字體 | 強調色 | 版型池 | 底層場景 | 氣質 |

const M = { layout: [], enter: [], exit: [], fx: [], style: [], scene: [], pack: [] };   // 手冊順序
const labManual = { layout: new Set(), scene: new Set() }, fullManual = new Set(), ctxManual = new Set(), layerManual = {};

{ // 版型：3.1 實驗室、滿版、看前後句要分開處理
  const t3 = slice(manual, '## 3. 版型清單', '## 4. 進場與退場');
  const iLab = t3.indexOf('### 3.1 實驗室版型'), iFull = t3.indexOf('### 滿版版型'), iCtx = t3.indexOf('### 會看前後句的版型');
  if (iLab < 0 || iFull < 0 || iCtx < 0) fail('手冊第 3 節缺少「3.1 實驗室版型／滿版版型／會看前後句的版型」小節');
  for (const r of rows(t3.slice(iLab, iFull))) labManual.layout.add(r.name);
  for (const r of rows(t3.slice(iFull, iCtx))) fullManual.add(r.name);
  backticks(t3.slice(iCtx).split('\n').slice(1).find(l => l.trim()) || '').forEach(n => ctxManual.add(n));
  M.layout = rows(t3.slice(0, iLab) + t3.slice(iFull, iCtx)).concat(rows(t3.slice(iLab, iFull)));
}
M.enter = rows(slice(manual, '### 4.1 進場', '### 4.2 退場'));
const perCharEnters = new Set(backticks(slice(manual, '### 4.1 進場', '### 4.2 退場').split('\n').find(l => l.startsWith('逐字型（◆）完整清單')) || ''));
M.exit = rows(slice(manual, '### 4.2 退場', '## 5. 持續特效'));
M.fx = rows(slice(manual, '## 5. 持續特效', '## 6. 樣式'));
M.style = rows(slice(manual, '## 6. 樣式', '## 7. 位置'));
{
  const t = slice(manual, '### 7.6 場景層', '### 7.7 節拍後製');
  for (const m of t.matchAll(SCENE_ROW)) { M.scene.push({ name: m[1], desc: m[4].trim() }); layerManual[m[1]] = m[2].trim(); }
  const labLine = t.split('\n').find(l => l.startsWith('實驗室場景'));
  if (!labLine) fail('手冊 7.6 找不到「實驗室場景…」那一行');
  for (const n of backticks(labLine)) { labManual.scene.add(n); M.scene.push({ name: n, desc: '' }); }
}
for (const m of slice(manual, '### 8.2 風格包', '## 9.').matchAll(PACK_ROW)) M.pack.push({ name: m[1], desc: m[2].trim() });

// ───────── 2. 卡帶 ─────────
const C = { layout: [], enter: [], exit: [], fx: [], style: [], scene: [], pack: [] };
for (const f of cartFiles()) {
  const t = read(f);
  const kind = /kind:\s*'([^']+)'/.exec(t)?.[1], id = /\bid:\s*'([^']+)'/.exec(t)?.[1];
  if (!kind || !id || !C[kind]) continue;
  const label = (/label:\s*\{\s*zh:\s*(['"`])((?:\\.|(?!\1).)*)\1/s.exec(t)?.[2] || '').replace(/\\(['"`])/g, '$1').replace(/\s+/g, ' ').trim();
  const flags = /flags:\s*\{([^}]*)\}/.exec(t)?.[1] || '';
  C[kind].push({
    name: kind === 'pack' ? label : id, desc: kind === 'pack' ? '' : label,
    full: /\bfull:\s*true/.test(flags), brace: /\bbrace:\s*true/.test(flags),
    lab: /\blab:\s*true/.test(flags) || (kind === 'scene' && /^\s*lab:\s*true/m.test(t)),
    layer: /layer:\s*'(under|over)'/.exec(t)?.[1] || '',
  });
}

// ───────── 3. 合併（手冊順序在前，其餘卡帶依 id 排序接後面）─────────
const U = {};
for (const [kind] of KINDS) {
  const map = new Map();
  for (const r of M[kind]) map.set(r.name, { name: r.name, desc: r.desc, lab: false, full: false, brace: false, layer: '' });
  for (const c of C[kind].slice().sort((a, b) => (a.name < b.name ? -1 : 1))) {
    const cur = map.get(c.name) || { name: c.name, desc: '', lab: false, full: false, brace: false, layer: '' };
    if (c.desc) cur.desc = c.desc;
    cur.full ||= c.full; cur.brace ||= c.brace; cur.lab ||= c.lab; cur.layer ||= c.layer;
    map.set(c.name, cur);
  }
  for (const e of map.values()) {
    if (kind === 'layout') { e.lab ||= labManual.layout.has(e.name); e.full ||= fullManual.has(e.name); e.ctx = ctxManual.has(e.name) }
    if (kind === 'scene') { e.lab ||= labManual.scene.has(e.name); e.layer ||= ({ '文字下': 'under', '文字上': 'over' })[layerManual[e.name]] || '' }
    e.brace ||= /\*\*吃 `\{\}`\*\*/.test(e.desc);
    e.perChar = /◆/.test(e.desc) || (kind === 'enter' && perCharEnters.has(e.name));
  }
  U[kind] = [...map.values()];
}

  return { U, C, manual };
}

const clean = s => String(s || '').replace(/\*\*吃 `\{\}`\*\*[：:]?\s*/, '').replace(/[`*◆]/g, '').replace(/\s+/g, ' ').trim();
export const cleanDesc = clean;

/** 內建項目在執行期沒有說明文字：建置時由手冊表格產生，給圖鑑使用。 */
export function effectDescSource() {
  const { U, C } = collectNames(), desc = {};
  for (const [kind] of KINDS) {
    if (kind === 'pack') continue;
    const carts = new Set(C[kind].map(c => c.name));
    for (const e of U[kind]) if (!carts.has(e.name)) (desc[kind] ||= {})[e.name] = clean(e.desc);
  }
  return `const EFFECT_DESC=${JSON.stringify(desc)};\n`;
}

/** README 的總數：README.md 與 README.en.md 由 gen-catalog 依這裡更新。 */
export function readmeCounts() {
  const { U, C } = collectNames(), n = k => U[k].length, c = k => C[k].length;
  const total = KINDS.reduce((s, [k]) => s + c(k), 0);
  return { n, c, total };
}
