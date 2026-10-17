/* 快速甩入（帶模糊，微過衝） */
Console.cart({
  kind: 'enter', id: 'whip', apiVersion: 1,
  label: { zh: '快速甩入（帶模糊，微過衝）' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  keyframes: [{opacity:0,transform:"translateX(-30cqw)",filter:"blur(10px)"},{opacity:1,transform:"translateX(1.5cqw)",filter:"blur(0)",offset:.75},{opacity:1,transform:"none"}],
  easing: "cubic-bezier(.1,.8,.2,1)",
});
