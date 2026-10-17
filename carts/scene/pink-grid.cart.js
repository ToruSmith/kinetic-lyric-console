/* 粉紅方格：ghostA 格線，部分格子隨節拍閃爍填色 */
Console.cart({
  kind: 'scene', id: 'pink-grid', apiVersion: 1,
  label: { zh: '粉紅方格' },
  author: 'kinetic-lyric-console', license: 'MIT',
  layer: 'under', group: 'gridp', amount: 45, cost: '輕',
  lab: true,
  // 逐句隨機的主題表（RND_SCN_TH）暫時仍在 core/ui/randomizer.js，維持舊的挑選順序；M4 改由這裡的 rand 宣告
  draw(c, p, u) {
    const lw = (c, p, k, m) => { c.lineWidth = Math.max(m || 1, p.H * k); };
    const al = u.fade;
    const sr = u.random;
    const hashN = u.hash;
       /* 粉紅方格：ghostA 格線，部分格子隨節拍閃爍填色 */
     const{W,H,t}=p,cn=p.lite?8:12,s=W/cn,rn=Math.ceil(H/s);c.strokeStyle=p.G1;lw(c,p,.002);al(c,p,.1+.3*p.a);c.beginPath();
     for(let i=0;i<=cn;i++){c.moveTo(i*s,0);c.lineTo(i*s,H)}for(let j=0;j<=rn;j++){c.moveTo(0,j*s);c.lineTo(W,j*s)}c.stroke();
     c.fillStyle=p.G1;const k=Math.floor(t*4);
     for(let j=0;j<rn;j++)for(let i=0;i<cn;i++){const h=sr(hashN(i+","+j)/1000+k*.31)();if(h<.1){al(c,p,(.1+.35*p.a)*(.6+.4*p.bp));c.fillRect(i*s,j*s,s,s)}}
  },
});
