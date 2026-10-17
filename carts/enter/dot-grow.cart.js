/* 逐字由一個小點長成字 */
Console.cart({
  kind: 'enter', id: 'dot-grow', apiVersion: 1,
  label: { zh: '逐字由一個小點長成字' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  perChar: {
      gap: 70, // 每字延遲（毫秒）
      keyframes: (i,n)=>[{opacity:0,transform:"scale(.05)",filter:"blur(3px)"},{opacity:1,transform:"scale(1)",filter:"blur(0)"}],
      fallback: [{opacity:0,transform:"scale(.3)"},{opacity:1,transform:"none"}],
    },
});
