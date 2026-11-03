/* 滾動進入（轉一圈） */
Console.cart({
  kind: 'enter', id: 'roll-in', apiVersion: 1,
  label: { zh: '滾動進入（轉一圈）' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  meta: { energy: 'high', mood: ['俏皮'], tags: ['旋轉'], use: '搞笑或誇張的段落，少量使用', draft: true },
  keyframes: [{opacity:0,transform:"translateX(-30cqw) rotate(-360deg)"},{opacity:1,transform:"none"}],
});
