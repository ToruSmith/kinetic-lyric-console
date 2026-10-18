/* バックスペース：由句尾一字一字刪掉 （整句版由右往左削去） */
Console.cart({
  kind: 'exit', id: 'backspace-out', apiVersion: 1,
  label: { zh: 'バックスペース：由句尾一字一字刪掉 （整句版由右往左削去）' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  keyframes: [{clipPath:"inset(0)",easing:"steps(9,end)"},{clipPath:"inset(0 100% 0 0)"}],
  perChar(ctx) {
    const c = ctx.el;
    const i = ctx.index;
    const n = ctx.count;
    return ({kf:[{opacity:1},{opacity:0}],dur:.12,at:(n-1-i)/Math.max(1,n)*.85,ease:"steps(1,end)"});
  },
});
