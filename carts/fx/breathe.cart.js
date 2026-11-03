/* 整句微微呼吸（放大縮小） */
Console.cart({
  kind: 'fx', id: 'breathe', apiVersion: 1,
  label: { zh: '整句微微呼吸（放大縮小）' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  meta: { energy: 'low', mood: ['抒情', '安靜', '通用'], tags: ['縮放'], use: '慢歌長句保持生命感', draft: true },
  rand: { group: 'cam' },
  play(ctx) {
    const A = ctx.anim;
    const fw = ctx.el;
    A(fw,[{scale:1},{scale:1.03},{scale:1}],{duration:4000,iterations:Infinity,easing:"ease-in-out"})
  },
});
