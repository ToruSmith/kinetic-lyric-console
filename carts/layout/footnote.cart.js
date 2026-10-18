/* 正文在下三分之一，句尾加 ※；最下方細線＋小字註腳（註腳＝副文 */
Console.cart({
  kind: 'layout', id: 'footnote', apiVersion: 1,
  label: { zh: '正文在下三分之一，句尾加 ※；最下方細線＋小字註腳（註腳＝副文' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  flags: { lab: true, ownSub: true },
  rand: { needSub: true },
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration, list = ctx.charEls;
    const { _jN, _jFit, capSize, _jBrk, _jpx, _kIn, hair, _jT } = ctx.lib;
    const SWd = ctx.sw;
    const SHd = ctx.sh;
    const txtEl = ctx.text;
    const chars = ctx.splitChars;
    const A = ctx.anim;
    const D = ctx.enterMs;
       /* 脚注：正文在下三分之一，句尾加 ※；最下方細線＋小字註腳（註腳＝副文 ||；沒有副文時，若正文分多行就拿最後一行當註腳） */
    const vw=SWd(),vh=SHd(),port=vw<vh;let segs=sb.plain.split("\n").map(s=>s.trim()).filter(Boolean),note=(sb.sub||"").trim();
    if(!note&&segs.length>1)note=segs.pop();
    const main=segs.join(" "),n=Math.max(1,_jN(main)),f=_jFit(n,vw*.8,Math.min(vh*.07,big*.55),port?4:2,1.12),z=capSize(f.z),lines=_jBrk([...main],f.per);
    const e=txtEl(`left:10cqw;right:10cqw;bottom:${note?24:16}cqh;text-align:center;font-size:${_jpx(z)};line-height:1.4;letter-spacing:.06em;white-space:pre`);c.appendChild(e);
    lines.forEach(([a,b],i)=>{const d=document.createElement("div");e.appendChild(d);list.push(...chars([...main].slice(a,b).join(""),d));
     if(note&&i===lines.length-1){const m=document.createElement("span");m.className="ch";m.dataset.nm=1;m.textContent="※";m.style.cssText="font-size:.55em;vertical-align:.55em;color:var(--a);margin-left:.15em";d.appendChild(m)}});
    _kIn(e,list,sb,0);
    if(note){hair(c,"left:10cqw;right:10cqw;bottom:13cqh;opacity:.5;transform-origin:left",_jT(250),"X",_jT(350));
     const nz=Math.max(11,Math.min(z*.5,vh*.035)),t=txtEl(`left:10cqw;right:10cqw;bottom:6.5cqh;text-align:center;font-size:${_jpx(nz)};letter-spacing:.08em;opacity:.8;white-space:pre-wrap;line-height:1.4`);t.textContent="※ "+note;delete t.dataset.t;c.appendChild(t);
     A(t,[{opacity:0},{opacity:.8}],{duration:D(),delay:_jT(400)})}
  },
});
