/* 整句微微呼吸（放大縮小） */
Console.cart({
  kind: 'fx', id: 'breathe', apiVersion: 1,
  label: { zh: '整句微微呼吸（放大縮小）' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  rand: { group: 'cam' },
  play(ctx) {
    const A = ctx.anim;
    const fw = ctx.el;
    A(fw,[{scale:1},{scale:1.03},{scale:1}],{duration:4000,iterations:Infinity,easing:"ease-in-out"})
  },
});
