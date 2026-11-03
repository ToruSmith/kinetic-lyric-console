/* 逐字溶解（帶模糊） */
Console.cart({
  kind: 'exit', id: 'dissolve', apiVersion: 1,
  label: { zh: '逐字溶解（帶模糊）' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  meta: { energy: 'low', mood: ['抒情', '夢幻'], tags: ['模糊', '逐字'], use: '逐字慢慢消散', draft: true },
  keyframes: [{opacity:1,filter:"blur(0)"},{opacity:0,filter:"blur(10px)"}],
});
