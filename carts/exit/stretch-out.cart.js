/* 橫向收窄成一條線 */
Console.cart({
  kind: 'exit', id: 'stretch-out', apiVersion: 1,
  label: { zh: '橫向收窄成一條線' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  keyframes: [{opacity:1,transform:"scaleX(1)"},{opacity:0,transform:"scaleX(0)"}],
});
