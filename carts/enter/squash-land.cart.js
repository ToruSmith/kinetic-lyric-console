/* 落下壓扁再回彈 */
Console.cart({
  kind: 'enter', id: 'squash-land', apiVersion: 1,
  label: { zh: '落下壓扁再回彈' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  keyframes: [{opacity:0,transform:"translateY(-20cqh) scaleY(1.2)"},{opacity:1,transform:"translateY(0) scale(1.15,.8)",offset:.6},{opacity:1,transform:"none"}],
});
