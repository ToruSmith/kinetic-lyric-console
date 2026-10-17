/* 範本：複製此檔到 carts/fx/你的-id.cart.js，把 id 改成檔名（小寫、連字號），再改 label 與內容。
   規則：只能用 Console 與傳進來的 ctx；不連網、不用 Date/Math.random/setTimeout（用 ctx.random、ctx.anim）。
   完整欄位說明見 docs/cart-api.md。 */
/* 逐字脈動：每個字依序輕微放大再縮回，隨節拍循環（程式版持續特效）。 */
Console.cart({
  kind: 'fx', id: 'my-fx', apiVersion: 1,
  label: { zh: '逐字脈動', en: 'Char Pulse' },
  author: '你的名字', license: 'MIT',
  rand: { group: 'char', domOnly: true }, // 只作用在 DOM 文字、與其他逐字特效互斥
  play(ctx) {
    const chars = ctx.charEls();
    (chars.length ? chars : [ctx.el]).forEach((c, i) => {
      ctx.anim(c, [{ scale: 1 }, { scale: 1.12, offset: 0.4 }, { scale: 1 }],
        { duration: ctx.beatMs() * 2, iterations: Infinity, easing: 'ease-out', delay: -i * 90 });
    });
  },
});
