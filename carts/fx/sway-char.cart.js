/* 逐字左右搖擺（相位錯開） */
Console.cart({
  kind: 'fx', id: 'sway-char', apiVersion: 1,
  label: { zh: '逐字左右搖擺（相位錯開）' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  play(ctx) {
    const cl = () => ctx.charEls();
    const A = ctx.anim;
    const fw = ctx.el;
    const l=cl(fw);(l.length?l:[fw]).forEach((c,i)=>A(c,[{rotate:"-4deg"},{rotate:"4deg"}],{duration:2000,iterations:Infinity,direction:"alternate",easing:"ease-in-out",delay:-i*180}))
  },
});
