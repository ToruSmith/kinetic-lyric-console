/* 逐字上浮：每個字依序從下方升起並淡入；沒有逐字元素時退回整句淡入。 */
Console.cart({
  kind: 'enter', id: 'rise-stagger', apiVersion: 1,
  label: { zh: '逐字上浮', en: 'Rise Stagger' },
  author: 'kinetic-lyric-console', license: 'MIT',
  perChar: {
    gap: 55, // 每字延遲（毫秒）
    keyframes: () => [
      { opacity: 0, transform: 'translateY(3cqh)' },
      { opacity: 1, transform: 'translateY(-.5cqh)', offset: 0.7 },
      { opacity: 1, transform: 'none' },
    ],
    fallback: [{ opacity: 0, transform: 'translateY(3cqh)' }, { opacity: 1, transform: 'none' }],
  },
});
