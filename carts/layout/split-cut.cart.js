/* 断ち割り：每行字從中線切成上下兩半左右錯開，中間一條強調色細線 */
Console.cart({
  kind: 'layout', id: 'split-cut', apiVersion: 1,
  label: { zh: '断ち割り：每行字從中線切成上下兩半左右錯開，中間一條強調色細線' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  flags: { lab: true },
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration, list = ctx.charEls;
    const { _jN, _jFit, capSize, _jBrk, _jIdx, _jpx, _jT, hair, _jLate } = ctx.lib;
    const SWd = ctx.sw;
    const SHd = ctx.sh;
    const txtEl = ctx.text;
    const A = ctx.anim;
    const D = ctx.enterMs;
    const enter = ctx.enter;
     const vw=SWd(),vh=SHd(),port=vw<vh,arr=[...sb.plain.trim()],n=Math.max(1,_jN(sb.plain));
    const f=_jFit(n,vw*(port?.8:.76),Math.min(vh*.3,big*.9),port?4:3,1.06),z=capSize(f.z,.3),lines=_jBrk(arr,f.per);if(!lines.length)return;
    const L=lines.length,lead=1.16,idx=_jIdx(sb),off=(.08+.07*((idx*7)%3)/2)*(idx%2?-1:1),cutY=[.02,-.06,.08][idx%3];
    const wrap=document.createElement("div");wrap.style.cssText=`position:absolute;left:0;right:0;top:50%;translate:0 -50%;font-size:${_jpx(z)}`;c.appendChild(wrap);
    const cutPct=(50+cutY/lead*100).toFixed(2);
    lines.forEach(([a,b],li)=>{
     const t=arr.slice(a,b).join(""),row=document.createElement("div");row.style.cssText=`position:relative;height:${lead}em;line-height:${lead}em;text-align:center;white-space:pre`;wrap.appendChild(row);
     const mkh=(top)=>{const h=txtEl(`inset:0;text-align:center;line-height:${lead}em;letter-spacing:.03em;white-space:pre;clip-path:inset(${top?`0 0 ${(100-cutPct).toFixed(2)}% 0`:`${cutPct}% 0 0 0`})`);h.textContent=t;row.appendChild(h);return h};
     const top=mkh(true),bot=mkh(false),X=off.toFixed(3),d0=_jT(li*90);
     A(top,[{opacity:0,transform:"translateX(0)"},{opacity:1,transform:`translateX(${X}em)`}],{duration:D(),delay:d0,easing:"cubic-bezier(.16,1,.3,1)"});
     A(bot,[{opacity:0,transform:"translateX(0)"},{opacity:1,transform:`translateX(${-X}em)`}],{duration:D(),delay:d0,easing:"cubic-bezier(.16,1,.3,1)"});
     const ln=hair(row,`left:4cqw;right:4cqw;top:${cutPct}%;background:var(--a);opacity:.9;transform-origin:left`,_jT(160+li*80),"X",D()*.7);ln.style.height="max(1.5px,.02em)"});
    if(sb.en){/* 兩半各自演進場太雜：有指定進場時只套在整塊上 */const n0=ctx.animCount();enter(wrap,sb.en,[]);_jLate(n0,0)}
  },
});
