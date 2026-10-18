/* 大きな頭文字：第一個字放大成 2～3 行高，其餘繞在右邊（至少 3 字） */
Console.cart({
  kind: 'layout', id: 'drop-cap', apiVersion: 1,
  label: { zh: '大きな頭文字：第一個字放大成 2～3 行高，其餘繞在右邊（至少 3 字）' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  flags: { lab: true },
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration, list = ctx.charEls;
    const { _jBrk, _jIdx, capSize, _jpx, hair, _jT, _lEn } = ctx.lib;
    const SWd = ctx.sw;
    const SHd = ctx.sh;
    const txtEl = ctx.text;
    const chars = ctx.splitChars;
    const D = ctx.enterMs;
     const vw=SWd(),vh=SHd(),port=vw<vh,arr=[...sb.plain.trim()],cap=arr[0],rest=arr.slice(1),nR=rest.filter(x=>!/\s/.test(x)).length;if(!cap||nR<2)return;
    const cl=nR<=10?2:3,per=Math.ceil(nR/cl),lines=_jBrk(rest,per),Lr=lines.length,lead=1.3,kc=((cl-1)*lead+1)/.86,gap=.5,style=["fill","accent","outline"][_jIdx(sb)%3];
    let z=Math.min(vw*(port?.84:.66)/(per*1.06+kc*1.04+gap),vh*.62/((Math.max(Lr,cl)-1)*lead+1),big*.7);z=Math.min(z,vh*.28/kc);z=capSize(z,.16);
    const row=document.createElement("div");row.style.cssText=`position:absolute;left:50%;top:50%;translate:-50% -50%;display:flex;align-items:flex-start;gap:${_jpx(z*gap)};font-size:${_jpx(z)}`;c.appendChild(row);
    const ce=txtEl(`position:relative;flex:none;font-size:${kc.toFixed(3)}em;line-height:.86;letter-spacing:0;${style==="accent"?"color:var(--a);":""}${style==="outline"?"color:transparent;-webkit-text-stroke:max(2px,.025em) var(--c);":""}`);row.appendChild(ce);
    const cc=chars(cap,ce);
    const re=txtEl(`position:relative;flex:0 1 auto;line-height:${lead};letter-spacing:.04em;padding-top:.05em`);row.appendChild(re);
    const rl=[];lines.forEach(([a,b])=>{const d=document.createElement("div");d.style.whiteSpace="pre";re.appendChild(d);rl.push(...chars(rest.slice(a,b).join(""),d))});
    list.push(...cc,...rl);
    const rule=hair(row,`position:relative;order:0;flex:none;width:1px;height:auto;align-self:stretch;margin:0 ${_jpx(-z*gap*.5)};transform-origin:top;opacity:.5`,_jT(200),"Y",D()*.7);
    row.insertBefore(rule,re);
    _lEn(sb,ce,cc,0,[{opacity:0,transform:"scale(1.25)",filter:"blur(6px)"},{opacity:1,transform:"none",filter:"blur(0)"}]);
    _lEn(sb,re,rl,_jT(220))
  },
});
