/* 邊緣刻度：畫面四邊中央各一小段短刻度（像相機取景器），隨時間有一個亮點沿著下緣緩慢移動 */
Console.cart({
  kind: 'scene', id: 'edge-ticks', apiVersion: 1,
  label: { zh: '邊緣刻度' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  layer: 'over', group: 'edge', amount: 45, cost: '輕',
  // 逐句隨機的主題表（RND_SCN_TH）暫時仍在 core/ui/randomizer.js，維持舊的挑選順序；M4 改由這裡的 rand 宣告
  draw(c, p, u) {
    const al = u.fade;
    const PI = Math.PI;
       /* 端の目盛り：畫面四邊中央各一小段短刻度（像相機取景器），隨時間有一個亮點沿著下緣緩慢移動 */
     const{W,H,t}=p,s=H*.012,n=11;c.strokeStyle=p.C;c.lineWidth=Math.max(1,H*.002);al(c,p,.3+.5*p.a);c.beginPath();
     for(let i=0;i<n;i++){const f=(i-(n-1)/2)*s*2.4,l=i%5===0?s*1.6:s;c.moveTo(W/2+f,H-H*.04);c.lineTo(W/2+f,H-H*.04-l);c.moveTo(W/2+f,H*.04);c.lineTo(W/2+f,H*.04+l);c.moveTo(W*.025,H/2+f);c.lineTo(W*.025+l,H/2+f);c.moveTo(W*.975,H/2+f);c.lineTo(W*.975-l,H/2+f)}c.stroke();
     const k=((t*.1)%1)*(n-1)-(n-1)/2;c.fillStyle=p.R;c.beginPath();c.arc(W/2+k*s*2.4,H-H*.04-s*2.2,s*.35,0,PI*2);c.fill()
  },
});
