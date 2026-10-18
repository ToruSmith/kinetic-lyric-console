/* 柔和黑影（提高可讀性） */
Console.cart({
  kind: 'style', id: 'shadow-soft', apiVersion: 1,
  label: { zh: '柔和黑影（提高可讀性）' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  scope: 'element',
  apply(ctx) {
    const addSh = (el, s) => ctx.shadow(s);
    const e = ctx.el;
    return (addSh(e,"0 .06em .3em rgba(0,0,0,.65)"));
  },
});
