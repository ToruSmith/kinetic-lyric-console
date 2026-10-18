/* 一條強調色細線由左掃過、把字蓋掉 */
const BAR = "linear-gradient(var(--a),var(--a))";
Console.cart({
  kind: 'exit', id: 'sweep-cover', apiVersion: 1,
  label: { zh: '一條強調色細線由左掃過、把字蓋掉' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  keyframes: [{clipPath:"inset(0 0 0 0)",backgroundImage:BAR,backgroundRepeat:"no-repeat",backgroundSize:"0 100%",backgroundPosition:"0% 0",offset:0},
    {clipPath:"inset(0 0 0 0)",backgroundImage:BAR,backgroundRepeat:"no-repeat",backgroundSize:".3cqw 100%",backgroundPosition:"0% 0",offset:.02},
    {clipPath:"inset(0 0 0 99.7%)",backgroundImage:BAR,backgroundRepeat:"no-repeat",backgroundSize:".3cqw 100%",backgroundPosition:"100% 0",offset:1}],
});
