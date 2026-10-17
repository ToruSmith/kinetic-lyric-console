/* 字距加寬 0.14em */
Console.cart({
  kind: 'style', id: 'tracking-wide', apiVersion: 1,
  label: { zh: '字距加寬 0.14em' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  scope: 'element',
  apply(ctx) {
    const e = ctx.el;
    e.style.letterSpacing=`calc(${e.style.letterSpacing||"0em"} + .14em)`
  },
});
