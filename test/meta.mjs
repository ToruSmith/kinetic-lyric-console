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

// 內建項目與查詢工具
const { loadBuiltinMeta } = await import('../tools/lib-meta.mjs');
const { collectNames } = await import('../tools/lib-names.mjs');
const { findEffects, readIndex } = await import('../tools/find-effect.mjs');
const builtin = loadBuiltinMeta(), { U } = collectNames();
// meta 是選填：卡帶可以沒有，這裡只確認已有的資料正確，且內建內容都對得到實際項目
for (const [kind, o] of Object.entries(builtin)) for (const [id, m] of Object.entries(o)) { assert.ok(U[kind].some(e => e.name === id), `內建 meta 指向不存在的項目 ${kind}:${id}`); assert.deepEqual(metaProblems(m), [], `${kind}:${id}`); }
const idx = readIndex();
assert.equal(findEffects(idx, ['抒情', '模糊'], { kind: 'enter', energy: 'low', limit: 1 })[0].kind, 'enter');
assert.ok(findEffects(idx, ['抒情'], { kind: 'fx', energy: 'high' }).every(r => r.kind === 'fx' && r.energy === 'high'));
assert.deepEqual(findEffects(idx, ['不存在的詞']), []);
console.log(`內建語意資料｜通過，索引 ${idx.length} 項`);
