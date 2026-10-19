# 動態歌詞字幕工具：AI 速查表（SRT 標記）

> 本檔由 `node tools/gen-cheatsheet.mjs` 自動產生，請勿手改（規則文字改 `tools/cheatsheet-rules.md`，名稱清單來自卡帶與手冊表格）。
> 用法：把本檔與你的 SRT 一起給 AI，要求「依這份速查表替每一句上標記」。完整說明與細節見 [`manual.md`](manual.md)。

**任務**：替使用者 SRT 的每一句補上完整標記，輸出可直接匯入本工具的帶標記 SRT。

## 語法

```
#版型+進場+退場~持續特效^位置@樣式 歌詞{關鍵字}||副文
```

- 每句必寫 `#版型+進場+退場`（退場不能省，所以進場也一定要寫；沒想法就用 `fade`）。`~` `^` `@` `{}` `||` 依句子需要才加。
- 順序固定；標記中間**不能有空白**；標記與歌詞之間一個空白。
- 位置 `^`：`tl tc tr`／`ml mc mr`／`bl bc br`，可微調如 `^tl:5:-2`（右移 5%、上移 2%）。
- 一個 SRT 區塊只放一行文字；**不改時間碼、不改歌詞原文**。

## 規則

1. **只能使用下方名單內的名稱**，不要自創。未知版型會退回 `lowerleft`，未知進退場／特效可能無效。
2. `~` 每句至多 1 個；`@` 至多 3 個（逗號分隔）。
3. 預設**不寫** `$`（文字大小）、`*`（字體）、`&`（場景）與 `^alt:`；使用者明確要求時才加。
4. 標「滿版」的版型不加 `^`。
5. 標「看前後句」的版型不連續使用，也不放第一句或最後一句。
6. 句長 < 1.5 秒不用慢動畫：版型 `particle-form`、`constellation`，進場 `scramble`；標「逐字」的進場在短句也要避開。
7. 標「逐字」的進場需要版型提供逐字元素，否則退回整句淡入。
8. **約 70–80% 的句子用安全選擇**：`center`、`lowerleft`、`subtitle-box`，進場 `rise` 或 `fade`，退場 `fade`。花俏版型只留給高潮、關鍵詞、段落轉折（約 20–30%）。
9. 相鄰句要有變化但不過度；同一段落（主歌／副歌）維持同一視覺語言，副歌再升級。
10. `{}` 一句 1–2 個。標「吃 {}」的版型把它排成特別的關鍵字版面，其他版型只改成強調色、加粗、發光。`split` 只顯示兩個 `{}` 詞。`pv-lyric`、`pv-vertical` 另支援 `(註解)`，括號內的字不會出現在主文。
11. 閃爍類效果（`flicker`、`glitch`、`shake`、`rainbow`、`flash-words`）有光敏風險，只給少數高潮句。
12. 輸入已有標記時：已寫好的段落保留，只補缺的；使用者明說「全部重做」才覆蓋。
13. 不要替使用者挑選實驗室版型與實驗室場景（下方名單不含它們），除非使用者要求。

## 快速選型

| 情境 | 優先版型 | 進場／退場 |
|---|---|---|
| 日常句、安全預設 | `center`、`lowerleft`、`subtitle-box` | `rise` 或 `fade`／`fade` |
| 短促有力（≤6 字） | `slam`、`bounce`、`flash-words` | `zoomin`／`blur-out` |
| 抒情慢歌 | `pv-lyric`、`blurfocus`、`ink-bleed`、`mirror-reflect`、`handwrite` | `blur-in`／`fade` |
| 句內有關鍵詞 | `keyword`、`marker`、`annotate`、`poster`、`pv-lyric`；兩字強調用 `split` | `fade`／`fade` |
| 科技、賽博、故障 | `typewriter`、`glitch`、`constellation`、`hud-frame` | `scramble`／`glitch-out` |
| 跟唱、逐字 | `karaoke`、`typewriter` | `type`／`fade` |
| 高潮、段落轉折 | `text-mask`、`longshadow`、`poster`、`zoom-tunnel` | `zoomin`／`shatter` |
| 疊在影片上、遮畫面最少 | `center`、`lowerleft`、`subtitle-box` | `blur-in`／`fade`，加 `@shadow-soft` |

## 範例

```
1
00:00:01,000 --> 00:00:03,500
#center+rise+fade^bc 夜色漸漸深了

2
00:00:03,500 --> 00:00:05,000
#slam+zoomin+blur-out~shake^bc@outline 不要{回頭}

3
00:00:05,000 --> 00:00:08,000
#pv-lyric+fade+fade^bl 看天台上{流星}(路過)
```

## 輸出格式

1. 一個程式碼區塊，內含**完整的帶標記 SRT**：每一句都要輸出，不可用「…」省略；保留原序號、原時間碼、原歌詞。
2. 程式碼區塊後，**不超過 5 行**說明：整首歌的基調與主力版型。
3. 需要調整全域設定時，附一小段 `config` JSON，只放 3–6 個最關鍵的欄位（欄位名稱以 `manual.md` 第 8 節為準）。
4. 句數很多（約 60 句以上）可分段輸出，結尾標明「接續第 N 句」，整首的基調前後一致。

## 可用名稱

### 版型（`#`），61 個

- `lowerleft` 左下角文字加一條裝飾線，最像一般歌詞字幕
- `split` 文字被 {} 切成兩個詞，貼在畫面左右兩側 〔吃{}〕
- `center` 置中，最適合搭配樣式與進場動畫
- `bounce` 置中，逐字從下方彈起，適合節奏明快的句子
- `slam` 大字由 3 倍大「砸」到定位，短促有力
- `neon` 霓虹
- `karaoke` 逐字變亮
- `typewriter` 打字機：逐字出現，後面跟著閃爍游標，字比較小
- `vertical` 直排，靠右，旁邊一條細直線
- `blurfocus` 由模糊且字距很寬的狀態慢慢對焦
- `wipe` 由左向右擦出
- `glitch` 訊號閃爍
- `stack` 長句拆成最多 3 行堆疊，行與行交替靠左、靠右
- `outline-big` 前 3 個字放大成空心背景字，整句以小字疊在前面
- `subtitle-box` 底部半透明黑底框字幕，逐字變亮
- `poster` 海報式大字＋細線＋小字 〔吃{}〕
- `flash-words` 以空白／標點分詞，一個詞一個詞快速閃現
- `keyword` {} 關鍵字放大成強調色，其餘小字排在旁邊 〔吃{}〕
- `trail` 拖影
- `text-mask` 粗體大字，字內填入流動的漸層
- `longshadow` 長影
- `bubble` 白底對話泡泡，彈性出現
- `blinds` 文字被切成 24 條細條，上下交錯滑入
- `hanko` 日式直排加印章方塊 〔吃{}〕
- `collage` 拼貼風：每個字像剪貼的貼紙，隨機底色與字體
- `handwrite` 手寫：逐字出現並描繪底線
- `marker` 螢光筆：字下半加半透明色帶，不蓋字 〔吃{}〕
- `scroll` 捲動歌詞：同時顯示前後各兩句，目前句最大 〔看前後句〕
- `orbit` 文字沿圓弧排列並緩慢旋轉
- `diagonal` 斜 8 度，上方大字加下方整句 〔吃{}〕
- `circle-badge` 整句沿圓環排列並旋轉，中央放一個大字 〔吃{}〕
- `split-screen` 句子切成上下兩半，各自從左右滑入，中間一條線
- `ripple-pool` 隨拍子擴散的水環
- `constellation` 星點連線後聚成字
- `particle-form` 粒子聚成字再散開
- `parallax-depth` 多層景深視差
- `polaroid` 相紙卡依序滑入疊放
- `page-flip` 3D 翻頁露出下一句 〔看前後句〕
- `ink-bleed` 墨點暈開揭露
- `laser-scan` 亮線掃過露出文字 〔滿版〕
- `split-flap` 機場翻板
- `wave-path` 文字沿波浪流動
- `mirror-reflect` 水面倒影
- `cylinder` 滾筒翻轉 〔看前後句〕
- `iris-frame` 光圈框 〔滿版〕
- `annotate` 手繪圈選、底線、星號標記 {關鍵字} 〔吃{}〕
- `underline-draw` 底線畫出
- `scatter` 散落字：每字在格內隨機偏移、旋轉、縮放
- `strip` 字條：強調色長條上的反白字，左右交錯滑入
- `cards` 字卡：每字一張白卡，落下排成列
- `glow-cards` 發光字卡：暗底＋強調色發光邊框
- `layered` 疊層字：主文後方三層強調色描邊殘影，向右下展開
- `falling` 字雨：背景持續落下的淡字＋主文逐字落下彈跳
- `formula` 公式覆蓋：主文後方漂浮的等寬公式碎片
- `pv-lyric` 橫排、靠左 〔吃{}〕
- `pv-vertical` 直排版 pv-lyric，靠右由上往下 〔吃{}〕
- `hud-frame` 遊戲介面風 〔滿版〕
- `marquee` 跑馬燈，兩排橫向捲動，一排實心一排空心 〔滿版〕
- `danmaku` 彈幕，三行由右向左飄過 〔滿版〕
- `border-run` 邊框跑動 〔滿版〕
- `zoom-tunnel` 多層殘影由小放大衝向鏡頭，穿越隧道感 〔滿版〕

### 進場（第一個 `+`），55 個

- `fade` 柔和淡入
- `rise` 由下方升起並淡入
- `drop` 由上方落下，微彈
- `zoomin` 由小放大
- `zoomout` 由大縮小
- `spin` 3D 轉向正面
- `flip` 逐字 3D 翻起
- `stagger` 逐字依序淡入
- `mask-up` 由下向上遮罩揭露
- `elastic` 彈性放大再回彈
- `swing` 左右搖擺定位
- `ripple` 逐字依序波浪浮起
- `scramble` 亂碼逐字還原
- `split-reveal` 中線向上下展開
- `blur-stagger` 逐字由模糊變清楚
- `track-in` 字距由寬收攏
- `skew-in` 斜切滑入
- `wipe` 由左向右擦出
- `clock-wipe` 時鐘式順時針擦出
- `neon-on` 霓虹燈閃爍點亮
- `iris` 圓形光圈由小開大
- `slide-l` 由左側滑入
- `slide-r` 由右側滑入
- `whip` 快速甩入
- `pop` 彈出
- `stretch-in` 橫向伸展開來
- `big-jump` 由下大跳躍落定
- `squash-land` 落下壓扁再回彈
- `wobble-land` 落下後搖晃定位
- `stamp-in` 像蓋章一樣由大壓下
- `blur-in` 整句由模糊變清楚
- `open-h` 由中央向左右展開
- `unfold` 由上緣向下折開
- `roll-in` 滾動進入
- `blink-in` 點滅幾下後亮起
- `overexpose` 過曝白光漸收成正常
- `blinds-in` 百葉窗展開
- `wipe-diag` 斜向擦出
- `fan-open` 逐字像摺扇依序打開
- `domino-in` 逐字像骨牌依序立起
- `bubble-in` 逐字像氣泡浮出
- `dot-grow` 逐字由一個小點長成字
- `magnet` 逐字由左右兩側被吸到定位
- `spiral-in` 逐字沿螺旋軌跡聚攏
- `drop-stagger` 逐字依序落下並微彈
- `type` 打字機：逐字瞬間出現
- `random-order` 逐字以固定的打亂順序淡入
- `bleed-in` にじみ：逐字由糊變清並微微彈大
- `cursor-sweep` カーソル掃引：強調色細棒由左掃到右
- `track-expand` 字間拡張：字距由緊縮撐開到正常並淡入
- `alt-zoom` 交互ズーム：偶數字從鏡頭前撲來、奇數字從遠處長出
- `stop-motion` コマ撮り：逐字停格跳向定位，每格姿勢不同
- `checker-in` 市松：棋盤格分兩階段浮現
- `focus-pull` 對焦
- `rise-stagger` 逐字上浮

### 退場（第二個 `+`），44 個

- `fade` 柔和淡出
- `sink` 向下沉並淡出
- `zoomout-fade` 放大並淡出
- `blur-out` 模糊並淡出
- `slide-out` 向左滑出
- `dissolve` 逐字溶解
- `shatter` 逐字碎裂飛散
- `glitch-out` 訊號故障錯位後消失
- `vacuum` 向畫面中心縮小吸走
- `sweep-cover` 一條強調色細線由左掃過、把字蓋掉
- `wipe-out` 由左向右擦掉
- `clock-out` 時鐘式順時針擦掉
- `slide-r-out` 向右滑出
- `slide-up-out` 向上移出
- `slide-down-out` 向下移出
- `tip-over` 像牌子一樣向後倒下
- `flip-out` 3D 轉開消失
- `stretch-out` 橫向收窄成一條線
- `squash-out` 縱向壓扁消失
- `pop-out` 先脹大再彈沒
- `fly-through` 衝向鏡頭放大並模糊
- `close-h` 由左右向中央閉合
- `close-v` 由上下向中線閉合
- `wipe-r-out` 由右向左擦掉
- `wipe-up-out` 向上捲掉
- `wipe-down-out` 向下捲掉
- `blinds-out` 百葉窗閉合
- `flicker-out` 閃爍幾下後熄滅
- `roll-out` 滾動離場
- `twist-out` 扭轉斜切縮小消失
- `track-out` 字距向外撐開並淡出
- `blur-out-stagger` 逐字依序模糊消失
- `gravity` 逐字重力落下
- `leaf-fall` 逐字像落葉飄落
- `domino-out` 逐字像骨牌依序倒下
- `wave-out` 逐字依序起伏後崩落
- `backspace-out` バックスペース：由句尾一字一字刪掉
- `echo-out` 残響：放大擴散並帶光暈漸隱
- `diag-wipe-out` 斜めワイプ退場：一條斜線掃過把字擦掉
- `spin-out` 回って消える：逐字旋轉縮小消失
- `slash-out` 一刀両断：字分成左右兩半掉開
- `strike-out` 線で消す：每字先被畫一條強調色線，再壓扁消失
- `cascade-out` 逐字下落
- `drift-up-out` 上飄淡出

### 持續特效（`~`），37 個

- `float` 漂浮
- `shake` 抖動
- `flicker` 閃爍
- `rainbow` 彩虹色循環
- `wave` 逐字波動
- `shimmer` 流光掃過
- `gradient-flow` 漸層流動
- `chromatic` 色差抖動
- `outline-pulse` 輪廓光隨拍脈動
- `highlight-word` 逐字依序亮起
- `cam-pull` 鏡頭拉遠
- `cam-pan-l` 鏡頭左移
- `cam-pan-r` 鏡頭右移
- `cam-tilt-up` 鏡頭上仰
- `breathe` 整句微微呼吸
- `track-breathe` 字距輕微呼吸
- `zoom-slow` 整句在句子時間內慢慢推近
- `focus-rack` 逐字依序輕微失焦再對焦
- `stopmotion` 定格動畫感
- `pulse` 隨拍脈動
- `heartbeat` 心跳式雙拍脈動
- `beat-jump` 隨拍輕輕跳起
- `drum` 太鼓：重拍時突然放大再收
- `slow-rotate` 極緩慢左右傾斜
- `sway-char` 逐字左右搖擺
- `small-circle` 整句沿小圓軌跡移動
- `jelly` 果凍式橫縮縱伸交替
- `noise-drift` 逐字沿固定的雜訊軌跡漂移
- `shadow-sway` 影が揺れる：字的影子方向與長度慢慢擺動
- `stretch-beat` 横伸び拍：每拍橫向撐開再彈回
- `dangle` ぶら下がり：每字像吊著，從上緣左右擺動
- `wind-gust` 突風：約每 2.2 秒一陣風
- `tilt-down` ティルトダウン：字從下方升入定位，只動一次
- `dolly-in` ドリー：整句期間慢慢推近，只動一次
- `step-zoom` 段階ズーム：2～3 次快速小推，只動一次
- `char-pulse` 逐字脈動
- `gentle-bob` 輕晃

### 樣式（`@`），29 個

- `neon` 霓虹
- `glow-soft` 柔光
- `chromatic` 色差
- `longshadow` 長影
- `trail` 拖影
- `outline` 空心
- `stamp` 蓋章
- `double-line` 二重縁：粗外框＋細內線
- `emphasis-dot` 傍點：字上加圓點
- `shadow-stack` 多重影：三層水平漸淡
- `split-tone` 上下二色
- `underline` 底線
- `strike` 刪除線
- `marker` 螢光筆：字下半加半透明色帶，不蓋字
- `shadow-soft` 柔和黑影
- `shadow-offset` 偏移硬影
- `tracking-wide` 字距加寬 0.14em
- `grad-v` 縦グラデ：上本色、下強調色
- `extrude-3d` 立体：短而實的 3D 厚度
- `echo-diag` 輪郭の残響：右上方向的淡出殘影
- `condensed` 長体：字形橫向壓窄
- `extended` 平体：字形橫向拉寬
- `step-baseline` 段違い：奇偶字上下交錯
- `gradient` 漸層
- `karaoke` 逐字變亮
- `gloss-sweep` 光澤掃過：逐字亮帶掃一次
- `glitch` 訊號閃爍
- `emboss` 浮雕
- `tint-sweep` 染色掃過

### 場景（`&`，預設不使用），31 個

**文字下（氛圍）**

- `halftone` 半色調網點：斜向漸層＋緩慢波動，隨拍脹縮
- `dots` 點陣網：等大圓點緩慢漂移
- `checker` 棋盤格
- `burst` 放射線
- `radial-rects` 放射長方塊
- `perspective-grid` 透視格線
- `flow-lines` 流動曲線
- `stripes` 平行四邊形條紋
- `hatch` 斜線填紋
- `diag-split` 斜切分割：一側染強調色
- `blocks` 背景色塊
- `breathing-blocks` 呼吸方塊格
- `squares` 置中套疊方框
- `glow-ring` 發光圓環
- `rings` 同心圓擴散
- `pulse-circle` 隨拍脈動圓
- `pink-stripes` 粉紅條紋
- `diag-fill` 斜向填色
- `diag-structure` 斜向結構線
- `drift-lines` 飄移細線

**文字上（裝飾）**

- `glitch-bars` 故障橫條：每 1/10 秒換一組
- `guides` 構圖參考：三分線＋黃金螺旋
- `dashed-lines` 虛線參考線
- `ruler` 尺規刻度＋移動指標
- `target` 瞄準框：圓環＋缺口十字＋旋轉四角
- `color-wash` 整面染色
- `gradient-fade` 底部漸層遮罩
- `crop-marks` 裁切標記
- `crosshair` 照準線
- `dimension-lines` 寸法線
- `edge-ticks` 邊緣刻度

### 風格包（在網頁面板套用，不寫進 SRT），20 個

- `藍色衝擊` 藍白高對比、爆發式放射線、閃白轉場、強節拍
- `斬擊` 斜切分割與斜向結構線、震動與傾斜
- `藍色構成` 構成主義：色塊、方框、構圖線
- `城市文字雨` 文字雨、公式碎片、科技夜景
- `夜色` 柔和漸層與光環，抒情
- `波普` 粉紅網點、可愛描邊、強節拍縮放
- `青墨` 紙質紋理＋直排毛筆，和風
- `電腦` 像素背景與復古作業系統視窗
- `戰場` 警戒膠帶、噴濺、重擊字與強震動
- `幾何` 棋盤、三角格、同心圓
- `全息` 青紫全息：透視格線、光環、色相漂移
- `賽博監控` 綠字黑底、HUD 資訊與狀態列、CRT／VHS
- `情緒電影` 暖色明體、暗角與顆粒、緩慢推近
- `剪影極簡` 純黑底、極細明體、極簡邊框
- `歇斯底里之夜` 紅青色差、故障橫條、VHS 與強烈抖動
- `戒尺` 金棕色、尺規刻度與瞄準框、海報式排版
- `金夜` 金色明體、虛線與漸層
- `深海` 青藍圓體、流線與漸層
- `單色座標` 白色等寬、構圖線
- `暮光` 暖色細明體，緩慢柔和的暮色氛圍

> 另有實驗室版型 28 個、實驗室場景 28 個，不在上面名單內，預設不要使用；要用請看 [`catalog.md`](catalog.md) 與 [`manual.md`](manual.md) 3.1、7.6。
