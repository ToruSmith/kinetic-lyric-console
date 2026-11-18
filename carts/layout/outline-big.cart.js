/* 前 3 個字放大成空心背景字，整句以小字疊在前面 */
Console.cart({
  kind: 'layout', id: 'outline-big', apiVersion: 1,
  label: { zh: '前 3 個字放大成空心背景字，整句以小字疊在前面' },
  author: 'kinetic-lyric-console', license: 'MIT',
  meta: { energy: 'mid', mood: ['力量', '通用'], tags: ['描邊', '排版'], use: '大空心字背景', draft: true },
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize;
    const CE = ctx.centerIn;
    const enter = ctx.enter;
    const fit = ctx.fit;
    /* ^box 限定區域時，背景大字限制在一行放得下（全畫面時維持原本大小） */
    const bz=ctx.region?Math.min(big*2.4,ctx.sw()*.95/3):big*2.4;
    const b=CE(c,`font-size:${bz}px;color:transparent;-webkit-text-stroke:2px rgba(255,255,255,.7);letter-spacing:0;opacity:.8`);b.textContent=sb.plain.slice(0,3);enter(b,"zoomin");
    const e=CE(c,`font-size:${fit(sb,big)*.5}px`);e.textContent=sb.plain;enter(e,sb.en||"rise")
  },
});
