/* 整句由模糊變清楚 */
Console.cart({
  kind: 'enter', id: 'blur-in', apiVersion: 1,
  label: { zh: '整句由模糊變清楚' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  meta: { energy: 'low', mood: ['抒情', '夢幻', '通用'], tags: ['模糊', '淡入'], use: '抒情歌的安全預設', draft: true },
  keyframes: [{opacity:0,filter:"blur(14px)"},{opacity:1,filter:"blur(0)"}],
});
