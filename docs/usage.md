# 使用說明：桌面版與本機渲染

## 1. 桌面版（下載到電腦）

**不需要 `index.html`，也不需要安裝。** 整個工具就是一個 HTML 檔：

1. 取得檔案（任選一種）：
   - GitHub 的 **Releases** 頁面下載 `kinetic-lyric-console.html`（單檔）；或 `kinetic-lyric-console.zip`（解壓後裡面就是 `index.html` ＋ `thumbs/` 縮圖資料夾，縮圖預覽才會出現）。
   - 在[線上版](https://torusmith.github.io/kinetic-lyric-console/)按 `Ctrl+S`（Mac `⌘S`）另存網頁，選「網頁，僅 HTML」。
2. **雙擊檔案**，用 Chrome 或 Edge 開啟（本專案的自動測試以 Chromium 為準，建議用這兩個）。
3. 頂欄 **載入 ▾** → 載入字幕（SRT／LRC／VTT）、載入音樂／影片；在句子編輯器調整；**匯出** 精靈依用途輸出。

注意：
- 瀏覽器依**檔案位置**記住你的面板設定；把檔案搬到別的資料夾，可能看不到先前的設定。重要設定請用「匯出」精靈的備份項目（`project.json`）保存。
- 音樂與背景影片不會存進專案檔，重新開啟要再載入。
- 桌面版**只負責預覽與匯出**；要輸出 MP4／透明字層／綠幕，請看下一節。

## 2. 本機離線渲染

線上版與桌面版**用法相同**：都在網頁裡調好、按「匯出渲染專案」，再到電腦上執行渲染指令。**渲染不使用你下載的單檔 HTML**，它用的是這個 repo 的原始碼（執行時會自動建置 `dist/index.html`），所以需要 repo。

### 需要準備

| 項目 | 說明 |
|---|---|
| Node.js 22（專案 CI 使用的版本） | <https://nodejs.org> |
| ffmpeg | 要能在終端機執行 `ffmpeg -version` |
| 這個 repo | GitHub 頁面 **Code → Download ZIP** 解壓，或 `git clone https://github.com/ToruSmith/kinetic-lyric-console` |

在 repo 資料夾裡執行一次（之後不用再做）：

```
npm ci
npx playwright install chromium
```

### 資料夾怎麼放

在 repo 根目錄自己建兩個資料夾（已被 `.gitignore` 忽略，不會誤提交）：

```
kinetic-lyric-console/
├─ input/
│   ├─ project.json      ← 網頁「匯出渲染專案（project.json）」下載的檔案
│   ├─ song.mp3          ← 音樂（或 --video 用的背景影片）；檔名自訂
│   └─ fonts/            ← 選用：自訂字體 .ttf/.otf/.woff（檔名＝網頁上的字體名稱）
└─ output/               ← 不用先建；渲染結果會寫到這裡
```

### 執行

網頁的 **匯出** 精靈會依你的畫面比例直接給出整行指令，複製貼上即可。常見的長這樣：

```
node render/run.mjs --project input/project.json --audio input/song.mp3 --width 1920 --height 1080 --fps 30
```

結果在 `output/`：

| 想要 | 加的參數 | 輸出 |
|---|---|---|
| 背景＋文字的 MP4 | （預設） | `preview.mp4` |
| 透明文字層（疊在剪輯軟體的影片上） | `--alpha`（想多一個 WebM 版再加 `--webm`） | `text_alpha.mov`（加 `--webm` 另有 `text_alpha.webm`） |
| 文字層＋氛圍層分開 | `--layers` | `text_alpha.mov` ＋ `ambient.mp4` |
| 綠幕（剪輯軟體色鍵摳掉） | `--chroma`（指定色：`--chroma ff00ff`） | `preview.mp4` |
| 畫質後製 | `--glow` `--aberration` `--grade warm\|cool\|film` | 只影響 `preview.mp4` |
| 動態模糊 | `--blur 4` | 較慢、較順 |
| 先試前幾秒 | `--seconds 10` | 快速確認 |

不給 `--project` 時會渲染內建範例，可用來確認環境沒問題（建議加 `--seconds 5` 先試短的）；`--selftest` 會把同一專案渲染兩次並逐格比對，驗證結果可重現。

### 常見問題

- **找不到檔案**：路徑相對於你執行指令的資料夾（repo 根目錄）；錯誤訊息會列出該資料夾實際有哪些檔案，請對照檔名與副檔名（Windows 可能隱藏副檔名而變成 `.txt`）。
- **自訂字體沒出現**：字體檔放 `input/fonts/`，檔名（去掉副檔名）要和網頁上選的字體名稱相同。
- **自己匯入的風格包**：只存在瀏覽器裡；匯出渲染專案時，風格包套用後的設定已經寫進 `project.json`，渲染不需要它。
- **比例要一致**：離線渲染以 `--width/--height` 的比例排版，請與網頁預覽的畫面比例一致（匯出精靈給的指令已經配好）。
