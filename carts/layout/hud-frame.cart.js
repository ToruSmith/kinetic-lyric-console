/* 滿版：遊戲介面風 */
Console.cart({
  kind: 'layout', id: 'hud-frame', apiVersion: 1,
  label: { zh: '滿版：遊戲介面風' },
  author: 'kinetic-lyric-console', license: 'MIT',
  flags: { full: true },
  rand: { sceneThemes: ['tech'] },
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration, list = ctx.charEls;
    const sr = ctx.random;
    const SWd = ctx.sw;
    const A = ctx.anim;
    const D = ctx.enterMs;
    const txtEl = ctx.text;
    const SHd = ctx.sh;
    const chars = ctx.splitChars;
    const enter = ctx.enter;
    const reel = (items,css,ms,iter)=>{const h=txtEl(css+";height:1.25em;line-height:1.25em;overflow:hidden;white-space:pre;letter-spacing:.08em;font-family:ui-monospace,Consolas,'Courier New',monospace");delete h.dataset.t;
     const col=document.createElement("div");items.forEach(t=>{const r=document.createElement("div");r.textContent=t;col.appendChild(r)});h.appendChild(col);
     A(col,[{translate:"0 0"},{translate:`0 ${-(items.length-1)*1.25}em`}],{duration:ms,easing:`steps(${Math.max(1,items.length-1)},end)`,iterations:iter||1});return h};
    const r=sr(sb.s),T=Math.max(600,dur*1000),z=Math.min(big*.5,SWd()/Math.max(sb.plain.length,3)*.85),fs=sm*.55;
    [["left:4cqw;top:6cqh;border-top-width:2px;border-left-width:2px"],["right:4cqw;top:6cqh;border-top-width:2px;border-right-width:2px"],["left:4cqw;bottom:6cqh;border-bottom-width:2px;border-left-width:2px"],["right:4cqw;bottom:6cqh;border-bottom-width:2px;border-right-width:2px"]].forEach(([s],i)=>{
     const b=document.createElement("div");b.style.cssText=`position:absolute;width:5cqh;height:5cqh;border:0 solid var(--a);${s}`;c.appendChild(b);A(b,[{opacity:0,scale:1.6},{opacity:.9,scale:1}],{duration:D()*.8,delay:i*70})});
    const sync=Array.from({length:18},(_,i)=>`SYNC ${String(12+Math.round(i*(70+r()*17)/17)).padStart(2," ")}%`);
    c.appendChild(reel(sync,`left:6.5cqw;top:8.5cqh;font-size:${fs}px;color:var(--a)`,Math.min(T*.7,2600)));
    const xy=Array.from({length:24},()=>`X:${String(r()*9999|0).padStart(4,"0")}  Y:${String(r()*9999|0).padStart(4,"0")}`);
    c.appendChild(reel(xy,`right:6.5cqw;top:8.5cqh;font-size:${fs}px;text-align:right;opacity:.75`,3200,Infinity));
    ["UNIT-"+(100+r()*899|0),"LINK ▸ STABLE","RGB ▸ "+[r(),r(),r()].map(v=>(v*255|0).toString(16).padStart(2,"0")).join("").toUpperCase()].forEach((t,i)=>{
     const e=txtEl(`left:6.5cqw;bottom:${8.5+(2-i)*2.6}cqh;font-size:${fs*.85}px;letter-spacing:.12em;opacity:.6;white-space:pre;font-family:ui-monospace,Consolas,'Courier New',monospace`);delete e.dataset.t;e.textContent=t;c.appendChild(e);A(e,[{opacity:0},{opacity:.6}],{duration:D(),delay:300+i*120})});
    const sc=document.createElement("div");sc.style.cssText="position:absolute;left:0;right:0;top:0;height:2px;background:linear-gradient(90deg,transparent,var(--a),transparent);opacity:.5;pointer-events:none";c.appendChild(sc);
    A(sc,[{translate:"0 0"},{translate:`0 ${SHd()}px`}],{duration:3400,iterations:Infinity,easing:"linear"});
    const pb=document.createElement("div");pb.style.cssText="position:absolute;left:4cqw;right:4cqw;bottom:4.5cqh;height:2px;background:rgba(255,255,255,.18)";c.appendChild(pb);
    const pf=document.createElement("div");pf.style.cssText="width:100%;height:100%;background:var(--a);transform-origin:left";pb.appendChild(pf);A(pf,[{scale:"0 1"},{scale:"1 1"}],{duration:T,easing:"linear"});
    const bl=document.createElement("div");bl.style.cssText="position:absolute;right:6.5cqw;top:5.4cqh;width:1.2cqh;height:1.2cqh;background:var(--a)";c.appendChild(bl);A(bl,[{opacity:1},{opacity:0,offset:.5},{opacity:1,offset:.5001}],{duration:900,iterations:Infinity,easing:"steps(1)"});
    const e=txtEl(`left:0;right:0;top:50%;transform:translateY(-50%);text-align:center;font-size:${z}px;letter-spacing:.15em;padding-left:.15em`);c.appendChild(e);
    const ch=chars(sb.plain,e);list.push(...ch);ch.forEach((x,i)=>A(x,[{opacity:0,filter:"blur(8px)"},{opacity:1,filter:"blur(0)"}],{duration:D()*.7,delay:300+i*45}));
    if(sb.en)enter(e,sb.en,list)
  },
});
