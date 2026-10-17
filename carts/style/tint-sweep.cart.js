/* 染色掃過：字由左到右依序從文字色變成強調色並停住（整句樣式，需要逐字時用 splitChars）。 */
Console.cart({
  kind: 'style', id: 'tint-sweep', apiVersion: 1,
  label: { zh: '染色掃過', en: 'Tint Sweep' },
  author: 'kinetic-lyric-console', license: 'MIT',
  scope: 'sentence',
  apply(ctx) {
    ctx.splitChars().forEach((c, i) => {
      ctx.anim(c, [{ color: 'var(--c)' }, { color: 'var(--a)' }],
        { duration: 300, delay: ctx.enterMs() * 0.5 + i * 80, easing: 'ease-out' });
    });
  },
});
