/* HUD 資訊面板（右上）：標題、數據列與條 */
Console.cart({
  kind: 'scene', id: 'hud-info', apiVersion: 1,
  label: { zh: 'HUD 資訊面板（右上）' },
  author: 'kinetic-lyric-console', license: 'MIT',
  layer: 'over', group: 'hudi', amount: 50, cost: '輕',
  lab: true,
  // 逐句隨機的主題表（RND_SCN_TH）暫時仍在 core/ui/randomizer.js，維持舊的挑選順序；M4 改由這裡的 rand 宣告
  draw(c, p, u) {
    const lw = (c, p, k, m) => { c.lineWidth = Math.max(m || 1, p.H * k); };
    const al = u.fade;
    const MONO = 'ui-monospace,Consolas,Menlo,monospace';
    const S = Math.sin;
       /* HUD 資訊面板（右上）：標題、數據列與條 */
     const{W,H,t}=p,w=W*(W>H?.2:.36),h=H*.16,x=W-w-H*.04,y=H*.04,f=Math.max(9,H*.02);c.strokeStyle=p.R;lw(c,p,.002);al(c,p,.3+.5*p.a);c.strokeRect(x,y,w,h);c.fillStyle=p.R;c.font=`${f}px ${MONO}`;c.textBaseline="top";
     c.fillText("SYSTEM INFO",x+f*.6,y+f*.5);for(let i=0;i<3;i++){const v=.5+.45*S(t*(.7+i*.3)+i*2);c.fillStyle=p.C;c.fillText(["CPU","MEM","NET"][i]+" "+String(Math.round(v*100)).padStart(3," ")+"%",x+f*.6,y+f*(1.9+i*1.3));c.fillStyle=p.R;c.fillRect(x+w*.58,y+f*(2.05+i*1.3),w*.36*v,f*.5)}
  },
});
