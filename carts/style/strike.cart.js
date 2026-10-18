/* 刪除線（強調色） */
Console.cart({
  kind: 'style', id: 'strike', apiVersion: 1,
  label: { zh: '刪除線（強調色）' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  scope: 'element',
  apply(ctx) {
    const e = ctx.el;
    e.style.textDecoration="line-through";e.style.textDecorationColor="var(--a)";e.style.textDecorationThickness=".07em"
  },
});
