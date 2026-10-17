/* 鏡頭拉遠（整句 1.06→1） */
Console.cart({
  kind: 'fx', id: 'cam-pull', apiVersion: 1,
  label: { zh: '鏡頭拉遠（整句 1.06→1）' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  play(ctx) {
    const A = ctx.anim;
    const fw = ctx.el;
    const dur = ctx.duration;
    A(fw,[{scale:1.06},{scale:1}],{duration:dur*1000,easing:"linear"})
  },
});
