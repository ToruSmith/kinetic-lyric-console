/* 暈染：逐字由糊變清並微微彈大 */
Console.cart({
  kind: 'enter', id: 'bleed-in', apiVersion: 1,
  label: { zh: '暈染：逐字由糊變清並微微彈大' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  meta: { energy: 'low', mood: ['溫柔', '抒情'], tags: ['模糊', '縮放', '逐字'], use: '慢歌裡想細細浮現的句子', draft: true },
  perChar: {
      gap: 55, // 每字延遲（毫秒）
      keyframes: (i,n)=>[{opacity:0,transform:"scale(.5)",filter:"blur(8px)"},{opacity:1,transform:"scale(1.04)",filter:"blur(1px)",offset:.7},{opacity:1,transform:"none",filter:"blur(0)"}],
      fallback: [{opacity:0,transform:"scale(.8)",filter:"blur(12px)"},{opacity:1,transform:"none",filter:"blur(0)"}],
    },
});
