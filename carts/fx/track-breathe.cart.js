/* 字距輕微呼吸 */
Console.cart({
  kind: 'fx', id: 'track-breathe', apiVersion: 1,
  label: { zh: '字距輕微呼吸' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  meta: { energy: 'low', mood: ['抒情', '安靜'], tags: ['字距'], use: '高級感的微動', draft: true },
  rand: { group: 'char', domOnly: true },
  play(ctx) {
    const tel = () => ctx.textEls();
    const getComputedStyle = ctx.computed;
    const A = ctx.anim;
    const fw = ctx.el;
    tel(fw).forEach(e=>{const cs=getComputedStyle(e),fs=parseFloat(cs.fontSize)||16,ls=parseFloat(cs.letterSpacing)||0;   /* 字距寫在各文字元素上，不會從父層繼承，所以逐元素加動畫 */
    A(e,[{letterSpacing:(ls-.03*fs)+"px"},{letterSpacing:(ls+.03*fs)+"px"}],{duration:2500,iterations:Infinity,direction:"alternate",easing:"ease-in-out"})})
  },
});
