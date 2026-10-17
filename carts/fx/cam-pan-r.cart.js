/* 鏡頭右移 */
Console.cart({
  kind: 'fx', id: 'cam-pan-r', apiVersion: 1,
  label: { zh: '鏡頭右移' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  play(ctx) {
    const A = ctx.anim;
    const fw = ctx.el;
    const dur = ctx.duration;
    A(fw,[{translate:"-1.5cqw 0"},{translate:"1.5cqw 0"}],{duration:dur*1000,easing:"linear"})
  },
});
