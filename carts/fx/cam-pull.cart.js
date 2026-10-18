/* 鏡頭拉遠（整句 1.06→1） */
Console.cart({
  kind: 'fx', id: 'cam-pull', apiVersion: 1,
  label: { zh: '鏡頭拉遠（整句 1.06→1）' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  rand: { group: 'cam' },
  play(ctx) {
    const A = ctx.anim;
    const fw = ctx.el;
    const dur = ctx.duration;
    A(fw,[{scale:1.06},{scale:1}],{duration:dur*1000,easing:"linear"})
  },
});
