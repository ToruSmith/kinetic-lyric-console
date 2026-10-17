/* 逐字溶解（帶模糊） */
Console.cart({
  kind: 'exit', id: 'dissolve', apiVersion: 1,
  label: { zh: '逐字溶解（帶模糊）' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  keyframes: [{opacity:1,filter:"blur(0)"},{opacity:0,filter:"blur(10px)"}],
});
