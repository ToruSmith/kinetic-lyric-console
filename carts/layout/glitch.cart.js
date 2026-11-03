/* 主文疊兩層紅藍殘影，像訊號干擾般閃動 */
Console.cart({
  kind: 'layout', id: 'glitch', apiVersion: 1,
  label: { zh: '主文疊兩層紅藍殘影，像訊號干擾般閃動' },
  author: 'kinetic-lyric-console', license: 'MIT',
  meta: { energy: 'high', mood: ['科技', '懸疑'], tags: ['故障', '閃爍'], use: '故障感，光敏風險請少量', draft: true },
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
