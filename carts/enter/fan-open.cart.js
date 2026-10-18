/* 逐字像摺扇依序打開 */
Console.cart({
  kind: 'enter', id: 'fan-open', apiVersion: 1,
  label: { zh: '逐字像摺扇依序打開' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  perChar: {
      gap: 60, // 每字延遲（毫秒）
      keyframes: (i,n)=>[{opacity:0,transform:"rotate(-40deg)",transformOrigin:"50% 100%"},{opacity:1,transform:"none",transformOrigin:"50% 100%"}],
      fallback: [{opacity:0},{opacity:1}],
    },
});
