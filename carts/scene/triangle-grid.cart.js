/* 三角網格：三個方向的線構成三角格，向上緩移 */
Console.cart({
  kind: 'scene', id: 'triangle-grid', apiVersion: 1,
  label: { zh: '三角網格' },
  author: 'kinetic-lyric-console', license: 'MIT',
  layer: 'under', group: 'tri', amount: 45, cost: '輕',
  lab: true,
  // 逐句隨機的主題表（RND_SCN_TH）暫時仍在 core/ui/randomizer.js，維持舊的挑選順序；M4 改由這裡的 rand 宣告
  draw(c, p, u) {
    const lw = (c, p, k, m) => { c.lineWidth = Math.max(m || 1, p.H * k); };
    const al = u.fade;
    const PI = Math.PI;
       /* 三角網格：三個方向的線構成三角格，向上緩移 */
     const{W,H,t}=p,s=H/(p.lite?5:8),hh=s*.866,o=(t*s*.15)%hh;c.strokeStyle=p.R;lw(c,p,.002);al(c,p,.08+.3*p.a);c.beginPath();
     for(let y=-hh+o;y<H+hh;y+=hh){c.moveTo(0,y);c.lineTo(W,y)}
     for(let x=-H*1.2;x<W+H*1.2;x+=s){c.moveTo(x,H);c.lineTo(x+H/Math.tan(PI/3),0);c.moveTo(x,0);c.lineTo(x+H/Math.tan(PI/3),H)}c.stroke()
  },
});
