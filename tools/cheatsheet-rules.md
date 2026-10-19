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
