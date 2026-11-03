/* 直向漸層：上本色、下強調色 */
Console.cart({
  kind: 'style', id: 'grad-v', apiVersion: 1,
  label: { zh: '直向漸層：上本色、下強調色' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  meta: { energy: 'low', mood: ['通用', '夢幻'], tags: ['漸層'], use: '上下雙色', draft: true },
  scope: 'element',
  apply(ctx) {
    const _lv = () => ctx.perChar();
    const e = ctx.el;
    _lv(e).forEach(x=>{x.style.backgroundImage="linear-gradient(180deg,var(--c) 15%,var(--a) 95%)";x.style.webkitBackgroundClip=x.style.backgroundClip="text";x.style.color="transparent";x.style.webkitTextFillColor="transparent"})
  },
});
