/* 訊號閃爍 */
Console.cart({
  kind: 'layout', id: 'glitch', apiVersion: 1,
  label: { zh: '訊號閃爍' },
  author: 'kinetic-lyric-console', license: 'MIT',
  rand: { sceneThemes: ['tech'], strong: true },
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize;
    const fit = ctx.fit;
    const CONFIG = ctx.config;
    const hex6 = ctx.hex6;
    const CE = ctx.centerIn;
    const A = ctx.anim;
    const enter = ctx.enter;
    const z=fit(sb,big);[[CONFIG.ghostOn?hex6(CONFIG.ghostA,"#ff3333"):"#f33",1],[CONFIG.ghostOn?hex6(CONFIG.ghostB,"#3399ff"):"#39f",-1]].forEach(([col,d])=>{const g=CE(c,`font-size:${z}px;color:${col};mix-blend-mode:screen`);g.textContent=sb.plain;
     A(g,[{transform:`translate(${d*14}px,0)`,clipPath:"inset(10% 0 60% 0)"},{transform:`translate(${-d*8}px,0)`,clipPath:"inset(55% 0 10% 0)",offset:.4},{transform:`translate(${d*3}px,0)`,clipPath:"inset(0)"}],{duration:300,easing:"steps(6)"})});
    const e=CE(c,`font-size:${z}px`);e.textContent=sb.plain;enter(e,"fade")
  },
});
