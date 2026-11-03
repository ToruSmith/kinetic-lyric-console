/* 滾動離場（轉一圈） */
Console.cart({
  kind: 'exit', id: 'roll-out', apiVersion: 1,
  label: { zh: '滾動離場（轉一圈）' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  meta: { energy: 'high', mood: ['俏皮'], tags: ['旋轉'], use: '誇張的段落收尾', draft: true },
  keyframes: [{opacity:1,transform:"none"},{opacity:0,transform:"translateX(40cqw) rotate(360deg)"}],
});
