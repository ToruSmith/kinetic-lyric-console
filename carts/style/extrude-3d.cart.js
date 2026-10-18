/* 立体：短而實的 3D 厚度（比 `longshadow` 短） */
Console.cart({
  kind: 'style', id: 'extrude-3d', apiVersion: 1,
  label: { zh: '立体：短而實的 3D 厚度（比 `longshadow` 短）' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  scope: 'element',
  apply(ctx) {
    const addSh = (el, s) => ctx.shadow(s);
    const e = ctx.el;
    return (addSh(e,Array.from({length:12},(_,i)=>`${((i+1)*.012).toFixed(3)}em ${((i+1)*.012).toFixed(3)}em 0 color-mix(in srgb,var(--a) 70%,#000)`).join(",")));
  },
});
