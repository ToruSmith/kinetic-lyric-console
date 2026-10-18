/* 斜向結構線：粗細交錯的平行斜線＋反向細線，構成菱格骨架 */
Console.cart({
  kind: 'scene', id: 'diag-structure', apiVersion: 1,
  label: { zh: '斜向結構線' },
  author: 'kinetic-lyric-console', license: 'MIT',
  rand: { theme: 'neutral' },
  layer: 'under', group: 'struct', amount: 45, cost: '輕',
  // 逐句隨機的主題表（RND_SCN_TH）暫時仍在 core/ui/randomizer.js，維持舊的挑選順序；M4 改由這裡的 rand 宣告
  draw(c, p, u) {
    const lw = (c, p, k, m) => { c.lineWidth = Math.max(m || 1, p.H * k); };
    const al = u.fade;
       /* 斜向結構線：粗細交錯的平行斜線＋反向細線，構成菱格骨架 */
     const{W,H,t}=p,s=Math.max(30,H/(p.lite?5:7)),o=(t*s*.2)%s;c.strokeStyle=p.R;
     c.beginPath();lw(c,p,.006,2);al(c,p,.1+.35*p.a);for(let x=-H+o;x<W;x+=s){c.moveTo(x,H);c.lineTo(x+H,0)}c.stroke();
     c.beginPath();lw(c,p,.002);c.strokeStyle=p.C;al(c,p,.08+.25*p.a);for(let x=-o;x<W+H;x+=s/2){c.moveTo(x,0);c.lineTo(x-H,H)}c.stroke()
  },
});
