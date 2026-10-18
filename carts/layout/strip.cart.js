/* 字條：強調色長條上的反白字，左右交錯滑入 */
Console.cart({
  kind: 'layout', id: 'strip', apiVersion: 1,
  label: { zh: '字條：強調色長條上的反白字，左右交錯滑入' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration, list = ctx.charEls;
    const SWd = ctx.sw;
    const SHd = ctx.sh;
    const txtEl = ctx.text;
    const chars = ctx.splitChars;
    const A = ctx.anim;
    const D = ctx.enterMs;
    const CONFIG = ctx.config;
       /* 字條：強調色長條上的反白字，左右交錯滑入 */
    const t=[...sb.plain],n=Math.min(3,Math.max(1,Math.ceil(t.length/6))),k=Math.ceil(t.length/n),vw=SWd(),vh=SHd(),z=Math.min(big*.42,vw*.8/Math.max(k,2)/1.1,vh*.8/n/1.7);
    const col=document.createElement("div");col.style.cssText=`position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;gap:${z*.25}px;rotate:-3deg`;c.appendChild(col);
    for(let i=0;i<n;i++){const e=txtEl(`position:relative;align-self:${i%2?"flex-end":"flex-start"};margin:0 8cqw;padding:.08em .35em;background:var(--a);color:color-mix(in srgb,var(--a) 10%,#000);font-size:${z}px;line-height:1.15;letter-spacing:.1em;white-space:pre`);
     list.push(...chars(t.slice(i*k,i*k+k).join(""),e));col.appendChild(e);A(e,[{opacity:0,translate:`${i%2?60:-60}cqw 0`},{opacity:1,translate:"0 0"}],{duration:D(),delay:i*150/CONFIG.speed})}
  },
});
