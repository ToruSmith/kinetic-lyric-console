/* **吃 `{}`**：斜 8 度，上方大字（第一個 `{}`，沒有取前 2 字）加下方整句 */
Console.cart({
  kind: 'layout', id: 'diagonal', apiVersion: 1,
  label: { zh: '**吃 `{}`**：斜 8 度，上方大字（第一個 `{}`，沒有取前 2 字）加下方整句' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  flags: { brace: true },
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize;
    const txtEl = ctx.text;
    const SWd = ctx.sw;
    const enter = ctx.enter;
    const r=document.createElement("div");r.className="w";r.style.transform="rotate(-8deg)";c.appendChild(r);
    const a=txtEl(`left:9cqw;top:12cqh;font-size:${Math.min(big*1.8,SWd()*.4)}px;letter-spacing:0;line-height:1`);a.textContent=sb.br[0]||sb.plain.slice(0,2);r.appendChild(a);enter(a,sb.en||"rise");
    const b=txtEl(`left:6cqw;right:6cqw;top:62cqh;font-size:${sm*1.5}px`);b.textContent=sb.plain;r.appendChild(b);enter(b,"fade")
  },
});
