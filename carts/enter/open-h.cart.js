/* 由中央向左右展開 */
Console.cart({
  kind: 'enter', id: 'open-h', apiVersion: 1,
  label: { zh: '由中央向左右展開' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  keyframes: [{clipPath:"inset(0 50% 0 50%)",opacity:1},{clipPath:"inset(0)",opacity:1}],
});
