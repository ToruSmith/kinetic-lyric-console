/* 段違い：奇偶字上下交錯 */
Console.cart({
  kind: 'style', id: 'step-baseline', apiVersion: 1,
  label: { zh: '段違い：奇偶字上下交錯' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  scope: 'element',
  apply(ctx) {
    const _lv = () => ctx.perChar();
    const e = ctx.el;
    _lv(e).forEach((x,i)=>{x.style.translate=`0 ${(i%2?1:-1)*.09}em`})
  },
});
