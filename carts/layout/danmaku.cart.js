/* 滿版：彈幕，三行由右向左飄過 */
Console.cart({
  kind: 'layout', id: 'danmaku', apiVersion: 1,
  label: { zh: '滿版：彈幕，三行由右向左飄過' },
  author: 'kinetic-lyric-console', license: 'MIT',
  flags: { full: true },
  rand: { sceneThemes: ['tech'], strong: true },
  render(ctx) {
    let sb = ctx.sentence, c = ctx.host, w = ctx.root, big = ctx.bigSize, sm = ctx.smallSize, dur = ctx.duration;
    const txtEl = ctx.text;
    const A = ctx.anim;
    [[22,1,1],[46,.7,.8],[70,.5,1.2]].forEach(([y,o,sp],i)=>{const e=txtEl(`left:0;top:${y}cqh;font-size:${sm*(2.2-i*.4)}px;white-space:nowrap;opacity:${o};letter-spacing:.2em`);e.textContent=sb.plain;c.appendChild(e);
    A(e,[{translate:"105cqw 0"},{translate:"-110cqw 0"}],{duration:Math.max(dur*1000*.9/sp,1500),delay:i*dur*120,easing:"linear"})})
  },
});
