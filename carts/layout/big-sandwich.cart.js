/* 關鍵字放大置中，前後文字縮小夾在兩側（直式畫面改為上下夾）；關鍵字＝{} 內第一段，沒有就取最長字詞或正中間的字；大字上限約畫面高度 26% */
Console.cart({
  kind: 'layout', id: 'big-sandwich', apiVersion: 1,
  label: { zh: '關鍵字放大置中，前後文字縮小夾在兩側（直式畫面改為上下夾）；關鍵字＝{} 內第一段，沒有就取最長字詞或正中間的字；大字上限約畫面高度 26%' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  flags: { brace: true, lab: true },
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration, list = ctx.charEls;
    const { _jFull, _kKey, _jN, capSize, _jpx, _jT, _kIn } = ctx.lib;
    const SWd = ctx.sw;
    const SHd = ctx.sh;
    const txtEl = ctx.text;
    const chars = ctx.splitChars;
    const A = ctx.anim;
    const D = ctx.enterMs;
       /* 大字挟み（JIZURA tyKeySplit）：關鍵字放大置中，前後文字縮小夾在兩側（直式畫面改為上下夾）；關鍵字＝{} 內第一段，沒有就取最長字詞或正中間的字；大字上限約畫面高度 26% */
    const vw=SWd(),vh=SHd(),port=vw<vh,full=_jFull(sb),arr=[...full],hl=arr.map((_,j)=>!!(sb.hl&&sb.hl[j])),[a,b]=_kKey(arr,hl),T=(x,y)=>arr.slice(x,y).join("").replace(/\n/g," ").trim();
    const key=T(a,b),pre=T(0,a),post=T(b,arr.length),kn=Math.max(1,_jN(key)),zk=capSize(Math.min(big*.9,vw*(port?.8:.42)/(kn*1.1)),.26),zs=Math.max(12,Math.min(zk*.3,vh*.06));
    const row=document.createElement("div");row.style.cssText=`position:absolute;left:6cqw;right:6cqw;top:50%;translate:0 -50%;display:flex;flex-direction:${port?"column":"row"};align-items:center;justify-content:center;gap:${_jpx(zs*.8)}`;c.appendChild(row);
    const side=(t,al)=>{if(!t)return;const e=txtEl(`position:relative;font-size:${_jpx(zs)};line-height:1.4;letter-spacing:.08em;opacity:.85;max-width:${port?80:26}cqw;white-space:pre-wrap;text-align:${port?"center":al}`);e.textContent=t;row.appendChild(e);return e};
    const pe=side(pre,"right"),e=txtEl(`position:relative;font-size:${_jpx(zk)};line-height:1.1;letter-spacing:.02em;white-space:pre;color:var(--a);-webkit-text-fill-color:var(--a)`);e.textContent="";row.appendChild(e);list.push(...chars(key,e));
    const po=side(post,"left");[pe,po].forEach((x,i)=>{if(x)A(x,[{opacity:0,transform:`translate${port?"Y":"X"}(${(i?1:-1)*2}cqw)`},{opacity:.85,transform:"none"}],{duration:D(),delay:_jT(250)})});
    _kIn(e,list,sb,0,0)
  },
});
