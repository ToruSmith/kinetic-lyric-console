/* 螢光筆：字下半加半透明色帶，不蓋字 */
Console.cart({
  kind: 'style', id: 'marker', apiVersion: 1,
  label: { zh: '螢光筆：字下半加半透明色帶，不蓋字' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  meta: { energy: 'low', mood: ['俏皮', '通用'], tags: ['關鍵字'], use: '筆記感強調', draft: true },
  scope: 'element',
  apply(ctx) {
    const _lv = () => ctx.perChar();
    const e = ctx.el;
    _lv(e).forEach(x=>{x.style.backgroundImage="linear-gradient(transparent 58%,color-mix(in srgb,var(--a) 55%,transparent) 58%,color-mix(in srgb,var(--a) 55%,transparent) 92%,transparent 92%)"})
  },
});
