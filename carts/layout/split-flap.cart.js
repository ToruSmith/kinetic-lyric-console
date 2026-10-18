/* 機場翻板 */
Console.cart({
  kind: 'layout', id: 'split-flap', apiVersion: 1,
  label: { zh: '機場翻板' },
  author: 'kinetic-lyric-console', license: 'MIT',
  rand: { sceneThemes: ['tech'] },
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration;
    const sr = ctx.random;
    const SWd = ctx.sw;
    const subs = ctx.sentences;
    const CE = ctx.centerIn;
    const A = ctx.anim;
    const CONFIG = ctx.config;
    const r=sr(sb.s),chs=[...sb.plain],fs=Math.min(big*.45,SWd()/Math.max(chs.length,4)*.78),pool=[...new Set([...subs.map(x=>x.plain).join(""),..."ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"])].filter(x=>!/\s/.test(x));
    const row=CE(c,`font-size:${fs}px;gap:.12em;letter-spacing:0`);row.dataset.rg="1";
    chs.forEach((ch,i)=>{if(/\s/.test(ch)){const s=document.createElement("div");s.style.width=".5em";row.appendChild(s);return}
     const n=7+(r()*5|0),items=Array.from({length:n-1},()=>pool[r()*pool.length|0]);items.push(ch);
     const t=document.createElement("div");t.style.cssText=`position:relative;width:${/[\x00-\xff]/.test(ch)?.7:1.05}em;height:1.3em;line-height:1.3em;overflow:hidden;text-align:center;background:linear-gradient(#2e3441 50%,#232834 50%);border-radius:.1em;border:1px solid rgba(255,255,255,.1);box-shadow:inset 0 0 .15em rgba(0,0,0,.6)`;
     const col=document.createElement("div");items.forEach(x=>{const d=document.createElement("div");d.textContent=x;col.appendChild(d)});t.appendChild(col);
     const sp=document.createElement("div");sp.style.cssText="position:absolute;left:0;right:0;top:50%;height:2px;margin-top:-1px;background:rgba(0,0,0,.85)";t.appendChild(sp);row.appendChild(t);
     A(col,[{translate:"0 0"},{translate:`0 ${-(n-1)*1.3}em`}],{duration:(500+r()*500)/CONFIG.speed,delay:i*70/CONFIG.speed,easing:`steps(${n-1},end)`});
     A(t,[{opacity:0},{opacity:1}],{duration:200,delay:i*70/CONFIG.speed})})
  },
});
