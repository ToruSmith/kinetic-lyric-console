/* ===== [LAY-L] 版型 L（JIZURA 移植・第四批，「實驗室」）：frame-box corners drop-cap split-cut erode-repeat justify-stack。
   部分部品改寫自 JIZURA（原作者 hakoniwa；備份於 ToruSmith/JIZURA）。JIZURA is Copyright (c) 2026 hakoniwa, released under the MIT License（授權全文見本倉庫根目錄 LICENSE 的「Third-party notices」）。
   只讀其設計與數值後用 DOM＋細線重寫，沒有搬 Canvas 程式碼。
   對應：frame-box＝frameBox（額縁）／corners＝corners（対角配置）／drop-cap＝dropCap（大きな頭文字）／split-cut＝tySplitType（断ち割り）／erode-repeat＝tyErode（削り反復）／justify-stack＝tyJustify（幅揃え）。
   皆為時間純函數（A() 暫停動畫；不用 Math.random、不累積狀態；變化一律由句子編號 _jIdx 輪替）；只用文字加細線，不畫底板、不加不透明底色；
   非主文的線與點標 data-nm；不做 JIZURA 自帶的羅馬字、No. 編號、時間碼。不吃 {}。 ===== */
["frame-box","corners","drop-cap","split-cut","erode-repeat","justify-stack"].forEach(n=>LAB_LAYOUTS.add(n));

/* ---- frame-box 額縁：字被一個細線框圈住；框式依句子編號輪替 full／double／corners；四邊依序拉出 ---- */

/* ---- corners 対角配置：句子切成兩段，前段在一角、後段在對角；底下一條細線拐彎連過去，線尾收在強調色小點 ---- */

/* ---- drop-cap 大きな頭文字：第一個字放大成 2～3 行高，其餘字繞在右邊；首字式依句子編號輪替 fill／accent／outline ---- */

/* ---- split-cut 断ち割り：每行字從中線切成上下兩半，上半往右、下半往左錯開；切線是一條強調色細線由左拉到右 ---- */

/* ---- erode-repeat 削り反復：同一句重複 2～5 行，每行多出（或少掉）一段；主行用本字顏色與進場，其餘行淡階；左對齊在整句的寬度上 ---- */

/* ---- justify-stack 幅揃え：2～4 行，每行各自調字級撐到同一寬度（行首行尾切齊）；行間可加細線；字級不超過畫面高度 .2 ---- */
