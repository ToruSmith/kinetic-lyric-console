/* 隨拍輕輕跳起 */
Console.cart({
  kind: 'fx', id: 'beat-jump', apiVersion: 1,
  label: { zh: '隨拍輕輕跳起' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  rand: { group: 'cam', strong: true },
  play(ctx) {
    const A = ctx.anim;
    const bt = () => ctx.beatMs();
    const fw = ctx.el;
    A(fw,[{translate:"0 0"},{translate:"0 -1.6cqh",offset:.3},{translate:"0 0"}],{duration:bt(),iterations:Infinity,easing:"ease-out"})
  },
});
