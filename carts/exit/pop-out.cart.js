/* 先脹大再彈沒 */
Console.cart({
  kind: 'exit', id: 'pop-out', apiVersion: 1,
  label: { zh: '先脹大再彈沒' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  meta: { energy: 'high', mood: ['俏皮'], tags: ['縮放', '過衝'], use: '輕快短句的收尾', draft: true },
  keyframes: [{opacity:1,transform:"scale(1)"},{opacity:1,transform:"scale(1.15)",offset:.4},{opacity:0,transform:"scale(0)"}],
});
