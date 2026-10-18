/* 2～3 行字，每行下一條橫跨畫面的髮絲基線；{} 關鍵字下再加一條強調色粗線（沒有 {} 就不畫）。基線依行由左拉出，文字跟著淡入，粗線最後拉出 */
Console.cart({
  kind: 'layout', id: 'baseline', apiVersion: 1,
  label: { zh: '2～3 行字，每行下一條橫跨畫面的髮絲基線；{} 關鍵字下再加一條強調色粗線（沒有 {} 就不畫）。基線依行由左拉出，文字跟著淡入，粗線最後拉出' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  flags: { brace: true, lab: true },
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration, list = ctx.charEls;
    const { _jFull, _jN, _jIdx, _jBrk, capSize, _jT, _jpx, _jRuns, hair, _jLate } = ctx.lib;
    const SWd = ctx.sw;
    const SHd = ctx.sh;
    const emFontCss = ctx.fontCss;
    const D = ctx.enterMs;
    const txtEl = ctx.text;
    const enter = ctx.enter;
    const A = ctx.anim;
       /* 罫線組（JIZURA tyBaseline）：2～3 行字，每行下一條橫跨畫面的髮絲基線；{} 關鍵字下再加一條強調色粗線（沒有 {} 就不畫）。基線依行由左拉出，文字跟著淡入，粗線最後拉出 */
    const vw=SWd(),vh=SHd(),port=vw<vh,full=_jFull(sb),arr=[...full],n=Math.max(1,_jN(full));
    const hl=arr.map((_,j)=>!!(sb.hl&&sb.hl[j])),nl=[2,3,3][_jIdx(sb)%3],ef=emFontCss(sb);
    let p=n<=4?arr.length:Math.max(4,Math.ceil(n/nl)),lines=_jBrk(arr,p);
    for(let g=0;lines.length>6&&g<arr.length;g++)lines=_jBrk(arr,++p);   /* 最多 6 行，但寧可放大每行字數也不丟字 */
    if(!lines.length)return;
    const L=lines.length,lead=1.62,maxLen=Math.max(...lines.map(([a,b])=>b-a));
    const z=capSize(Math.min(vh*.7/(L*lead),port?vw*.17:vh*.16,vw*(port?.72:.7)/(maxLen*1.05),big*.7)),x0=port?16:14;
    const bars=[],nB=_jT(L*100)+D()*.5;
    lines.forEach(([a,b],li)=>{
     const yc=(li-(L-1)/2)*z*lead,row=txtEl(`left:${x0}cqw;top:calc(50% + ${_jpx(yc-z/2)});font-size:${_jpx(z)};line-height:1;letter-spacing:.04em;white-space:pre`);c.appendChild(row);
     const ch=_jRuns(row,arr,a,b,hl,ef,wr=>bars.push(wr));list.push(...ch);
     hair(c,`left:6cqw;right:6cqw;top:calc(50% + ${_jpx(yc+z*.56)});transform-origin:left;opacity:.55`,_jT(li*100),"X",D()*.8);
     const d0=_jT(li*100+150);
     if(sb.en){const n0=ctx.animCount();enter(row,sb.en,ch);_jLate(n0,d0)}
     else A(row,[{opacity:0,transform:"translateY(1.2cqh)"},{opacity:1,transform:"none"}],{duration:D(),delay:d0})});
    bars.forEach(wr=>{const bar=document.createElement("div");bar.dataset.nm=1;
     bar.style.cssText="position:absolute;left:0;right:0;top:100%;margin-top:.025em;height:.07em;min-height:2px;background:var(--a);box-shadow:0 0 2px rgba(0,0,0,.6);transform-origin:left";wr.appendChild(bar);
     A(bar,[{transform:"scaleX(0)"},{transform:"scaleX(1)"}],{duration:D()*.6,delay:nB})})
  },
});
