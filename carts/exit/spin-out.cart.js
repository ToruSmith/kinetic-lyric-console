/* 回って消える：逐字旋轉縮小消失 */
const swL = (i,n)=>i/Math.max(1,n-1);
Console.cart({
  kind: 'exit', id: 'spin-out', apiVersion: 1,
  label: { zh: '回って消える：逐字旋轉縮小消失' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  keyframes: [{opacity:1,transform:"none"},{opacity:0,transform:"rotate(200deg) scale(.05)"}],
  perChar(ctx) {
    const c = ctx.el;
    const i = ctx.index;
    const n = ctx.count;
    return ({kf:[{opacity:1,transform:"none"},{opacity:0,transform:`rotate(${(i%2?1:-1)*(i%3?250:200)}deg) scale(.01)`}],dur:.5,at:swL(i,n)*.5});
  },
});
