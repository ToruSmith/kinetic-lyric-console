/* 額縁：字被細線框圈住；框式依句子編號輪替（整框／雙線／四角） */
Console.cart({
  kind: 'layout', id: 'frame-box', apiVersion: 1,
  label: { zh: '額縁：字被細線框圈住；框式依句子編號輪替（整框／雙線／四角）' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  flags: { lab: true },
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration, list = ctx.charEls;
    const { _jN, _jIdx, _jFit, capSize, _jBrk, _jpx, _jT, hair, _lEn } = ctx.lib;
    const SWd = ctx.sw;
    const SHd = ctx.sh;
    const txtEl = ctx.text;
    const chars = ctx.splitChars;
    const D = ctx.enterMs;
     const vw=SWd(),vh=SHd(),port=vw<vh,arr=[...sb.plain],n=Math.max(1,_jN(sb.plain)),sty=["full","double","corners"][_jIdx(sb)%3];
    const f=_jFit(n,vw*(port?.7:.6),Math.min(vh*.19,big*.8),port?5:3,1.1),z=capSize(f.z,.19),lines=_jBrk(arr,f.per);if(!lines.length)return;
    const box=document.createElement("div");box.style.cssText=`position:absolute;left:50%;top:50%;translate:-50% -50%;padding:${_jpx(z*.7)} ${_jpx(z*.8)};font-size:${_jpx(z)}`;c.appendChild(box);
    const e=txtEl("position:relative;text-align:center;line-height:1.2;letter-spacing:.04em");box.appendChild(e);
    lines.forEach(([a,b])=>{const d=document.createElement("div");d.style.whiteSpace="pre";e.appendChild(d);list.push(...chars(arr.slice(a,b).join(""),d))});
    const T=_jT(0),L=D()*.85,lw="max(2px,.04em)";
    const edge=(css,ax,dl,col)=>{const h=hair(box,css,T+dl,ax,L*.5);h.style.background=col||"var(--c)";return h};
    if(sty==="corners"){const arm=_jpx(z*.9);
     [["top:0;left:0","left top","X"],["top:0;left:0","left top","Y"],["top:0;right:0","right top","X"],["top:0;right:0","right top","Y"],
      ["bottom:0;left:0","left bottom","X"],["bottom:0;left:0","left bottom","Y"],["bottom:0;right:0","right bottom","X"],["bottom:0;right:0","right bottom","Y"]].forEach(([p,o,ax],i)=>{
      const h=hair(box,`${p};transform-origin:${o};${ax==="X"?`width:${arm};height:${lw}`:`height:${arm};width:${lw}`}`,T+(i>>1)*_jT(60),ax,L*.5);h.style.background="var(--a)"})}
    else{
     edge(`top:0;left:0;right:0;height:${lw};transform-origin:left`,"X",0);
     edge(`top:0;right:0;bottom:0;width:${lw};height:auto;transform-origin:top`,"Y",_jT(120));
     edge(`bottom:0;left:0;right:0;height:${lw};transform-origin:right`,"X",_jT(240));
     edge(`top:0;left:0;bottom:0;width:${lw};height:auto;transform-origin:bottom`,"Y",_jT(360));
     if(sty==="double"){const g=_jpx(z*.16);
      edge(`top:${g};left:${g};right:${g};height:1px;transform-origin:left;opacity:.55`,"X",_jT(200),"var(--a)");
      edge(`bottom:${g};left:${g};right:${g};height:1px;transform-origin:right;opacity:.55`,"X",_jT(320),"var(--a)");
      edge(`top:${g};bottom:${g};left:${g};width:1px;height:auto;transform-origin:bottom;opacity:.55`,"Y",_jT(440),"var(--a)");
      edge(`top:${g};bottom:${g};right:${g};width:1px;height:auto;transform-origin:top;opacity:.55`,"Y",_jT(280),"var(--a)")}}
    _lEn(sb,e,list,_jT(260))
  },
});
