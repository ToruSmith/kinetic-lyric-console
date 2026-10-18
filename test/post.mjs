// 離線渲染後製參數（render/post.mjs）：node test/post.mjs　純函式檢查，不需要瀏覽器；有 ffmpeg 時另外確認濾鏡字串能被它接受。
import { resolvePost, postFilter, requiredFilters, missingFilters, describe, DEFAULTS, GRADES } from '../render/post.mjs';
import { spawnSync } from 'node:child_process';
let pass = 0, fail = 0; const ok = (c, m) => { c ? pass++ : (fail++, console.log('✗ ' + m)) };
const throws = (f, re, m) => { try { f(); ok(false, m + '（應丟錯）') } catch (e) { ok(re.test(e.message), m + '：' + e.message) } };

// 沒有任何後製 → null（run.mjs 的 ffmpeg 指令不變）
ok(resolvePost(undefined, {}) === null && resolvePost({}, {}) === null && resolvePost({ glow: false }, {}) === null, '沒給後製應回傳 null');
// 預設值
let r = resolvePost({ glow: true }); ok(r.glow.amount === DEFAULTS.glow.amount && r.glow.radius === DEFAULTS.glow.radius && r.glow.threshold === DEFAULTS.glow.threshold, 'glow:true 用預設值');
r = resolvePost(undefined, { glow: true }); ok(r.glow.amount === DEFAULTS.glow.amount, 'CLI --glow 不給值用預設');
r = resolvePost(undefined, { glow: 0.5 }); ok(r.glow.amount === 0.5, 'CLI --glow 0.5');
r = resolvePost({ glow: 0.2 }, { glow: 0.6 }); ok(r.glow.amount === 0.6, 'CLI 優先於 config');
r = resolvePost({ glow: { amount: 0.4, radius: 2 } }, { 'glow-threshold': 180 }); ok(r.glow.amount === 0.4 && r.glow.radius === 2 && r.glow.threshold === 180, 'CLI 逐欄覆蓋 config');
ok(resolvePost({ glow: 0 }) === null, 'amount 0 等於沒開');
r = resolvePost({ aberration: true }); ok(r.aberration.px === DEFAULTS.aberration.px, 'aberration:true 用預設');
ok(resolvePost(undefined, { aberration: 0 }) === null, '色差 0 等於沒開');
r = resolvePost({ grade: 'warm' }); ok(r.grade.preset === 'warm' && r.grade.contrast === GRADES.warm.contrast && !!r.grade.extra, '調色預設 warm');
r = resolvePost({ grade: { preset: 'film', contrast: 1.2 } }); ok(r.grade.contrast === 1.2 && r.grade.saturation === GRADES.film.saturation, '預設加自訂覆蓋');
r = resolvePost(undefined, { 'grade-contrast': 1.1 }); ok(r.grade.contrast === 1.1 && r.grade.preset === '', '只給 --grade-contrast');
ok(resolvePost({ grade: { contrast: 1, saturation: 1 } }) === null, '調色全是預設值等於沒開');
// 不合法
throws(() => resolvePost({ blur: 1 }), /不認得/, '未知欄位');
throws(() => resolvePost({ glow: { foo: 1 } }), /不認得/, 'glow 未知欄位');
throws(() => resolvePost({ glow: 2 }), /不合法/, 'glow amount 超範圍');
throws(() => resolvePost({ glow: { threshold: 255 } }), /不合法/, 'threshold 超範圍');
throws(() => resolvePost({ aberration: 99 }), /不合法/, '色差太大');
throws(() => resolvePost({ aberration: 'x' }), /不合法/, '色差非數字');
throws(() => resolvePost({ grade: 'sepia' }), /不存在/, '未知調色預設');
throws(() => resolvePost(undefined, { grade: true }), /預設名稱/, '--grade 沒給名稱');
throws(() => resolvePost({ grade: { gamma: 5 } }), /不合法/, 'gamma 超範圍');
throws(() => resolvePost({ grade: { foo: 1 } }), /不認得/, 'grade 未知欄位');

// 濾鏡字串
const W = 1920, H = 1080;
let f = postFilter(resolvePost({ glow: true }), W, H);
ok(f.startsWith('format=gbrp') && f.includes('split=2') && f.includes('gblur') && f.includes('blend=all_mode=screen'), 'glow 濾鏡結構：' + f);
f = postFilter(resolvePost({ aberration: { px: 3 } }), W, H); ok(f === 'format=gbrp,rgbashift=rh=-3:bh=3', '色差濾鏡：' + f);
f = postFilter(resolvePost({ aberration: { px: 3 } }), 960, 540); ok(f.endsWith('rgbashift=rh=-2:bh=2'), '色差依解析度換算：' + f);   // 3*540/1080=1.5 → round 2
f = postFilter(resolvePost({ grade: { contrast: 1.1, brightness: 0.05 } }), W, H); ok(f === 'eq=contrast=1.1:brightness=0.05', '調色濾鏡：' + f);
f = postFilter(resolvePost({ grade: 'cool' }), W, H); ok(f.includes('eq=') && f.includes('colorbalance='), 'cool 含 colorbalance：' + f);
f = postFilter(resolvePost({ glow: true, aberration: true, grade: 'film' }), W, H);
ok(f.indexOf('format=gbrp') < f.indexOf('rgbashift') && f.indexOf('rgbashift') < f.indexOf('eq='), '三者順序：輝光→色差→調色');
ok(f.match(/format=gbrp/g).length === 1, '只轉一次 RGB');
// 輔助
const all = resolvePost({ glow: true, aberration: true, grade: 'film' });
const req = requiredFilters(all); ok(['format', 'split', 'lutrgb', 'scale', 'gblur', 'blend', 'rgbashift', 'eq', 'curves'].every(x => req.includes(x)), '需要的濾鏡清單：' + req);
ok(/輝光/.test(describe(all)) && /色差/.test(describe(all)) && /調色 film/.test(describe(all)), 'describe：' + describe(all));
// ffmpeg 實測（沒有 ffmpeg 就略過）
if (spawnSync('ffmpeg', ['-version']).status === 0) {
  ok(missingFilters(all).length === 0, 'ffmpeg 應具備所需濾鏡：' + missingFilters(all));
  for (const [name, p] of [['glow', resolvePost({ glow: true })], ['aberration', resolvePost({ aberration: true })], ['grade', resolvePost({ grade: 'warm' })], ['all', all]]) {
    const x = spawnSync('ffmpeg', ['-hide_banner', '-v', 'error', '-f', 'lavfi', '-i', `testsrc=size=${W}x${H}:rate=1:duration=1`, '-vf', postFilter(p, W, H), '-frames:v', '1', '-f', 'null', '-'], { encoding: 'utf8' });
    ok(x.status === 0, `ffmpeg 接受 ${name} 濾鏡：${(x.stderr || '').slice(0, 200)}`);
  }
} else console.log('（沒有 ffmpeg，略過實測）');
console.log(`後製｜通過 ${pass}、失敗 ${fail}`); process.exit(fail ? 1 : 0);
