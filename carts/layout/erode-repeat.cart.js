/* 削り反復：同一句重複 2～5 行，每行多（或少）一段，主行高亮 */
Console.cart({
  kind: 'layout', id: 'erode-repeat', apiVersion: 1,
  label: { zh: '削り反復：同一句重複 2～5 行，每行多（或少）一段，主行高亮' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  flags: { lab: true },
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration, list = ctx.charEls;
    const { _jIdx, _lFam, _lW, capSize, _jpx, _lEn, _jT } = ctx.lib;
    const SWd = ctx.sw;
    const SHd = ctx.sh;
    const txtEl = ctx.text;
    const chars = ctx.splitChars;
    const A = ctx.anim;
    const D = ctx.enterMs;
     const vw=SWd(),vh=SHd(),arr=[...sb.plain.trim()],S=arr.filter(x=>!/\s/.test(x)).length;if(S<2)return;
    const R=Math.min(5,Math.max(2,S)),lens=[];for(let r=0;r<R;r++){const l=Math.max(1,Math.round(arr.length*(r+1)/R));if(!lens.includes(l))lens.push(l)}
    const erode=_jIdx(sb)%3===2;if(erode)lens.reverse();
    const rows=lens.map(l=>arr.slice(0,l).join("").trim()).filter(Boolean),Rn=rows.length,mainR=erode?0:Rn-1,leadK=1.34;if(!Rn)return;
    const fam=_lFam(),fw=_lW(arr.join(""),fam,.04);
    const z=capSize(Math.min(vw*.74/fw,vh*.8/(Rn*leadK),big*.7),.16);
    const col=document.createElement("div");col.style.cssText=`position:absolute;left:50%;top:50%;translate:-50% -50%;display:flex;flex-direction:column;align-items:flex-start;font-size:${_jpx(z)};line-height:${leadK}`;c.appendChild(col);
    rows.forEach((t,r)=>{
     const e=txtEl(`position:relative;white-space:pre;letter-spacing:.04em`);col.appendChild(e);
     if(r===mainR){const ch=chars(t,e);list.push(...ch);_lEn(sb,e,ch,_jT(r*110))}
     else{e.textContent=t;e.dataset.nm=1;const dist=Math.abs(r-mainR)/Math.max(1,Rn-1);e.style.color="var(--c)";
      A(e,[{opacity:0},{opacity:.75-.45*dist}],{duration:D()*.5,delay:_jT(r*110)})}})
  },
});
