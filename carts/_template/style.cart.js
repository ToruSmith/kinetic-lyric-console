/* 範本：複製此檔到 carts/style/你的-id.cart.js，把 id 改成檔名（小寫、連字號），再改 label 與內容。
   規則：只能用 Console 與傳進來的 ctx；不連網、不用 Date/Math.random/setTimeout（用 ctx.random、ctx.anim）。
   完整欄位說明見 docs/cart-api.md。 */
/* 染色掃過：字由左到右依序從文字色變成強調色並停住（整句樣式，需要逐字時用 splitChars）。 */
Console.cart({
  kind: 'style', id: 'my-style', apiVersion: 1,
  label: { zh: '染色掃過', en: 'Tint Sweep' },
  author: '你的名字', license: 'MIT',
  scope: 'sentence',
  apply(ctx) {
    ctx.splitChars().forEach((c, i) => {
      ctx.anim(c, [{ color: 'var(--c)' }, { color: 'var(--a)' }],
        { duration: 300, delay: ctx.enterMs() * 0.5 + i * 80, easing: 'ease-out' });
    });
  },
});
