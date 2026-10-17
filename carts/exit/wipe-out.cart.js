/* 由左向右擦掉 */
Console.cart({
  kind: 'exit', id: 'wipe-out', apiVersion: 1,
  label: { zh: '由左向右擦掉' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  keyframes: [{clipPath:"inset(0)"},{clipPath:"inset(0 0 0 100%)"}],
});
