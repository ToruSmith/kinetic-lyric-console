/* 逐字重力落下（各自旋轉） */
Console.cart({
  kind: 'exit', id: 'gravity', apiVersion: 1,
  label: { zh: '逐字重力落下（各自旋轉）' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  perChar(ctx) {
    const c = ctx.el;
    const i = ctx.index;
    const n = ctx.count;
    const R = ctx.random;
    return ({kf:[{opacity:1,transform:"none"},{opacity:0,transform:`translateY(60cqh) rotate(${((R()-.5)*60).toFixed(1)}deg)`}],dur:.7,at:R()*.3,ease:"cubic-bezier(.5,0,1,.6)"});
  },
});
