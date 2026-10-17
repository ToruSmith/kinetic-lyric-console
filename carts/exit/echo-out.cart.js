/* 残響（近似）：放大擴散並帶光暈漸隱 */
Console.cart({
  kind: 'exit', id: 'echo-out', apiVersion: 1,
  label: { zh: '残響（近似）：放大擴散並帶光暈漸隱' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  keyframes: [{opacity:1,transform:"none",filter:"none"},{opacity:.75,transform:"scale(1.15)",filter:"drop-shadow(0 0 .12em var(--a))",offset:.4},{opacity:0,transform:"scale(1.5)",filter:"blur(.1em)"}],
});
