/* 柔和黑影（提高可讀性） */
Console.cart({
  kind: 'style', id: 'shadow-soft', apiVersion: 1,
  label: { zh: '柔和黑影（提高可讀性）' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  meta: { energy: 'low', mood: ['通用'], tags: ['陰影'], use: '疊影片時提高可讀性', draft: true },
  scope: 'element',
  apply(ctx) {
    const addSh = (el, s) => ctx.shadow(s);
    const e = ctx.el;
    return (addSh(e,"0 .06em .3em rgba(0,0,0,.65)"));
  },
});
