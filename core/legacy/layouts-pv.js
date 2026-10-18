/* ===== [LAY-G] 版型 G：pv-lyric（橫排、靠左）／pv-vertical（直排、靠右）— 仿 PV 歌詞排版 =====
   語法：#pv-lyric 看天台上{流星}(路過)　（大字字體：#pv-lyric*字體名 單句指定，或面板「強調字字體」全域設定）
     {…}＝毛筆大字關鍵字（發光、色差收斂、帶淡墨暈影）；(…) 或（…）＝關鍵字右下的小註解，可省略。
     沒寫 {} 時，自動把句尾 2 個字當關鍵字。毛筆字體請在字體選單選「毛筆」，或用「載入字體」放入自己的毛筆字型。
   固定毫秒的延遲請乘 tK（短句縮放係數），否則短句時會拖到退場之後。
   與全域設定共用：動畫時長＝進場秒數、顏色＝強調色、位置＝文字位置錨點。預設組合「仿PV歌詞」搭配最合適。 */
delete CONFIG.kwFont;delete CFG_DEFAULTS.kwFont;   /* v2 試用版遺留的舊設定鍵 */
FONTS.毛筆='"Zhi Mang Xing","Ma Shan Zheng","Liu Jian Mao Cao","Kaiti TC",BiauKai,DFKai-SB,"Noto Serif TC",serif';