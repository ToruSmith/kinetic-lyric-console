/* 衝向鏡頭放大並模糊 */
Console.cart({
  kind: 'exit', id: 'fly-through', apiVersion: 1,
  label: { zh: '衝向鏡頭放大並模糊' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  keyframes: [{opacity:1,transform:"none",filter:"blur(0)"},{opacity:0,transform:"scale(3)",filter:"blur(8px)"}],
});
