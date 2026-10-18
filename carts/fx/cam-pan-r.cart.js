/* 鏡頭右移 */
Console.cart({
  kind: 'fx', id: 'cam-pan-r', apiVersion: 1,
  label: { zh: '鏡頭右移' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  rand: { group: 'cam' },
  play(ctx) {
    const A = ctx.anim;
    const fw = ctx.el;
    const dur = ctx.duration;
    A(fw,[{translate:"-1.5cqw 0"},{translate:"1.5cqw 0"}],{duration:dur*1000,easing:"linear"})
  },
});
