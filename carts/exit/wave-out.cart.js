/* 逐字依序起伏後崩落 */
const sw = (i,n,r)=>i/Math.max(1,n-1);
Console.cart({
  kind: 'exit', id: 'wave-out', apiVersion: 1,
  label: { zh: '逐字依序起伏後崩落' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  perChar(ctx) {
    const c = ctx.el;
    const i = ctx.index;
    const n = ctx.count;
    return ({kf:[{opacity:1,transform:"none"},{opacity:1,transform:"translateY(-2.5cqh)",offset:.35},{opacity:0,transform:"translateY(3cqh)"}],dur:.5,at:sw(i,n)*.5});
  },
});
