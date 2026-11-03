/* 隨拍脈動（縮放） */
Console.cart({
  kind: 'fx', id: 'pulse', apiVersion: 1,
  label: { zh: '隨拍脈動（縮放）' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  meta: { energy: 'mid', mood: ['通用', '熱血'], tags: ['縮放', '節拍'], use: '快歌維持節奏', draft: true },
  rand: { group: 'cam' },
  play(ctx) {
    const A = ctx.anim;
    const bt = () => ctx.beatMs();
    const fw = ctx.el;
    A(fw,[{scale:1.05},{scale:1}],{duration:bt(),iterations:Infinity,easing:"ease-out"})
  },
});
