/* 3D 轉開消失 */
Console.cart({
  kind: 'exit', id: 'flip-out', apiVersion: 1,
  label: { zh: '3D 轉開消失' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  keyframes: [{opacity:1,transform:"perspective(800px) rotateY(0)"},{opacity:0,transform:"perspective(800px) rotateY(90deg)"}],
});
