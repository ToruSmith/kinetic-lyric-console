/* 關鍵字在中央，前文在它左邊橫排＋上方直排、後文在右邊橫排＋下方直排（直排是淡淡的回聲，只取最近 6 字）；字都小，不遮影片 */
Console.cart({
  kind: 'layout', id: 'cross', apiVersion: 1,
  label: { zh: '關鍵字在中央，前文在它左邊橫排＋上方直排、後文在右邊橫排＋下方直排（直排是淡淡的回聲，只取最近 6 字）；字都小，不遮影片' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  flags: { brace: true, lab: true },
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration, list = ctx.charEls;
    const { _jFull, _kKey, _jN, capSize, _jpx, _jT, _kIn } = ctx.lib;
    const SWd = ctx.sw;
    const SHd = ctx.sh;
    const txtEl = ctx.text;
    const A = ctx.anim;
    const D = ctx.enterMs;
    const chars = ctx.splitChars;
       /* 十字組（JIZURA tyCross）：關鍵字在中央，前文在它左邊橫排＋上方直排、後文在右邊橫排＋下方直排（直排是淡淡的回聲，只取最近 6 字）；字都小，不遮影片 */
    const vw=SWd(),vh=SHd(),port=vw<vh,full=_jFull(sb),arr=[...full],hl=arr.map((_,j)=>!!(sb.hl&&sb.hl[j])),[a,b]=_kKey(arr,hl),T=(x,y)=>arr.slice(x,y).join("").replace(/\n/g," ").trim();
    const key=T(a,b),pre=T(0,a),post=T(b,arr.length),kn=Math.max(1,_jN(key)),zk=capSize(Math.min(big*.7,vw*(port?.6:.3)/(kn*1.1)),.2),zs=Math.max(11,Math.min(zk*.28,vh*.045));
    const g=document.createElement("div");g.style.cssText=`position:absolute;left:50%;top:50%;translate:-50% -50%;display:grid;grid-template-columns:auto auto auto;grid-template-rows:auto auto auto;align-items:center;justify-items:center;gap:${_jpx(zs*.6)}`;c.appendChild(g);
    const cell=(t,r,col,css,fx)=>{if(!t)return;const e=txtEl(`position:relative;grid-row:${r};grid-column:${col};font-size:${_jpx(zs)};letter-spacing:.1em;line-height:1.3;${css}`);e.textContent=t;g.appendChild(e);A(e,[{opacity:0},{opacity:fx}],{duration:D(),delay:_jT(250)})};
    const hp=port?pre.slice(-5):pre.slice(-12),hq=port?post.slice(0,5):post.slice(0,12),vp=[...pre].slice(-6).join(""),vq=[...post].slice(0,6).join("");
    cell(vp,1,2,"writing-mode:vertical-rl;white-space:pre;align-self:end",.5);cell(hp,2,1,"justify-self:end;white-space:pre-wrap;text-align:right;max-width:26cqw",.85);
    const e=txtEl(`position:relative;grid-row:2;grid-column:2;font-size:${_jpx(zk)};line-height:1.1;white-space:pre;color:var(--a);-webkit-text-fill-color:var(--a)`);e.textContent="";g.appendChild(e);list.push(...chars(key,e));
    cell(hq,2,3,"justify-self:start;white-space:pre-wrap;text-align:left;max-width:26cqw",.85);cell(vq,3,2,"writing-mode:vertical-rl;white-space:pre;align-self:start",.5);
    _kIn(e,list,sb,0,0)
  },
});
