/* 平体：字形橫向拉寬（上限 1.08） */
Console.cart({
  kind: 'style', id: 'extended', apiVersion: 1,
  label: { zh: '平体：字形橫向拉寬（上限 1.08）' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  scope: 'element',
  apply(ctx) {
    const e = ctx.el;
    e.style.scale="1.08 .86"
  },
});
