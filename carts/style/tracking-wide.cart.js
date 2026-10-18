/* 字距加寬 0.14em */
Console.cart({
  kind: 'style', id: 'tracking-wide', apiVersion: 1,
  label: { zh: '字距加寬 0.14em' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  scope: 'element',
  apply(ctx) {
    const e = ctx.el;
    e.style.letterSpacing=`calc(${e.style.letterSpacing||"0em"} + .14em)`
  },
});
