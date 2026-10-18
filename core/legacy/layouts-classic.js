/* ===== [LAY-A] 版型 A（NL 表）：typewriter vertical blurfocus wipe glitch stack outline-big subtitle-box poster；輔助 CE / fit ===== */
const CE=(c,css)=>{const e=txtEl(`inset:0;display:flex;align-items:center;justify-content:center;text-align:center;${css}`);c.appendChild(e);return e};
const fit=(sb,big)=>{const n=Math.max(sb.plain.length,3),ln=Math.ceil(n/18);return Math.min(big*.55,SWd()/(n/ln)*.9,SHd()/ln*.5)}; // 長句自動換行並縮小
const NL={
 
};
