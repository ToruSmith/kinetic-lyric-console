# 變更紀錄

格式參考 [Keep a Changelog](https://keepachangelog.com/zh-TW/1.1.0/)。版本內容以各 [Release](https://github.com/ToruSmith/kinetic-lyric-console/releases) 為準；本檔把使用者看得到的變更集中在一處。

## [未發布]

### 新增
- 限定區域 `^box:X:Y:寬:高` 或 `^box:名稱`（設定 `regions`）：整句只在框裡排，裝飾一起縮進框內。面板「位置微調」可設定具名區域，編輯器可直接填區域。
- 每句顏色：`@` 裡可寫 `c=` `a=` `sh=`（`none` 關陰影）`plate=` `dim=`，或用設定 `palettes` 的色組 `pal=名稱`。不佔 3 個樣式名額。
- 底板色：拍立得相片、翻板方塊、字幕條的底色可用 `@plate=` 或全域 `plate` 設定；與字色對比不足 3:1 時自動換明暗（`plateAuto`）。光圈框壓暗可用 `@dim=` 或全域 `irisDim` 調整。
- 絕對字高 `$h數字`：主文字的字級約為畫面高的「數字」%，各版型看起來一樣大。換算表由 `tools/gen-size-calib.mjs` 量測，存在 `core/kernel/size-calib.js`。
- 離線渲染：`--start`／`--end`、`--line 12-14` 只出一段；`--stills 12.5,0:30.2` 輸出單張；`--sheet 2` 輸出附時間與句號的抽格總覽圖。起點之前只快轉不截圖，畫面與從頭渲染逐格相同。
- 離線渲染：找不到 repo 內的 playwright 時自動改用全域安裝；`--chrome 路徑`（或 `CHROME_PATH`）可直接使用已安裝的 Chrome／Edge，沒下載 Chromium 時也會自動找。
- `tools/check-srt.mjs`：檢查 `^box`、顏色鍵與 `$h`；`--config` 可一併確認區域與色組名稱有定義。

### 變更
- 長句超出畫面（或區域）時整句自動縮小（`autoFit`，預設開；`split`、`outline-big` 與滿版版型除外）。沒超出的句子不受影響。
- `stack` 每行不再自動折行，長句改為縮小字級。
- 內建 `karaoke` 版型與 `subtitle-box` 的逐字變亮改用文字色（原本固定白色；文字色為白色時畫面與舊版逐像素相同）。

### 修正
- 檢查器把 `^auto:X:Y` 判為錯誤，實際渲染正常。

## [0.3.0] - 2026-11-03

### 新增
- 卡帶選填的 `meta` 語意資料與 `docs/effect-index.tsv` 索引；規格由程式碼推得，`draft: true` 代表情緒與能量仍待人工審核。
- README 新增「只用圖鑑挑的效果」提示詞，Release 附上 Agent Skill，新增測試列入 CI。
- 補齊 `docs/usage.md`、英文 README 與手冊對圖鑑、檢查器、查詢工具和逐句轉場的說明。
- 句子編輯器加入「句間轉場」選單；效果圖鑑可以直接套用到目前句或勾選句，並可復原。新增效果可見性測試。
- 逐句轉場：`&trans-wipe` 這類標記只改這一句的句間轉場。
- 效果圖鑑：用真實引擎試看 313 個效果，可篩選、挑選並複製給 AI；支援 `?pick=` 連結。
- `tools/find-effect.mjs`：依情緒、能量、特徵查效果；`docs/agent-skill/kinetic-lyric/` 提供 AI 上標記流程。
- 全部 313 個效果都有語意資料草稿，供圖鑑與查詢工具使用；審核前不放進速查表。新增一次一個主角、動作語氣一致的編排規則。
- `tools/check-srt.mjs`：不需瀏覽器的帶標記 SRT 檢查器。檢查名稱（附建議）、語法與手冊的常見錯誤；`--against` 另外確認時間碼與歌詞沒有被改動。
- `docs/ai-cheatsheet.md`：精簡版 AI 速查表（約 16KB，完整手冊約 57KB）。由 `tools/gen-cheatsheet.mjs` 從卡帶與手冊表格自動產生，包含之後新增的卡帶；實驗室項目不列入。可用 `npm run cheatsheet` 重新產生。
- 產生器自帶檢查：各種類總數必須等於 README 的「共 N 種…」，規則文字與範例標記裡的每個名稱都必須真的存在。
- `README.en.md`：英文版 README（與中文版頂端互相連結）。`tools/gen-cheatsheet.mjs` 會檢查它的功能總數與卡帶數是否與中文版一致。
- 下一個 Release 會附上 `ai-cheatsheet.md`。
- `.github/`：PR 範本、Issue 範本（回報問題、效果點子）、`CODEOWNERS`。

### 變更
- 速查表的逐字進場標示補齊 `stagger`、`ripple` 等手冊清單內的項目。
- 名稱來源抽成 `tools/lib-names.mjs`，由速查表與檢查器共用。
- `npm run check`、`npm run check:fast` 與 CI 的 `verify` 會檢查 `docs/catalog.md` 與 `docs/ai-cheatsheet.md` 是否為最新。
- README「請 AI 幫你上標記」改為建議貼速查表；完整手冊仍可使用。

### 修正
- `@underline`、`@strike` 在逐字版型上看不到線；`~rainbow` 對白字沒有效果；`blink-in` 不會閃爍；`checker-in` 沒有棋盤格。
- 遮罩式進退場（`open-h`、`iris`、`close-v`、`wipe-up-out` 等）改貼合文字範圍，不再一閃而過。標記名稱不變，舊 SRT 仍可使用；用到上述效果的句子畫面會改變。
- `test/golden` 依目前畫面重建，並納入新增效果；逐部件回歸改取動畫前段，看得出遮罩式效果的變化。
- 圖鑑樣式改成只作用在圖鑑內，不再影響句子編輯器的字級。
- 檢查器與手冊統一 `~` 規則：建議 1 個、上限 3 個，隨機產生兩個特效時不再報錯。
- 內建效果說明改在建置時產生，不再提交產生檔；新增卡帶時 `gen-catalog` 會自動更新 README 數量。
- CI 路徑加入 `docs/manual.md` 與 README，手冊改動不會漏檢。
- 把 JIZURA 系列說明殘留的日文改成繁體中文，並把「同上」改成可以單獨閱讀的說明。
- 更新手冊、架構文件與 `core/ui/thumbs.js` 註解裡已過時的路徑。

## [0.2.0] - 2026-10-19

### 新增
- 載入字幕時，提示列會列出不認得的標記名稱。
- README 新增效果示範圖，並說明「直接錄製」與「離線渲染」的差別。
- `npm run check:fast`，約 20 秒。

## [0.1.1] - 2026-10-18

- 卡帶化重構後的第一個公開版本（Release 沒有附說明，詳見 [commits](https://github.com/ToruSmith/kinetic-lyric-console/commits/v0.1.1)）。

[0.3.0]: https://github.com/ToruSmith/kinetic-lyric-console/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/ToruSmith/kinetic-lyric-console/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/ToruSmith/kinetic-lyric-console/commits/v0.1.1
