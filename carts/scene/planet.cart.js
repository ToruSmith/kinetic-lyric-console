/* 行星：右下大球（漸層球體）＋傾斜光環＋一顆繞行小衛星 */
Console.cart({
  kind: 'scene', id: 'planet', apiVersion: 1,
  label: { zh: '行星' },
  author: 'kinetic-lyric-console', license: 'MIT',
  rand: { theme: 'neutral' },
  layer: 'under', group: 'planet', amount: 45, cost: '中',
  lab: true,
  // 逐句隨機的主題表（RND_SCN_TH）暫時仍在 core/ui/randomizer.js，維持舊的挑選順序；M4 改由這裡的 rand 宣告
  draw(c, p, u) {
    const lw = (c, p, k, m) => { c.lineWidth = Math.max(m || 1, p.H * k); };
    const al = u.fade;
    const PI = Math.PI;
    const TAU = Math.PI * 2;
       /* 行星：右下大球（漸層球體）＋傾斜光環＋一顆繞行小衛星 */
     const{W,H,t}=p,x=W*.78,y=H*.7,R=H*.2*(1+.015*p.bp),g=c.createRadialGradient(x-R*.35,y-R*.35,R*.1,x,y,R);g.addColorStop(0,p.C);g.addColorStop(.45,p.R);g.addColorStop(1,"#000");
     c.save();c.translate(x,y);c.rotate(-.35);c.strokeStyle=p.C;lw(c,p,.004,2);al(c,p,.15+.3*p.a);c.beginPath();c.ellipse(0,0,R*1.7,R*.4,0,PI,TAU);c.stroke();c.restore();
     c.fillStyle=g;al(c,p,.2+.6*p.a);c.beginPath();c.arc(x,y,R,0,TAU);c.fill();
     c.save();c.translate(x,y);c.rotate(-.35);c.strokeStyle=p.C;lw(c,p,.004,2);al(c,p,.2+.4*p.a);c.beginPath();c.ellipse(0,0,R*1.7,R*.4,0,0,PI);c.stroke();c.restore();
     const a=t*.5;c.fillStyle=p.C;al(c,p,.5+.4*p.a);c.beginPath();c.arc(x+Math.cos(a)*R*2.1,y+Math.sin(a)*R*.7,R*.1,0,TAU);c.fill()
  },
});
