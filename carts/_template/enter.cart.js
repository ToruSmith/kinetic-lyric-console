/* 範本：複製此檔到 carts/enter/你的-id.cart.js，把 id 改成檔名（小寫、連字號），再改 label 與內容。
   規則：只能用 Console 與傳進來的 ctx；不連網、不用 Date/Math.random/setTimeout（用 ctx.random、ctx.anim）。
   完整欄位說明見 docs/cart-api.md。 */
/* 逐字上浮：每個字依序從下方升起並淡入；沒有逐字元素時退回整句淡入。 */
Console.cart({
  kind: 'enter', id: 'my-enter', apiVersion: 1,
  label: { zh: '逐字上浮', en: 'Rise Stagger' },
  author: '你的名字', license: 'MIT',
  perChar: {
    gap: 55, // 每字延遲（毫秒）
    keyframes: () => [
      { opacity: 0, transform: 'translateY(3cqh)' },
      { opacity: 1, transform: 'translateY(-.5cqh)', offset: 0.7 },
      { opacity: 1, transform: 'none' },
    ],
    fallback: [{ opacity: 0, transform: 'translateY(3cqh)' }, { opacity: 1, transform: 'none' }],
  },
});
