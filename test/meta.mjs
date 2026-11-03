// 語意資料測試（不需要瀏覽器）：node test/meta.mjs
import assert from 'node:assert/strict';
import { metaProblems, deriveSpec, loadCarts, MOODS, TAGS } from '../tools/lib-meta.mjs';

const good = { energy: 'low', mood: [MOODS[0]], tags: [TAGS[0]], use: '抒情句', draft: true };
assert.deepEqual(metaProblems(good), []);
assert.deepEqual(metaProblems({ energy: 'mid', mood: [MOODS[1]], tags: [TAGS[1]], use: '主歌', minSec: 1.5 }), []);
const bad = [[{ ...good, energy: 'huge' }, /energy/], [{ ...good, mood: [] }, /mood/], [{ ...good, mood: ['開心'] }, /詞表/], [{ ...good, tags: ['自創'] }, /詞表/],
  [{ ...good, use: '' }, /use/], [{ ...good, use: '字'.repeat(41) }, /40/], [{ ...good, minSec: 0 }, /minSec/], [{ ...good, draft: false }, /draft/], [{ ...good, spec: 'x' }, /不認得/]];
for (const [m, re] of bad) assert.match(metaProblems(m).join('\n'), re);

assert.equal(deriveSpec({ kind: 'enter', keyframes: [{ opacity: 0, offset: 0 }, { opacity: 1, transform: 'none' }], easing: 'ease-out' }), '動 opacity、transform；緩動 ease-out');
assert.equal(deriveSpec({ kind: 'enter', perChar: { gap: 60, fallback: [{ opacity: 0 }, { opacity: 1 }] } }), '逐字，每字間隔 60ms；動 opacity');
assert.equal(deriveSpec({ kind: 'enter', play() {} }), '由 play() 控制');
assert.equal(deriveSpec({ kind: 'fx', keyframes: [{ scale: 1 }, { scale: 2 }], duration: 500 }), '動 scale；循環 500ms');

const carts = loadCarts();
assert.ok(carts.length >= 232);
for (const c of carts) if (c.meta) assert.deepEqual(metaProblems(c.meta), [], `${c.kind}:${c.id}`);
console.log(`語意資料｜通過，已標注 ${carts.filter(c => c.meta).length}/${carts.length} 個卡帶`);
