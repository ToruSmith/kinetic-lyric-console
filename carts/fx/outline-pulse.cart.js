/* 輪廓光隨拍脈動 */
Console.cart({
  kind: 'fx', id: 'outline-pulse', apiVersion: 1,
  label: { zh: '輪廓光隨拍脈動' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  rand: { group: 'color', domOnly: true },
  play(ctx) {
    const tel = () => ctx.textEls();
    const A = ctx.anim;
    const fw = ctx.el;
    tel(fw).forEach(e=>A(e,[{textShadow:"0 0 0 transparent"},{textShadow:"0 0 16px var(--a),0 0 2px var(--a)",offset:.1},{textShadow:"0 0 0 transparent"}],{duration:ctx.beatMs(),iterations:Infinity,easing:"ease-out"}))
  },
});
