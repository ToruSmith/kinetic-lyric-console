/* 文字靠角落（左下／右上／右下／左中依句子編號輪替），旁邊拉出一條髮絲線，線尾收在小方點；線先拉出，文字再淡入並向內收 */
Console.cart({
  kind: 'layout', id: 'margin', apiVersion: 1,
  label: { zh: '文字靠角落（左下／右上／右下／左中依句子編號輪替），旁邊拉出一條髮絲線，線尾收在小方點；線先拉出，文字再淡入並向內收' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  flags: { lab: true },
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration, list = ctx.charEls;
    const { _jN, _jIdx, _jFit, capSize, _jBrk, _jpx, hair, _jT, tick, _jLate } = ctx.lib;
    const SWd = ctx.sw;
    const SHd = ctx.sh;
    const txtEl = ctx.text;
    const chars = ctx.splitChars;
    const enter = ctx.enter;
    const A = ctx.anim;
    const D = ctx.enterMs;
       /* 余白（JIZURA tyMargin）：文字靠角落（左下／右上／右下／左中依句子編號輪替），旁邊拉出一條髮絲線，線尾收在小方點；線先拉出，文字再淡入並向內收 */
    const vw=SWd(),vh=SHd(),M=Math.min(vw,vh),port=vw<vh,arr=[...sb.plain],n=Math.max(1,_jN(sb.plain));
    const pos=["bl","tr","br","lc"][_jIdx(sb)%4],right=pos==="tr"||pos==="br";
    const f=_jFit(n,vw*.55,Math.min(M*.07,big*.5),port?5:3,1.12),z=capSize(f.z),lines=_jBrk(arr,f.per);if(!lines.length)return;
    const Y={bl:"bottom:14cqh",br:"bottom:14cqh",tr:"top:14cqh",lc:"top:50%;translate:0 -50%"}[pos];
    const row=document.createElement("div");row.style.cssText=`position:absolute;left:8cqw;right:8cqw;${Y};display:flex;flex-direction:${right?"row-reverse":"row"};align-items:center;gap:${_jpx(z*.8)};font-size:${_jpx(z)}`;c.appendChild(row);
    const e=txtEl(`position:relative;flex:0 1 auto;max-width:55cqw;text-align:${right?"right":"left"};line-height:1.4;letter-spacing:.1em`);row.appendChild(e);
    lines.forEach(([a,b])=>{const d=document.createElement("div");d.style.whiteSpace="pre";e.appendChild(d);list.push(...chars(arr.slice(a,b).join(""),d))});
    hair(row,`position:relative;flex:1 1 0;min-width:0;transform-origin:${right?"right":"left"}`,0,"X",_jT(300));
    tick(row,`position:relative;flex:none;width:.2em;height:.2em;margin-${right?"right":"left"}:${_jpx(-z*.8)}`,_jT(240),_jT(200));
    const d0=_jT(300);
    if(sb.en){const n0=ctx.animCount();enter(e,sb.en,list);_jLate(n0,d0)}
    else A(e,[{opacity:0,transform:`translateX(${right?2:-2}cqw)`},{opacity:1,transform:"none"}],{duration:D(),delay:d0})
  },
});
