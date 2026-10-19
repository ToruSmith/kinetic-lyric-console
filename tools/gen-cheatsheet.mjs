// 由「卡帶檔頭 ＋ 手冊表格」自動產生精簡版 AI 速查表：docs/ai-cheatsheet.md
// （把整份 manual.md 約 57KB 貼給 AI 太長；速查表只留語法、規則與可用名稱，並且不會與實際卡帶脫節。）
//   node tools/gen-cheatsheet.mjs          寫入 docs/ai-cheatsheet.md
//   node tools/gen-cheatsheet.mjs --check  只檢查是否最新（不寫檔，不同則 exit 1）
//
// 名稱來源（不需要瀏覽器）：
//   1. carts/**/*.cart.js 的 kind / id / label / flags（卡帶是真實來源，之後新增的效果自動進來）；
//   2. docs/manual.md 的表格（尚未卡帶化的舊版核心項目，以及風格包的氣質說明）。
// 自我檢查（任一不過就 exit 1，避免產出殘缺的速查表）：
//   - 各種類總數（含實驗室項目）必須等於 README 的「共 N 種版型、…」；那一行已由 test/spec-sync.mjs 對照執行期實際數量；
//   - 規則檔（tools/cheatsheet-rules.md）裡出現的每個名稱、每個範例標記都必須真的存在，且不是實驗室項目。
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, cartFiles } from './build.mjs';

const read = rel => fs.readFileSync(path.join(ROOT, rel), 'utf8');
const fail = msg => { console.error('✗ ' + msg); process.exit(1); };

// [kind, 顯示名, 符號, README 總數的順序]
const KINDS = [['layout', '版型', '#'], ['enter', '進場', '+'], ['exit', '退場', '+'], ['fx', '持續特效', '~'], ['style', '樣式', '@'], ['scene', '場景', '&'], ['pack', '風格包', '']];
const README_ORDER = ['layout', 'scene', 'enter', 'exit', 'fx', 'style', 'pack'];

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
const backticks = line => [...line.matchAll(/`([^`]+)`/g)].map(m => m[1]);

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
    e.perChar = /◆/.test(e.desc);
  }
  U[kind] = [...map.values()];
}

// ───────── 4. 自我檢查：總數要等於 README（README 的數字由 spec-sync 對照執行期）─────────
{
  const m = read('README.md').match(/共 (\d+) 種版型、(\d+) 種場景層、(\d+) 種進場、(\d+) 種退場、(\d+) 種持續特效、(\d+) 種逐字樣式、(\d+) 個風格包/);
  if (!m) fail('README 找不到「共 N 種版型、…」總數那一行（格式改了？請同步改這支工具與 test/spec-sync.mjs）');
  README_ORDER.forEach((k, i) => { if (U[k].length !== +m[i + 1]) fail(`${k} 數量 ${U[k].length}（手冊＋卡帶合併）≠ README 的 ${m[i + 1]}：手冊表格或卡帶漏了項目，或名稱不一致`) });
  // 英文版 README 的數字也要跟著走（靜態比對，不需瀏覽器）
  const en = read('README.en.md');
  const e = en.match(/(\d+) layouts, (\d+) scene layers, (\d+) enter animations, (\d+) exit animations, (\d+) sustained effects, (\d+) per-character styles and (\d+) style packs/);
  if (!e) fail('README.en.md 找不到「N layouts, N scene layers, …」總數那一行');
  README_ORDER.forEach((k, i) => { if (+e[i + 1] !== +m[i + 1]) fail(`README.en.md 的 ${k} 數字 ${e[i + 1]} ≠ README.md 的 ${m[i + 1]}`) });
  const total = KINDS.reduce((s, [k]) => s + C[k].length, 0), ec = en.match(/(\d+) of them are standalone cartridge/);
  if (!ec || +ec[1] !== total) fail(`README.en.md 的卡帶總數 ${ec && ec[1]} ≠ 實際 ${total}`);
}

// ───────── 5. 產出 ─────────
const GIST_OVERRIDE = { 'pv-vertical': '直排版 pv-lyric，靠右由上往下' };   // 手冊寫「同上」之類無法單獨閱讀的說明
function gist(desc, name) {
  if (GIST_OVERRIDE[name]) return GIST_OVERRIDE[name];
  let s = desc.replace(/\*\*吃 `\{\}`\*\*[：:]?\s*/, '').replace(/^滿版[：:]\s*/, '').replace(/\s*◆/g, '').replace(/[`*]/g, '');
  s = s.replace(/（[^）]*）|\([^)]*\)/g, '').split(/[；。]/)[0].trim();
  const a = [...s]; if (a.length <= 24) return s;
  const cut = a.slice(0, 24).join(''), k = cut.lastIndexOf('，');
  return k >= 6 ? cut.slice(0, k) : cut + '…';
}
const tags = (e, kind) => [e.brace && kind === 'layout' && '吃{}', e.full && '滿版', e.ctx && '看前後句', e.perChar && '逐字'].filter(Boolean).map(t => `〔${t}〕`).join('');
const usable = kind => U[kind].filter(e => !e.lab);
const line = (e, kind) => `- \`${e.name}\`${gist(e.desc, e.name) ? ' ' + gist(e.desc, e.name) : ''}${tags(e, kind) ? ' ' + tags(e, kind) : ''}`;

let md = read('tools/cheatsheet-rules.md').replace(/\s*$/, '\n');
md += '\n## 可用名稱\n\n';
const labN = { layout: U.layout.filter(e => e.lab).length, scene: U.scene.filter(e => e.lab).length };
for (const [kind, zh, sym] of KINDS) {
  const list = usable(kind);
  const head = { layout: '版型（`#`）', enter: '進場（第一個 `+`）', exit: '退場（第二個 `+`）', fx: '持續特效（`~`）', style: '樣式（`@`）', scene: '場景（`&`，預設不使用）', pack: '風格包（在網頁面板套用，不寫進 SRT）' }[kind];
  md += `### ${head}，${list.length} 個\n\n`;
  if (kind === 'scene') {
    for (const [layer, zhL] of [['under', '文字下（氛圍）'], ['over', '文字上（裝飾）'], ['', '其他']]) {
      const g = list.filter(e => e.layer === layer); if (!g.length) continue;
      md += `**${zhL}**\n\n` + g.map(e => line(e, kind)).join('\n') + '\n\n';
    }
  } else md += list.map(e => line(e, kind)).join('\n') + '\n\n';
}
md += `> 另有實驗室版型 ${labN.layout} 個、實驗室場景 ${labN.scene} 個，不在上面名單內，預設不要使用；要用請看 [\`catalog.md\`](catalog.md) 與 [\`manual.md\`](manual.md) 3.1、7.6。\n`;

// ───────── 6. 檢查規則檔裡的名稱與範例標記 ─────────
{
  const rules = read('tools/cheatsheet-rules.md'), names = {};
  for (const [k] of KINDS) names[k] = new Set(usable(k).map(e => e.name));
  const any = new Set(Object.values(names).flatMap(s => [...s])), allLab = new Set(U.layout.concat(U.scene).filter(e => e.lab).map(e => e.name));
  const prose = rules.replace(/```[\s\S]*?```/g, '');
  const NOT_NAMES = new Set(['config', 'json', 'srt']);   // 規則檔裡出現、但不是效果名稱的英文詞
  for (const n of backticks(prose)) if (/^[a-z][a-z0-9-]*$/.test(n) && !NOT_NAMES.has(n)) { if (allLab.has(n)) fail(`規則檔提到實驗室項目 \`${n}\`，但規則 13 說不要預設挑選`); if (!any.has(n)) fail(`規則檔提到的名稱 \`${n}\` 不存在（改名或刪除了？）`) }
  for (const [, code] of rules.matchAll(/```\n(\d+\n[\s\S]*?)```/g)) {
    for (const m of code.matchAll(/^#([a-z][\w-]*)\+([a-z][\w-]*)\+([a-z][\w-]*)(?:~([a-z][\w-]*))?(?:\^[a-z:\d.-]+)?(?:@([a-z][\w-]*(?:,[a-z][\w-]*)*))?/gm)) {
      [['layout', m[1]], ['enter', m[2]], ['exit', m[3]], ['fx', m[4]], ...(m[5] ? m[5].split(',').map(s => ['style', s]) : [])].forEach(([k, n]) => { if (n && !names[k].has(n)) fail(`範例標記裡的${k} \`${n}\` 不存在`) });
    }
  }
}

const out = path.join(ROOT, 'docs/ai-cheatsheet.md');
if (process.argv.includes('--check')) {
  const cur = fs.existsSync(out) ? fs.readFileSync(out, 'utf8') : '';
  if (cur !== md) fail('docs/ai-cheatsheet.md 不是最新，請執行 node tools/gen-cheatsheet.mjs');
  console.log('✓ docs/ai-cheatsheet.md 是最新');
} else {
  fs.writeFileSync(out, md);
  console.log(`✓ 已寫入 docs/ai-cheatsheet.md（${Buffer.byteLength(md)} bytes；manual.md 為 ${Buffer.byteLength(manual)} bytes）`);
}
