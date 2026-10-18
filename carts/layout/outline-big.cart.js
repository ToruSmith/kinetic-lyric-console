/* 前 3 個字放大成空心背景字，整句以小字疊在前面 */
Console.cart({
  kind: 'layout', id: 'outline-big', apiVersion: 1,
  label: { zh: '前 3 個字放大成空心背景字，整句以小字疊在前面' },
  author: 'kinetic-lyric-console', license: 'MIT',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize;
    const CE = ctx.centerIn;
    const enter = ctx.enter;
    const fit = ctx.fit;
    const b=CE(c,`font-size:${big*2.4}px;color:transparent;-webkit-text-stroke:2px rgba(255,255,255,.7);letter-spacing:0;opacity:.8`);b.textContent=sb.plain.slice(0,3);enter(b,"zoomin");
    const e=CE(c,`font-size:${fit(sb,big)*.5}px`);e.textContent=sb.plain;enter(e,sb.en||"rise")
  },
});
