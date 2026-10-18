/* 字卡：每字（>8 字時每 2 字）一張白卡，落下排成列 */
Console.cart({
  kind: 'layout', id: 'cards', apiVersion: 1,
  label: { zh: '字卡：每字（>8 字時每 2 字）一張白卡，落下排成列' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration, list = ctx.charEls;
    const { _chs } = ctx.lib;
    const sr = ctx.random;
    const SWd = ctx.sw;
    const SHd = ctx.sh;
    const txtEl = ctx.text;
    const A = ctx.anim;
    const D = ctx.enterMs;
    const CONFIG = ctx.config;
    function cardsBuild(sb,c,big,list,glow){
     const r=sr(sb.s),vw=SWd(),vh=SHd(),T=_chs(sb),g=T.length>8?2:1,parts=[];for(let i=0;i<T.length;i+=g)parts.push(T.slice(i,i+g).join(""));
     const m=Math.max(1,parts.length),rows=Math.ceil(m/7),per=Math.ceil(m/rows),z=Math.min(big*.5,vw*.9/(per*(g+.75)),vh*.7/rows/1.5);
     const row=document.createElement("div");row.style.cssText=`position:absolute;inset:0;display:flex;flex-wrap:wrap;align-content:center;justify-content:center;gap:${z*.3}px ${z*.2}px`;c.appendChild(row);
     parts.forEach((p,i)=>{const e=txtEl(`position:relative;top:${((r()-.5)*.15).toFixed(3)}em;padding:.18em .25em;font-size:${z}px;line-height:1.1;letter-spacing:0;rotate:${(r()-.5)*10}deg;`+(glow?"background:rgba(8,12,24,.55);color:var(--c);border:.04em solid var(--a);border-radius:.12em;box-shadow:0 0 .4em var(--a),inset 0 0 .3em color-mix(in srgb,var(--a) 40%,transparent);text-shadow:0 0 .3em var(--a)":"background:var(--c);color:#0b0d14;border-radius:.08em;box-shadow:.05em .08em 0 var(--a)"));
      e.textContent=p;row.appendChild(e);list.push(e);A(e,[{opacity:0,transform:"translateY(-30cqh) scale(.7)"},{opacity:1,transform:"none"}],{duration:D(),delay:i*90/CONFIG.speed})})}
    return (cardsBuild(sb,c,big,list,false));
  },
});
