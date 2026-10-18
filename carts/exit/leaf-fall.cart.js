/* 逐字像落葉飄落 */
const sw = (i,n,r)=>i/Math.max(1,n-1);
Console.cart({
  kind: 'exit', id: 'leaf-fall', apiVersion: 1,
  label: { zh: '逐字像落葉飄落' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  perChar(ctx) {
    const c = ctx.el;
    const i = ctx.index;
    const n = ctx.count;
    const R = ctx.random;
    return ({kf:[{opacity:1,transform:"none"},{opacity:1,transform:`translate(${((R()-.5)*6).toFixed(1)}cqw,12cqh) rotate(${((R()-.5)*90).toFixed(0)}deg)`,offset:.5},{opacity:0,transform:`translate(${((R()-.5)*14).toFixed(1)}cqw,32cqh) rotate(${((R()-.5)*180).toFixed(0)}deg)`}],dur:.65,at:sw(i,n)*.35});
  },
});
