/* 一句拆成 2～7 段（依逗號／空白切，切不出來就平均切），字級依比例逐段放大（或縮小），基線對齊；由小到大依序淡入，底下一條髮絲線 */
Console.cart({
  kind: 'layout', id: 'scale-steps', apiVersion: 1,
  label: { zh: '一句拆成 2～7 段（依逗號／空白切，切不出來就平均切），字級依比例逐段放大（或縮小），基線對齊；由小到大依序淡入，底下一條髮絲線' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  flags: { lab: true },
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration, list = ctx.charEls;
    const { _jIdx, _jCw, capSize, _jpx, hair, _jT, _jLate } = ctx.lib;
    const SWd = ctx.sw;
    const SHd = ctx.sh;
    const sr = ctx.random;
    const txtEl = ctx.text;
    const D = ctx.enterMs;
    const chars = ctx.splitChars;
    const enter = ctx.enter;
    const A = ctx.anim;
       /* 級数上げ（JIZURA tyScaleSteps）：一句拆成 2～7 段（依逗號／空白切，切不出來就平均切），字級依比例逐段放大（或縮小），基線對齊；由小到大依序淡入，底下一條髮絲線 */
    const vw=SWd(),vh=SHd(),port=vw<vh,txt=sb.plain,r=sr(sb.s),dir=["up","up","down"][_jIdx(sb)%3],ratio=2+r()*.8;
    const G=[...txt].filter(x=>!/\s/.test(x)),lat=G.filter(ch=>/[\x21-\x7e]/.test(ch)).length>G.length*.6;
    let U=txt.split(/[,，、;；\s]+/).filter(Boolean);
    const chunk=(a,k,j)=>{const m=Math.ceil(a.length/k),o=[];for(let i=0;i<a.length;i+=m)o.push(a.slice(i,i+m).join(j));return o};
    if(U.length>7)U=chunk(U,Math.min(5,Math.ceil(U.length/3)),lat?" ":"");
    else if(U.length<2){if(G.length>=2)U=G.length<=7?G.slice():chunk(G,Math.min(5,Math.ceil(G.length/3)),"");else U=[txt.trim()||txt]}
    const k=U.length;if(!k||!U[0])return;
    const f=U.map((u,i)=>{const t=k>1?i/(k-1):1;return Math.pow(ratio,dir==="up"?t:1-t)}),fmax=Math.max(...f),cw=U.map(_jCw),gm=lat?.22:.14;
    let base;
    if(!port){let tot=0;U.forEach((u,i)=>{tot+=cw[i]*f[i]+(i?gm*f[i]:0)});base=Math.min(vw*.86/tot,vh*.52/fmax,big*1.2/fmax)}
    else{let tot=0;f.forEach(x=>{tot+=x*1.12});base=Math.min(vh*.78/tot,vw*.5/fmax,big*1.2/fmax);U.forEach((u,i)=>{base=Math.min(base,vw*.8/(cw[i]*f[i]))})}
    const zmax=capSize(base*fmax);base=zmax/fmax;
    const order=[...U.keys()].sort((a,b)=>f[a]-f[b]||a-b),rk=[];order.forEach((j,i)=>rk[j]=i);
    let e;
    if(!port){const wrap=document.createElement("div");wrap.style.cssText="position:absolute;left:0;right:0;top:50%;translate:0 -50%;display:flex;justify-content:center";c.appendChild(wrap);
     const col=document.createElement("div");col.style.cssText="display:flex;flex-direction:column;align-items:stretch";wrap.appendChild(col);
     e=txtEl(`position:relative;display:flex;align-items:baseline;white-space:pre;font-size:${_jpx(base)};line-height:1.05;letter-spacing:.02em`);col.appendChild(e);
     hair(col,`position:relative;margin-top:${_jpx(zmax*.12)};transform-origin:left;opacity:.6`,_jT(k*130)+D()*.4,"X",D()*.9)}
    else{e=txtEl(`left:10cqw;top:50%;translate:0 -50%;display:flex;flex-direction:column;align-items:flex-start;white-space:pre;font-size:${_jpx(base)};line-height:1.12;letter-spacing:.02em`);c.appendChild(e)}
    U.forEach((u,j)=>{
     const s=document.createElement(port?"div":"span");s.style.cssText=`font-size:${f[j].toFixed(4)}em;`+(port?"":`display:inline-block;margin-left:${j?gm:0}em`);e.appendChild(s);
     const ch=chars(u,s),d0=_jT(rk[j]*130);list.push(...ch);
     if(sb.en){const n0=ctx.animCount();enter(s,sb.en,ch);_jLate(n0,d0)}
     else A(s,[{opacity:0,transform:"translateY(1.5cqh)"},{opacity:1,transform:"none"}],{duration:D(),delay:d0})})
  },
});
