# kinetic-lyric-console · Kinetic Lyric Subtitle Tool

[繁體中文](README.md) | **English**

Turn SRT lyrics into **animated subtitles**: layouts, enter/exit animations, sustained effects, text styles, scene layers and style packs, with a live preview in the browser. Record straight from the browser to MP4/WebM, or render offline to a high-quality MP4, a transparent text layer or a green-screen video for your video editor.

**▶ Use it online (nothing to install): <https://torusmith.github.io/kinetic-lyric-console/>**

![Demo: four lines of lyrics, each with a different layout and enter/exit animation](assets/readme/hero.gif)

<sub>The demo lyrics are synthetic, written for this project. The frames come from the same render page the offline renderer uses (`npm run readme-assets` re-shoots them).</sub>

> **About the language.** The app's interface and the documents under `docs/` are in Traditional Chinese. Effect names (`center`, `rise`, `fade`, `slam`…) are plain English identifiers, and your lyrics can be in any language. An AI assistant can read the Chinese docs for you, and [`docs/ai-cheatsheet.md`](docs/ai-cheatsheet.md) is mostly identifiers and short rules. This page is a translation of the main [README](README.md); if the two ever disagree, the Chinese one is the source of truth.

- **One HTML file, works offline.** No server, no account. Lyrics, music and video are processed only inside your browser.
- **89 layouts, 59 scene layers, 55 enter animations, 44 exit animations, 37 sustained effects, 29 per-character styles and 20 style packs** (layouts and scenes each include 28 experimental "lab" items). That is the total the tool actually offers. [`docs/manual.md`](docs/manual.md) documents the original parts plus 11 newer ones; anything added later is listed in [`docs/catalog.md`](docs/catalog.md).
- **232 of them are standalone cartridge ("cart") files**, one effect per file: layouts 77, enter 34, exit 37, sustained effects 33, text styles 14, scenes 36, style packs 1 (see [`docs/catalog.md`](docs/catalog.md)). The remaining ~100 are built into the core (for example the `fade` and `rise` enters, the `neon` style and the basic layouts). They behave the same and just haven't been split into carts yet, so "number of carts" being smaller than "number of features" is expected.
- **Offline rendering is frame-exact.** Every animation is a pure function of time, so the same project renders to the same frames every time. "Record directly" captures the live preview and depends on your computer's performance, so it is not guaranteed to be frame-exact (see the [comparison](#output-video-record-directly-vs-offline-rendering) below). Frame-exactness assumes the same machine and the same Chromium version.
- **Regression protection.** Pixel fingerprints of the rendered output, a contract check for every cart, and tests for position, green screen, layers and post-processing.

> This project is the "cartridge-based" rewrite of the older project [`Web_Lyric_Subtitle_Tool`](https://github.com/ToruSmith/Web_Lyric_Subtitle_Tool) (the old project is no longer updated).

## Gallery

![Six layouts: justify-stack, hud-frame, poster, longshadow, mirror-reflect, marker](assets/readme/layouts.jpg)

Left to right, top to bottom: `#justify-stack`, `#hud-frame`, `#poster` (with the `&halftone` scene), `#longshadow`, `#mirror-reflect` (with the `&glow-ring` scene), `#marker`. Layouts, enter/exit animations, effects, styles and scenes can be combined freely. The full list is in [`docs/catalog.md`](docs/catalog.md).

## Start here, depending on who you are

| I am… | Go to |
|---|---|
| **A user** who wants to turn lyrics into animated subtitles | ["Three ways to use it"](#three-ways-to-use-it) below, plus [`docs/usage.md`](docs/usage.md) (desktop version and local rendering, step by step) |
| **Someone writing tagged SRT** (by hand or with AI help) | [Manual and SRT tag guide](docs/manual.md), [AI cheat sheet](docs/ai-cheatsheet.md), and ["Let an AI tag your lyrics"](#let-an-ai-tag-your-lyrics) below |
| **Someone sharing their own colours/fonts** (no coding) | [`docs/data-packs.md`](docs/data-packs.md): import/export style-pack JSON |
| **A contributor** who wants to add an effect | [`CONTRIBUTING.md`](CONTRIBUTING.md), then `npm run new-cart -- layout my-id`, then [`docs/cart-api.md`](docs/cart-api.md) |
| **An AI engineer / agent** changing this repo | [`CLAUDE.md`](CLAUDE.md) (hard rules) → [`docs/architecture-plan.md`](docs/architecture-plan.md) (architecture and decisions) → [`docs/cart-api.md`](docs/cart-api.md) (cart contract) → [`docs/legacy-map.md`](docs/legacy-map.md) (old-file map) |

## Three ways to use it

1. **Online.** Open the link above. Preview, editing and direct video recording all happen in the page.
2. **Desktop (single file).** Download `kinetic-lyric-console.html` from Releases and double-click it to open in Chrome or Edge. No installation. You can also press `Ctrl+S` on the online version to save it, or download the source and run `node tools/build.mjs`, then open `dist/index.html` (the source ZIP itself has no `index.html`).
3. **Local offline rendering (MP4 / transparent text layer / green screen).** Needs Node.js, ffmpeg and this repo. Export a "render project" from the page, then run `node render/run.mjs …`.

Step-by-step instructions for all three (including how to lay out the `input/` and `output/` folders) are in [`docs/usage.md`](docs/usage.md).

## Output video: record directly vs offline rendering

The page has two ways to produce video, for different purposes. The **Export** wizard in the top bar asks what you want to do and gives instructions (and, for offline rendering, the command line).

| | 🎥 Record directly | 🎬 Offline rendering |
|---|---|---|
| Install | Nothing; recent Chrome or Edge | Node.js, ffmpeg, this repo, Playwright's Chromium |
| How | Press record, choose "This tab" in the permission dialog and tick "Share tab audio". After a 3-second countdown the live preview is recorded and downloaded when it ends | Export `project.json` from the page, then run `node render/run.mjs …` in a terminal |
| Output | MP4 (where the browser supports it) or WebM, with background and text | MP4 with background and text, transparent text layer, separate text/ambient layers, green screen |
| Quality | Live capture; may drop frames on a slow machine. 30/60 fps and a light mode are available | Frames are captured one by one and assembled with ffmpeg, so nothing is dropped. Any resolution, 60 fps, plus motion blur, glow, chromatic aberration and colour grading |
| Reproducible | Not guaranteed frame-exact (depends on your machine) | Frame-exact for the same project (`--selftest` verifies it) |
| Good for | Quick sharing, previews, trying effects | Final output; overlaying text or keying out green in an editor |

Offline rendering can output the same line in three forms (the checkerboard in the middle stands for transparency):

![The same lyric line in three outputs: full frame, transparent text layer (over a checkerboard), green screen](assets/readme/outputs.png)

The green-screen output drops effects such as glow and shadow (they would mix colour into the background), which is why the text on the right has less glow than on the left.

Limits of direct recording:

- If no music or video is loaded, or "Share tab audio" wasn't ticked in the permission dialog, the recording is silent.
- Recording at a specific aspect ratio needs browser support for `CropTarget`; otherwise the whole window is recorded.
- Transparent layers, separate layers, green screen and post-processing are offline-rendering only.

## Let an AI tag your lyrics

An SRT for this tool can carry a tag in front of each line of lyrics, for example:

```
1
00:00:01,000 --> 00:00:03,500
#center+rise+fade^bc Night is slowly falling

2
00:00:03,500 --> 00:00:05,000
#slam+zoomin+blur-out~shake^bc@outline Don't {look back}
```

The meaning: `#layout` `+enter` `+exit` `~sustained effect` `^position` `@text style`, and `{}` marks the keyword. The full names and rules are in the [manual](docs/manual.md), which was written to be read by an AI in the first place.

**How:** give the [AI cheat sheet](docs/ai-cheatsheet.md) (about 16 KB; the name lists are generated from the carts, so newly added effects are included) to an AI together with your SRT, then paste one of the prompts below. If you want the AI to see the full explanation and the details of every name, give it the [manual](docs/manual.md) (about 57 KB) instead.

**① Tag the whole song**
```
First read this cheat sheet for the kinetic lyric subtitle tool in full.
Then add a complete tag to every line of my SRT. Overall style: [slow ballad / energetic / cyber / retro… pick one or describe your own].
Use only names that appear in the cheat sheet, and follow its output format (one code block, keep the original numbers and timecodes).
[paste your SRT]
```

**② Adjust only a few lines**
```
Following the cheat sheet, change only the tags of lines 5, 6 and 12 to feel [quieter / stronger]. Leave every other line exactly as it is.
[paste your tagged SRT]
```

**③ Also ask for global settings**
```
Following the cheat sheet, tag the whole song, and also give a small config JSON (3–6 fields) so the overall colours and font fit [theme].
```

When the AI replies: save it as `.srt`, then use **Load ▾ → Load subtitles** in the top bar to preview it. If you like it, export with the **Export** wizard. A wrong name won't break anything (an unknown layout falls back to `lowerleft`), and the status bar lists the names it didn't recognise when you load the file. You can simply ask the AI to "rewrite using only the names in the cheat sheet".

> The manual's name tables cover the original parts. The cheat sheet ([`docs/ai-cheatsheet.md`](docs/ai-cheatsheet.md)) and [`docs/catalog.md`](docs/catalog.md) are generated from the carts and include everything added later. The cheat sheet is also attached to every Release as `ai-cheatsheet.md`.

## Before you use it

- **Photosensitivity.** `flicker`, `glitch`, `shake`, `rainbow`, the lightning overlay, the `flash-words` layout and similar effects cause rapid light/dark changes or flashing, which is a risk for viewers with photosensitive epilepsy or sensitivity to flicker. Avoid large-area, high-frequency, continuous use before publishing, and add a warning in the video description. The Export wizard also warns you when you output video.
- **Material rights.** The copyright of songs, lyrics and background video stays with the material itself. Make sure you have the right to use and publish it; this tool only provides the visual effects.
- **Third-party content.** Some layouts and animations are ported from JIZURA (MIT). See [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md) for the notices.

## Project layout

```
core/    host: parsing, timeline, editor, export; the cart registry (api/console.js)
carts/   carts, one effect per file: layout enter exit fx style scene pack (_template is the template)
render/  offline rendering (Node + Playwright + ffmpeg)
tools/   build, new-cart, catalog and cheat-sheet generators, thumbnails (make-thumbs)
test/    contract, position, green screen, layers, post-processing and behaviour tests; golden/ holds the pixel-fingerprint baselines
docs/    manual, cart contract, architecture plan, usage guide
```

Six layouts that depend on global screen features (text-mask, hanko, ink-bleed, ripple-pool, constellation, particle-form) stay in `core/legacy/` and are not carts: they inject SVG filters, register CSS properties or use the water-surface GL, which breaks the cart rule of "pure function, no globals".

## Development

```
npm ci               # only needed for lint/tests/rendering; a plain build can skip it
npm run build        # same as node tools/build.mjs → dist/index.html (single file)
npm run lint
npm run check:fast   # quick check (~20 s): build, lint, boot, behaviour, spec sync and more; run this first for text or small changes
npm run check        # full verification (~40–60 min; day to day, run only the relevant tests)
npm run regress      # compare rendered frames with the fingerprints in test/golden
npm run catalog      # regenerate docs/catalog.md
npm run cheatsheet   # regenerate docs/ai-cheatsheet.md
```

GitHub Actions minutes are limited, so verify locally first; the rules are in section 8 of [`docs/architecture-plan.md`](docs/architecture-plan.md).

## License

MIT, see [`LICENSE`](LICENSE). Third-party content (JIZURA and others) is in [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md).
