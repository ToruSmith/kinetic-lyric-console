/* 粉紅條紋：ghostA／ghostB 交替的斜條，向左慢移 */
Console.cart({
  kind: 'scene', id: 'pink-stripes', apiVersion: 1,
  label: { zh: '粉紅條紋' },
  author: 'kinetic-lyric-console', license: 'MIT',
  rand: { theme: 'neutral' },
  layer: 'under', group: 'stripe', amount: 50, cost: '輕',
  // 逐句隨機的主題表（RND_SCN_TH）暫時仍在 core/ui/randomizer.js，維持舊的挑選順序；M4 改由這裡的 rand 宣告
  draw(c, p, u) {
    const al = u.fade;
       /* 粉紅條紋：ghostA／ghostB 交替的斜條，向左慢移 */
     const{W,H,t}=p,sp=W/12,o=(t*sp*.35)%(sp*2),sl=H*.6;
     for(let x=-sp*4-o,i=0;x<W+sp*2;x+=sp,i++){c.fillStyle=i%2?p.G2:p.G1;al(c,p,(.06+.26*p.a)*(i%2?.6:1));c.beginPath();c.moveTo(x,H);c.lineTo(x+sp*.7,H);c.lineTo(x+sp*.7+sl,0);c.lineTo(x+sl,0);c.closePath();c.fill()}
  },
});
