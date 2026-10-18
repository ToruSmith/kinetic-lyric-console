// 由卡帶檔頭自動產生清單：docs/catalog.md（不手寫，避免與實際卡帶脫節）。
//   node tools/gen-catalog.mjs          寫入 docs/catalog.md
//   node tools/gen-catalog.mjs --check  只檢查是否最新（不寫檔，不同則 exit 1）
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, cartFiles } from './build.mjs';

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
const out = path.join(ROOT, 'docs/catalog.md');
if (process.argv.includes('--check')) {
  const cur = fs.existsSync(out) ? fs.readFileSync(out, 'utf8') : '';
  if (cur !== md) { console.error('✗ docs/catalog.md 不是最新，請執行 node tools/gen-catalog.mjs'); process.exit(1) }
  console.log('✓ docs/catalog.md 是最新');
} else { fs.writeFileSync(out, md); console.log(`✓ 已寫入 docs/catalog.md（${total} 個卡帶）`) }
