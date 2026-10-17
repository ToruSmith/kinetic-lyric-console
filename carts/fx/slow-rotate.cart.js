/* 極緩慢左右傾斜（±1.2°） */
Console.cart({
  kind: 'fx', id: 'slow-rotate', apiVersion: 1,
  label: { zh: '極緩慢左右傾斜（±1.2°）' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  play(ctx) {
    const A = ctx.anim;
    const fw = ctx.el;
    A(fw,[{rotate:"-1.2deg"},{rotate:"1.2deg"}],{duration:6000,iterations:Infinity,direction:"alternate",easing:"ease-in-out"})
  },
});
