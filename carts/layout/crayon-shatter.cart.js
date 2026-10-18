/* 同上，字心強調色、粗糙描邊與微傾斜 */
Console.cart({
  kind: 'layout', id: 'crayon-shatter', apiVersion: 1,
  label: { zh: '同上，字心強調色、粗糙描邊與微傾斜' },
  author: 'kinetic-lyric-console', license: 'MIT',
  flags: { lab: true },
  rand: { sceneThemes: ['grunge'], strong: true },
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration, list = ctx.charEls;
    const { _fz } = ctx.lib;
    const sr = ctx.random;
    const CE = ctx.centerIn;
    const A = ctx.anim;
    const D = ctx.enterMs;
    const CONFIG = ctx.config;
    const SHARDS = ["0 0,100% 0,50% 50%","100% 0,100% 100%,50% 50%","100% 100%,0 100%,50% 50%","0 100%,0 0,50% 50%"];
    function shatterBuild(sb,c,big,list,crayon){   /* 每個字拆成 4 片三角碎片，從隨機位置與角度飛回拼合 */
     const z=_fz(sb,big,1),r=sr(sb.s),e=CE(c,`font-size:${z}px;letter-spacing:.06em;font-weight:${crayon?800:900}`),ch=[...sb.plain].filter(x=>!/\s/.test(x));
     ch.forEach((t,i)=>{const w=document.createElement("span");w.className="ch";w.textContent=t;w.style.cssText="position:relative;display:inline-block;color:transparent;-webkit-text-fill-color:transparent";e.appendChild(w);list.push(w);
      if(crayon)w.style.rotate=((r()-.5)*7)+"deg";
      SHARDS.forEach((p,k)=>{const s=document.createElement("span");s.textContent=t;s.dataset.nm=1;
       s.style.cssText=`position:absolute;inset:0;clip-path:polygon(${p});color:${crayon?"var(--a)":"var(--c)"};-webkit-text-fill-color:${crayon?"var(--a)":"var(--c)"};`+(crayon?"-webkit-text-stroke:.025em var(--c);text-shadow:.025em .02em 0 rgba(255,255,255,.35),-.02em .03em 0 rgba(0,0,0,.3)":"");w.appendChild(s);
       A(s,[{opacity:0,transform:`translate(${(r()-.5)*60}cqw,${(r()-.5)*50}cqh) rotate(${(r()-.5)*360}deg) scale(${.4+r()*1.2})`},{opacity:1,transform:"none"}],{duration:D()*1.2,delay:(i*60+k*30)/CONFIG.speed,easing:"cubic-bezier(.2,.8,.2,1)"})})})}
    return (shatterBuild(sb,c,big,list,true));
  },
});
