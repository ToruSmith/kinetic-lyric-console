/* 菱形群：斜向排列的菱形，交替脹縮 */
Console.cart({
  kind: 'scene', id: 'diamond-shapes', apiVersion: 1,
  label: { zh: '菱形群' },
  author: 'kinetic-lyric-console', license: 'MIT',
  rand: { theme: 'neutral' },
  layer: 'under', group: 'diamond', amount: 45, cost: '輕',
  lab: true,
  // 逐句隨機的主題表（RND_SCN_TH）暫時仍在 core/ui/randomizer.js，維持舊的挑選順序；M4 改由這裡的 rand 宣告
  draw(c, p, u) {
    const lw = (c, p, k, m) => { c.lineWidth = Math.max(m || 1, p.H * k); };
    const S = Math.sin;
    const al = u.fade;
       /* 菱形群：斜向排列的菱形，交替脹縮 */
     const{W,H,t}=p,s=Math.min(W,H)/(p.lite?5:7);c.fillStyle=p.R;c.strokeStyle=p.R;lw(c,p,.003,1.5);
     for(let j=-1;j*s<H+s;j++)for(let i=-1;i*s<W+s;i++){const x=i*s+(j%2?s/2:0),y=j*s*.5+s*.5,z=s*(.22+.2*S(t*1.4+i+j*.8))*(1+.2*p.bp);al(c,p,(.06+.25*p.a)*((i+j)%2?1:.5));c.beginPath();c.moveTo(x,y-z);c.lineTo(x+z,y);c.lineTo(x,y+z);c.lineTo(x-z,y);c.closePath();(i+j)%2?c.fill():c.stroke()}
  },
});
