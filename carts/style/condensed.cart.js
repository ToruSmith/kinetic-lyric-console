/* 長体：字形橫向壓窄 */
Console.cart({
  kind: 'style', id: 'condensed', apiVersion: 1,
  label: { zh: '長体：字形橫向壓窄' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  scope: 'element',
  apply(ctx) {
    const e = ctx.el;
    e.style.scale=".8 1.05"
  },
});
