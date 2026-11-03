// SRT 檢查器測試（不需要瀏覽器）：node test/srt-check.mjs
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { checkSrt } from '../tools/check-srt.mjs';

const block = (n, a, z, body) => `${n}\n00:00:${a},000 --> 00:00:${z},000\n${body}\n`;
const srt = (...b) => b.map((t, i) => block(i + 1, String(i * 3 + 10), String(i * 3 + 12), t)).join('\n');
const msgs = (r, level) => r.issues.filter(i => i.level === level).map(i => i.message).join('\n');
let n = 0; const t = (name, fn) => { fn(); n++; };

t('好的標記沒有錯誤也沒有警告', () => {
  const r = checkSrt(srt('#center+rise+fade^bc 夜色漸漸深了', '#slam+zoomin+blur-out~shake^bc@outline 不要{回頭}', '#pv-lyric+fade+fade^bl 看天台上{流星}(路過)', '#lowerleft+blur-in+fade&none 還在'));
  assert.deepEqual(r.issues, []); assert.equal(r.stats.tagged, 4);
});
t('未知名稱會報錯並給建議', () => {
  const m = msgs(checkSrt(srt('#centre+rize+fadee~shakee@outlne&halftonee 歌')), 'error');
  for (const x of ['`center`', '`rise`', '`fade`', '`shake`', '`outline`', '`halftone`']) assert.match(m, new RegExp(x), x);
});
t('語法錯誤', () => {
  assert.match(msgs(checkSrt(srt('#center + rise 歌')), 'error'), /空白/);
  assert.match(msgs(checkSrt(srt('@neon#center 歌')), 'error'), /開頭/);
  assert.match(msgs(checkSrt(srt('#center+fade+fade~float,shake 歌')), 'error'), /最多 1/);
  assert.match(msgs(checkSrt(srt('#center+fade+fade@neon,outline,trail,stamp 歌')), 'error'), /最多 3/);
  assert.match(msgs(checkSrt(srt('#center+fade+fade^alt:bl 歌')), 'error'), /alt/);
  assert.match(msgs(checkSrt(srt('#center+fade+fade^zz 歌')), 'error'), /格式/);
  assert.match(msgs(checkSrt(srt('#center+fade+fade {歌')), 'error'), /成對/);
  assert.match(msgs(checkSrt('1\n00:00:05,000 --> 00:00:04,000\n歌\n'), 'error'), /時間碼/);
  assert.match(msgs(checkSrt('沒有時間碼'), 'error'), /時間碼/);
});
t('規則警告', () => {
  const w = (s, re) => assert.match(msgs(checkSrt(s), 'warning'), re);
  w(srt('#center 歌'), /寫齊/);
  w(srt('#hud-frame+fade+fade^bc 歌'), /滿版/);
  w(srt('#page-flip+fade+fade 歌'), /第一句/);
  w(srt('#center+fade+fade 一', '#page-flip+fade+fade 二', '#page-flip+fade+fade 三', '#center+fade+fade 四'), /連續/);
  w(srt('#margin+fade+fade 歌'), /實驗室/);
  w(srt('#center+fade+fade 歌', '不是標記'), /沒有標記/);
  w(srt('#split+fade+fade 外面{裡面}'), /split/);
  w(srt('#center+fade+fade*毛筆 歌'), /URL/);
  w('1\n00:00:01,000 --> 00:00:02,000\n#particle-form+scramble+fade 歌\n', /來不及/);
  w('1\n00:00:01,000 --> 00:00:02,000\n#center+stagger+fade 歌\n', /逐字/);
  w(srt(...Array(5).fill('#center+fade+fade~glitch 歌')), /光敏/);
  w('1\n00:00:01,000 --> 00:00:04,000\n#center+fade+fade 一\n\n2\n00:00:03,000 --> 00:00:05,000\n#center+fade+fade 二\n', /重疊/);
});
t('逐句轉場', () => {
  assert.deepEqual(checkSrt(srt('#center+fade+fade&trans-wipe 歌', '#center+fade+fade&halftone:60,trans-zoom 歌')).issues, []);
  assert.match(msgs(checkSrt(srt('#center+fade+fade&trans-boom 歌')), 'error'), /trans-boom/);
});
t('--against：時間與歌詞被改會被抓到，只加標記不會', () => {
  const base = srt('夜色漸漸深了', '看天台上流星');
  assert.equal(checkSrt(srt('#center+rise+fade 夜色{漸漸}深了||NIGHT', '#pv-lyric+fade+fade 看天台上{流星}(路過)'), { against: base }).stats.errors, 0);
  assert.match(msgs(checkSrt(srt('#center+rise+fade 夜色深了', '#center+fade+fade 看天台上流星'), { against: base }), 'error'), /歌詞被改動/);
  assert.match(msgs(checkSrt(block(1, '10', '13', '夜色漸漸深了') + '\n' + block(2, '13', '15', '看天台上流星'), { against: base }), 'error'), /時間碼被改動/);
  assert.match(msgs(checkSrt(srt('一句'), { against: base }), 'error'), /句數/);
});
t('CRLF 與 BOM', () => assert.deepEqual(checkSrt('﻿' + srt('#center+rise+fade 歌').replace(/\n/g, '\r\n')).issues, []));
t('手冊與速查表的範例都能通過', () => {
  const md = fs.readFileSync(new URL('../docs/ai-cheatsheet.md', import.meta.url), 'utf8');
  const code = /```\n(1\n[\s\S]*?)```/.exec(md)[1];
  assert.equal(checkSrt(code).stats.errors, 0);
});
t('指令列退出碼', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'srt-check-')), good = path.join(dir, 'good.srt'), bad = path.join(dir, 'bad.srt'), soft = path.join(dir, 'soft.srt');
  const tool = new URL('../tools/check-srt.mjs', import.meta.url).pathname, run = (...a) => spawnSync(process.execPath, [tool, ...a], { encoding: 'utf8' });
  fs.writeFileSync(good, srt('#center+rise+fade 歌')); fs.writeFileSync(bad, srt('#nope+rise+fade 歌')); fs.writeFileSync(soft, srt('#center 歌'));
  assert.equal(run(good).status, 0); assert.equal(run(bad).status, 1); assert.equal(run(soft).status, 0); assert.equal(run(soft, '--strict').status, 1);
  assert.equal(run().status, 2); assert.equal(run(path.join(dir, 'missing.srt')).status, 2); assert.equal(run(good, '--against').status, 2);
  assert.equal(JSON.parse(execFileSync(process.execPath, [tool, good, '--json'], { encoding: 'utf8' })).stats.errors, 0);
  fs.rmSync(dir, { recursive: true });
});
console.log(`SRT 檢查器｜通過 ${n}、失敗 0`);
