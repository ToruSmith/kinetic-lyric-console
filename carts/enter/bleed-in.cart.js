/* にじみ：逐字由糊變清並微微彈大 */
Console.cart({
  kind: 'enter', id: 'bleed-in', apiVersion: 1,
  label: { zh: 'にじみ：逐字由糊變清並微微彈大' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  perChar: {
      gap: 55, // 每字延遲（毫秒）
      keyframes: (i,n)=>[{opacity:0,transform:"scale(.5)",filter:"blur(8px)"},{opacity:1,transform:"scale(1.04)",filter:"blur(1px)",offset:.7},{opacity:1,transform:"none",filter:"blur(0)"}],
      fallback: [{opacity:0,transform:"scale(.8)",filter:"blur(12px)"},{opacity:1,transform:"none",filter:"blur(0)"}],
    },
});
