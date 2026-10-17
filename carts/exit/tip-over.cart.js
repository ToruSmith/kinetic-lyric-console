/* 像牌子一樣向後倒下（3D） */
Console.cart({
  kind: 'exit', id: 'tip-over', apiVersion: 1,
  label: { zh: '像牌子一樣向後倒下（3D）' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  keyframes: [{opacity:1,transform:"perspective(800px) rotateX(0)"},{opacity:0,transform:"perspective(800px) rotateX(80deg)"}],
});
