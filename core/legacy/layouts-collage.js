/* ===== [LAY-D] 版型 D：collage handwrite marker；停格抖動特效 stopmotion；種子亂數 sr()；並在區段末補登 center ripple-pool … annotate 等後段版型名稱到 LAYOUTS ===== */
FONTS.手寫='"Segoe Script","Bradley Hand","Kaiti TC",BiauKai,DFKai-SB,"Comic Sans MS",cursive';
const sr=q=>{let a=Math.floor(q*1000)+7;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}; // 以句子起點為種子，跳轉後排版不變
LAYOUTS.push("ripple-pool","constellation","particle-form","ink-bleed");ENTERS.push("iris");
