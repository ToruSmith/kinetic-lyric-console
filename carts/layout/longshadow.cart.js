/* 長影 */
Console.cart({
  kind: 'layout', id: 'longshadow', apiVersion: 1,
  label: { zh: '長影' },
  author: 'kinetic-lyric-console', license: 'MIT',
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize;
    const CE = ctx.centerIn;
    const fit = ctx.fit;
    const enter = ctx.enter;
    const sh=Array.from({length:40},(_,i)=>`${i+1}px ${i+1}px 0 var(--a)`).join(",");const e=CE(c,`font-size:${fit(sb,big)*1.3}px;font-weight:900;letter-spacing:.05em;text-shadow:${sh}`);e.textContent=sb.plain;enter(e,sb.en||"zoomin")
  },
});
