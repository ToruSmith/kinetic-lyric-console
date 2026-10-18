/* 逐字像骨牌依序立起 */
Console.cart({
  kind: 'enter', id: 'domino-in', apiVersion: 1,
  label: { zh: '逐字像骨牌依序立起' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  perChar: {
      gap: 90, // 每字延遲（毫秒）
      keyframes: (i,n)=>[{opacity:0,transform:"rotate(-80deg)",transformOrigin:"0 100%"},{opacity:1,transform:"none",transformOrigin:"0 100%"}],
      fallback: [{opacity:0},{opacity:1}],
    },
});
