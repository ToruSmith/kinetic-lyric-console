/* 彈出（微過衝） */
Console.cart({
  kind: 'enter', id: 'pop', apiVersion: 1,
  label: { zh: '彈出（微過衝）' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  meta: { energy: 'high', mood: ['俏皮'], tags: ['縮放', '過衝'], use: '短促輕快的強調句', draft: true },
  keyframes: [{opacity:0,transform:"scale(.2)"},{opacity:1,transform:"scale(1.12)",offset:.6},{opacity:1,transform:"scale(1)"}],
});
