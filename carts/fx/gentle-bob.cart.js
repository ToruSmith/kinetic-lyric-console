/* 輕晃：整句緩慢上下漂浮（宣告式）。用獨立屬性 translate，不和進場的 transform 打架。 */
Console.cart({
  kind: 'fx', id: 'gentle-bob', apiVersion: 1,
  label: { zh: '輕晃', en: 'Gentle Bob' },
  author: 'kinetic-lyric-console', license: 'MIT',
  rand: { group: 'cam' }, // 逐句隨機時，與同樣動 translate 的特效互斥
  keyframes: [{ translate: '0 0' }, { translate: '0 -.9cqh' }, { translate: '0 0' }],
  duration: 3600,
  easing: 'ease-in-out',
});
