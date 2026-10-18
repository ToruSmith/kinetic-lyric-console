/* 拼圖格：格線上交錯的圓形凸／凹榫（每條邊的方向由格座標雜湊決定） */
Console.cart({
  kind: 'scene', id: 'jigsaw-grid', apiVersion: 1,
  label: { zh: '拼圖格' },
  author: 'kinetic-lyric-console', license: 'MIT',
  rand: { theme: 'neutral' },
  layer: 'under', group: 'jig', amount: 40, cost: '中',
  lab: true,
  // 逐句隨機的主題表（RND_SCN_TH）暫時仍在 core/ui/randomizer.js，維持舊的挑選順序；M4 改由這裡的 rand 宣告
  draw(c, p, u) {
    const S = Math.sin;
    const lw = (c, p, k, m) => { c.lineWidth = Math.max(m || 1, p.H * k); };
    const al = u.fade;
    const hashN = u.hash;
    const TAU = Math.PI * 2;
       /* 拼圖格：格線上交錯的圓形凸／凹榫（每條邊的方向由格座標雜湊決定） */
     const{W,H,t}=p,cn=p.lite?5:7,s=W/cn,rn=Math.ceil(H/s),b=s*.1,o=S(t*.5)*s*.02;c.strokeStyle=p.R;lw(c,p,.003,1.5);al(c,p,.1+.35*p.a);c.beginPath();
     for(let j=0;j<=rn;j++)for(let i=0;i<cn;i++){const x=i*s+o,y=j*s,d=hashN(i+":"+j)%2?1:-1;c.moveTo(x,y);c.lineTo(x+s*.5-b,y);c.moveTo(x+s*.5+b,y);c.lineTo(x+s,y);c.moveTo(x+s*.5+b,y-d*b);c.arc(x+s*.5,y-d*b,b,0,TAU)}
     for(let i=0;i<=cn;i++)for(let j=0;j<rn;j++){const x=i*s+o,y=j*s,d=hashN(j+"|"+i)%2?1:-1;c.moveTo(x,y);c.lineTo(x,y+s*.5-b);c.moveTo(x,y+s*.5+b);c.lineTo(x,y+s);c.moveTo(x+d*b+b,y+s*.5);c.arc(x+d*b,y+s*.5,b,0,TAU)}c.stroke()
  },
});
