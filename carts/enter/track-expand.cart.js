/* 字間拡張：字距由緊縮撐開到正常並淡入 */
Console.cart({
  kind: 'enter', id: 'track-expand', apiVersion: 1,
  label: { zh: '字間拡張：字距由緊縮撐開到正常並淡入' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  play(ctx) {
    const A = ctx.anim;
    const el = ctx.el;
    const l = ctx.charEls;
    const d = ctx.duration;
       /* 字間拡張：字距從緊縮撐開到原本的字距，同時淡入 ≈（以元素本身的 letter-spacing 為終點） */
    const e0=parseFloat(el.style.letterSpacing),end=isNaN(e0)?(+ctx.config.spacing||0):e0;
    A(el,[{opacity:0,letterSpacing:`${(end-.5).toFixed(3)}em`},{opacity:1,letterSpacing:`${end}em`}],{duration:d*1.2,easing:"cubic-bezier(.16,1,.3,1)"})
  },
});
