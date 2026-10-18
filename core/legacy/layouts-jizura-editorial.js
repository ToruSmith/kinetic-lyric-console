/* ===== [LAY-K] 版型 K（JIZURA 移植・第二批，「實驗室」）：headline-lead footnote quote tilt-vertical v-ruler list-table ruby big-sandwich cross。
   部分部品改寫自 JIZURA（原作者 hakoniwa；備份於 ToruSmith/JIZURA；MIT，授權全文見根目錄 LICENSE）。只讀設計與數值，用 DOM＋細線重寫，沒有搬 Canvas 程式碼。
   對應：headline-lead＝見出しとリード／footnote＝脚注／quote＝引用／tilt-vertical＝縦倒し／v-ruler＝縦目盛り／list-table＝一覧表／ruby＝ルビ振り／big-sandwich＝大字挟み（tyKeySplit）／cross＝十字組（tyCross）。
   皆為時間純函數；只有文字加細線，不畫底板；非主文的線與點標 data-nm。字級都經 capSize 限制。headline-lead／big-sandwich／cross 吃 {}（BRACE_LAYOUTS）；ruby／footnote 自己畫副文（||，SUB_OWN）。
   共用小工具 _j*、hair、tick、capSize 在 23-lay-j.js。 ===== */
["headline-lead","footnote","quote","tilt-vertical","v-ruler","list-table","ruby","big-sandwich","cross"].forEach(n=>LAB_LAYOUTS.add(n));
SUB_OWN.add("ruby");SUB_OWN.add("footnote");









