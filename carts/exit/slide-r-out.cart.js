/* 向右滑出 */
Console.cart({
  kind: 'exit', id: 'slide-r-out', apiVersion: 1,
  label: { zh: '向右滑出' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  meta: { energy: 'mid', mood: ['通用'], tags: ['位移', '淡入'], use: '與由左進場成對使用', draft: true },
  keyframes: [{opacity:1,transform:"none"},{opacity:0,transform:"translateX(20cqw)"}],
});
