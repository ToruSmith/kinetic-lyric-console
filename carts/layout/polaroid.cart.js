/* 相紙卡依序滑入疊放 */
Console.cart({
  kind: 'layout', id: 'polaroid', apiVersion: 1,
  label: { zh: '相紙卡依序滑入疊放' },
  author: 'kinetic-lyric-console', license: 'MIT',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration, list = ctx.charEls;
    const sr = ctx.random;
    const SWd = ctx.sw;
    const txtEl = ctx.text;
    const chars = ctx.splitChars;
    const A = ctx.anim;
    const D = ctx.enterMs;
    const CONFIG = ctx.config;
    const enter = ctx.enter;
    const PAPER = "#f3eee2";
    const r=sr(sb.s),vw=SWd(),ch=[...sb.plain],n=ch.length<=3?1:ch.length<=6?2:3,k=Math.ceil(ch.length/n);
    const parts=Array.from({length:n},(_,i)=>ch.slice(i*k,(i+1)*k).join("")).filter(Boolean),m=Math.max(...parts.map(p=>[...p].length),2),fs=Math.min(big*.38,vw*.6/parts.length/m*.9);
    const row=txtEl("inset:0;display:flex;align-items:center;justify-content:center");c.appendChild(row);
    parts.forEach((p,i)=>{const card=document.createElement("div");
     card.style.cssText=`position:relative;top:${(r()-.5)*5}cqh;margin:0 -1.2cqw;padding:${fs*.28}px ${fs*.28}px ${fs*.9}px;background:${PAPER};rotate:${(r()-.5)*12+(i-(parts.length-1)/2)*3}deg;box-shadow:0 1.2cqh 3cqh rgba(0,0,0,.55);z-index:${i}`;
     const ph=txtEl(`position:relative;padding:${fs*.35}px ${fs*.4}px;background:linear-gradient(135deg,color-mix(in srgb,var(--a) 55%,#101826),#0b1020);font-size:${fs}px;letter-spacing:.1em;line-height:1.1;white-space:pre`);
     list.push(...chars(p,ph));card.appendChild(ph);
     if(i===0){const t=document.createElement("div");t.style.cssText=`position:absolute;left:50%;top:-${fs*.3}px;width:${fs*1.6}px;height:${fs*.55}px;translate:-50% 0;rotate:-4deg;background:rgba(255,235,160,.6)`;card.appendChild(t)}
     row.appendChild(card);A(card,[{translate:`${(i%2?1:-1)*(90+r()*20)}cqw ${(r()-.5)*30}cqh`,scale:1.4,opacity:0},{translate:"0 0",scale:1,opacity:1}],{duration:D()*1.1,delay:i*320/CONFIG.speed,easing:"cubic-bezier(.2,.8,.2,1)"})});
    if(sb.en)enter(row,sb.en,list)
  },
});
