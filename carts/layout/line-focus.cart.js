/* 顯示整句，{} 內是「這一鏡的片段」，其餘降到 .45 透明度；片段以底線／圓點／框線標出（依句子編號輪替）；整句先淡入，再把標記拉出。沒有 {} 就整句正常顯示、不畫標記 */
Console.cart({
  kind: 'layout', id: 'line-focus', apiVersion: 1,
  label: { zh: '顯示整句，{} 內是「這一鏡的片段」，其餘降到 .45 透明度；片段以底線／圓點／框線標出（依句子編號輪替）；整句先淡入，再把標記拉出。沒有 {} 就整句正常顯示、不畫標記' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  flags: { brace: true, lab: true },
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration, list = ctx.charEls;
    const { _jFull, _jN, _jBrk, capSize, _jIdx, _jpx, _jT, tick, hair } = ctx.lib;
    const SWd = ctx.sw;
    const SHd = ctx.sh;
    const emFontCss = ctx.fontCss;
    const txtEl = ctx.text;
    const D = ctx.enterMs;
    const chars = ctx.splitChars;
    const enter = ctx.enter;
    const A = ctx.anim;
       /* 行中強調（JIZURA tyLineFocus）：顯示整句，{} 內是「這一鏡的片段」，其餘降到 .45 透明度；片段以底線／圓點／框線標出（依句子編號輪替）；整句先淡入，再把標記拉出。沒有 {} 就整句正常顯示、不畫標記 */
    const vw=SWd(),vh=SHd(),M=Math.min(vw,vh),port=vw<vh,full=_jFull(sb),arr=[...full],hl=arr.map((_,j)=>!!(sb.hl&&sb.hl[j])),any=hl.some(Boolean),ef=emFontCss(sb);
    const n=Math.max(1,_jN(full)),nLn=n>(port?7:12)?Math.ceil(n/(port?6:11)):1,lines=_jBrk(arr,Math.max(1,Math.ceil(arr.length/nLn)));if(!lines.length)return;
    const L=lines.length,maxLen=Math.max(...lines.map(([a,b])=>b-a)),z=capSize(Math.min(M*.12,big*.8,vw*.82/(maxLen*1.1),vh*.56/(L*1.7))),mk=["bar","dot","box"][_jIdx(sb)%3];
    const e=txtEl(`inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;font-size:${_jpx(z)};line-height:1.7;letter-spacing:.08em`);c.appendChild(e);
    const md=D()*.8,mdur=D()*.5,RUN="position:relative;display:inline-block;line-height:1.1";
    lines.forEach(([a,b],li)=>{
     const d=document.createElement("div");d.style.whiteSpace="pre";e.appendChild(d);
     const runs=[],md1=md+_jT(li*100);let host=d,kind=-1;
     for(let j=a;j<b;j++){
      const want=!any?0:hl[j]?2:1;
      if(want!==kind){kind=want;host=d;
       if(want===1){host=document.createElement("span");host.style.opacity=".45";d.appendChild(host)}
       else if(want===2&&mk!=="dot"){host=document.createElement("span");host.style.cssText=RUN;d.appendChild(host);runs.push(host)}}
      let h=host;
      if(want===2&&mk==="dot"){h=document.createElement("span");h.style.cssText=RUN;host.appendChild(h);   /* 圓點：每個字上方一點，所以每個字自己一層 */
       if(!/\s/.test(arr[j]))tick(h,"left:50%;top:-.05em;translate:-50% -100%;width:.16em;height:.16em;border-radius:50%",md1,mdur)}
      const s=chars(arr[j],h)[0];if(ef&&want===2)s.style.fontFamily=ef}
     runs.forEach(r=>{
      if(mk==="bar")hair(r,"left:0;right:0;top:100%;margin-top:.04em;height:.06em;min-height:2px;background:var(--a);transform-origin:left",md1,"X",mdur);
      else hair(r,"left:-.14em;right:-.14em;top:-.06em;bottom:-.06em;height:auto;background:transparent;border:max(1px,.03em) solid var(--a);transform-origin:left",md1,"X",mdur)})});
    list.push(...e.querySelectorAll(".ch"));
    if(sb.en)enter(e,sb.en,list);
    else A(e,[{opacity:0,transform:"translateY(1.5cqh)"},{opacity:1,transform:"none"}],{duration:D()})
  },
});
