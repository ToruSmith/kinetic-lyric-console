/* 範本：複製此檔到 carts/scene/你的-id.cart.js，把 id 改成檔名（小寫、連字號），再改 label 與內容。
   規則：只能用 Console 與傳進來的 ctx；不連網、不用 Date/Math.random/setTimeout（用 ctx.random、ctx.anim）。
   完整欄位說明見 docs/cart-api.md。 */
/* 飄移細線：文字之下，幾條極細的強調色斜線緩慢飄過畫面。輕量、不遮字。 */
Console.cart({
  kind: 'scene', id: 'my-scene', apiVersion: 1,
  label: { zh: '飄移細線', en: 'Drift Lines' },
  author: '你的名字', license: 'MIT',
  layer: 'under', group: 'lines', amount: 50, cost: '輕',
  rand: { theme: 'neutral' },
  draw(g, f, u) {
    // f：{ t 本句已播秒數, W, H, a 強度 0–1, lite 輕量模式, R 強調色, C 文字色, bp 節拍脈衝, env 淡入淡出 }
    const n = f.lite ? 5 : 9;
    g.strokeStyle = f.R;
    g.lineWidth = 1;
    u.fade(g, f, 0.18 + 0.3 * f.a);
    g.beginPath();
    for (let i = 0; i < n; i++) {
      const phase = ((f.t * 0.04 + i / n) % 1);          // 0–1 循環，純函數
      const x = phase * (f.W + f.H) - f.H;               // 斜線的底端 x
      g.moveTo(x, f.H);
      g.lineTo(x + f.H * 0.6, 0);
    }
    g.stroke();
  },
});
