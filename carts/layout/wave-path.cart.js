/* 文字沿波浪流動 */
Console.cart({
  kind: 'layout', id: 'wave-path', apiVersion: 1,
  label: { zh: '文字沿波浪流動' },
  author: 'kinetic-lyric-console', license: 'MIT',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration, list = ctx.charEls;
    const SWd = ctx.sw;
    const CE = ctx.centerIn;
    const chars = ctx.splitChars;
    const CONFIG = ctx.config;
    const A = ctx.anim;
    const enter = ctx.enter;
    const z=Math.min(big*.5,SWd()/Math.max(sb.plain.length,3)*.85),e=CE(c,`font-size:${z}px;letter-spacing:.1em`),ch=chars(sb.plain,e);list.push(...ch);
    const P=4200/CONFIG.speed,amp=z*.32,ph=.7,N=24,wch=z*1.1;
    ch.forEach((x,i)=>{const kf=Array.from({length:N+1},(_,j)=>{const a=2*Math.PI*j/N+i*ph,sl=amp*ph/wch*Math.cos(a);return{translate:`0 ${(amp*Math.sin(a)).toFixed(1)}px`,rotate:`${(Math.atan(sl)*180/Math.PI).toFixed(1)}deg`}});A(x,kf,{duration:P,iterations:Infinity,easing:"linear"})});
    if(sb.en)enter(e,sb.en,list)
  },
});
