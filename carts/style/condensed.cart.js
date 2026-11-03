/* 長體：字形橫向壓窄 */
Console.cart({
  kind: 'style', id: 'condensed', apiVersion: 1,
  label: { zh: '長體：字形橫向壓窄' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  meta: { energy: 'low', mood: ['通用', '力量'], tags: ['變形'], use: '窄字的海報感', draft: true },
  scope: 'element',
  apply(ctx) {
    const e = ctx.el;
    e.style.scale=".8 1.05"
  },
});
