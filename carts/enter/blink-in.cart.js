/* 點滅幾下後亮起 */
Console.cart({
  kind: 'enter', id: 'blink-in', apiVersion: 1,
  label: { zh: '點滅幾下後亮起' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  meta: { energy: 'mid', mood: ['懸疑', '科技'], tags: ['閃爍'], use: '想讓文字延遲後突然亮起', draft: true },
  keyframes: [{opacity:0,offset:0},{opacity:1,offset:.15},{opacity:0,offset:.3},{opacity:1,offset:.45},{opacity:.2,offset:.6},{opacity:1,offset:.75},{opacity:1}],
  easing: "steps(1,end)",
});
