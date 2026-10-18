/* 桌面圖示（左側一排）：資料夾圖示＋檔名 */
Console.cart({
  kind: 'scene', id: 'desktop-icon', apiVersion: 1,
  label: { zh: '桌面圖示（左側一排）' },
  author: 'kinetic-lyric-console', license: 'MIT',
  rand: { theme: 'tech' },
  layer: 'over', group: 'icon', amount: 40, cost: '輕',
  lab: true,
  // 逐句隨機的主題表（RND_SCN_TH）暫時仍在 core/ui/randomizer.js，維持舊的挑選順序；M4 改由這裡的 rand 宣告
  draw(c, p, u) {
    const MONO = 'ui-monospace,Consolas,Menlo,monospace';
    const al = u.fade;
       /* 桌面圖示（左側一排）：資料夾圖示＋檔名 */
     const{H,t}=p,s=H*.07,x=H*.05,f=Math.max(9,s*.2);c.font=`${f}px ${MONO}`;c.textAlign="center";c.textBaseline="top";
     ["LYRICS","MEMO","MUSIC","TRASH"].forEach((n,i)=>{const y=H*.3+i*s*1.5,hl=Math.floor(t*.5)%4===i;c.fillStyle=p.R;al(c,p,(.4+.5*p.a)*(hl?1:.7));c.fillRect(x,y+s*.15,s*.45,s*.12);c.fillRect(x,y+s*.25,s,s*.6);c.fillStyle=p.C;al(c,p,.5+.4*p.a);c.fillText(n,x+s/2,y+s*.95)});c.textAlign="start"
  },
});
