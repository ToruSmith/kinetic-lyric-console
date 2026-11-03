/* 刪除線（強調色） */
Console.cart({
  kind: 'style', id: 'strike', apiVersion: 1,
  label: { zh: '刪除線（強調色）' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  meta: { energy: 'mid', mood: ['懸疑', '力量'], tags: ['關鍵字'], use: '否定、刪除語氣', draft: true },
  scope: 'element',
  apply(ctx) {
    const e = ctx.el;
    e.style.textDecoration="line-through";e.style.textDecorationColor="var(--a)";e.style.textDecorationThickness=".07em"
  },
});
