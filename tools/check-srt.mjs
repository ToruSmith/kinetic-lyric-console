// 帶標記 SRT 檢查器（不需要瀏覽器）：在匯入工具或交付之前，找出名稱、語法與規則問題。
//   node tools/check-srt.mjs 帶標記.srt                     檢查標記
//   node tools/check-srt.mjs 帶標記.srt --against 原始.srt   另外確認時間碼與歌詞沒有被改動
//   加 --strict 時，警告也算失敗；加 --json 輸出機器可讀結果
// 退出碼：0＝通過、1＝有問題、2＝用法或檔案錯誤。
// 解析直接執行 core/kernel/parse.js，名稱來自 tools/lib-names.mjs，不維護第二份語法或名單。
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { ROOT } from './build.mjs';
import { collectNames } from './lib-names.mjs';

const TRANS = ['cut', 'flash', 'crossfade', 'wipe', 'zoom'];
const KIND_ZH = { layout: '版型', enter: '進場', exit: '退場', fx: '持續特效', style: '樣式', scene: '場景' };
const SLOW_LAYOUTS = new Set(['particle-form', 'constellation']), SLOW_ENTERS = new Set(['scramble']);
const FLASHING = new Set(['flicker', 'glitch', 'shake', 'rainbow', 'flash-words']);
const SAFE_LAYOUTS = new Set(['center', 'lowerleft', 'subtitle-box']);
const SCENE_MAX = 3, SHORT_SEC = 1.5;
const POS = /^(?:auto|(?:tl|tc|tr|ml|mc|mr|bl|bc|br)?(?::-?\d+(?:\.\d+)?){0,2})$/;

function loadParser() {
  const src = fs.readFileSync(path.join(ROOT, 'core/kernel/parse.js'), 'utf8');
  const box = vm.createContext({});
  vm.runInContext(`${src};\nthis.parseSRT=parseSRT;`, box);
  return box.parseSRT;
}
const parseSRT = loadParser();

function namesIndex() {
  const { U } = collectNames(), N = {};
  for (const kind of Object.keys(KIND_ZH)) N[kind] = new Map(U[kind].map(e => [e.name, e]));
  return N;
}

function distance(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}
function suggest(name, map) {
  let best = '', score = Infinity;
  for (const n of map.keys()) { const s = distance(name.toLowerCase(), n); if (s < score) { score = s; best = n; } }
  return score <= Math.max(2, Math.floor(name.length / 3)) ? best : '';
}

// 依空行切區塊並保留行號；每塊單獨交給 parseSRT，時間壞掉的句子才定位得到
function blocks(text) {
  const lines = text.replace(/^﻿/, '').replace(/\r/g, '').split('\n'), out = [];
  let cur = null;
  lines.forEach((l, i) => {
    if (l.trim()) { (cur ||= { line: i + 1, rows: [] }).rows.push(l); } else if (cur) { out.push(cur); cur = null; }
  });
  if (cur) out.push(cur);
  return out;
}

function parseBlocks(text) {
  return blocks(text).filter(b => b.rows.some(r => r.includes('-->') )).map((b, i) => {
    const at = b.rows.findIndex(r => r.includes('-->')), body = b.rows.slice(at + 1);
    return { n: i + 1, line: b.line + at + 1, time: b.rows[at].trim(), body, x: parseSRT(b.rows.join('\n'))[0] || null };
  });
}

// 歌詞原文：去掉 {}；pv-* 的 (註解) 是新增物，比對時略過
const lyricOf = x => { const t = x.raw.replace(/[{}]/g, ''); return (/^pv-/.test(x.lay) ? t.replace(/\([^)]*\)|（[^）]*）/g, '') : t).replace(/\s+/g, ' ').trim(); };

export function checkSrt(text, { against = null, names = namesIndex() } = {}) {
  const issues = [], items = parseBlocks(text);
  const add = (level, it, msg) => issues.push({ level, sentence: it ? it.n : null, line: it ? it.line : null, message: msg });
  const err = (it, msg) => add('error', it, msg), warn = (it, msg) => add('warning', it, msg);
  const name = (it, kind, n) => {
    const e = names[kind].get(n);
    if (!e) { const s = suggest(n, names[kind]); err(it, `${KIND_ZH[kind]} \`${n}\` 不存在${s ? `，是不是 \`${s}\`？` : ''}`); return null; }
    if (e.lab) warn(it, `${KIND_ZH[kind]} \`${n}\` 是實驗室項目，預設不該挑選；確定要用可忽略`);
    return e;
  };
  if (!items.length) err(null, '找不到任何 SRT 時間碼（`-->`）');
  items.forEach(it => {
    const { x, body } = it;
    if (!x) return err(it, `時間碼無效，或結束時間不晚於開始時間：${it.time}`);
    if (body.length > 1) warn(it, '一個 SRT 區塊應只放一行文字（`list-table` 的分行除外）');
    const line = body[0] || '';
    if (!line.trim()) return err(it, '這句沒有文字');
    if (!line.startsWith('#')) {
      if (/^[+~^$*@&][a-z%]/i.test(line)) err(it, '標記要以 `#` 開頭，順序固定為 `#版型+進場+退場~特效^位置$大小*字體@樣式&場景`');
      else if (items.some(o => o.body[0]?.startsWith('#'))) warn(it, '這句沒有標記，其他句有');
      return;
    }
    if (/^[+~^$*@&]\s*[\w%-]/.test(x.raw.trim())) err(it, `標記中間不能有空白，或順序有誤：\`${line.slice(0, 40)}\``);
    if (/^#\S*\*[^\s@&]*[^\x00-\x7f]/.test(line)) warn(it, '`*字體` 應做 URL 編碼（例：`*%E6%AF%9B%E7%AD%86`）');
    const hasLayout = /^#[\w-]/.test(line);
    const lay = hasLayout ? name(it, 'layout', x.lay) : null;
    if (x.en) name(it, 'enter', x.en);
    if (x.ex) name(it, 'exit', x.ex);
    if (hasLayout && (!x.en || !x.ex)) warn(it, '每句要寫齊 `#版型+進場+退場`');
    const fx = (x.fx || '').split(',').filter(Boolean), st = (x.st || '').split(',').filter(Boolean);
    const scene = (x.scene || '').split(',').filter(Boolean);
    if (fx.length > 1) err(it, '`~` 每句最多 1 個');
    if (st.length > 3) err(it, '`@` 每句最多 3 個');
    fx.forEach(n => name(it, 'fx', n)); st.forEach(n => name(it, 'style', n));
    let layers = 0;
    scene.forEach(t => { const n = t.split(':')[0]; if (n === 'none' || /^bfx-/.test(n)) return; if (n.startsWith('trans-')) { if (!TRANS.includes(n.slice(6))) err(it, `轉場 \`${n}\` 不存在，可用：${TRANS.map(x => 'trans-' + x).join('、')}`); return; } layers++; name(it, 'scene', n); });
    if (layers > SCENE_MAX) warn(it, `場景超過預設上限 ${SCENE_MAX} 層（\`sceneMax\`）`);
    if (x.pos) {
      if (/^alt:/.test(x.pos)) err(it, 'SRT 不支援 `^alt:`，請逐句輪流寫 `^bl`、`^br`');
      else if (!POS.test(x.pos)) err(it, `位置 \`^${x.pos}\` 格式不對（例：\`^bc\`、\`^tl:5:-2\`）`);
      else if (lay?.full) warn(it, `滿版版型 \`${x.lay}\` 會忽略 \`^位置\``);
    }
    const open = (x.raw.match(/\{/g) || []).length, close = (x.raw.match(/\}/g) || []).length;
    if (open !== close) err(it, '`{}` 沒有成對');
    else if (open > 2) warn(it, '`{}` 每句建議 1–2 個');
    if (x.lay === 'split' && hasLayout && x.raw.replace(/\{[^}]*\}/g, '').trim()) warn(it, '`split` 只顯示 `{}` 內的詞，括號外的字不會出現');
    if (x.e - x.s < SHORT_SEC) {
      if (SLOW_LAYOUTS.has(x.lay)) warn(it, `句長不到 ${SHORT_SEC} 秒，\`${x.lay}\` 來不及完成`);
      if (x.en && (SLOW_ENTERS.has(x.en) || names.enter.get(x.en)?.perChar)) warn(it, `句長不到 ${SHORT_SEC} 秒，避免慢速或逐字進場 \`${x.en}\``);
    }
  });
  const ok = items.filter(i => i.x);
  ok.forEach((it, i) => {
    if (i && it.x.s < ok[i - 1].x.e) warn(it, '時間與上一句重疊');
    if (it.body[0]?.startsWith('#') && names.layout.get(it.x.lay)?.ctx) {
      if (it.x.lay !== 'scroll' && (i === 0 || i === ok.length - 1)) warn(it, `\`${it.x.lay}\` 會看前後句，不要放在第一句或最後一句`);
      if (i && ok[i - 1].x.lay === it.x.lay) warn(it, `\`${it.x.lay}\` 不要連續使用`);
    }
  });
  const flashes = ok.filter(it => FLASHING.has(it.x.lay) || (it.x.fx || '').split(',').some(f => FLASHING.has(f)) || (it.x.st || '').split(',').some(f => FLASHING.has(f)));
  if (ok.length >= 5 && flashes.length / ok.length > .3) warn(null, `閃爍類效果佔 ${flashes.length}/${ok.length} 句，有光敏風險，建議只留給少數高潮句`);
  if (against !== null) {
    const base = parseBlocks(against);
    if (base.length !== items.length) err(null, `句數不同：原始 ${base.length} 句，目前 ${items.length} 句`);
    items.slice(0, base.length).forEach((it, i) => {
      if (it.time !== base[i].time) err(it, `時間碼被改動：原為 ${base[i].time}`);
      if (it.x && base[i].x && lyricOf(it.x) !== lyricOf(base[i].x)) err(it, `歌詞被改動：原為「${lyricOf(base[i].x)}」`);
    });
  }
  const tagged = ok.filter(it => it.body[0]?.startsWith('#'));
  return {
    issues,
    stats: {
      sentences: items.length, tagged: tagged.length,
      safeLayouts: tagged.filter(it => SAFE_LAYOUTS.has(it.x.lay)).length,
      errors: issues.filter(i => i.level === 'error').length, warnings: issues.filter(i => i.level === 'warning').length,
    },
  };
}

function main(argv) {
  const opt = n => { const i = argv.indexOf(n); if (i < 0) return null; const v = argv[i + 1]; argv.splice(i, 2); return v ?? ''; };
  const flag = n => { const i = argv.indexOf(n); if (i < 0) return false; argv.splice(i, 1); return true; };
  const againstPath = opt('--against'), strict = flag('--strict'), json = flag('--json');
  const file = argv[0];
  if (!file || argv.length !== 1 || againstPath === '') { console.error('用法：node tools/check-srt.mjs 帶標記.srt [--against 原始.srt] [--strict] [--json]'); return 2; }
  let text, against = null;
  try { text = fs.readFileSync(file, 'utf8'); if (againstPath) against = fs.readFileSync(againstPath, 'utf8'); } catch (e) { console.error(`讀不到檔案：${e.path || e.message}`); return 2; }
  const r = checkSrt(text, { against });
  if (json) console.log(JSON.stringify(r, null, 2));
  else {
    for (const i of r.issues) console.log(`${i.level === 'error' ? '✗ 錯誤' : '⚠ 警告'}｜${i.sentence ? `第 ${i.sentence} 句（第 ${i.line} 行）` : '全檔'}｜${i.message}`);
    const s = r.stats, safe = s.tagged ? `；安全版型 ${Math.round(s.safeLayouts / s.tagged * 100)}%（建議 70–80%）` : '';
    console.log(`${s.errors ? '✗' : '✓'} 共 ${s.sentences} 句：錯誤 ${s.errors}、警告 ${s.warnings}${safe}`);
  }
  return r.stats.errors || (strict && r.stats.warnings) ? 1 : 0;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) process.exit(main(process.argv.slice(2)));
