// 由卡帶檔頭自動產生清單：docs/catalog.md（不手寫，避免與實際卡帶脫節）。
//   node tools/gen-catalog.mjs          寫入 docs/catalog.md
//   node tools/gen-catalog.mjs --check  只檢查是否最新（不寫檔，不同則 exit 1）
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, cartFiles } from './build.mjs';
import { readmeCounts } from './lib-names.mjs';

const KIND_ORDER = [['layout', '版型'], ['enter', '進場'], ['exit', '退場'], ['fx', '持續特效'], ['style', '文字樣式'], ['scene', '場景'], ['pack', '風格包']];
const rows = {};
for (const f of cartFiles()) {
  const t = fs.readFileSync(path.join(ROOT, f), 'utf8');
  const kind = /kind:\s*'([^']+)'/.exec(t)?.[1], id = /\bid:\s*'([^']+)'/.exec(t)?.[1];
  if (!kind || !id) continue;
  const label = /label:\s*\{\s*zh:\s*(['"`])((?:\\.|(?!\1).)*)\1/s.exec(t)?.[2] || '';
  const author = /author:\s*'([^']*)'/.exec(t)?.[1] || '';
  (rows[kind] ||= []).push({ id, label: label.replace(/\\(['"`])/g, '$1').replace(/\s+/g, ' ').replace(/\|/g, '\\|').trim(), author, f });
}
let md = '# 卡帶清單\n\n> 由 `node tools/gen-catalog.mjs` 自動產生，請勿手改。新增卡帶後重跑即可。\n\n';
const total = Object.values(rows).reduce((s, a) => s + a.length, 0);
md += `共 ${total} 個卡帶：${KIND_ORDER.map(([k, z]) => `${z} ${(rows[k] || []).length}`).join('、')}。\n`;
for (const [k, z] of KIND_ORDER) {
  const a = (rows[k] || []).sort((x, y) => (x.id < y.id ? -1 : 1));
  if (!a.length) continue;
  md += `\n## ${z}（${k}，${a.length}）\n\n| id | 說明 | 作者 | 檔案 |\n|---|---|---|---|\n`;
  for (const r of a) md += `| \`${r.id}\` | ${r.label} | ${r.author} | \`${r.f}\` |\n`;
}
// README 的總數與卡帶數跟著卡帶走，新增卡帶不必手改
const { n, c, total: carts } = readmeCounts();
const readmes = {
  'README.md': t => t
    .replace(/共 \d+ 種版型、\d+ 種場景層、\d+ 種進場、\d+ 種退場、\d+ 種持續特效、\d+ 種逐字樣式、\d+ 個風格包/, `共 ${n('layout')} 種版型、${n('scene')} 種場景層、${n('enter')} 種進場、${n('exit')} 種退場、${n('fx')} 種持續特效、${n('style')} 種逐字樣式、${n('pack')} 個風格包`)
    .replace(/其中 \d+ 個已做成獨立卡帶檔\*\*（每個效果一個檔案：版型 \d+、進場 \d+、退場 \d+、持續特效 \d+、文字樣式 \d+、場景 \d+、風格包 \d+/, `其中 ${carts} 個已做成獨立卡帶檔**（每個效果一個檔案：版型 ${c('layout')}、進場 ${c('enter')}、退場 ${c('exit')}、持續特效 ${c('fx')}、文字樣式 ${c('style')}、場景 ${c('scene')}、風格包 ${c('pack')}`),
  'README.en.md': t => t
    .replace(/\d+ layouts, \d+ scene layers, \d+ enter animations, \d+ exit animations, \d+ sustained effects, \d+ per-character styles and \d+ style packs/, `${n('layout')} layouts, ${n('scene')} scene layers, ${n('enter')} enter animations, ${n('exit')} exit animations, ${n('fx')} sustained effects, ${n('style')} per-character styles and ${n('pack')} style packs`)
    .replace(/\d+ of them are standalone cartridge \("cart"\) files\*\*, one effect per file: layouts \d+, enter \d+, exit \d+, sustained effects \d+, text styles \d+, scenes \d+, style packs \d+/, `${carts} of them are standalone cartridge ("cart") files**, one effect per file: layouts ${c('layout')}, enter ${c('enter')}, exit ${c('exit')}, sustained effects ${c('fx')}, text styles ${c('style')}, scenes ${c('scene')}, style packs ${c('pack')}`),
};
for (const [f, up] of Object.entries(readmes)) {
  const p = path.join(ROOT, f), cur = fs.readFileSync(p, 'utf8'), next = up(cur);
  if (next === cur) continue;
  if (process.argv.includes('--check')) { console.error(`✗ ${f} 的數量不是最新，請執行 node tools/gen-catalog.mjs`); process.exit(1); }
  fs.writeFileSync(p, next);
}
const out = path.join(ROOT, 'docs/catalog.md');
if (process.argv.includes('--check')) {
  const cur = fs.existsSync(out) ? fs.readFileSync(out, 'utf8') : '';
  if (cur !== md) { console.error('✗ docs/catalog.md 不是最新，請執行 node tools/gen-catalog.mjs'); process.exit(1) }
  console.log('✓ docs/catalog.md 是最新');
} else { fs.writeFileSync(out, md); console.log(`✓ 已寫入 docs/catalog.md（${total} 個卡帶）`) }
