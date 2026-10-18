/* 偏移硬影 */
Console.cart({
  kind: 'style', id: 'shadow-offset', apiVersion: 1,
  label: { zh: '偏移硬影' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  scope: 'element',
  apply(ctx) {
    const addSh = (el, s) => ctx.shadow(s);
    const e = ctx.el;
    return (addSh(e,".07em .07em 0 rgba(0,0,0,.7)"));
  },
});
