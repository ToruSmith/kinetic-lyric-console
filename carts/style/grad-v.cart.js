/* 縦グラデ：上本色、下強調色 */
Console.cart({
  kind: 'style', id: 'grad-v', apiVersion: 1,
  label: { zh: '縦グラデ：上本色、下強調色' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  scope: 'element',
  apply(ctx) {
    const _lv = () => ctx.perChar();
    const e = ctx.el;
    _lv(e).forEach(x=>{x.style.backgroundImage="linear-gradient(180deg,var(--c) 15%,var(--a) 95%)";x.style.webkitBackgroundClip=x.style.backgroundClip="text";x.style.color="transparent";x.style.webkitTextFillColor="transparent"})
  },
});
