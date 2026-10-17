/* 滾動進入（轉一圈） */
Console.cart({
  kind: 'enter', id: 'roll-in', apiVersion: 1,
  label: { zh: '滾動進入（轉一圈）' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  keyframes: [{opacity:0,transform:"translateX(-30cqw) rotate(-360deg)"},{opacity:1,transform:"none"}],
});
