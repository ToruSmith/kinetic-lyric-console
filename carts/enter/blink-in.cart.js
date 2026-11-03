/* 點滅幾下後亮起 */
Console.cart({
  kind: 'enter', id: 'blink-in', apiVersion: 1,
  label: { zh: '點滅幾下後亮起' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  meta: { energy: 'mid', mood: ['懸疑', '科技'], tags: ['閃爍'], use: '像燈管接觸不良般亮起，光敏風險請少量', draft: true },
  // 每段都要用 steps：寫在動畫層級會讓整段停在第一格，看不到閃爍
  keyframes: [{opacity:0,offset:0,easing:"steps(1,end)"},{opacity:1,offset:.15,easing:"steps(1,end)"},{opacity:0,offset:.3,easing:"steps(1,end)"},{opacity:1,offset:.45,easing:"steps(1,end)"},{opacity:.2,offset:.6,easing:"steps(1,end)"},{opacity:1,offset:.75,easing:"steps(1,end)"},{opacity:1}],
  easing: "linear",
});
