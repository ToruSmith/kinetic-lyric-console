# 卡帶清單

> 由 `node tools/gen-catalog.mjs` 自動產生，請勿手改。新增卡帶後重跑即可。

共 232 個卡帶：版型 77、進場 34、退場 37、持續特效 33、文字樣式 14、場景 36、風格包 1。

## 版型（layout，77）

| id | 說明 | 作者 | 檔案 |
|---|---|---|---|
| `annotate` | **吃 `{}`**：手繪圈選、底線、星號標記 `{關鍵字}`（三種標記輪流） | kinetic-lyric-console | `carts/layout/annotate.cart.js` |
| `baseline` | 2～3 行字，每行下一條橫跨畫面的髮絲基線；{} 關鍵字下再加一條強調色粗線（沒有 {} 就不畫）。基線依行由左拉出，文字跟著淡入，粗線最後拉出 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/layout/baseline.cart.js` |
| `big-sandwich` | 關鍵字放大置中，前後文字縮小夾在兩側（直式畫面改為上下夾）；關鍵字＝{} 內第一段，沒有就取最長字詞或正中間的字；大字上限約畫面高度 26% | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/layout/big-sandwich.cart.js` |
| `blinds` | 文字被切成 24 條細條，上下交錯滑入（百葉窗） | kinetic-lyric-console | `carts/layout/blinds.cart.js` |
| `blurfocus` | 由模糊且字距很寬的狀態慢慢對焦 | kinetic-lyric-console | `carts/layout/blurfocus.cart.js` |
| `border-run` | 滿版：邊框跑動 | kinetic-lyric-console | `carts/layout/border-run.cart.js` |
| `bubble` | 白底對話泡泡，彈性出現 | kinetic-lyric-console | `carts/layout/bubble.cart.js` |
| `cards` | 字卡：每字（>8 字時每 2 字）一張白卡，落下排成列 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/layout/cards.cart.js` |
| `center` | 置中，最適合搭配樣式與進場動畫，**最安全、通用的選擇** | kinetic-lyric-console | `carts/layout/center.cart.js` |
| `circle-badge` | **吃 `{}`**：整句沿圓環排列並旋轉，中央放一個大字（第一個 `{}`，沒有取首字） | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/layout/circle-badge.cart.js` |
| `collage` | 拼貼風：每個字像剪貼的貼紙，隨機底色與字體（同一句固定） | kinetic-lyric-console | `carts/layout/collage.cart.js` |
| `corners` | 対角配置：句子切成兩段放在對角，一條細線拐彎連過去 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/layout/corners.cart.js` |
| `crayon-shatter` | 同上，字心強調色、粗糙描邊與微傾斜 | kinetic-lyric-console | `carts/layout/crayon-shatter.cart.js` |
| `cross` | 關鍵字在中央，前文在它左邊橫排＋上方直排、後文在右邊橫排＋下方直排（直排是淡淡的回聲，只取最近 6 字）；字都小，不遮影片 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/layout/cross.cart.js` |
| `cute-outline` | 圓潤白色厚描邊貼紙字＋彩色字心，逐字彈跳、交替傾斜 | kinetic-lyric-console | `carts/layout/cute-outline.cart.js` |
| `cylinder` | 滾筒翻轉（會顯示前後句） | kinetic-lyric-console | `carts/layout/cylinder.cart.js` |
| `danmaku` | 滿版：彈幕，三行由右向左飄過 | kinetic-lyric-console | `carts/layout/danmaku.cart.js` |
| `diagonal` | **吃 `{}`**：斜 8 度，上方大字（第一個 `{}`，沒有取前 2 字）加下方整句 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/layout/diagonal.cart.js` |
| `drop-cap` | 大きな頭文字：第一個字放大成 2～3 行高，其餘繞在右邊（至少 3 字） | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/layout/drop-cap.cart.js` |
| `erode-repeat` | 削り反復：同一句重複 2～5 行，每行多（或少）一段，主行高亮 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/layout/erode-repeat.cart.js` |
| `falling` | 字雨：背景持續落下的淡字＋主文逐字落下彈跳 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/layout/falling.cart.js` |
| `flash-words` | 以空白／標點分詞，一個詞一個詞快速閃現，例如 `快 跑 不 要 停下來`；沒有空白時每 2 字一組 | kinetic-lyric-console | `carts/layout/flash-words.cart.js` |
| `footnote` | 正文在下三分之一，句尾加 ※；最下方細線＋小字註腳（註腳＝副文 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/layout/footnote.cart.js` |
| `formula` | 公式覆蓋：主文後方漂浮的等寬公式碎片（種子產生） | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/layout/formula.cart.js` |
| `frame-box` | 額縁：字被細線框圈住；框式依句子編號輪替（整框／雙線／四角） | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/layout/frame-box.cart.js` |
| `full-track` | 每個字平均撐開到整個畫面寬（直式畫面改為高度），左右（上下）留 6～8；超過 12 字改兩行（直式兩欄）各自撐開；字從中心向兩側散開，線再拉出 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/layout/full-track.cart.js` |
| `glitch` | 訊號閃爍 | kinetic-lyric-console | `carts/layout/glitch.cart.js` |
| `glow-cards` | 發光字卡：暗底＋強調色發光邊框 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/layout/glow-cards.cart.js` |
| `handwrite` | 手寫：逐字出現並描繪底線；預設用手寫字體，若你指定了字體則尊重你的選擇 | kinetic-lyric-console | `carts/layout/handwrite.cart.js` |
| `headline-lead` | 左下一組「大標題＋短強調線＋小導語」。標題＝{} 內的字；沒有 {} 就取前半句；導語＝其餘 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/layout/headline-lead.cart.js` |
| `hero-text` | 粗體巨字＋六層強調色擠出立體陰影，重重砸入 | kinetic-lyric-console | `carts/layout/hero-text.cart.js` |
| `hud-frame` | 滿版：遊戲介面風 | kinetic-lyric-console | `carts/layout/hud-frame.cart.js` |
| `iris-frame` | 光圈框（偶數句圓、奇數句矩形） | kinetic-lyric-console | `carts/layout/iris-frame.cart.js` |
| `justify-stack` | 幅揃え：2～4 行，每行字級調到同寬（字級仍受高度上限限制，至少 3 字） | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/layout/justify-stack.cart.js` |
| `keyword` | **吃 `{}`**：`{}` 關鍵字放大成強調色，其餘小字排在旁邊；沒寫 `{}` 時取前 2 字 | kinetic-lyric-console | `carts/layout/keyword.cart.js` |
| `laser-scan` | 亮線掃過露出文字（偶數句橫向、奇數句直向） | kinetic-lyric-console | `carts/layout/laser-scan.cart.js` |
| `layered` | 疊層字：主文後方三層強調色描邊殘影，向右下展開 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/layout/layered.cart.js` |
| `line-focus` | 顯示整句，{} 內是「這一鏡的片段」，其餘降到 .45 透明度；片段以底線／圓點／框線標出（依句子編號輪替）；整句先淡入，再把標記拉出。沒有 {} 就整句正常顯示、不畫標記 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/layout/line-focus.cart.js` |
| `list-table` | 像目錄或表格，每行一條細分隔線；用換行分行，行內用 ｜ 分成「項目｜內容」兩欄；單行長句自動拆成 2～4 行 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/layout/list-table.cart.js` |
| `longshadow` | 長影 | kinetic-lyric-console | `carts/layout/longshadow.cart.js` |
| `margin` | 文字靠角落（左下／右上／右下／左中依句子編號輪替），旁邊拉出一條髮絲線，線尾收在小方點；線先拉出，文字再淡入並向內收 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/layout/margin.cart.js` |
| `marker` | 螢光筆：字下半加半透明色帶，不蓋字 | kinetic-lyric-console | `carts/layout/marker.cart.js` |
| `marquee` | 滿版：跑馬燈，兩排橫向捲動，一排實心一排空心 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/layout/marquee.cart.js` |
| `mirror-reflect` | 水面倒影 | kinetic-lyric-console | `carts/layout/mirror-reflect.cart.js` |
| `noise-text` | 主文加兩層色差殘影，每 80ms 換一次抖動位置 | kinetic-lyric-console | `carts/layout/noise-text.cart.js` |
| `orbit` | 文字沿圓弧排列並緩慢旋轉 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/layout/orbit.cart.js` |
| `outline-big` | 前 3 個字放大成空心背景字，整句以小字疊在前面 | kinetic-lyric-console | `carts/layout/outline-big.cart.js` |
| `page-flip` | 3D 翻頁露出下一句（會顯示前一句；單獨使用時前後空白） | kinetic-lyric-console | `carts/layout/page-flip.cart.js` |
| `parallax-depth` | 多層景深視差 | kinetic-lyric-console | `carts/layout/parallax-depth.cart.js` |
| `polaroid` | 相紙卡依序滑入疊放 | kinetic-lyric-console | `carts/layout/polaroid.cart.js` |
| `poster` | **吃 `{}`**：海報式大字（取第一個 `{}`，沒有就用整句）＋細線＋小字 | kinetic-lyric-console | `carts/layout/poster.cart.js` |
| `pv-lyric` | **吃 `{}`**：橫排、靠左（預設落在畫面左側、約 54% 高度）。一般字是細黑體小字，`{}` 內的字變成**毛筆大字**（約 1.9 倍大，發光、色差收斂、帶淡墨暈影）。`(註解)` 會出現在關鍵字右下角，前面帶 `‹‹‹`。**沒寫 `{}` 時，自動把句尾 2 個字當關鍵字。** | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/layout/pv-lyric.cart.js` |
| `pv-vertical` | **吃 `{}`**：同上，但直排、靠右，由上往下展開。 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/layout/pv-vertical.cart.js` |
| `quote` | 文字置中，左上與右下各一個大引號（強調色、半透明；字級最大約文字的 2.2 倍，不遮影片） | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/layout/quote.cart.js` |
| `ruby` | 每個字上方一行小注音。注音取自副文（ | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/layout/ruby.cart.js` |
| `scale-steps` | 一句拆成 2～7 段（依逗號／空白切，切不出來就平均切），字級依比例逐段放大（或縮小），基線對齊；由小到大依序淡入，底下一條髮絲線 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/layout/scale-steps.cart.js` |
| `scatter` | 散落字：每字在格內隨機偏移、旋轉、縮放，由四方飛入 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/layout/scatter.cart.js` |
| `scroll` | 捲動歌詞：同時顯示前後各兩句，目前句最大，其他句模糊淡出（需要上下文，第一句與最後一句會少一邊） | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/layout/scroll.cart.js` |
| `shatter-text` | 4 片碎片拼合 | kinetic-lyric-console | `carts/layout/shatter-text.cart.js` |
| `split-cut` | 断ち割り：每行字從中線切成上下兩半左右錯開，中間一條強調色細線 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/layout/split-cut.cart.js` |
| `split-flap` | 機場翻板 | kinetic-lyric-console | `carts/layout/split-flap.cart.js` |
| `split-screen` | 句子切成上下兩半，各自從左右滑入，中間一條線 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/layout/split-screen.cart.js` |
| `stack` | 長句拆成最多 3 行堆疊，行與行交替靠左、靠右 | kinetic-lyric-console | `carts/layout/stack.cart.js` |
| `staggered-text` | 奇偶字上下錯位，從相反方向滑入 | kinetic-lyric-console | `carts/layout/staggered-text.cart.js` |
| `strip` | 字條：強調色長條上的反白字，左右交錯滑入 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/layout/strip.cart.js` |
| `subtitle-box` | 底部半透明黑底框字幕，逐字變亮 | kinetic-lyric-console | `carts/layout/subtitle-box.cart.js` |
| `tilt-vertical` | 文字轉 90 度橫躺，沿畫面右緣由上往下讀，旁邊一條細線；字小、佔寬很窄 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/layout/tilt-vertical.cart.js` |
| `trail` | 拖影 | kinetic-lyric-console | `carts/layout/trail.cart.js` |
| `typewriter` | 打字機：逐字出現，後面跟著閃爍游標，字比較小 | kinetic-lyric-console | `carts/layout/typewriter.cart.js` |
| `underline-draw` | 底線畫出 | kinetic-lyric-console | `carts/layout/underline-draw.cart.js` |
| `v-ruler` | 左緣一條垂直刻度尺（每 5 格一長刻度），一個強調色小標記停在文字的高度；文字在尺右側，左對齊 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/layout/v-ruler.cart.js` |
| `vertical` | 直排，靠右，旁邊一條細直線；長句會自動縮小 | kinetic-lyric-console | `carts/layout/vertical.cart.js` |
| `vertical-sub` | 主文橫排偏左，右側一條直排淡色回聲字＋細線 | kinetic-lyric-console | `carts/layout/vertical-sub.cart.js` |
| `victim-outline` | 空心粗描邊字，後方錯位的強調色描邊像粉筆輪廓，輕微抖動 | kinetic-lyric-console | `carts/layout/victim-outline.cart.js` |
| `wave-path` | 文字沿波浪流動 | kinetic-lyric-console | `carts/layout/wave-path.cart.js` |
| `wipe` | 由左向右擦出 | kinetic-lyric-console | `carts/layout/wipe.cart.js` |
| `zoom-tunnel` | 滿版：多層殘影由小放大衝向鏡頭，穿越隧道感 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/layout/zoom-tunnel.cart.js` |

## 進場（enter，34）

| id | 說明 | 作者 | 檔案 |
|---|---|---|---|
| `alt-zoom` | 交互ズーム：偶數字從鏡頭前撲來、奇數字從遠處長出 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/enter/alt-zoom.cart.js` |
| `big-jump` | 由下大跳躍落定 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/enter/big-jump.cart.js` |
| `bleed-in` | にじみ：逐字由糊變清並微微彈大 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/enter/bleed-in.cart.js` |
| `blinds-in` | 百葉窗（8 條橫帶）展開 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/enter/blinds-in.cart.js` |
| `blink-in` | 點滅幾下後亮起 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/enter/blink-in.cart.js` |
| `blur-in` | 整句由模糊變清楚 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/enter/blur-in.cart.js` |
| `bubble-in` | 逐字像氣泡浮出 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/enter/bubble-in.cart.js` |
| `checker-in` | 市松（近似）：棋盤格分兩階段浮現 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/enter/checker-in.cart.js` |
| `cursor-sweep` | カーソル掃引：強調色細棒由左掃到右，字被掃到就出現 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/enter/cursor-sweep.cart.js` |
| `domino-in` | 逐字像骨牌依序立起 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/enter/domino-in.cart.js` |
| `dot-grow` | 逐字由一個小點長成字 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/enter/dot-grow.cart.js` |
| `drop-stagger` | 逐字依序落下並微彈 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/enter/drop-stagger.cart.js` |
| `fan-open` | 逐字像摺扇依序打開 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/enter/fan-open.cart.js` |
| `focus-pull` | 對焦 | kinetic-lyric-console | `carts/enter/focus-pull.cart.js` |
| `magnet` | 逐字由左右兩側被吸到定位 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/enter/magnet.cart.js` |
| `open-h` | 由中央向左右展開 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/enter/open-h.cart.js` |
| `overexpose` | 過曝白光漸收成正常 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/enter/overexpose.cart.js` |
| `pop` | 彈出（微過衝） | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/enter/pop.cart.js` |
| `random-order` | 逐字以固定的打亂順序淡入（同一句每次相同） | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/enter/random-order.cart.js` |
| `rise-stagger` | 逐字上浮 | kinetic-lyric-console | `carts/enter/rise-stagger.cart.js` |
| `roll-in` | 滾動進入（轉一圈） | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/enter/roll-in.cart.js` |
| `slide-l` | 由左側滑入 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/enter/slide-l.cart.js` |
| `slide-r` | 由右側滑入 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/enter/slide-r.cart.js` |
| `spiral-in` | 逐字沿螺旋軌跡聚攏 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/enter/spiral-in.cart.js` |
| `squash-land` | 落下壓扁再回彈 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/enter/squash-land.cart.js` |
| `stamp-in` | 像蓋章一樣由大壓下 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/enter/stamp-in.cart.js` |
| `stop-motion` | コマ撮り：逐字停格跳向定位，每格姿勢不同 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/enter/stop-motion.cart.js` |
| `stretch-in` | 橫向伸展開來 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/enter/stretch-in.cart.js` |
| `track-expand` | 字間拡張：字距由緊縮撐開到正常並淡入 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/enter/track-expand.cart.js` |
| `type` | 打字機：逐字瞬間出現 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/enter/type.cart.js` |
| `unfold` | 由上緣向下折開（3D） | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/enter/unfold.cart.js` |
| `whip` | 快速甩入（帶模糊，微過衝） | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/enter/whip.cart.js` |
| `wipe-diag` | 斜向擦出 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/enter/wipe-diag.cart.js` |
| `wobble-land` | 落下後搖晃定位 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/enter/wobble-land.cart.js` |

## 退場（exit，37）

| id | 說明 | 作者 | 檔案 |
|---|---|---|---|
| `backspace-out` | バックスペース：由句尾一字一字刪掉 （整句版由右往左削去） | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/exit/backspace-out.cart.js` |
| `blinds-out` | 百葉窗閉合 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/exit/blinds-out.cart.js` |
| `blur-out-stagger` | 逐字依序模糊消失 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/exit/blur-out-stagger.cart.js` |
| `cascade-out` | 逐字下落 | kinetic-lyric-console | `carts/exit/cascade-out.cart.js` |
| `close-h` | 由左右向中央閉合 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/exit/close-h.cart.js` |
| `close-v` | 由上下向中線閉合 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/exit/close-v.cart.js` |
| `diag-wipe-out` | 斜めワイプ退場：一條斜線掃過把字擦掉 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/exit/diag-wipe-out.cart.js` |
| `dissolve` | 逐字溶解（帶模糊） | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/exit/dissolve.cart.js` |
| `domino-out` | 逐字像骨牌依序倒下 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/exit/domino-out.cart.js` |
| `drift-up-out` | 上飄淡出 | kinetic-lyric-console | `carts/exit/drift-up-out.cart.js` |
| `echo-out` | 残響（近似）：放大擴散並帶光暈漸隱 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/exit/echo-out.cart.js` |
| `flicker-out` | 閃爍幾下後熄滅 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/exit/flicker-out.cart.js` |
| `flip-out` | 3D 轉開消失 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/exit/flip-out.cart.js` |
| `fly-through` | 衝向鏡頭放大並模糊 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/exit/fly-through.cart.js` |
| `glitch-out` | 訊號故障錯位後消失 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/exit/glitch-out.cart.js` |
| `gravity` | 逐字重力落下（各自旋轉） | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/exit/gravity.cart.js` |
| `leaf-fall` | 逐字像落葉飄落 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/exit/leaf-fall.cart.js` |
| `pop-out` | 先脹大再彈沒 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/exit/pop-out.cart.js` |
| `roll-out` | 滾動離場（轉一圈） | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/exit/roll-out.cart.js` |
| `slash-out` | 一刀両断（近似）：字分成左右兩半掉開 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/exit/slash-out.cart.js` |
| `slide-down-out` | 向下移出 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/exit/slide-down-out.cart.js` |
| `slide-r-out` | 向右滑出 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/exit/slide-r-out.cart.js` |
| `slide-up-out` | 向上移出 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/exit/slide-up-out.cart.js` |
| `spin-out` | 回って消える：逐字旋轉縮小消失 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/exit/spin-out.cart.js` |
| `squash-out` | 縱向壓扁消失 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/exit/squash-out.cart.js` |
| `stretch-out` | 橫向收窄成一條線 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/exit/stretch-out.cart.js` |
| `strike-out` | 線で消す：每字先被畫一條強調色線，再壓扁消失 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/exit/strike-out.cart.js` |
| `sweep-cover` | 一條強調色細線由左掃過、把字蓋掉 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/exit/sweep-cover.cart.js` |
| `tip-over` | 像牌子一樣向後倒下（3D） | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/exit/tip-over.cart.js` |
| `track-out` | 字距向外撐開並淡出 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/exit/track-out.cart.js` |
| `twist-out` | 扭轉斜切縮小消失 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/exit/twist-out.cart.js` |
| `vacuum` | 向畫面中心縮小吸走 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/exit/vacuum.cart.js` |
| `wave-out` | 逐字依序起伏後崩落 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/exit/wave-out.cart.js` |
| `wipe-down-out` | 向下捲掉 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/exit/wipe-down-out.cart.js` |
| `wipe-out` | 由左向右擦掉 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/exit/wipe-out.cart.js` |
| `wipe-r-out` | 由右向左擦掉 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/exit/wipe-r-out.cart.js` |
| `wipe-up-out` | 向上捲掉 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/exit/wipe-up-out.cart.js` |

## 持續特效（fx，33）

| id | 說明 | 作者 | 檔案 |
|---|---|---|---|
| `beat-jump` | 隨拍輕輕跳起 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/fx/beat-jump.cart.js` |
| `breathe` | 整句微微呼吸（放大縮小） | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/fx/breathe.cart.js` |
| `cam-pan-l` | 鏡頭左移（<3% 畫面寬） | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/fx/cam-pan-l.cart.js` |
| `cam-pan-r` | 鏡頭右移 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/fx/cam-pan-r.cart.js` |
| `cam-pull` | 鏡頭拉遠（整句 1.06→1） | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/fx/cam-pull.cart.js` |
| `cam-tilt-up` | 鏡頭上仰 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/fx/cam-tilt-up.cart.js` |
| `char-pulse` | 逐字脈動 | kinetic-lyric-console | `carts/fx/char-pulse.cart.js` |
| `chromatic` | 色差抖動（隨 BPM） | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/fx/chromatic.cart.js` |
| `dangle` | ぶら下がり：每字像吊著，從上緣左右擺動 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/fx/dangle.cart.js` |
| `dolly-in` | ドリー（鏡頭）：整句期間慢慢推近，只動一次 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/fx/dolly-in.cart.js` |
| `drum` | 太鼓：重拍時突然放大再收 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/fx/drum.cart.js` |
| `focus-rack` | 逐字依序輕微失焦再對焦 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/fx/focus-rack.cart.js` |
| `gentle-bob` | 輕晃 | kinetic-lyric-console | `carts/fx/gentle-bob.cart.js` |
| `gradient-flow` | 漸層流動 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/fx/gradient-flow.cart.js` |
| `heartbeat` | 心跳式雙拍脈動 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/fx/heartbeat.cart.js` |
| `highlight-word` | 逐字依序亮起（時間分配給整句） | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/fx/highlight-word.cart.js` |
| `jelly` | 果凍式橫縮縱伸交替 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/fx/jelly.cart.js` |
| `noise-drift` | 逐字沿固定的雜訊軌跡漂移（非亂數） | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/fx/noise-drift.cart.js` |
| `outline-pulse` | 輪廓光隨拍脈動 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/fx/outline-pulse.cart.js` |
| `pulse` | 隨拍脈動（縮放） | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/fx/pulse.cart.js` |
| `shadow-sway` | 影が揺れる：字的影子方向與長度慢慢擺動 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/fx/shadow-sway.cart.js` |
| `shimmer` | 流光掃過 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/fx/shimmer.cart.js` |
| `slow-rotate` | 極緩慢左右傾斜（±1.2°） | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/fx/slow-rotate.cart.js` |
| `small-circle` | 整句沿小圓軌跡移動（半徑<1% 畫面高） | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/fx/small-circle.cart.js` |
| `step-zoom` | 段階ズーム（鏡頭）：2～3 次快速小推（每次 +4%），只動一次 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/fx/step-zoom.cart.js` |
| `stopmotion` | 定格動畫感（每 0.4 秒循環的小幅抖動與傾斜） | kinetic-lyric-console | `carts/fx/stopmotion.cart.js` |
| `stretch-beat` | 横伸び拍：每拍橫向撐開再彈回 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/fx/stretch-beat.cart.js` |
| `sway-char` | 逐字左右搖擺（相位錯開） | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/fx/sway-char.cart.js` |
| `tilt-down` | ティルトダウン（鏡頭）：字從下方升入定位，只動一次 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/fx/tilt-down.cart.js` |
| `track-breathe` | 字距輕微呼吸 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/fx/track-breathe.cart.js` |
| `wave` | 逐字波動 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/fx/wave.cart.js` |
| `wind-gust` | 突風：約每 2.2 秒一陣風，字由左而右被吹歪再彈回 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/fx/wind-gust.cart.js` |
| `zoom-slow` | 整句在句子時間內慢慢推近 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/fx/zoom-slow.cart.js` |

## 文字樣式（style，14）

| id | 說明 | 作者 | 檔案 |
|---|---|---|---|
| `condensed` | 長体：字形橫向壓窄 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/style/condensed.cart.js` |
| `echo-diag` | 輪郭の残響（近似）：右上方向的淡出殘影 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/style/echo-diag.cart.js` |
| `emboss` | 浮雕 | kinetic-lyric-console | `carts/style/emboss.cart.js` |
| `extended` | 平体：字形橫向拉寬（上限 1.08） | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/style/extended.cart.js` |
| `extrude-3d` | 立体：短而實的 3D 厚度（比 `longshadow` 短） | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/style/extrude-3d.cart.js` |
| `grad-v` | 縦グラデ：上本色、下強調色 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/style/grad-v.cart.js` |
| `marker` | 螢光筆：字下半加半透明色帶，不蓋字 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/style/marker.cart.js` |
| `shadow-offset` | 偏移硬影 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/style/shadow-offset.cart.js` |
| `shadow-soft` | 柔和黑影（提高可讀性） | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/style/shadow-soft.cart.js` |
| `step-baseline` | 段違い：奇偶字上下交錯 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/style/step-baseline.cart.js` |
| `strike` | 刪除線（強調色） | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/style/strike.cart.js` |
| `tint-sweep` | 染色掃過 | kinetic-lyric-console | `carts/style/tint-sweep.cart.js` |
| `tracking-wide` | 字距加寬 0.14em | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/style/tracking-wide.cart.js` |
| `underline` | 底線（強調色） | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/style/underline.cart.js` |

## 場景（scene，36）

| id | 說明 | 作者 | 檔案 |
|---|---|---|---|
| `balancing-circles` | 平衡圓 | kinetic-lyric-console | `carts/scene/balancing-circles.cart.js` |
| `blood-splatter` | 噴濺 | kinetic-lyric-console | `carts/scene/blood-splatter.cart.js` |
| `crime-tape` | 警戒膠帶 | kinetic-lyric-console | `carts/scene/crime-tape.cart.js` |
| `crop-marks` | 裁切標記 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/scene/crop-marks.cart.js` |
| `cross-pattern` | 十字圖案 | kinetic-lyric-console | `carts/scene/cross-pattern.cart.js` |
| `crosshair` | 照準線 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/scene/crosshair.cart.js` |
| `data-monitors` | 資料監視器（右下） | kinetic-lyric-console | `carts/scene/data-monitors.cart.js` |
| `desktop-icon` | 桌面圖示（左側一排） | kinetic-lyric-console | `carts/scene/desktop-icon.cart.js` |
| `diag-fill` | 斜向填色 | kinetic-lyric-console | `carts/scene/diag-fill.cart.js` |
| `diag-structure` | 斜向結構線 | kinetic-lyric-console | `carts/scene/diag-structure.cart.js` |
| `diamond-shapes` | 菱形群 | kinetic-lyric-console | `carts/scene/diamond-shapes.cart.js` |
| `dimension-lines` | 寸法線 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/scene/dimension-lines.cart.js` |
| `drift-lines` | 飄移細線 | kinetic-lyric-console | `carts/scene/drift-lines.cart.js` |
| `edge-clouds` | 邊緣雲 | kinetic-lyric-console | `carts/scene/edge-clouds.cart.js` |
| `edge-ticks` | 邊緣刻度 | hakoniwa (JIZURA) / kinetic-lyric-console | `carts/scene/edge-ticks.cart.js` |
| `hud-corners` | HUD 四角 | kinetic-lyric-console | `carts/scene/hud-corners.cart.js` |
| `hud-info` | HUD 資訊面板（右上） | kinetic-lyric-console | `carts/scene/hud-info.cart.js` |
| `hud-status` | HUD 狀態文字（左下） | kinetic-lyric-console | `carts/scene/hud-status.cart.js` |
| `jigsaw-grid` | 拼圖格 | kinetic-lyric-console | `carts/scene/jigsaw-grid.cart.js` |
| `light-spot` | 光斑 | kinetic-lyric-console | `carts/scene/light-spot.cart.js` |
| `organic-blob` | 有機色塊 | kinetic-lyric-console | `carts/scene/organic-blob.cart.js` |
| `paper-tear` | 撕紙邊 | kinetic-lyric-console | `carts/scene/paper-tear.cart.js` |
| `pink-grid` | 粉紅方格 | kinetic-lyric-console | `carts/scene/pink-grid.cart.js` |
| `pink-stripes` | 粉紅條紋 | kinetic-lyric-console | `carts/scene/pink-stripes.cart.js` |
| `pixel-bg` | 像素背景 | kinetic-lyric-console | `carts/scene/pixel-bg.cart.js` |
| `pixel-window` | 像素視窗（左上） | kinetic-lyric-console | `carts/scene/pixel-window.cart.js` |
| `planet` | 行星 | kinetic-lyric-console | `carts/scene/planet.cart.js` |
| `scalloped-border` | 波浪花邊 | kinetic-lyric-console | `carts/scene/scalloped-border.cart.js` |
| `scattered-shapes` | 散落幾何 | kinetic-lyric-console | `carts/scene/scattered-shapes.cart.js` |
| `screen-border` | 螢幕邊框 | kinetic-lyric-console | `carts/scene/screen-border.cart.js` |
| `shadow-shapes` | 陰影幾何 | kinetic-lyric-console | `carts/scene/shadow-shapes.cart.js` |
| `smear-brush` | 塗抹筆刷 | kinetic-lyric-console | `carts/scene/smear-brush.cart.js` |
| `star-trail` | 星軌 | kinetic-lyric-console | `carts/scene/star-trail.cart.js` |
| `texture-bg` | 紙質紋理 | kinetic-lyric-console | `carts/scene/texture-bg.cart.js` |
| `triangle-grid` | 三角網格 | kinetic-lyric-console | `carts/scene/triangle-grid.cart.js` |
| `web-lines` | 蛛網連線 | kinetic-lyric-console | `carts/scene/web-lines.cart.js` |

## 風格包（pack，1）

| id | 說明 | 作者 | 檔案 |
|---|---|---|---|
| `dusk` | 暮光 | kinetic-lyric-console | `carts/pack/dusk.cart.js` |
