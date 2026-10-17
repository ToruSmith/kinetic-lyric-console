/* 由下大跳躍落定 */
Console.cart({
  kind: 'enter', id: 'big-jump', apiVersion: 1,
  label: { zh: '由下大跳躍落定' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  keyframes: [{opacity:0,transform:"translateY(25cqh) scale(.6)"},{opacity:1,transform:"translateY(-4cqh) scale(1.05)",offset:.6},{opacity:1,transform:"none"}],
});
