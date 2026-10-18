/* 文字置中，左上與右下各一個大引號（強調色、半透明；字級最大約文字的 2.2 倍，不遮影片） */
Console.cart({
  kind: 'layout', id: 'quote', apiVersion: 1,
  label: { zh: '文字置中，左上與右下各一個大引號（強調色、半透明；字級最大約文字的 2.2 倍，不遮影片）' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  flags: { lab: true },
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration, list = ctx.charEls;
    const { _jN, _jFit, capSize, _jBrk, _kCjk, _jpx, _jT, _kIn } = ctx.lib;
    const SWd = ctx.sw;
    const SHd = ctx.sh;
    const txtEl = ctx.text;
    const chars = ctx.splitChars;
    const A = ctx.anim;
    const D = ctx.enterMs;
       /* 引用：文字置中，左上與右下各一個大引號（強調色、半透明；字級最大約文字的 2.2 倍，不遮影片） */
    const vw=SWd(),vh=SHd(),port=vw<vh,arr=[...sb.plain],n=Math.max(1,_jN(sb.plain)),f=_jFit(n,vw*(port?.72:.66),Math.min(vh*.075,big*.55),port?6:3,1.12),z=capSize(f.z),lines=_jBrk(arr,f.per);if(!lines.length)return;
    const cj=_kCjk(sb.plain),qo=cj?"「":"“",qc=cj?"」":"”",qz=Math.min(z*2.2,vh*.16);
    const box=document.createElement("div");box.style.cssText="position:absolute;left:50%;top:50%;translate:-50% -50%;width:max-content;max-width:80cqw";c.appendChild(box);
    const e=txtEl(`position:relative;text-align:center;font-size:${_jpx(z)};line-height:1.4;letter-spacing:.06em;white-space:pre`);box.appendChild(e);
    lines.forEach(([a,b])=>{const d=document.createElement("div");e.appendChild(d);list.push(...chars(arr.slice(a,b).join(""),d))});
    [[qo,`left:${_jpx(-qz*.7)};top:${_jpx(-qz*.55)}`],[qc,`right:${_jpx(-qz*.7)};bottom:${_jpx(-qz*.95)}`]].forEach(([q,pos],i)=>{const m=txtEl(`${pos};font-size:${_jpx(qz)};line-height:1;color:var(--a);-webkit-text-fill-color:var(--a);opacity:.6`);m.textContent=q;m.dataset.nm=1;delete m.dataset.t;box.appendChild(m);
     A(m,[{opacity:0,transform:"scale(.6)"},{opacity:.6,transform:"none"}],{duration:D()*.8,delay:_jT(i*180)})});
    _kIn(e,list,sb,_jT(200))
  },
});
