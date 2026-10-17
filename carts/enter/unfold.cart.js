/* 由上緣向下折開（3D） */
Console.cart({
  kind: 'enter', id: 'unfold', apiVersion: 1,
  label: { zh: '由上緣向下折開（3D）' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  keyframes: [{opacity:0,transform:"perspective(700px) rotateX(-90deg)",transformOrigin:"50% 0"},{opacity:1,transform:"none",transformOrigin:"50% 0"}],
});
