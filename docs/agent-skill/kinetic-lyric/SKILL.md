---
name: kinetic-lyric
description: 為 kinetic-lyric-console 的 SRT 歌詞上標記、挑選動態效果並檢查結果。使用者要做動態歌詞字幕、替 SRT 加特效標記，或貼上從圖庫複製的效果清單時使用。
---

# 動態歌詞標記

在 kinetic-lyric-console 專案根目錄工作。名稱與規則以專案內的檔案為準，不要憑記憶寫。

## 流程

1. 讀 `docs/ai-cheatsheet.md` 的語法與規則。需要細節時再查 `docs/manual.md`。
2. 判斷整首歌的情緒與段落，決定 2–3 個主力版型。其餘句子用安全選擇。
3. 需要找效果時，用查詢工具縮小範圍，不要把整份清單貼進對話：

   ```sh
   node tools/find-effect.mjs 抒情 模糊 --kind enter --energy low
   ```

4. 使用者提供圖庫清單時，只用清單裡的效果。清單以「我在動態歌詞圖鑑選了這些效果」開頭，或是 `?pick=enter:rise,fx:breathe` 這種連結。不適合時說明原因並詢問，不要自行替換。
5. 保留原序號、時間碼與歌詞，輸出帶標記的 SRT。
6. 交付前執行檢查，修掉所有錯誤：

   ```sh
   node tools/check-srt.mjs 帶標記.srt --against 原始.srt
   ```

7. 回覆時用不超過 5 行說明基調、主力版型與尚未解決的警告。

## 注意

- `docs/effect-index.tsv` 裡標 `draft` 的情緒與能量是未審核的推測，只能當參考，不能當成規則。
- 閃爍類效果有光敏風險，只給少數高潮句。
- 風格判斷由使用者決定。不確定時給一個小範例，不要整首重做。
