/* 浮雕：左上亮、右下暗的雙層陰影，讓字有凸起感（逐元素樣式）。 */
Console.cart({
  kind: 'style', id: 'emboss', apiVersion: 1,
  label: { zh: '浮雕', en: 'Emboss' },
  author: 'kinetic-lyric-console', license: 'MIT',
  scope: 'element',
  apply(ctx) {
    ctx.shadow('-.03em -.03em 0 rgba(255,255,255,.55)');
    ctx.shadow('.04em .05em .02em rgba(0,0,0,.6)');
  },
});
