/* **吃 `{}`**：同上，但直排、靠右，由上往下展開。 */
Console.cart({
  kind: 'layout', id: 'pv-vertical', apiVersion: 1,
  label: { zh: '**吃 `{}`**：同上，但直排、靠右，由上往下展開。' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  flags: { brace: true },
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize;
    const SHd = ctx.sh;
    const SWd = ctx.sw;
    const CONFIG = ctx.config;
    const txtEl = ctx.text;
    const tK = ctx.shortK;
    const A = ctx.anim;
    const D = ctx.enterMs;
    const FONTS = ctx.fonts;
    const emFontCss = ctx.fontCss;
    const pvKwFont = sb=>sb.font?(FONTS[sb.font]||sb.font):(emFontCss(sb)||FONTS.毛筆);
    function pvBuild(sb,c,big,vert){
     let note="",raw=sb.raw.replace(/[（(]([^）)]*)[）)]/,(_,t)=>(note=t.trim(),"")).trim();
     let items=raw.split(/(\{[^}]*\})/).filter(Boolean).map(p=>/^\{/.test(p)?{t:p.slice(1,-1),k:1}:{t:p.trim(),k:0}).filter(x=>x.t);
     if(!items.some(x=>x.k)){const a=[...raw],cut=Math.max(0,a.length-2);items=[{t:a.slice(0,cut).join("").trim(),k:0},{t:a.slice(cut).join(""),k:1}].filter(x=>x.t)}
     const n=items.reduce((s,x)=>s+[...x.t].length*(x.k?1.9:1),0)||1,
      base=Math.min(big*.2,vert?SHd()*.74/(n*1.25):SWd()*.62/(n*1.15)),acc=CONFIG.accent;
     const GLOW=`0 0 .12em #fff,0 0 .5em ${acc},0 0 1.1em ${acc}`,SPLIT=`-.08em 0 rgba(255,60,110,.85),.08em 0 rgba(60,220,255,.85),0 0 .5em ${acc}`;
     /* 直排（vert）：容器 e 本身就是 vertical-rl（class pvv，見 style.css），每一欄（item）是它的 block 子元素，依 vertical-rl 的 block 流向由右往左排。
        不用「橫排 flex 容器＋直排子項」：Firefox 對這種正交書寫模式的 flex 子項量不出寬度，容器寬度縮成只剩間距，
        再被下面的 clip-path 裁掉＝大字欄整個不見、小字欄左半被切。writing-mode 不寫在 inline style，是因為 18-style.js 的 isV() 會讀 inline writingMode，寫了會讓 @gradient 等樣式誤判。 */
     const e=txtEl(vert?`right:7cqw;top:12cqh;font-size:${base}px;letter-spacing:.35em`
      :`left:5cqw;top:54cqh;display:flex;align-items:baseline;gap:.4em;white-space:nowrap;font-size:${base}px;letter-spacing:.12em`);
     if(vert)e.classList.add("pvv");
     c.appendChild(e);
     const lastK=items.map(x=>x.k).lastIndexOf(1);
     items.forEach((x,i)=>{
      const sp=document.createElement(vert?"div":"span"),dl=i*150/CONFIG.speed*tK;
      /* 直排：欄距 .6×base 用「第 2 欄起的右側 margin」表示（取代 flex gap）；margin 的 em 以該欄自己的字級算，關鍵字欄字級是 1.9em，所以除以 1.9 */
      sp.style.cssText=vert?`position:relative;display:block;writing-mode:vertical-rl;height:max-content${i?`;margin-right:${(.6/(x.k?1.9:1)).toFixed(4)}em`:""}`:"position:relative;display:inline-block";
      if(!x.k){sp.textContent=x.t;sp.style.opacity=".92";e.appendChild(sp);
       A(sp,[{opacity:0,filter:"blur(8px)",transform:vert?"translateY(-.8em)":"translateX(-.8em)"},{opacity:.92,filter:"blur(0)",transform:"none"}],{duration:D()*1.3,delay:dl});return}
      sp.style.cssText+=`;font-family:${pvKwFont(sb)};font-size:1.9em;font-weight:700;letter-spacing:.02em;line-height:1.1;transform-origin:20% 70%;text-shadow:${GLOW}`;
      sp.textContent=x.t;
      const gh=document.createElement("span");gh.textContent=x.t;   /* 淡墨暈影：模糊、偏色、略偏移的同字複本 */
      gh.style.cssText=`position:absolute;left:0;top:0;right:0;bottom:0;color:${acc};filter:blur(.1em);opacity:.5;transform:translate(.04em,.05em);pointer-events:none;letter-spacing:inherit`;sp.appendChild(gh);
      e.appendChild(sp);
      A(sp,[{opacity:0,filter:"blur(14px)",transform:"scale(1.35)",textShadow:SPLIT},{opacity:1,filter:"blur(0)",transform:"scale(1)",textShadow:GLOW}],{duration:D()*1.7,delay:dl+120/CONFIG.speed*tK});
      A(gh,[{opacity:0},{opacity:.5}],{duration:D()*2.2,delay:dl+300/CONFIG.speed*tK});
      if(note&&i===lastK){const nt=document.createElement("div");
       nt.style.cssText=`position:absolute;${vert?"top:calc(100% + .2em);left:0":"left:calc(100% + .2em);bottom:-.15em"};writing-mode:horizontal-tb;font-family:${FONTS.黑體};font-size:.3em;font-weight:400;letter-spacing:.05em;line-height:1.3;white-space:nowrap;text-shadow:none;opacity:.8`;
       const ar=document.createElement("div");ar.style.letterSpacing=".2em";ar.textContent="‹‹‹";nt.appendChild(ar);const t2=document.createElement("div");t2.textContent="（"+note+"）";nt.appendChild(t2);sp.appendChild(nt);
       A(nt,[{opacity:0,transform:"translateY(.4em)"},{opacity:.8,transform:"none"}],{duration:D(),delay:dl+D()*.9})}
     });
     if(vert)A(e,[{clipPath:"inset(0 0 100% 0)"},{clipPath:"inset(-40% -40% -40% -40%)"}],{duration:D()*1.6,easing:"linear"});   /* 由上往下揭開；刻意維持原樣：clip 是相對 e 的框，e 的寬度正確時不會裁到字（見上方 Firefox 說明） */
    }
    return (pvBuild(sb,c,big,true));
  },
});
