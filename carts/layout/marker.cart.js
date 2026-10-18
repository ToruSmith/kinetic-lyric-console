/* 螢光筆：字下半加半透明色帶，不蓋字 */
Console.cart({
  kind: 'layout', id: 'marker', apiVersion: 1,
  label: { zh: '螢光筆：字下半加半透明色帶，不蓋字' },
  author: 'kinetic-lyric-console', license: 'MIT',
  flags: { brace: true },
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize;
    const txtEl = ctx.text;
    const SWd = ctx.sw;
    const A = ctx.anim;
    const D = ctx.enterMs;
    const e=txtEl(`inset:0;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;padding:0 8cqw;font-size:${Math.min(big*.5,SWd()/Math.max(sb.plain.length,4)*.9)}px;letter-spacing:.12em;white-space:pre-wrap`);c.appendChild(e);
    let parts=sb.raw.split(/(\{[^}]*\})/).filter(Boolean),k=0;if(!sb.br.length)parts=["{"+sb.raw+"}"];
    parts.forEach(p=>{const kw=/^\{/.test(p),sp=document.createElement("span");sp.style.cssText="position:relative;display:inline-block";
     if(kw){const hl=document.createElement("span");hl.style.cssText="position:absolute;left:-.1em;right:-.1em;top:48%;bottom:2%;background:var(--a);opacity:.55;transform-origin:left";sp.appendChild(hl);
      A(hl,[{transform:"skewX(-8deg) scaleX(0)"},{transform:"skewX(-8deg) scaleX(1)"}],{duration:D()*.8,delay:D()+(k++)*250,easing:"cubic-bezier(.7,0,.3,1)"})}
     const tx=document.createElement("span");tx.style.position="relative";tx.textContent=kw?p.slice(1,-1):p;sp.appendChild(tx);e.appendChild(sp);A(sp,[{opacity:0},{opacity:1}],{duration:D()})})
  },
});
