/* 逐字像氣泡浮出 */
Console.cart({
  kind: 'enter', id: 'bubble-in', apiVersion: 1,
  label: { zh: '逐字像氣泡浮出' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  perChar: {
      gap: 70, // 每字延遲（毫秒）
      keyframes: (i,n)=>[{opacity:0,transform:"translateY(4cqh) scale(.2)"},{opacity:1,transform:"translateY(-1cqh) scale(1.15)",offset:.6},{opacity:1,transform:"none"}],
      fallback: [{opacity:0,transform:"translateY(4cqh) scale(.6)"},{opacity:1,transform:"none"}],
    },
});
