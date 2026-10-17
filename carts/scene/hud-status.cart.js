/* HUD 狀態文字（左下）：REC 計時＋BPM */
Console.cart({
  kind: 'scene', id: 'hud-status', apiVersion: 1,
  label: { zh: 'HUD 狀態文字（左下）' },
  author: 'kinetic-lyric-console', license: 'MIT',
  layer: 'over', group: 'huds', amount: 50, cost: '輕',
  lab: true,
  // 逐句隨機的主題表（RND_SCN_TH）暫時仍在 core/ui/randomizer.js，維持舊的挑選順序；M4 改由這裡的 rand 宣告
  draw(c, p, u) {
    const MONO = 'ui-monospace,Consolas,Menlo,monospace';
    const al = u.fade;
    const TAU = Math.PI * 2;
       /* HUD 狀態文字（左下）：REC 計時＋BPM */
     const{W,H,t}=p,f=Math.max(10,H*.024),x=H*.05,y=H-H*.05,ct=Math.floor(t),ms=Math.floor(t%1*10);c.font=`${f}px ${MONO}`;c.textBaseline="alphabetic";c.fillStyle=p.G1;al(c,p,(Math.floor(t*2)%2?.35:.9)*(.5+.5*p.a));c.beginPath();c.arc(x+f*.4,y-f*1.25,f*.32,0,TAU);c.fill();
     c.fillStyle=p.R;al(c,p,.4+.55*p.a);c.fillText("REC  00:"+String(Math.floor(ct/60)).padStart(2,"0")+":"+String(ct%60).padStart(2,"0")+"."+ms,x+f*1.1,y-f);c.fillStyle=p.C;al(c,p,.3+.4*p.a);c.fillText("BPM "+Math.round(u.bpm())+"  ·  STANDBY",x,y)
  },
});
