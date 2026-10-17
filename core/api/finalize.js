/* ===== [FINALIZE] 卡帶全部載完後、boot 之前：把名稱陣列排回舊版順序（見 legacy-order.js；過渡措施）===== */
(()=>{
 const T={layout:LAYOUTS,enter:ENTERS,exit:EXITS,fx:FXS,scene:SCENE_NAMES};
 for(const k in T){const arr=T[k],rank=new Map(LEGACY_ORDER[k].map((n,i)=>[n,i])),keep=arr.map((n,i)=>[n,i]);
  keep.sort((a,b)=>(rank.has(a[0])?rank.get(a[0]):1e9+a[1])-(rank.has(b[0])?rank.get(b[0]):1e9+b[1]));
  const sorted=keep.map(x=>x[0]);arr.length=0;arr.push(...sorted)}
  /* 樣式表是物件：鍵順序決定編輯器樣式晶片的排列，同樣排回舊順序 */
 for(const[tbl,k]of[[ST,"st"],[STC,"stc"]]){const rank=new Map(LEGACY_ORDER[k].map((n,i)=>[n,i])),ks=Object.keys(tbl).map((n,i)=>[n,i]);
  ks.sort((a,b)=>(rank.has(a[0])?rank.get(a[0]):1e9+a[1])-(rank.has(b[0])?rank.get(b[0]):1e9+b[1]));
  const vals=ks.map(x=>[x[0],tbl[x[0]]]);ks.forEach(x=>delete tbl[x[0]]);vals.forEach(([n,f])=>{tbl[n]=f})}
})();
