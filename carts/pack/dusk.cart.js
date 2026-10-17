/* 暮光：暖色、細明體、緩慢柔和的風格包（只是一包設定，沒有程式）。 */
Console.cart({
  kind: 'pack', id: 'dusk', apiVersion: 1,
  label: { zh: '暮光', en: 'Dusk' },
  author: 'kinetic-lyric-console', license: 'MIT',
  config: {
    font: '明體', weight: 300, spacing: 0.08,
    color: '#f4efe6', accent: '#e8a87c',
    dim: 35, pulse: 0.03, particles: 14, grain: 0.04, trans: 'crossfade',
    sceneAll: 'gradient-fade:40,light-spot:30',
    layoutPool: 'center,lowerleft,quote',
  },
});
