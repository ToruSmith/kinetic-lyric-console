/* 逐字脈動：每個字依序輕微放大再縮回，隨節拍循環（程式版持續特效）。 */
Console.cart({
  kind: 'fx', id: 'char-pulse', apiVersion: 1,
  label: { zh: '逐字脈動', en: 'Char Pulse' },
  author: 'kinetic-lyric-console', license: 'MIT',
  meta: { energy: 'mid', mood: ['通用', '俏皮'], tags: ['縮放', '逐字', '節拍'], use: '逐字跟拍', draft: true },
  rand: { group: 'char', domOnly: true }, // 只作用在 DOM 文字、與其他逐字特效互斥
  play(ctx) {
    const chars = ctx.charEls();
    (chars.length ? chars : [ctx.el]).forEach((c, i) => {
      ctx.anim(c, [{ scale: 1 }, { scale: 1.12, offset: 0.4 }, { scale: 1 }],
        { duration: ctx.beatMs() * 2, iterations: Infinity, easing: 'ease-out', delay: -i * 90 });
    });
  },
});
