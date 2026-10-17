/* 逐字像摺扇依序打開 */
Console.cart({
  kind: 'enter', id: 'fan-open', apiVersion: 1,
  label: { zh: '逐字像摺扇依序打開' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  perChar: {
      gap: 60, // 每字延遲（毫秒）
      keyframes: (i,n)=>[{opacity:0,transform:"rotate(-40deg)",transformOrigin:"50% 100%"},{opacity:1,transform:"none",transformOrigin:"50% 100%"}],
      fallback: [{opacity:0},{opacity:1}],
    },
});
