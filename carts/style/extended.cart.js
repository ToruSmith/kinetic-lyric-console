/* 平体：字形橫向拉寬（上限 1.08） */
Console.cart({
  kind: 'style', id: 'extended', apiVersion: 1,
  label: { zh: '平体：字形橫向拉寬（上限 1.08）' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  scope: 'element',
  apply(ctx) {
    const e = ctx.el;
    e.style.scale="1.08 .86"
  },
});
