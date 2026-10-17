/* 長体：字形橫向壓窄 */
Console.cart({
  kind: 'style', id: 'condensed', apiVersion: 1,
  label: { zh: '長体：字形橫向壓窄' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  scope: 'element',
  apply(ctx) {
    const e = ctx.el;
    e.style.scale=".8 1.05"
  },
});
