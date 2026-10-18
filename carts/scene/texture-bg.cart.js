/* 紙質紋理：種子斑點與細纖維，整體微微漂移 */
Console.cart({
  kind: 'scene', id: 'texture-bg', apiVersion: 1,
  label: { zh: '紙質紋理' },
  author: 'kinetic-lyric-console', license: 'MIT',
  rand: { theme: 'neutral' },
  layer: 'under', group: 'tex', amount: 40, cost: '中',
  lab: true,
  // 逐句隨機的主題表（RND_SCN_TH）暫時仍在 core/ui/randomizer.js，維持舊的挑選順序；M4 改由這裡的 rand 宣告
  draw(c, p, u) {
    const S = Math.sin;
    const lw = (c, p, k, m) => { c.lineWidth = Math.max(m || 1, p.H * k); };
    const al = u.fade;
    const TAU = Math.PI * 2;
       /* 紙質紋理：種子斑點與細纖維，整體微微漂移 */
     const{W,H,t,r}=p,n=p.lite?120:300,ox=S(t*.1)*W*.004,oy=Math.cos(t*.08)*H*.004;c.fillStyle=p.C;c.strokeStyle=p.C;lw(c,p,.0012);
     for(let i=0;i<n;i++){const x=r()*W+ox,y=r()*H+oy,z=H*(.001+.003*r()),q=r();al(c,p,(.08+.3*p.a)*q);if(i%4){c.beginPath();c.arc(x,y,z,0,TAU);c.fill()}else{const a=r()*TAU,l=H*(.01+.03*r());c.beginPath();c.moveTo(x,y);c.lineTo(x+Math.cos(a)*l,y+Math.sin(a)*l);c.stroke()}}
  },
});
