/* 逐字下落：每個字依序淡出並下沉（逐字版退場）。有 .ch 元素才逐字，否則用預設淡出。 */
Console.cart({
  kind: 'exit', id: 'cascade-out', apiVersion: 1,
  label: { zh: '逐字下落', en: 'Cascade Out' },
  author: 'kinetic-lyric-console', license: 'MIT',
  perChar({ index, count, random }) {
    const jitter = (random() - 0.5) * 1.2; // 種子亂數：同一句每次渲染結果相同
    return {
      kf: [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: `translate(${jitter}cqw,6cqh)` }],
      dur: 0.5,                              // 佔退場長度的比例
      at: (index / Math.max(1, count - 1)) * 0.5, // 延遲佔退場長度的比例
    };
  },
});
