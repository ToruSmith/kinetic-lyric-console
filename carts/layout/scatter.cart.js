/* 散落字：每字在格內隨機偏移、旋轉、縮放，由四方飛入 */
Console.cart({
  kind: 'layout', id: 'scatter', apiVersion: 1,
  label: { zh: '散落字：每字在格內隨機偏移、旋轉、縮放，由四方飛入' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  rand: { sceneThemes: ['grunge'], strong: true },
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration, list = ctx.charEls;
    const { _chs } = ctx.lib;
    const sr = ctx.random;
    const SWd = ctx.sw;
    const SHd = ctx.sh;
    const txtEl = ctx.text;
    const A = ctx.anim;
    const D = ctx.enterMs;
    const CONFIG = ctx.config;
       /* 散落字：每字在格內隨機偏移、旋轉、縮放，由四方飛入 */
    const r=sr(sb.s),vw=SWd(),vh=SHd(),ch=_chs(sb),n=Math.max(1,ch.length),cols=Math.max(1,Math.min(n,Math.round(Math.sqrt(n*vw/vh*.8)))),rows=Math.ceil(n/cols),cw=vw*.78/cols,chh=vh*.62/rows,z=Math.min(cw,chh,big*.6)*.95;
    ch.forEach((x,i)=>{const k=.75+r()*.6,fs=z*k,cx=vw*.11+(i%cols+.5)*cw+(r()-.5)*cw*.3,cy=vh*.19+(Math.floor(i/cols)+.5)*chh+(r()-.5)*chh*.3,rot=(r()-.5)*40,
      e=txtEl(`left:${cx-fs/2}px;top:${cy-fs/2}px;width:${fs}px;line-height:${fs}px;text-align:center;font-size:${fs}px;letter-spacing:0;rotate:${rot}deg`);
     e.textContent=x;if(r()<.25)e.style.color="var(--a)";c.appendChild(e);list.push(e);
     A(e,[{opacity:0,translate:`${(r()-.5)*40}cqw ${(r()-.5)*40}cqh`,scale:2.2},{opacity:1,translate:"0 0",scale:1}],{duration:D(),delay:Math.min(i*70,dur*300)/CONFIG.speed})})
  },
});
