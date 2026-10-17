/* 逐字依序亮起（時間分配給整句） */
Console.cart({
  kind: 'fx', id: 'highlight-word', apiVersion: 1,
  label: { zh: '逐字依序亮起（時間分配給整句）' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  // 逐句隨機的挑選表仍在 core/ui/randomizer.js（維持舊挑選順序）；M4 改由這裡的 rand 宣告
  play(ctx) {
    const cl = () => ctx.charEls();
    const A = ctx.anim;
    const fw = ctx.el;
    const dur = ctx.duration;
    const l=cl(fw);if(!l.length)return;const t=dur*1000/l.length;l.forEach((c,i)=>A(c,[{color:"var(--c)"},{color:"var(--a)",offset:.3},{color:"var(--c)"}],{duration:t*1.6,delay:i*t,easing:"linear"}))
  },
});
