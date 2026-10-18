/* 公式覆蓋：主文後方漂浮的等寬公式碎片（種子產生） */
Console.cart({
  kind: 'layout', id: 'formula', apiVersion: 1,
  label: { zh: '公式覆蓋：主文後方漂浮的等寬公式碎片（種子產生）' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  rand: { sceneThemes: ['tech'] },
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration, list = ctx.charEls;
    const { _fz } = ctx.lib;
    const sr = ctx.random;
    const SHd = ctx.sh;
    const txtEl = ctx.text;
    const A = ctx.anim;
    const D = ctx.enterMs;
    const CONFIG = ctx.config;
    const CE = ctx.centerIn;
    const chars = ctx.splitChars;
    const enter = ctx.enter;
       /* 公式覆蓋：主文後方漂浮的等寬公式碎片（種子產生） */
    const r=sr(sb.s),vh=SHd(),z=_fz(sb,big,1),SY=["∑","∫","∂","∇","π","λ","Δ","√","∞","θ"],OP=["=","+","−","×","÷","≈","→"],VR=["x","y","t","f(x)","n","e","φ","dx","a²","b²"],pk=a=>a[r()*a.length|0];
    for(let i=0;i<9;i++){const tk=[];for(let k=0,n=4+(r()*4|0);k<n;k++)tk.push(k%2?pk(OP):(r()<.4?pk(SY):pk(VR)));
     const e=txtEl(`left:${(i%3)*33+2}cqw;top:${8+Math.floor(i/3)*30+r()*8}cqh;font-size:${Math.max(10,vh*.03)*(.8+r()*.8)}px;white-space:nowrap;letter-spacing:.08em;color:var(--a);font-family:ui-monospace,Consolas,monospace`);
     delete e.dataset.t;e.dataset.nm=1;e.textContent=tk.join(" ");c.appendChild(e);
     A(e,[{opacity:0},{opacity:.35}],{duration:D(),delay:i*120/CONFIG.speed});A(e,[{translate:"-2cqw 0"},{translate:"2cqw 0"}],{duration:6000,delay:-r()*6000,iterations:Infinity,direction:"alternate",easing:"ease-in-out"})}
    const e=CE(c,`font-size:${z}px;letter-spacing:.1em`);list.push(...chars(sb.plain,e));if(sb.en)enter(e,sb.en,list)
  },
});
