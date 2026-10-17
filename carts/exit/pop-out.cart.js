/* 先脹大再彈沒 */
Console.cart({
  kind: 'exit', id: 'pop-out', apiVersion: 1,
  label: { zh: '先脹大再彈沒' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  keyframes: [{opacity:1,transform:"scale(1)"},{opacity:1,transform:"scale(1.15)",offset:.4},{opacity:0,transform:"scale(0)"}],
});
