/* 逐字依序模糊消失 */
const sw = (i,n,r)=>i/Math.max(1,n-1);
Console.cart({
  kind: 'exit', id: 'blur-out-stagger', apiVersion: 1,
  label: { zh: '逐字依序模糊消失' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  perChar(ctx) {
    const c = ctx.el;
    const i = ctx.index;
    const n = ctx.count;
    return ({kf:[{opacity:1,filter:"blur(0)"},{opacity:0,filter:"blur(10px)"}],dur:.5,at:sw(i,n)*.5});
  },
});
