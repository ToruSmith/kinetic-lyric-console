/* 心跳式雙拍脈動 */
Console.cart({
  kind: 'fx', id: 'heartbeat', apiVersion: 1,
  label: { zh: '心跳式雙拍脈動' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  meta: { energy: 'mid', mood: ['抒情', '力量'], tags: ['縮放', '節拍'], use: '心跳、緊張或告白', draft: true },
  rand: { group: 'cam' },
  play(ctx) {
    const A = ctx.anim;
    const bt = () => ctx.beatMs();
    const fw = ctx.el;
    A(fw,[{scale:1,offset:0},{scale:1.06,offset:.12},{scale:1,offset:.24},{scale:1.04,offset:.36},{scale:1}],{duration:bt()*2,iterations:Infinity,easing:"ease-out"})
  },
});
