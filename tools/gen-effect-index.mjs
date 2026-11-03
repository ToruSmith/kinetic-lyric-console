// 由卡帶與內建項目的 meta 產生給工具與 AI 查詢的索引：docs/effect-index.tsv
//   node tools/gen-effect-index.mjs          驗證 meta 並寫入
//   node tools/gen-effect-index.mjs --check  只驗證並檢查是否最新
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './build.mjs';
import { collectNames, fail } from './lib-names.mjs';
import { loadCarts, loadBuiltinMeta, metaProblems, deriveSpec } from './lib-meta.mjs';

const { U } = collectNames(), carts = loadCarts(), builtin = loadBuiltinMeta(), KINDS = ['layout', 'enter', 'exit', 'fx', 'style', 'scene'];
const cartOf = new Map(carts.map(c => [`${c.kind}:${c.id}`, c]));
const problems = [];
const rows = [['# kind', 'id', 'energy', 'mood', 'tags', 'desc', 'use', 'spec', 'draft'].join('\t')];
let done = 0, total = 0;
const clean = s => String(s || '').replace(/\*\*吃 `\{\}`\*\*[：:]?\s*/, '').replace(/[`*◆]/g, '').replace(/\s+/g, ' ').trim();
for (const kind of KINDS) for (const e of U[kind]) {
  total++;
  const c = cartOf.get(`${kind}:${e.name}`), m = (c && c.meta) || builtin[kind]?.[e.name];
  if (!m) continue;
  done++;
  for (const p of metaProblems(m)) problems.push(`${kind}:${e.name} ${p}`);
  rows.push([kind, e.name, m.energy, m.mood.join(','), m.tags.join(','), clean(e.desc), m.use, c ? deriveSpec(c) : '', m.draft ? 'draft' : ''].join('\t'));
}
if (problems.length) fail('meta 有問題：\n' + problems.join('\n'));
const text = rows.join('\n') + '\n', out = path.join(ROOT, 'docs/effect-index.tsv');
// 內建項目在執行期沒有說明文字，由手冊表格產生給圖鑑使用
const desc = {};
for (const kind of KINDS) for (const e of U[kind]) if (!cartOf.has(`${kind}:${e.name}`)) (desc[kind] ||= {})[e.name] = clean(e.desc);
const descText = `/* 由 tools/gen-effect-index.mjs 從 docs/manual.md 產生，請勿手改。 */\nconst EFFECT_DESC=${JSON.stringify(desc, null, 1)};\n`, descOut = path.join(ROOT, 'core/api/effect-desc.js');
if (process.argv.includes('--check')) {
  if ((fs.existsSync(out) ? fs.readFileSync(out, 'utf8') : '') !== text || (fs.existsSync(descOut) ? fs.readFileSync(descOut, 'utf8') : '') !== descText) fail('docs/effect-index.tsv 不是最新，請執行 npm run effect-index');
  console.log(`✓ docs/effect-index.tsv 是最新（語意資料 ${done}/${total}）`);
} else { fs.writeFileSync(out, text); fs.writeFileSync(descOut, descText); console.log(`✓ 已寫入 docs/effect-index.tsv（語意資料 ${done}/${total}）`); }
