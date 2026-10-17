/* 範本：複製此檔到 carts/layout/你的-id.cart.js，把 id 改成檔名（小寫、連字號），再改 label 與內容。
   規則：只能用 Console 與傳進來的 ctx；不連網、不用 Date/Math.random/setTimeout（用 ctx.random、ctx.anim）。
   完整欄位說明見 docs/cart-api.md。 */
/* 底線畫出：文字置中，逐字淡入上浮，強調色底線從左畫到右。只佔文字周圍，不遮影片。 */
Console.cart({
  kind: 'layout', id: 'my-layout', apiVersion: 1,
  label: { zh: '底線畫出', en: 'Underline Draw' },
  author: '你的名字', license: 'MIT',
  demo: '#my-layout 墨水在紙上畫出底線',
  render(ctx) {
    const { host, sentence, width, bigSize } = ctx;
    const n = Math.max(sentence.plain.length, 4);
    const size = Math.min(bigSize * 0.5, (width / n) * 0.9);

    // 置中的外框：文字與底線一起算進位置（九宮格對齊用 .ln 與 data-t 自動辨識）
    const box = document.createElement('div');
    box.style.cssText = 'position:absolute;left:50%;top:50%;translate:-50% -50%;width:max-content;max-width:80cqw';
    host.appendChild(box);

    const text = ctx.text(`position:relative;text-align:center;font-size:${size}px;line-height:1.4;letter-spacing:.08em;white-space:pre-wrap`);
    box.appendChild(text);
    const chars = ctx.splitChars(sentence.plain, text);
    chars.forEach((c, i) => {
      ctx.charEls.push(c);
      ctx.anim(c, [{ opacity: 0, transform: 'translateY(1.2cqh)' }, { opacity: 1, transform: 'none' }],
        { duration: ctx.enterMs() * 0.6, delay: (i * 45) / ctx.speed });
    });

    const line = document.createElement('div');
    line.className = 'ln';
    line.style.cssText = 'position:absolute;left:0;right:0;bottom:-.12em;height:3px;background:var(--a);transform-origin:left';
    box.appendChild(line);
    ctx.anim(line, [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }],
      { duration: ctx.enterMs() * 1.2, delay: (chars.length * 45) / ctx.speed * 0.5 });
  },
});
