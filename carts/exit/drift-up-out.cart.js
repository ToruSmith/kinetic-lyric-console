/* 上飄淡出：整句往上飄一小段並模糊消失（整句版退場，宣告式）。 */
Console.cart({
  kind: 'exit', id: 'drift-up-out', apiVersion: 1,
  label: { zh: '上飄淡出', en: 'Drift Up' },
  author: 'kinetic-lyric-console', license: 'MIT',
  keyframes: [
    { opacity: 1, transform: 'none', filter: 'blur(0)' },
    { opacity: 0, transform: 'translateY(-4cqh)', filter: 'blur(5px)' },
  ],
});
