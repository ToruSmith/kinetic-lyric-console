/* 蛛網連線：漂移的節點，距離近的連線 */
Console.cart({
  kind: 'scene', id: 'web-lines', apiVersion: 1,
  label: { zh: '蛛網連線' },
  author: 'kinetic-lyric-console', license: 'MIT',
  layer: 'under', group: 'web', amount: 45, cost: '中',
  lab: true,
  // 逐句隨機的主題表（RND_SCN_TH）暫時仍在 core/ui/randomizer.js，維持舊的挑選順序；M4 改由這裡的 rand 宣告
  draw(c, p, u) {
    const TAU = Math.PI * 2;
    const S = Math.sin;
    const lw = (c, p, k, m) => { c.lineWidth = Math.max(m || 1, p.H * k); };
    const al = u.fade;
       /* 蛛網連線：漂移的節點，距離近的連線 */
     const{W,H,t,r}=p,n=p.lite?10:18,pts=[];for(let i=0;i<n;i++){const x0=r(),y0=r(),sx=.2+r()*.4,sy=.2+r()*.4,ph=r()*TAU;pts.push([(x0+.08*S(t*sx+ph))*W,(y0+.08*S(t*sy+ph*1.3))*H])}
     const D=Math.min(W,H)*.32;c.strokeStyle=p.R;lw(c,p,.002);
     for(let i=0;i<n;i++)for(let j=i+1;j<n;j++){const d=Math.hypot(pts[i][0]-pts[j][0],pts[i][1]-pts[j][1]);if(d<D){al(c,p,(1-d/D)*(.15+.5*p.a));c.beginPath();c.moveTo(...pts[i]);c.lineTo(...pts[j]);c.stroke()}}
     c.fillStyle=p.C;al(c,p,.3+.4*p.a);pts.forEach(q=>{c.beginPath();c.arc(q[0],q[1],H*.005*(1+p.bp),0,TAU);c.fill()})
  },
});
