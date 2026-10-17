# 卡帶 API v1（`apiVersion: 1`）

一個卡帶＝一個檔案：`carts/<種類>/<id>.cart.js`，內容恰好一個頂層 `Console.cart({...})`。
資料夾名稱＝`kind`，檔名＝`id`（小寫英數與連字號，如 `ink-bleed`）。建置時每個卡帶會被包成 IIFE，內部宣告不會外洩。
範本在 [`carts/_template/`](../carts/_template/)，示範在 `carts/<種類>/`。

## 共通欄位

| 欄位 | 必填 | 說明 |
|---|---|---|
| `kind` | ✓ | `layout` `enter` `exit` `fx` `style` `scene` `pack` |
| `id` | ✓ | 與檔名一致；不可與同種類既有名稱重複 |
| `apiVersion` | ✓ | 目前固定 `1` |
| `label.zh` | ✓ | 中文顯示名稱（風格包以它登記，須唯一）；`label.en` 選填 |
| `author` `license` `source` `demo` | | `demo`：一句帶標記的範例歌詞，如 `#ink-bleed 看天台上{流星}` |
| `rand` | | 逐句隨機的適配資料（見下表），**不給＝不進隨機池** |

不認得的欄位一律拒絕（防拼錯），登記失敗只影響該卡帶，原因記在 `Console.errors` 並由 `selfCheck` 列出。

## 各種類

| kind | 欄位（擇一者以「／」分隔） | 說明 |
|---|---|---|
| `layout` | `render(ctx)`、`flags?{brace,full,lab,ownSub}` | 排版＋進場。`brace`：`{}` 當關鍵字；`full`：滿版（不套安全邊界）；`lab`：實驗版型；`ownSub`：自己畫副文字 |
| `enter` | `keyframes`／`perChar{keyframes:(i,n)=>[...],fallback,gap?}`／`play(ctx)`，`easing?` | 進場動畫 |
| `exit` | `keyframes`、`perChar(ctx)=>{kf,dur?,at?,ease?}`（至少一個，可同時提供：有逐字元素用 `perChar`，否則用整句 `keyframes`） | 退場動畫 |
| `fx` | `keyframes`＋`duration`（毫秒）／`play(ctx)`，`easing?` | 持續特效 |
| `style` | `scope: 'element'｜'sentence'`、`apply(ctx)` | 文字樣式 |
| `scene` | `layer: 'under'｜'over'`、`group`、`amount 0–100`、`cost: 輕｜中｜重`、`lab?`、`draw(g,f,u)` | canvas 場景層 |
| `pack` | `config`（欄位同 `CONFIG`） | 一包設定，沒有程式 |

## `ctx`（唯一介面，凍結）

共通：`apiVersion`、`anim(el, keyframes, opts)`（時間驅動、可暫停的動畫；**唯一的動畫入口**）、`speed`、`beatMs()`、`colors`（`var(--a)` 強調、`var(--c)` 文字）、`config`（唯讀：`bpm` `speed` `spacing`）、`computed(el)`（= `getComputedStyle`）。

- **layout.render**：`sentence`（`.plain` `.sub` `.hl` …）、`host`（放內容的容器）、`root`、`duration`（秒）、`charEls`（把逐字元素 push 進來，特效才找得到）、`width` `height` `bigSize` `smallSize`、`text(css)`、`splitChars(str, el)`、`centered(css)`、`fitSize()`、`random(seed)`、`enterMs()`、`enter(el, kind?, list?)`
- **enter.play**：`el`、`charEls`、`duration`
- **exit.perChar**：`el`、`index`、`count`、`random`
- **fx.play**：`el`、`duration`、`charEls()`、`textEls()`（帶字體樣式的文字元素）
- **style（element）**：`el`、`vertical`、`shadow(css)`、`perChar()`；**（sentence）**：`host`、`sentence`、`duration`、`textEls()`、`splitChars()`、`enterMs()`
- **scene.draw(g, f, u)**：`g` canvas 2D；`f = {t, W, H, a, lite, R, C, bp, env, r, seed, G1, G2}`；`u = {fade(g,f,v), TAU, random(種子), hash(字串), bpm()}`

## `rand` 適配

| kind | 可用鍵 |
|---|---|
| `layout` | `sceneThemes: ['tech'｜'grunge']`、`sparse`、`textCanvas`、`strong`、`noEnter`、`needSub` |
| `scene` | `theme: 'neutral'｜'tech'｜'grunge'`（必填才進池） |
| `fx` | `group: 'cam'｜'color'｜'char'｜'jitter'｜'rot'`（同組互斥）、`strong`、`domOnly` |

## 規約（`npm run lint` 強制）

1. **時間的純函數**：同一專案同一時刻必得同一畫面（離線渲染逐格可重現）。不可用 `Math.random`、`Date`、`performance`、`setTimeout`／`setInterval`／`requestAnimationFrame`；亂數用 `ctx.random(種子)`，延遲用 `ctx.anim` 的 `delay`。
2. **不連網、不存取儲存**：`fetch`、`XMLHttpRequest`、`WebSocket`、`localStorage`、`navigator`、`window`／`globalThis`、CSS `url()`、`@import`、動態 `import`／`eval`／`Function`、`innerHTML`／`src`／`href` 賦值一律禁止。
3. **只碰 ctx 給你的容器**：不可 `document.body`／`querySelector` 等；建立元素用 `document.createElement`。
4. **只能走 `Console.cart()`**：不可修改既有登記表或全域。
5. **檔名**：ASCII、小寫、連字號；中文放內容裡。

驗證：`npm run build && npm run lint && node test/carts.mjs`。`test/carts.mjs` 會自動涵蓋 `carts/` 底下所有卡帶（合約、有效果、確定性、九宮格位置、不連網），新增卡帶不需改測試。
