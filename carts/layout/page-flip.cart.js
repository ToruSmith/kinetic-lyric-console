/* 3D 翻頁露出下一句（會顯示前一句；單獨使用時前後空白） */
Console.cart({
  kind: 'layout', id: 'page-flip', apiVersion: 1,
  label: { zh: '3D 翻頁露出下一句（會顯示前一句；單獨使用時前後空白）' },
  author: 'kinetic-lyric-console', license: 'MIT',
  rand: { sceneThemes: ['grunge'] },
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration, list = ctx.charEls;
    const subs = ctx.sentences;
    const SWd = ctx.sw;
    const SHd = ctx.sh;
    const sbKs = ctx.sizeScale;
    const txtEl = ctx.text;
    const A = ctx.anim;
    const D = ctx.enterMs;
    const PAPER = "#f3eee2";
    const INK = "#2a2622";
    const i=subs.indexOf(sb),prev=i>0?subs[i-1].plain:"",vw=SWd(),vh=SHd(),ks=sbKs(sb),pw=Math.min(vw*.4*ks,vw*.48,vh*.78*ks),ph=Math.min(vh*.56*ks,pw*.8,vh*.92);
    const st=document.createElement("div");st.style.cssText=`position:absolute;inset:0;perspective:${vw*1.5}px`;c.appendChild(st);
    const pg=(txt,css)=>{const p=txtEl(`top:${-ph/2}px;width:${pw}px;height:${ph}px;background:${PAPER};color:${INK};display:flex;align-items:center;justify-content:center;font-size:${Math.min(ph*.3,pw*.8/Math.max([...txt].length,3))}px;letter-spacing:.12em;box-shadow:0 1.5cqh 4cqh rgba(0,0,0,.45);${css}`);p.style.left="50%";p.style.top="50%";p.style.marginTop=-ph/2+"px";p.textContent=txt;return p};
    const left=pg("","margin-left:"+(-pw)+"px;background:linear-gradient(90deg,#e6e0d0,#d9d2bf)");st.appendChild(left);
    const right=pg(sb.plain,"background:linear-gradient(90deg,#d9d2bf,"+PAPER+" 10%)");st.appendChild(right);
    const leaf=document.createElement("div");leaf.style.cssText=`position:absolute;left:50%;top:50%;margin-top:${-ph/2}px;width:${pw}px;height:${ph}px;transform-origin:left center;transform-style:preserve-3d`;
    const f=pg(prev,"left:0;margin:0;top:0;backface-visibility:hidden");f.style.left="0";f.style.top="0";f.style.marginTop="0";const b=pg("","left:0;margin:0;backface-visibility:hidden;transform:rotateY(180deg);background:linear-gradient(90deg,#d9d2bf,#e9e3d3)");b.style.left="0";b.style.top="0";b.style.marginTop="0";
    leaf.append(f,b);st.appendChild(leaf);const T=Math.max(800,dur*1000);
    A(leaf,[{transform:"rotateY(0deg)"},{transform:"rotateY(-180deg)"}],{duration:Math.min(T*.45,D()*1.8),delay:150,easing:"cubic-bezier(.6,0,.3,1)"})
  },
});
