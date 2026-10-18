/* 像素視窗（左上）：復古作業系統小視窗，標題列＋三顆按鈕 */
Console.cart({
  kind: 'scene', id: 'pixel-window', apiVersion: 1,
  label: { zh: '像素視窗（左上）' },
  author: 'kinetic-lyric-console', license: 'MIT',
  rand: { theme: 'tech' },
  layer: 'over', group: 'win', amount: 40, cost: '輕',
  lab: true,
  // 逐句隨機的主題表（RND_SCN_TH）暫時仍在 core/ui/randomizer.js，維持舊的挑選順序；M4 改由這裡的 rand 宣告
  draw(c, p, u) {
    const S = Math.sin;
    const al = u.fade;
    const lw = (c, p, k, m) => { c.lineWidth = Math.max(m || 1, p.H * k); };
    const MONO = 'ui-monospace,Consolas,Menlo,monospace';
       /* 像素視窗（左上）：復古作業系統小視窗，標題列＋三顆按鈕 */
     const{W,H,t}=p,w=W*(W>H?.2:.42),h=H*.14,x=H*.05,y=H*.05+S(t*.5)*H*.004,tb=h*.22;c.fillStyle="#000";al(c,p,.45*p.a+.1);c.fillRect(x,y,w,h);c.fillStyle=p.R;al(c,p,.5+.4*p.a);c.fillRect(x,y,w,tb);
     c.strokeStyle=p.R;lw(c,p,.003,2);c.strokeRect(x,y,w,h);c.fillStyle=p.C;[0,1,2].forEach(i=>c.fillRect(x+w-(i+1)*tb*1.1,y+tb*.2,tb*.6,tb*.6));
     c.font=`${Math.max(9,tb*.7)}px ${MONO}`;c.textBaseline="middle";c.fillStyle="#000";c.fillText("lyrics.exe",x+tb*.4,y+tb*.5);c.fillStyle=p.C;for(let i=0;i<3;i++)c.fillRect(x+tb*.4,y+tb*(1.6+i*.8),w*(.4+.4*Math.abs(S(i*2+Math.floor(t))))*.8,tb*.3)
  },
});
