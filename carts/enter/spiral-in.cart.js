/* 逐字沿螺旋軌跡聚攏 */
Console.cart({
  kind: 'enter', id: 'spiral-in', apiVersion: 1,
  label: { zh: '逐字沿螺旋軌跡聚攏' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  perChar: {
      gap: 60, // 每字延遲（毫秒）
      keyframes: (i,n)=>{const a=i*2.39996,r=14;return[{opacity:0,transform:`translate(${(Math.cos(a)*r).toFixed(2)}cqh,${(Math.sin(a)*r).toFixed(2)}cqh) rotate(${(i%2?1:-1)*180}deg)`},{opacity:1,transform:"none"}]},
      fallback: [{opacity:0,transform:"rotate(-90deg) scale(.5)"},{opacity:1,transform:"none"}],
    },
});
