/* 整句在句子時間內慢慢推近 */
Console.cart({
  kind: 'fx', id: 'zoom-slow', apiVersion: 1,
  label: { zh: '整句在句子時間內慢慢推近' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  rand: { group: 'cam' },
  play(ctx) {
    const A = ctx.anim;
    const fw = ctx.el;
    const dur = ctx.duration;
    A(fw,[{scale:1},{scale:1.06}],{duration:dur*1000,easing:"linear"})
  },
});
