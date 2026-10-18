/* **吃 `{}`**：手繪圈選、底線、星號標記 `{關鍵字}`（三種標記輪流） */
Console.cart({
  kind: 'layout', id: 'annotate', apiVersion: 1,
  label: { zh: '**吃 `{}`**：手繪圈選、底線、星號標記 `{關鍵字}`（三種標記輪流）' },
  author: 'kinetic-lyric-console', license: 'MIT',
  flags: { brace: true },
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize;
    const txtEl = ctx.text;
    const SWd = ctx.sw;
    const A = ctx.anim;
    const D = ctx.enterMs;
    const NS = "http://www.w3.org/2000/svg";
    const e=txtEl(`inset:0;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;padding:0 8cqw;font-size:${Math.min(big*.5,SWd()/Math.max(sb.plain.length,4)*.9)}px;letter-spacing:.12em;white-space:pre-wrap`);c.appendChild(e);
    const SHP=["M6 22 C2 8,38 1,78 4 C104 7,102 36,60 38 C20 40,-2 30,10 12","M2 34 C28 30,58 38,98 31","M50 3 L56 18 L72 18 L59 27 L64 42 L50 33 L36 42 L41 27 L28 18 L44 18 Z"];
    let parts=sb.raw.split(/(\{[^}]*\})/).filter(Boolean),k=0;if(!sb.br.length)parts=["{"+sb.raw+"}"];
    parts.forEach(p=>{const kw=/^\{/.test(p),sp=document.createElement("span");sp.style.cssText="position:relative;display:inline-block";const tx=document.createElement("span");tx.textContent=kw?p.slice(1,-1):p;sp.appendChild(tx);e.appendChild(sp);A(sp,[{opacity:0},{opacity:1}],{duration:D()});
     if(kw){const m=k%3,sv=document.createElementNS(NS,"svg");sv.setAttribute("viewBox",m===2?"0 0 100 45":"0 0 100 40");sv.setAttribute("preserveAspectRatio","none");
      sv.style.cssText=m===2?"position:absolute;right:-.55em;top:-.75em;width:.8em;height:.8em;overflow:visible":"position:absolute;left:-.3em;top:-.2em;width:calc(100% + .6em);height:calc(100% + .4em);overflow:visible";
      const pa=document.createElementNS(NS,"path");pa.setAttribute("d",SHP[m]);pa.setAttribute("pathLength","1");Object.assign(pa.style,{fill:"none",stroke:"var(--a)",strokeWidth:m===2?"2.5px":"4px",strokeLinecap:"round",strokeLinejoin:"round",strokeDasharray:"1",vectorEffect:"non-scaling-stroke",filter:"drop-shadow(0 0 .12em var(--a))"});
      sv.appendChild(pa);sp.appendChild(sv);A(pa,[{strokeDashoffset:1},{strokeDashoffset:0}],{duration:D()*.9,delay:D()+(k++)*350,easing:"cubic-bezier(.6,0,.3,1)"})}})
  },
});
