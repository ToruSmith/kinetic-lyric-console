/* 範本：複製此檔到 carts/pack/你的-id.cart.js，把 id 改成檔名（小寫、連字號），再改 label 與內容。
   規則：只能用 Console 與傳進來的 ctx；不連網、不用 Date/Math.random/setTimeout（用 ctx.random、ctx.anim）。
   完整欄位說明見 docs/cart-api.md。 */
/* 暮光：暖色、細明體、緩慢柔和的風格包（只是一包設定，沒有程式）。 */
Console.cart({
  kind: 'pack', id: 'my-pack', apiVersion: 1,
  label: { zh: '我的風格包', en: 'My Pack' },
  author: '你的名字', license: 'MIT',
  config: {
    font: '明體', weight: 300, spacing: 0.08,
    color: '#f4efe6', accent: '#e8a87c',
    dim: 35, pulse: 0.03, particles: 14, grain: 0.04, trans: 'crossfade',
    sceneAll: 'gradient-fade:40,light-spot:30',
    layoutPool: 'center,lowerleft,quote',
  },
});
