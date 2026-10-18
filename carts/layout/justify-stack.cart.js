/* 幅揃え：2～4 行，每行字級調到同寬（字級仍受高度上限限制，至少 3 字） */
Console.cart({
  kind: 'layout', id: 'justify-stack', apiVersion: 1,
  label: { zh: '幅揃え：2～4 行，每行字級調到同寬（字級仍受高度上限限制，至少 3 字）' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  flags: { lab: true },
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration, list = ctx.charEls;
    const { _jPunct, _lFam, _jIdx, _lW, capSize, _jpx, _lEn, _jT, hair } = ctx.lib;
    const SWd = ctx.sw;
    const SHd = ctx.sh;
    const txtEl = ctx.text;
    const chars = ctx.splitChars;
    const D = ctx.enterMs;
     const vw=SWd(),vh=SHd(),port=vw<vh,txt=sb.plain.trim(),G=[...txt].filter(x=>!/\s/.test(x)),n=G.length;if(n<3)return;
    const lat=/\s/.test(txt)&&G.filter(ch=>/[\x21-\x7e]/.test(ch)).length>n*.6;let Ln=n<=5?2:n<=10?3:4,units=lat?txt.split(/\s+/).filter(Boolean):G;Ln=Math.min(Ln,units.length);if(Ln<2)return;
    const lines=[],per=Math.ceil(units.length/Ln);for(let i=0;i<units.length;i+=per)lines.push(units.slice(i,i+per).join(lat?" ":""));
    for(let i=1;i<lines.length;i++){while(lines[i]&&_jPunct.test([...lines[i]][0])){const ch=[...lines[i]][0];lines[i-1]+=ch;lines[i]=lines[i].slice(ch.length)}}
    const ls=lines.filter(Boolean);if(ls.length<2)return;
    const Wb=port?vw*.84:Math.min(vw*.62,vh*1.15),fam=_lFam(),tr=.01,gapK=.1,rules=_jIdx(sb)%3!==1;
    let sz=ls.map(l=>Math.min(Wb/_lW(l,fam,tr),vh*.36,big*.9));
    const tot=sz.reduce((a,s)=>a+s*(1+gapK),0)-sz[sz.length-1]*gapK,k=Math.min(1,vh*.84/tot);sz=sz.map(s=>capSize(s*k,.2));
    const col=document.createElement("div");col.style.cssText=`position:absolute;left:50%;top:50%;translate:-50% -50%;width:${_jpx(Wb)};display:flex;flex-direction:column;align-items:center;gap:${_jpx(Math.min(...sz)*gapK)}`;c.appendChild(col);
    ls.forEach((t,i)=>{
     const e=txtEl(`position:relative;white-space:pre;font-size:${_jpx(sz[i])};line-height:1.05;letter-spacing:${tr}em;text-align:center`);col.appendChild(e);
     const ch=chars(t,e);list.push(...ch);
     _lEn(sb,e,ch,_jT(i*100),[{opacity:0,transform:`translateX(${i%2?4:-4}cqw)`,clipPath:"inset(0 0 0 0)"},{opacity:1,transform:"none",clipPath:"inset(0 0 0 0)"}]);
     if(rules&&i<ls.length-1)hair(col,`position:relative;width:100%;opacity:.45;transform-origin:${i%2?"right":"left"}`,_jT(i*100+160),"X",D()*.6)})
  },
});
