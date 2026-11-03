/* 斜向擦除退場：一條斜線掃過把字擦掉 */
Console.cart({
  kind: 'exit', id: 'diag-wipe-out', apiVersion: 1,
  label: { zh: '斜向擦除退場：一條斜線掃過把字擦掉' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  meta: { energy: 'mid', mood: ['通用'], tags: ['擦除'], use: '設計感收尾', draft: true },
  keyframes: [{clipPath:"polygon(-30% 0,200% 0,200% 100%,-60% 100%)"},{clipPath:"polygon(130% 0,200% 0,200% 100%,100% 100%)"}],
});
