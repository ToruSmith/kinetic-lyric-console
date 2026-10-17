/* 縦グラデ：上本色、下強調色 */
Console.cart({
  kind: 'style', id: 'grad-v', apiVersion: 1,
  label: { zh: '縦グラデ：上本色、下強調色' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  scope: 'element',
  apply(ctx) {
    const _lv = () => ctx.perChar();
    const e = ctx.el;
    _lv(e).forEach(x=>{x.style.backgroundImage="linear-gradient(180deg,var(--c) 15%,var(--a) 95%)";x.style.webkitBackgroundClip=x.style.backgroundClip="text";x.style.color="transparent";x.style.webkitTextFillColor="transparent"})
  },
});
