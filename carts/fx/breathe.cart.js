/* 整句微微呼吸（放大縮小） */
Console.cart({
  kind: 'fx', id: 'breathe', apiVersion: 1,
  label: { zh: '整句微微呼吸（放大縮小）' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  play(ctx) {
    const A = ctx.anim;
    const fw = ctx.el;
    A(fw,[{scale:1},{scale:1.03},{scale:1}],{duration:4000,iterations:Infinity,easing:"ease-in-out"})
  },
});
