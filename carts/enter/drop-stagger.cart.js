/* 逐字依序落下並微彈 */
Console.cart({
  kind: 'enter', id: 'drop-stagger', apiVersion: 1,
  label: { zh: '逐字依序落下並微彈' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  meta: { energy: 'mid', mood: ['俏皮', '溫柔'], tags: ['位移', '過衝', '逐字'], use: '輕盈落下的主歌句', draft: true },
  perChar: {
      gap: 70, // 每字延遲（毫秒）
      keyframes: (i,n)=>[{opacity:0,transform:"translateY(-9cqh)"},{opacity:1,transform:"translateY(1cqh)",offset:.7},{opacity:1,transform:"none"}],
      fallback: [{opacity:0,transform:"translateY(-9cqh)"},{opacity:1,transform:"none"}],
    },
});
