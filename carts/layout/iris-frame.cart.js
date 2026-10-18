/* 光圈框（偶數句圓、奇數句矩形） */
Console.cart({
  kind: 'layout', id: 'iris-frame', apiVersion: 1,
  label: { zh: '光圈框（偶數句圓、奇數句矩形）' },
  author: 'kinetic-lyric-console', license: 'MIT',
  flags: { full: true },
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration, list = ctx.charEls;
    const subs = ctx.sentences;
    const SWd = ctx.sw;
    const SHd = ctx.sh;
    const CONFIG = ctx.config;
    const D = ctx.enterMs;
    const A = ctx.anim;
    const CE = ctx.centerIn;
    const chars = ctx.splitChars;
    const enter = ctx.enter;
    const i=subs.indexOf(sb),rect=i%2===1,vw=SWd(),vh=SHd(),T=Math.max(800,dur*1000),X=CONFIG.exit*1000,n=Math.max(sb.plain.length,2);
    const d=Math.min(vh*.8,vw*.62),W0=rect?Math.min(vw*.78,d*1.7):d,H0=rect?d*.55:d,fs=Math.min(big*.42,W0*.82/n),a=Math.min(.35,D()*1.2/T),b=Math.max(a+.05,1-X/T);
    const ap=document.createElement("div");ap.style.cssText=`position:absolute;left:50%;top:50%;translate:-50% -50%;border:2px solid var(--a);border-radius:${rect?"1.2cqh":"50%"};box-shadow:0 0 0 120vmax rgba(0,0,0,.86),0 0 3cqh var(--a),inset 0 0 3cqh rgba(122,168,255,.25);pointer-events:none`;c.appendChild(ap);
    A(ap,[{width:"0px",height:"0px",easing:"cubic-bezier(.3,.7,.3,1)"},{width:W0+"px",height:H0+"px",offset:a},{width:W0+"px",height:H0+"px",offset:b,easing:"cubic-bezier(.7,0,.7,.3)"},{width:"0px",height:"0px"}],{duration:T,easing:"linear"});
    const e=CE(c,`font-size:${fs}px;letter-spacing:.12em`);list.push(...chars(sb.plain,e));
    A(e,[{opacity:0},{opacity:0,offset:a*.6},{opacity:1,offset:a},{opacity:1,offset:b},{opacity:0}],{duration:T,easing:"linear"});if(sb.en)enter(e,sb.en,list)
  },
});
