/* 像蓋章一樣由大壓下 */
Console.cart({
  kind: 'enter', id: 'stamp-in', apiVersion: 1,
  label: { zh: '像蓋章一樣由大壓下' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  keyframes: [{opacity:0,transform:"scale(2.2) rotate(-6deg)"},{opacity:1,transform:"scale(.94)",offset:.6},{opacity:1,transform:"scale(1)"}],
});
