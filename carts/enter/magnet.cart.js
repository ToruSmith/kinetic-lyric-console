/* 逐字由左右兩側被吸到定位 */
Console.cart({
  kind: 'enter', id: 'magnet', apiVersion: 1,
  label: { zh: '逐字由左右兩側被吸到定位' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  perChar: {
      gap: 50, // 每字延遲（毫秒）
      keyframes: (i,n)=>[{opacity:0,transform:`translate(${i%2?-16:16}cqw,${((i%3)-1)*6}cqh)`},{opacity:1,transform:"none"}],
      fallback: [{opacity:0},{opacity:1}],
    },
});
