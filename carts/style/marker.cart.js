/* 螢光筆：字下半加半透明色帶，不蓋字 */
Console.cart({
  kind: 'style', id: 'marker', apiVersion: 1,
  label: { zh: '螢光筆：字下半加半透明色帶，不蓋字' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  scope: 'element',
  apply(ctx) {
    const _lv = () => ctx.perChar();
    const e = ctx.el;
    _lv(e).forEach(x=>{x.style.backgroundImage="linear-gradient(transparent 58%,color-mix(in srgb,var(--a) 55%,transparent) 58%,color-mix(in srgb,var(--a) 55%,transparent) 92%,transparent 92%)"})
  },
});
