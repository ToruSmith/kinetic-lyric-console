/* 逐字像骨牌依序倒下 */
const sw = (i,n,r)=>i/Math.max(1,n-1);
Console.cart({
  kind: 'exit', id: 'domino-out', apiVersion: 1,
  label: { zh: '逐字像骨牌依序倒下' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  perChar(ctx) {
    const c = ctx.el;
    const i = ctx.index;
    const n = ctx.count;
    return ({kf:[{opacity:1,transform:"none",transformOrigin:"0 100%"},{opacity:0,transform:"rotate(75deg)",transformOrigin:"0 100%"}],dur:.4,at:sw(i,n)*.6});
  },
});
