/* 由左右向中央閉合 */
Console.cart({
  kind: 'exit', id: 'close-h', apiVersion: 1,
  label: { zh: '由左右向中央閉合' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  keyframes: [{clipPath:"inset(0)"},{clipPath:"inset(0 50% 0 50%)"}],
});
