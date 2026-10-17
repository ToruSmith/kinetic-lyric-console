# kinetic-lyric-console

**動態歌詞字幕「遊戲機」**：網頁即時預覽、全螢幕錄製、離線渲染成 MP4／透明字層。
主機（console）負責解析、時間軸、編輯器與匯出；版型、進退場、特效、樣式、風格包、場景層都做成可插拔的「**卡帶**（cart）」——新增一個效果，只需要新增一個檔案。

> 🚧 **建置中。** 本 repo 是舊專案
> [`Web_Lyric_Subtitle_Tool`](https://github.com/ToruSmith/Web_Lyric_Subtitle_Tool) 的卡帶化重構。
> 舊專案仍可正常使用，不會再更動；它的固定快照放在 [`legacy/`](legacy/) 供搬遷對照。

## 進度與規劃

完整規劃（目錄、命名規則、卡帶合約、安全分級、里程碑）：[`docs/architecture-plan.md`](docs/architecture-plan.md)

| 里程碑 | 內容 | 狀態 |
|---|---|---|
| M0 | 舊資料快照上傳、規劃文件、授權標示 | ✅ |
| M1 | 骨架：`core/`、建置工具、卡帶登記層、省額度的 CI | ⏳ |
| M2 | `ctx` 外觀層、卡帶驗證工具、新舊逐像素對照 | ⏳ |
| M3 | 各類代表性卡帶示範，舊內容分批搬入 `carts/` | ⏳ |
| M4 | 貢獻文件與範本、刪除 `legacy/` | ⏳ |

## 授權

MIT，見 [`LICENSE`](LICENSE)。第三方內容見 [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md)。
