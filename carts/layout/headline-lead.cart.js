/* 左下一組「大標題＋短強調線＋小導語」。標題＝{} 內的字；沒有 {} 就取前半句；導語＝其餘 */
Console.cart({
  kind: 'layout', id: 'headline-lead', apiVersion: 1,
  label: { zh: '左下一組「大標題＋短強調線＋小導語」。標題＝{} 內的字；沒有 {} 就取前半句；導語＝其餘' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  flags: { brace: true, lab: true },
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration, list = ctx.charEls;
    const { _jFull, _kKey, _jN, capSize, _jpx, hair, _jT, _kIn } = ctx.lib;
    const SWd = ctx.sw;
    const SHd = ctx.sh;
    const txtEl = ctx.text;
    const chars = ctx.splitChars;
    const A = ctx.anim;
    const D = ctx.enterMs;
       /* 見出しとリード：左下一組「大標題＋短強調線＋小導語」。標題＝{} 內的字；沒有 {} 就取前半句；導語＝其餘 */
    const vw=SWd(),vh=SHd(),port=vw<vh,arr=[...(_jFull(sb))],hl=arr.map((_,j)=>!!(sb.hl&&sb.hl[j]));
    let[a,b]=_kKey(arr,hl);if(a===b||!hl.some(Boolean)){const nl=arr.indexOf("\n");a=0;b=nl>0?nl:Math.max(1,Math.ceil(arr.length/2))}
    const head=arr.slice(a,b).join("").replace(/\n/g," ").trim(),lead=arr.slice(0,a).concat(arr.slice(b)).join("").replace(/\n/g," ").trim();
    const n=Math.max(1,_jN(head)),z=capSize(Math.min(big*.75,vw*(port?.8:.62)/(n*1.1)),.2),zl=Math.max(12,Math.min(z*.38,vh*.05));
    const box=document.createElement("div");box.style.cssText=`position:absolute;left:8cqw;right:8cqw;bottom:14cqh;display:flex;flex-direction:column;align-items:flex-start;gap:${_jpx(zl*.5)}`;c.appendChild(box);
    const e=txtEl(`position:relative;font-size:${_jpx(z)};line-height:1.15;letter-spacing:.04em;white-space:pre-wrap;max-width:84cqw`);e.textContent="";box.appendChild(e);list.push(...chars(head,e));
    hair(box,`position:relative;width:${port?18:12}cqw;height:max(2px,.06em);background:var(--a);transform-origin:left;font-size:${_jpx(z)}`,_jT(200),"X",_jT(300));
    if(lead){const l=txtEl(`position:relative;font-size:${_jpx(zl)};line-height:1.5;letter-spacing:.08em;opacity:.85;max-width:70cqw;white-space:pre-wrap`);l.textContent=lead;box.appendChild(l);A(l,[{opacity:0,transform:"translateY(1cqh)"},{opacity:.85,transform:"none"}],{duration:D(),delay:_jT(350)})}
    _kIn(e,list,sb,0)
  },
});
