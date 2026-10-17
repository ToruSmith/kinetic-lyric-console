/* 心跳式雙拍脈動 */
Console.cart({
  kind: 'fx', id: 'heartbeat', apiVersion: 1,
  label: { zh: '心跳式雙拍脈動' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  play(ctx) {
    const A = ctx.anim;
    const bt = () => ctx.beatMs();
    const fw = ctx.el;
    A(fw,[{scale:1,offset:0},{scale:1.06,offset:.12},{scale:1,offset:.24},{scale:1.04,offset:.36},{scale:1}],{duration:bt()*2,iterations:Infinity,easing:"ease-out"})
  },
});
