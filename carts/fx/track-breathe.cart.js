/* 字距輕微呼吸 */
Console.cart({
  kind: 'fx', id: 'track-breathe', apiVersion: 1,
  label: { zh: '字距輕微呼吸' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  play(ctx) {
    const tel = () => ctx.textEls();
    const getComputedStyle = ctx.computed;
    const A = ctx.anim;
    const fw = ctx.el;
    tel(fw).forEach(e=>{const cs=getComputedStyle(e),fs=parseFloat(cs.fontSize)||16,ls=parseFloat(cs.letterSpacing)||0;   /* 字距寫在各文字元素上，不會從父層繼承，所以逐元素加動畫 */
    A(e,[{letterSpacing:(ls-.03*fs)+"px"},{letterSpacing:(ls+.03*fs)+"px"}],{duration:2500,iterations:Infinity,direction:"alternate",easing:"ease-in-out"})})
  },
});
