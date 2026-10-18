/* 色差抖動（隨 BPM） */
Console.cart({
  kind: 'fx', id: 'chromatic', apiVersion: 1,
  label: { zh: '色差抖動（隨 BPM）' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  rand: { group: 'color', strong: true, domOnly: true },
  play(ctx) {
    const tel = () => ctx.textEls();
    const A = ctx.anim;
    const fw = ctx.el;
    tel(fw).forEach(e=>A(e,[{textShadow:"-1px 0 rgba(255,0,0,.8),1px 0 rgba(0,200,255,.8)"},{textShadow:"-4px 0 rgba(255,0,0,.8),4px 0 rgba(0,200,255,.8)"}],{duration:ctx.beatMs(),iterations:Infinity,direction:"alternate",easing:"ease-in-out"}))
  },
});
