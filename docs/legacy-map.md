# 舊檔名 → 新路徑對照

舊專案 `src/` 的檔名用數字前綴排序、共用全域作用域；新版改為依用途分資料夾，順序由 `core/order.json` 明列。內容未改（建置結果與舊 `index.html` 逐位元組相同，見 `node tools/build.mjs --same-as legacy/index.html`）。

`core/legacy/` 裡是「尚未拆成一檔一卡帶」的舊版型／動畫／場景，M3 起分批搬進 `carts/`。

| 舊檔 | 新檔 |
|---|---|
| `src/00-header.js` | `core/kernel/legacy-file-map.js` |
| `src/01-render.js` | `core/kernel/render-mode.js` |
| `src/02-config.js` | `core/kernel/config.js` |
| `src/03-parse.js` | `core/kernel/parse.js` |
| `src/04-anim.js` | `core/kernel/anim.js` |
| `src/05-build.js` | `core/kernel/build-sentence.js` |
| `src/06-beat.js` | `core/kernel/beat.js` |
| `src/07-loop.js` | `core/kernel/loop.js` |
| `src/08-load.js` | `core/kernel/load.js` |
| `src/09-ui-panel.js` | `core/ui/panel.js` |
| `src/10-lay-a.js` | `core/legacy/layouts-classic.js` |
| `src/11-fx-enter-exit.js` | `core/legacy/motion-and-layouts-b.js` |
| `src/12-ui-editor.js` | `core/ui/presets-srt.js` |
| `src/13-editor.js` | `core/ui/sentence-editor.js` |
| `src/13-export.js` | `core/ui/project-export.js` |
| `src/13-rand.js` | `core/ui/randomizer.js` |
| `src/14-ambient.js` | `core/kernel/ambient.js` |
| `src/15-overlay.js` | `core/kernel/overlay.js` |
| `src/15-scene.js` | `core/kernel/scene-engine.js` |
| `src/15-scene2.js` | 已拆成 `carts/scene/*.cart.js`（31 個）；其餘已無內容 |
| `src/16-beatfx.js` | `core/kernel/beat-fx.js` |
| `src/16-lay-c.js` | `core/legacy/layouts-keyword-fx.js` |
| `src/17-lay-d.js` | `core/legacy/layouts-collage.js` |
| `src/18-style.js` | `core/kernel/text-style.js` |
| `src/19-pos.js` | `core/kernel/position.js` |
| `src/20-water.js` | `core/kernel/water-gl.js` |
| `src/21-lay-e.js` | `core/legacy/layouts-scene-fx.js` |
| `src/22-lay-f.js` | `core/legacy/layouts-reveal.js` |
| `src/23-lay-g.js` | `core/legacy/layouts-pv.js` |
| `src/23-lay-h.js` | `core/legacy/layouts-pv-text.js` |
| `src/23-lay-i.js` | `core/legacy/layouts-lab-text.js` |
| `src/23-lay-j.js` | `core/legacy/layouts-jizura-typography.js` |
| `src/23-lay-k.js` | `core/legacy/layouts-jizura-editorial.js` |
| `src/23-lay-l.js` | `core/legacy/layouts-jizura-frames.js` |
| `src/23-motion-k.js` | 已全數拆成 `carts/{enter,exit,fx,style}/*.cart.js` |
| `src/23-motion-l.js` | 已全數拆成 `carts/{enter,exit,fx,style}/*.cart.js` |
| `src/23-styles.js` | `core/ui/style-pack-panel.js` |
| `src/24-decor-k.js` | 已拆成 `carts/scene/{crop-marks,crosshair,dimension-lines,edge-ticks}.cart.js` |
| `src/24-misc.js` | `core/kernel/boot.js` |
| `src/25-quick.js` | `core/ui/quick-menu.js` |
| `src/25-wizard.js` | `core/ui/export-wizard.js` |
| `src/26-record.js` | `core/kernel/record.js` |
| `src/27-render-api.js` | `core/kernel/render-api.js` |
| `src/28-thumbs-idx.js` | `core/ui/thumbs-index.js` |
| `src/28-thumbs.js` | `core/ui/thumbs.js` |
| `build.mjs` | `tools/build.mjs` |
| `render/*` `test/*` | `render/*` `test/*`（檔名同，路徑改指向 `dist/`、`legacy/`） |

## 過渡墊片

`core/api/legacy-order.js` 凍結舊版各登記表的名稱順序，`core/api/finalize.js` 在卡帶載完後排回舊順序，使逐句隨機、面板清單、縮圖索引的結果與舊版完全相同。M4 移除（接受一次性的隨機結果改變）。逐句隨機的主題表（`RND_*`）暫時仍在 `core/ui/randomizer.js`。
