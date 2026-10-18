/* **吃 `{}`**：整句沿圓環排列並旋轉，中央放一個大字（第一個 `{}`，沒有取首字） */
Console.cart({
  kind: 'layout', id: 'circle-badge', apiVersion: 1,
  label: { zh: '**吃 `{}`**：整句沿圓環排列並旋轉，中央放一個大字（第一個 `{}`，沒有取首字）' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  flags: { brace: true },
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration;
    const txtEl = ctx.text;
    const A = ctx.anim;
    const D = ctx.enterMs;
    const CE = ctx.centerIn;
    const enter = ctx.enter;
    const ring = (c,txt,n,css,R,cfg)=>{const r=document.createElement("div");r.className="w";c.appendChild(r);
     const t=[...txt];while(t.length<n)t.push(...[...txt,"・"]);t.length=Math.max(n,1);
     t.forEach((ch,i)=>{const a=cfg.arc?(i/(t.length-1||1)-.5)*cfg.arc:i*360/t.length,e=txtEl(`left:50%;top:50%;${css};transform:translate(-50%,-50%) rotate(${a}deg) translateY(-${R}cqh)`);e.textContent=ch;r.appendChild(e);A(e,[{opacity:0},{opacity:1}],{duration:D()*.5,delay:i*(cfg.step||40)})});return r};
    const r=ring(c,sb.plain,22,`font-size:${sm*1.4}px;letter-spacing:0`,24,{step:30});A(r,[{transform:"rotate(0)"},{transform:"rotate(360deg)"}],{duration:12000,iterations:Infinity,easing:"linear"});
    const e=CE(c,`font-size:${big*1.3}px;letter-spacing:0`);e.textContent=sb.br[0]||sb.plain[0];enter(e,"zoomin")
  },
});
