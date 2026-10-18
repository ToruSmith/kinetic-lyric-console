/* **吃 `{}`**：海報式大字（取第一個 `{}`，沒有就用整句）＋細線＋小字 */
Console.cart({
  kind: 'layout', id: 'poster', apiVersion: 1,
  label: { zh: '**吃 `{}`**：海報式大字（取第一個 `{}`，沒有就用整句）＋細線＋小字' },
  author: 'kinetic-lyric-console', license: 'MIT',
  flags: { brace: true },
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize;
    const CE = ctx.centerIn;
    const fit = ctx.fit;
    const SWd = ctx.sw;
    const enter = ctx.enter;
    const A = ctx.anim;
    const D = ctx.enterMs;
    const t=sb.br[0]||sb.plain;const e=CE(c,`font-size:${Math.min(fit({plain:t},big)*1.2,SWd()/Math.max(t.length,3)*.9)}px;margin-top:-8cqh`);e.textContent=t;enter(e,sb.en||"rise");
    const ln=document.createElement("div");ln.className="ln";ln.style.cssText="position:absolute;left:30cqw;right:30cqw;top:62cqh;transform-origin:center";c.appendChild(ln);A(ln,[{transform:"scaleX(0)"},{transform:"scaleX(1)"}],{duration:D()*1.5});
    const s2=CE(c,`font-size:${sm}px;margin-top:20cqh;letter-spacing:.8em`);s2.textContent=sb.plain;enter(s2,"fade")
  },
});
