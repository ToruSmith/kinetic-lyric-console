/* 百葉窗閉合 */
const bl = (inn,k)=>{const a=[];for(let j=0;j<=k;j++){const v=(inn?j/k:1-j/k)*12.5,m=`repeating-linear-gradient(180deg,#000 0,#000 ${v.toFixed(2)}%,transparent ${v.toFixed(2)}%,transparent 12.5%)`;a.push({maskImage:m,WebkitMaskImage:m,offset:j/k})}return a};
Console.cart({
  kind: 'exit', id: 'blinds-out', apiVersion: 1,
  label: { zh: '百葉窗閉合' },
  author: 'hakoniwa (JIZURA) / kinetic-lyric-console', license: 'MIT',
  source: 'https://github.com/852wa/JIZURA',
  meta: { energy: 'mid', mood: ['科技', '復古'], tags: ['遮罩'], use: '與百葉窗進場成對', draft: true },
  keyframes: bl(0,8),
});
