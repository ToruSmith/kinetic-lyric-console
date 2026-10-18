/* 每個字平均撐開到整個畫面寬（直式畫面改為高度），左右（上下）留 6～8；超過 12 字改兩行（直式兩欄）各自撐開；字從中心向兩側散開，線再拉出 */
Console.cart({
  kind: 'layout', id: 'full-track', apiVersion: 1,
  label: { zh: '每個字平均撐開到整個畫面寬（直式畫面改為高度），左右（上下）留 6～8；超過 12 字改兩行（直式兩欄）各自撐開；字從中心向兩側散開，線再拉出' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  flags: { lab: true },
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration, list = ctx.charEls;
    const { _jN, _jPunct, _jOpen, _jCw, capSize, _jpx, _jT, hair } = ctx.lib;
    const SWd = ctx.sw;
    const SHd = ctx.sh;
    const txtEl = ctx.text;
    const enter = ctx.enter;
    const A = ctx.anim;
    const D = ctx.enterMs;
       /* 全幅字送り（JIZURA tyFullTrack）：每個字平均撐開到整個畫面寬（直式畫面改為高度），左右（上下）留 6～8；超過 12 字改兩行（直式兩欄）各自撐開；字從中心向兩側散開，線再拉出 */
    const vw=SWd(),vh=SHd(),port=vw<vh,arr=[...sb.plain],hlv=sb.hl||[],U=[];
    const lat=/\s/.test(sb.plain)&&arr.filter(ch=>/[\x21-\x7e]/.test(ch)).length>_jN(sb.plain)*.6;
    if(lat){let cur=null;arr.forEach((ch,j)=>{if(/\s/.test(ch)){cur=null;return}if(!cur){cur={t:"",k:!!hlv[j]};U.push(cur)}cur.t+=ch})}
    if(U.length<2){U.length=0;let pend="",pk=false;   /* 逐字：標點黏在前一字，開括號黏在下一字，才不會被撐開到看不懂 */
     arr.forEach((ch,j)=>{if(/\s/.test(ch))return;
      if(_jPunct.test(ch)&&U.length){U[U.length-1].t+=ch;return}
      if(_jOpen.test(ch)){pend+=ch;pk=pk||!!hlv[j];return}
      U.push({t:pend+ch,k:!!hlv[j]||pk});pend="";pk=false});
     if(pend){if(U.length)U[U.length-1].t+=pend;else U.push({t:pend,k:false})}}
    const k=U.length;if(!k)return;
    const rows=k>12?[U.slice(0,Math.ceil(k/2)),U.slice(Math.ceil(k/2))]:[U],R=rows.length,mc=r=>Math.max(...r.map(u=>_jCw(u.t)));
    let z;
    if(!port){const S=Math.max(...rows.map(r=>r.reduce((a,u)=>a+_jCw(u.t),0)));z=capSize(Math.min(big*.7,vh*.2,vw*.88*.84/S))}
    else{const Sv=Math.max(...rows.map(r=>r.length)),cwid=rows.reduce((a,r)=>a+mc(r),0)+(R-1)*.4;z=capSize(Math.min(big*.7,vw*.24,vh*.11,vh*.84*.84/Sv,vw*.84/cwid))}
    rows.forEach((r,ri)=>{
     const o=(ri-(R-1)/2)*z*(port?1.15:1.25);
     const e=txtEl(port?`top:8cqh;bottom:8cqh;left:50%;margin-left:${_jpx(o-z/2)};width:${_jpx(z)};display:flex;flex-direction:column;justify-content:${r.length<2?"center":"space-between"};align-items:center;font-size:${_jpx(z)};line-height:1;letter-spacing:0;white-space:pre`
      :`left:6cqw;right:6cqw;top:50%;margin-top:${_jpx(o-z/2)};height:${_jpx(z)};display:flex;justify-content:${r.length<2?"center":"space-between"};align-items:center;font-size:${_jpx(z)};line-height:1;letter-spacing:0;white-space:pre`);
     c.appendChild(e);
     const us=r.map(u=>{const s=document.createElement("span");s.className="ch";s.textContent=u.t;if(u.k)s.style.cssText="color:var(--a);text-shadow:0 0 .35em var(--a)";e.appendChild(s);return s});list.push(...us);
     if(sb.en)enter(e,sb.en,us);
     else us.forEach((s,j)=>{const u=us.length>1?j/(us.length-1):.5,off=((.5-u)*(port?84:88)).toFixed(2)+(port?"cqh":"cqw"),T=port?"translateY":"translateX";
      A(s,[{opacity:0,transform:`${T}(${off})`},{opacity:1,offset:.45},{opacity:1,transform:"none"}],{duration:D()*1.2,delay:_jT(ri*80),easing:"cubic-bezier(.2,.8,.2,1)"})})});
    const d1=D()*.7;
    if(!port)hair(c,`left:6cqw;right:6cqw;top:calc(50% + ${_jpx((R-1)/2*z*1.25+z*.68)});transform-origin:center;opacity:.6`,d1,"X",D()*.9);
    else hair(c,`top:8cqh;bottom:8cqh;height:auto;width:1px;left:calc(50% + ${_jpx((R-1)/2*z*1.15+z*.7)});transform-origin:center;opacity:.6`,d1,"Y",D()*.9)
  },
});
