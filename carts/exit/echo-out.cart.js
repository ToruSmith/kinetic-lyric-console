/* 殘響（近似）：放大擴散並帶光暈漸隱 */
Console.cart({
  kind: 'exit', id: 'echo-out', apiVersion: 1,
  label: { zh: '殘響（近似）：放大擴散並帶光暈漸隱' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  meta: { energy: 'low', mood: ['夢幻', '抒情'], tags: ['縮放', '光效'], use: '餘韻很長的句尾', draft: true },
  keyframes: [{opacity:1,transform:"none",filter:"none"},{opacity:.75,transform:"scale(1.15)",filter:"drop-shadow(0 0 .12em var(--a))",offset:.4},{opacity:0,transform:"scale(1.5)",filter:"blur(.1em)"}],
});
