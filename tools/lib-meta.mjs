// 語意資料（meta）的共用定義：詞表、驗證、讀取卡帶與內建項目、由程式碼推得的規格。
// 讀取卡帶時用 stub 的 Console 執行檔案，只拿 manifest，不會呼叫動畫函式。
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { ROOT, cartFiles } from './build.mjs';

export const ENERGY = ['low', 'mid', 'high'];
export const MOODS = ['通用', '抒情', '溫柔', '安靜', '夢幻', '熱血', '力量', '俏皮', '科技', '復古', '懸疑'];
export const TAGS = ['淡入', '位移', '縮放', '旋轉', '3D', '模糊', '遮罩', '擦除', '彈性', '過衝', '變形', '字距', '逐字', '閃爍', '光效', '故障', '手作感', '節拍', '鏡頭'];
const KEYS = ['energy', 'mood', 'tags', 'use', 'minSec', 'draft'];

export function metaProblems(m) {
  const p = [];
  for (const k of Object.keys(m)) if (!KEYS.includes(k)) p.push(`不認得的欄位 ${k}`);
  if (!ENERGY.includes(m.energy)) p.push(`energy 必須是 ${ENERGY.join('／')}`);
  if (!Array.isArray(m.mood) || !m.mood.length) p.push('mood 至少要一個');
  else for (const x of m.mood) if (!MOODS.includes(x)) p.push(`mood 不在詞表：${x}`);
  if (!Array.isArray(m.tags) || !m.tags.length) p.push('tags 至少要一個');
  else for (const x of m.tags) if (!TAGS.includes(x)) p.push(`tags 不在詞表：${x}`);
  if (typeof m.use !== 'string' || !m.use.trim() || [...m.use].length > 40) p.push('use 必填，且不超過 40 字');
  if (m.minSec !== undefined && !(m.minSec > 0)) p.push('minSec 必須大於 0');
  if (m.draft !== undefined && m.draft !== true) p.push('draft 只能是 true；審核後請刪除這個欄位');
  return p;
}

export function loadCarts() {
  const out = [];
  for (const f of cartFiles()) {
    const box = vm.createContext({ Console: { cart: d => out.push({ ...d, file: f }) } });
    vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), box, { filename: f });
  }
  return out;
}

const props = kf => [...new Set(kf.flatMap(k => Object.keys(k)).filter(k => !['offset', 'easing', 'composite'].includes(k)))];
// 只回報程式碼裡讀得到的事實；函式式動畫不猜內容
export function deriveSpec(d) {
  const s = [];
  const kf = d.keyframes || (d.perChar && d.perChar.fallback) || (d.kind === 'exit' && null);
  if (d.perChar && d.kind === 'enter') s.push(`逐字${d.perChar.gap ? `，每字間隔 ${d.perChar.gap}ms` : ''}`);
  if (d.perChar && d.kind === 'exit') s.push('逐字');
  if (kf) s.push(`動 ${props(kf).join('、')}`);
  if (d.play) s.push('由 play() 控制');
  if (d.kind === 'fx' && d.duration) s.push(`循環 ${d.duration}ms`);
  if (d.easing) s.push(`緩動 ${d.easing}`);
  return s.join('；');
}
