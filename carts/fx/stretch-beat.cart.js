/* 横伸び拍：每拍橫向撐開再彈回 */
Console.cart({
  kind: 'fx', id: 'stretch-beat', apiVersion: 1,
  label: { zh: '横伸び拍：每拍橫向撐開再彈回' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  rand: { group: 'cam' },
  play(ctx) {
    const A = ctx.anim;
    const btL = () => ctx.beatMs();
    const fw = ctx.el;
    A(fw,[{scale:"1.12 .955"},{scale:"1 1",offset:.4},{scale:"1 1"}],{duration:btL(),iterations:Infinity,easing:"cubic-bezier(.1,.8,.3,1)"})
  },
});
