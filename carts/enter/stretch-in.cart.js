/* 橫向伸展開來 */
Console.cart({
  kind: 'enter', id: 'stretch-in', apiVersion: 1,
  label: { zh: '橫向伸展開來' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  keyframes: [{opacity:0,transform:"scaleX(0)"},{opacity:1,transform:"scaleX(1.1)",offset:.7},{opacity:1,transform:"scaleX(1)"}],
});
