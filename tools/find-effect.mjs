// 依用途、情緒或特徵查效果（不需要瀏覽器）：node tools/find-effect.mjs 抒情 模糊 --kind enter --energy low --limit 8
// 讀 docs/effect-index.tsv；所有關鍵字都比對 id、情緒、特徵、說明與用途，符合越多排越前面。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ROOT } from './build.mjs';

const FIELDS = ['kind', 'id', 'energy', 'mood', 'tags', 'desc', 'use', 'spec', 'draft'];
export const readIndex = () => fs.readFileSync(path.join(ROOT, 'docs/effect-index.tsv'), 'utf8').trim().split('\n').slice(1).map(l => Object.fromEntries(l.split('\t').map((v, i) => [FIELDS[i], v])));

export function findEffects(rows, words, { kind = '', energy = '', limit = 10 } = {}) {
  return rows.filter(r => (!kind || r.kind === kind) && (!energy || r.energy === energy)).map(r => {
    const hay = [r.id, r.mood, r.tags, r.desc, r.use].join(' ').toLowerCase();
    return { r, score: words.filter(w => hay.includes(w.toLowerCase())).length };
  }).filter(x => !words.length || x.score).sort((a, b) => b.score - a.score || a.r.id.localeCompare(b.r.id)).slice(0, limit).map(x => x.r);
}

function main(argv) {
  const opt = n => { const i = argv.indexOf(n); if (i < 0) return ''; const v = argv[i + 1] ?? ''; argv.splice(i, 2); return v; };
  const kind = opt('--kind'), energy = opt('--energy'), limit = +opt('--limit') || 10;
  if (!argv.length && !kind && !energy) { console.error('用法：node tools/find-effect.mjs 關鍵字… [--kind enter] [--energy low|mid|high] [--limit 10]'); return 2; }
  const found = findEffects(readIndex(), argv, { kind, energy, limit });
  for (const r of found) console.log(`${r.kind}\t${r.id}\t${r.energy}\t${r.mood}\t${r.desc}｜${r.use}`);
  if (!found.length) console.log('找不到符合的效果');
  return 0;
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) process.exit(main(process.argv.slice(2)));
