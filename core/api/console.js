/* ===== [CONSOLE] 卡帶合約 v1：Console.cart(manifest) =====
   主機只認這一個入口。卡帶（carts/<種類>/<id>.cart.js）呼叫它登記自己；本檔負責
   ① 驗證 manifest（欄位、id 格式、不與既有名稱衝突）；
   ② 轉接到既有登記表（registerLayout／ENTER_X／EXTRA_EX／EXIT_C／FXH／EXTRA_FK／ST／STC／regScene／regPack）；
   ③ 把 rand／flags 帶進逐句隨機的適配表（RND_*）與各個名稱集合（LAB_LAYOUTS、SUB_OWN）；
   ④ 只給卡帶「ctx」這個窄介面，不讓卡帶直接碰主機內部的全域名稱。

   卡帶登記失敗不會讓主機掛掉：錯誤記在 Console.errors 並印到 console.error，其餘卡帶照常載入。
   卡帶規約（lint 會檢查）：時間的純函數，不用 Math.random／Date.now／計時器／網路／儲存；亂數一律用 ctx.random(種子)。
   完整說明見 docs/cart-api.md。 ===== */
const Console=(()=>{
 const API=1,KINDS=["layout","enter","exit","fx","style","scene","pack"],carts=[],errors=[];
 const ID=/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/,isFn=f=>typeof f==="function",isObj=o=>o&&typeof o==="object"&&!Array.isArray(o);
 const COMMON=["kind","id","apiVersion","label","source","author","license","demo","rand"];
 const KEYS={
  layout:[...COMMON,"render","flags"],
  enter:[...COMMON,"keyframes","easing","perChar","play"],
  exit:[...COMMON,"keyframes","perChar"],
  fx:[...COMMON,"keyframes","duration","easing","play"],
  style:[...COMMON,"scope","apply"],
  scene:[...COMMON,"layer","group","amount","cost","lab","draw"],
  pack:[...COMMON,"config"]};
 const bad=(d,m)=>{throw new Error(`[cart ${d&&d.kind||"?"}:${d&&d.id||"?"}] ${m}`)};
 const append=(cur,id)=>(cur?cur+" ":"")+id;   /* RND_* 是空白分隔的字串清單 */

 function validate(d){
  if(!isObj(d))bad(d,"manifest 必須是物件");
  if(!KINDS.includes(d.kind))bad(d,`kind 必須是 ${KINDS.join("／")} 其中之一`);
  if(!ID.test(String(d.id||"")))bad(d,"id 必須是小寫英數與連字號（例：ink-bleed）");
  if(d.apiVersion!==API)bad(d,`apiVersion 必須是 ${API}（本主機的卡帶介面版本）`);
  const un=Object.keys(d).filter(k=>!KEYS[d.kind].includes(k));if(un.length)bad(d,`不認得的欄位：${un.join("、")}（可用：${KEYS[d.kind].join("、")}）`);
  if(!isObj(d.label)||typeof d.label.zh!=="string"||!d.label.zh.trim())bad(d,"label.zh（中文顯示名稱）必填");
  if(carts.some(c=>c.kind===d.kind&&c.id===d.id))bad(d,"同種類下 id 重複登記");
  if(d.demo!==undefined&&typeof d.demo!=="string")bad(d,"demo 必須是字串（一句帶標記的範例，例：#ink-bleed 看天台上{流星}）");
  const kf=a=>Array.isArray(a)&&a.length>=2&&a.every(isObj);
  const one=(names)=>{const n=names.filter(k=>d[k]!==undefined);if(n.length!==1)bad(d,`${names.join("／")} 必須恰好提供一個（目前：${n.join("、")||"無"}）`)};
  switch(d.kind){
   case"layout":if(!isFn(d.render))bad(d,"render(ctx) 必須是函式");
    if(d.flags!==undefined){if(!isObj(d.flags))bad(d,"flags 必須是物件");const fu=Object.keys(d.flags).filter(k=>!["brace","full","lab","ownSub"].includes(k));if(fu.length)bad(d,`flags 不認得的欄位：${fu.join("、")}（可用：brace、full、lab、ownSub）`)}
    if(LAYOUTS.includes(d.id)||NL[d.id])bad(d,"與既有版型同名");break;
   case"enter":one(["keyframes","perChar","play"]);
    if(d.keyframes!==undefined&&!kf(d.keyframes))bad(d,"keyframes 必須是至少兩個影格的陣列");
    if(d.perChar!==undefined&&!(isObj(d.perChar)&&isFn(d.perChar.keyframes)&&kf(d.perChar.fallback)))bad(d,"perChar 必須是 {keyframes:(i,n)=>影格陣列, fallback:影格陣列, gap?:毫秒}");
    if(d.play!==undefined&&!isFn(d.play))bad(d,"play(ctx) 必須是函式");
    if(ENTERS.includes(d.id)||ENTER_X[d.id])bad(d,"與既有進場同名");break;
   case"exit":if(d.keyframes===undefined&&d.perChar===undefined)bad(d,"keyframes／perChar 至少要提供一個（可同時提供：有逐字元素用 perChar，沒有就用整句 keyframes）");
    if(d.keyframes!==undefined&&!kf(d.keyframes))bad(d,"keyframes 必須是至少兩個影格的陣列");
    if(d.perChar!==undefined&&!isFn(d.perChar))bad(d,"perChar(ctx) 必須是函式，回傳 {kf,dur?,at?,ease?}");
    if(EXITS.includes(d.id)||EXTRA_EX[d.id]||EXIT_C[d.id])bad(d,"與既有退場同名");break;
   case"fx":one(["keyframes","play"]);
    if(d.keyframes!==undefined){if(!kf(d.keyframes))bad(d,"keyframes 必須是至少兩個影格的陣列");if(!(d.duration>0))bad(d,"keyframes 版的 fx 必須給 duration（毫秒，>0）")}
    if(d.play!==undefined&&!isFn(d.play))bad(d,"play(ctx) 必須是函式");
    if(FXS.includes(d.id)||FXH[d.id]||EXTRA_FK[d.id])bad(d,"與既有特效同名");break;
   case"style":if(!["element","sentence"].includes(d.scope))bad(d,"scope 必須是 element 或 sentence");if(!isFn(d.apply))bad(d,"apply(ctx) 必須是函式");
    if(ST[d.id]||STC[d.id])bad(d,"與既有樣式同名");break;
   case"scene":if(!["under","over"].includes(d.layer))bad(d,"layer 必須是 under 或 over");if(typeof d.group!=="string"||!d.group)bad(d,"group（互斥群組名）必填");
    if(!(d.amount>=0&&d.amount<=100))bad(d,"amount（預設強度）必須在 0–100");if(!SCENE_COST[d.cost])bad(d,`cost 必須是 ${Object.keys(SCENE_COST).join("／")}`);
    if(!isFn(d.draw))bad(d,"draw(g, f, u) 必須是函式");if(SCENES[d.id])bad(d,"與既有場景同名");break;
   case"pack":if(!isObj(d.config)||!Object.keys(d.config).length)bad(d,"config 必須是非空物件（欄位同 CONFIG／風格包）");
    if(STYLE_PACKS.has(d.label.zh)||PRESETS[d.label.zh])bad(d,"與既有預設組合／風格包同名（風格包以 label.zh 登記）");break}
  checkRand(d)}

 /* ---- 給卡帶的窄介面（凍結；新增欄位不算破壞，改名或移除要升 apiVersion）---- */
 const baseCtx=()=>({apiVersion:API,anim:A,speed:+CONFIG.speed||1,beatMs:()=>60000/(+CONFIG.bpm||120),colors:Object.freeze({accent:"var(--a)",text:"var(--c)"}),
  config:Object.freeze({get bpm(){return+CONFIG.bpm||120},get speed(){return+CONFIG.speed||1},get spacing(){return+CONFIG.spacing||0}}),computed:el=>getComputedStyle(el)});
 const layoutCtx=(sb,c,w,big,sm,dur,list)=>Object.freeze({...baseCtx(),sentence:sb,host:c,root:w,duration:dur,charEls:list,width:SWd(),height:SHd(),bigSize:big,smallSize:sm,
  text:txtEl,splitChars:chars,centered:css=>CE(c,css),fitSize:()=>fit(sb,big),random:sr,enterMs:D,enter:(el,kind,l)=>enter(el,kind||sb.en||"fade",l)});
 const AD={
  layout(d){const f=d.flags||{};registerLayout(d.id,(sb,c,w,big,sm,dur,list)=>d.render(layoutCtx(sb,c,w,big,sm,dur,list)),{brace:f.brace,full:f.full});
   if(f.lab)LAB_LAYOUTS.add(d.id);if(f.ownSub)SUB_OWN.add(d.id)},
  enter(d){
   if(d.keyframes)ENTER_X[d.id]=(el,l,du)=>A(el,d.keyframes,Object.assign({duration:du},d.easing?{easing:d.easing}:null));
   else if(d.perChar){const P=d.perChar,gap=P.gap>=0?P.gap:70;ENTER_X[d.id]=(el,l,du)=>{if(l&&l.length)l.forEach((c,i)=>A(c,P.keyframes(i,l.length),{duration:du,delay:i*gap/(+CONFIG.speed||1)}));else A(el,P.fallback,{duration:du})}}
   else ENTER_X[d.id]=(el,l,du)=>d.play(Object.freeze({...baseCtx(),el,charEls:l||[],duration:du}));
   ENTERS.push(d.id)},
  exit(d){
   if(d.keyframes)EXTRA_EX[d.id]=d.keyframes;
   if(d.perChar)EXIT_C[d.id]=(c,i,n,R)=>d.perChar(Object.freeze({el:c,index:i,count:n,random:R}));
   EXITS.push(d.id)},
  fx(d){
   if(d.keyframes)EXTRA_FK[d.id]=[d.keyframes,d.duration,d.easing||"ease-in-out"];
   else FXH[d.id]=(fw,du)=>d.play(Object.freeze({...baseCtx(),el:fw,duration:du,charEls:()=>cl(fw),textEls:()=>tel(fw)}));
   FXS.push(d.id)},
  style(d){
   if(d.scope==="element")ST[d.id]=e=>d.apply(Object.freeze({...baseCtx(),el:e,vertical:isV(e),shadow:s=>addSh(e,s),perChar:()=>_lv(e)}));
   else STC[d.id]=(c,sb,du)=>d.apply(Object.freeze({...baseCtx(),host:c,sentence:sb,duration:du,textEls:()=>tEls(c),splitChars:()=>charify(c),enterMs:D}))},
  scene(d){regScene(d.id,d.layer,d.group,d.amount,(g,f)=>d.draw(g,f,SCENE_UTIL),{lab:!!d.lab,cost:d.cost})},
  pack(d){regPack(d.label.zh,d.config)}};
 const SCENE_UTIL=Object.freeze({fade:al,TAU:PI*2,random:q=>sr(q),hash:s=>hashN(s),bpm:()=>+CONFIG.bpm||120});   /* 場景用：u.fade(g,f,v)＝套上淡入淡出包絡後的 globalAlpha；u.random(種子)＝確定性亂數；u.hash(字串)＝穩定雜湊；u.bpm()＝目前 BPM */

 /* ---- rand：卡帶宣告的「適配」資料，併進逐句隨機的表（見 ui/randomizer.js）。檢查在登記之前做（checkRand），避免半登記 ---- */
 const TH=["neutral","tech","grunge"],RAND_ALLOW={layout:["sceneThemes","sparse","textCanvas","strong","noEnter","needSub"],scene:["theme"],fx:["group","strong","domOnly"],enter:[],exit:[],style:[],pack:[]};
 function checkRand(d){
  const r=d.rand;if(r===undefined)return;if(!isObj(r))bad(d,"rand 必須是物件");
  const allow=RAND_ALLOW[d.kind],un=Object.keys(r).filter(k=>!allow.includes(k));if(un.length)bad(d,`rand 在 ${d.kind} 不認得的欄位：${un.join("、")}（可用：${allow.join("、")||"無"}）`);
  if(d.kind==="layout"&&r.sceneThemes!==undefined&&(!Array.isArray(r.sceneThemes)||r.sceneThemes.some(t=>!["tech","grunge"].includes(t))))bad(d,"rand.sceneThemes 只能是 tech／grunge 組成的陣列（neutral 場景本來就都能搭）");
  if(d.kind==="scene"&&!TH.includes(r.theme))bad(d,`rand.theme 必須是 ${TH.join("／")}`);
  if(d.kind==="fx"&&r.group!==undefined&&!Object.keys(RND_FX_GRP).includes(r.group))bad(d,`rand.group 必須是 ${Object.keys(RND_FX_GRP).join("／")}（同組互斥，因為同屬性的動畫會互相覆蓋）`)}
 function applyRand(d){
  const r=d.rand;if(!r)return;
  if(d.kind==="layout"){(r.sceneThemes||[]).forEach(t=>{RND_LAY_TH[t]=append(RND_LAY_TH[t],d.id)});
   if(r.sparse)RND_SPARSE=append(RND_SPARSE,d.id);if(r.textCanvas)RND_TEXT_CANVAS=append(RND_TEXT_CANVAS,d.id);
   if(r.strong)RND_STRONG_LAY=append(RND_STRONG_LAY,d.id);if(r.noEnter)RND_NO_EN=append(RND_NO_EN,d.id);if(r.needSub)RND_NEED_SUB=append(RND_NEED_SUB,d.id)}
  else if(d.kind==="scene")RND_SCN_TH[r.theme]=append(RND_SCN_TH[r.theme],d.id);
  else if(d.kind==="fx"){if(r.group)RND_FX_GRP[r.group]=append(RND_FX_GRP[r.group],d.id);if(r.strong)RND_FX_STRONG=append(RND_FX_STRONG,d.id);if(r.domOnly)RND_FX_DOM=append(RND_FX_DOM,d.id)}}

 function cart(d){
  try{validate(d);AD[d.kind](d);applyRand(d);
   carts.push(Object.freeze({kind:d.kind,id:d.id,label:Object.freeze({...d.label}),source:d.source||null,author:d.author||null,license:d.license||null,demo:d.demo||null,
    name:d.kind==="pack"?d.label.zh:d.id}))}
  catch(e){errors.push(e.message);console.error(e.message)}
 }
 return Object.freeze({apiVersion:API,kinds:KINDS,cart,carts,errors,list:k=>carts.filter(c=>!k||c.kind===k)});
})();
