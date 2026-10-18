/* 每個字上方一行小注音。注音取自副文（ */
Console.cart({
  kind: 'layout', id: 'ruby', apiVersion: 1,
  label: { zh: '每個字上方一行小注音。注音取自副文（' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  flags: { lab: true, ownSub: true },
  rand: { needSub: true },
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration, list = ctx.charEls;
    const { _jN, _jFit, capSize, _jBrk, _jpx, _jT, _kIn } = ctx.lib;
    const SWd = ctx.sw;
    const SHd = ctx.sh;
    const txtEl = ctx.text;
    const chars = ctx.splitChars;
    const A = ctx.anim;
    const D = ctx.enterMs;
       /* ルビ振り：每個字上方一行小注音。注音取自副文（||），平均分給每個字；沒有副文就在每個字上方放一個強調色小圓點（傍点） */
    const vw=SWd(),vh=SHd(),port=vw<vh,arr=[...sb.plain],n=Math.max(1,_jN(sb.plain)),f=_jFit(n,vw*.8,Math.min(vh*.085,big*.6),port?4:2,1.2),z=capSize(f.z),lines=_jBrk(arr,f.per);if(!lines.length)return;
    const rb=[...(sb.sub||"").replace(/\s+/g,"")],m=rb.length,vis=arr.map((ch,i)=>!/\s/.test(ch)),idx=[];vis.forEach((v,i)=>{if(v)idx.push(i)});
    const rt=i=>{const k=idx.indexOf(i);if(k<0)return"";if(!m)return"●";const a=Math.floor(k*m/idx.length),b=Math.floor((k+1)*m/idx.length);return rb.slice(a,Math.max(b,a)).join("")};
    const e=txtEl(`left:8cqw;right:8cqw;bottom:14cqh;text-align:center;font-size:${_jpx(z)};line-height:1.9;letter-spacing:.06em;white-space:pre`);c.appendChild(e);
    lines.forEach(([a,b])=>{const d=document.createElement("div");e.appendChild(d);
     for(let i=a;i<b;i++){if(!vis[i]){chars(arr[i],d);continue}const r=document.createElement("ruby");d.appendChild(r);list.push(chars(arr[i],r)[0]);
      const t=document.createElement("rt");t.dataset.nm=1;t.textContent=rt(i);t.style.cssText=`font-size:.38em;color:var(--a);-webkit-text-fill-color:var(--a);letter-spacing:.02em;font-weight:400;opacity:.9${m?"":";font-size:.22em;line-height:1"}`;r.appendChild(t);A(t,[{opacity:0},{opacity:.9}],{duration:D()*.8,delay:_jT(300)})}});
    _kIn(e,list,sb,0)
  },
});
