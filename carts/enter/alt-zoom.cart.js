/* 交互ズーム：偶數字從鏡頭前撲來、奇數字從遠處長出 */
Console.cart({
  kind: 'enter', id: 'alt-zoom', apiVersion: 1,
  label: { zh: '交互ズーム：偶數字從鏡頭前撲來、奇數字從遠處長出' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  perChar: {
      gap: 45, // 每字延遲（毫秒）
      keyframes: (i,n)=>i%2===0?[{opacity:0,transform:"scale(2.4)",filter:"blur(8px)"},{opacity:1,transform:"none",filter:"blur(0)"}]:[{opacity:0,transform:"scale(.02)"},{opacity:1,transform:"scale(1.12)",offset:.65},{opacity:1,transform:"none"}],
      fallback: [{opacity:0,transform:"scale(1.8)"},{opacity:1,transform:"none"}],
    },
});
