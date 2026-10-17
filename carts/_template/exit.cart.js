/* 範本：複製此檔到 carts/exit/你的-id.cart.js，把 id 改成檔名（小寫、連字號），再改 label 與內容。
   規則：只能用 Console 與傳進來的 ctx；不連網、不用 Date/Math.random/setTimeout（用 ctx.random、ctx.anim）。
   完整欄位說明見 docs/cart-api.md。 */
/* 逐字下落：每個字依序淡出並下沉（逐字版退場）。有 .ch 元素才逐字，否則用預設淡出。 */
Console.cart({
  kind: 'exit', id: 'my-exit', apiVersion: 1,
  label: { zh: '逐字下落', en: 'Cascade Out' },
  author: '你的名字', license: 'MIT',
  perChar({ index, count, random }) {
    const jitter = (random() - 0.5) * 1.2; // 種子亂數：同一句每次渲染結果相同
    return {
      kf: [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: `translate(${jitter}cqw,6cqh)` }],
      dur: 0.5,                              // 佔退場長度的比例
      at: (index / Math.max(1, count - 1)) * 0.5, // 延遲佔退場長度的比例
    };
  },
});
