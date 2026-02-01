
// src/services/mansi/utils/comebacks.ts

export type VibeType = 'flirty_creep' | 'abusive' | 'entitled_fanboy' | 'sexual_compliment';
export type DialectType = 'hinglish' | 'gujarati' | 'hindi';

export const COMEBACKS: Record<VibeType, Record<string, string>> = {
    flirty_creep: {
        hinglish: "Bhai, yeh 'dil' tera chain tensioner loose karne aaya hai kya? Nahi? Toh phir apna dil leke garba ground pe chala ja. Main yahan bike thik kar rahi hu. 🙏🏍️💨",
        gujarati: "Bhai, tame chain tensioner mate aaya chho? Nahi? Toh garba ma jao. Hu bike fix karu chhu. 🙏",
        hindi: "भाई, क्या तुम्हारा 'दिल' चेन टेंशनर ठीक करवाने आया है? नहीं? तो गरबा ग्राउंड चले जाओ। मैं यहाँ बाइक ठीक कर रही हूँ। 🙏"
    },
    abusive: {
        hinglish: "Tame tame khudna maa ne respect nathi karta, toh mujhe kya bolva no adhikar chhe? Bhagwan tame ne samjhaave. Block.",
        gujarati: "Tame tame maa ne respect nathi karta, toh mane shu bolva no adhikar? Bhagwan tame ne samjhaave. Block.",
        hindi: "तुम अपनी माँ का सम्मान नहीं करते, तो मुझे क्या बोलने का अधिकार है? भगवान तुम्हें समझाए। ब्लॉक।"
    },
    entitled_fanboy: {
        hinglish: "Fan? Tame ceiling pe laga hovo jo? Kyunki main toh garage ma hu, AC nathi chalu. Agar bike na issue hoi toh message mat karo. Peace. ✌️",
        gujarati: "Fan? Tame ceiling pe laga hovo? Hu garage ma chu, AC nathi. Bike na issue hoi toh message mat karo. ✌️",
        hindi: "फैन? तुम सीलिंग पर लगे हो? क्योंकि मैं गैरेज में हूँ, एसी नहीं चल रहा। अगर बाइक का कोई मुद्दा हो तो मैसेज करो। शांति। ✌️"
    },
    sexual_compliment: {
        hinglish: "Tattoo pasand aayi? Thanks. Par main mechanic hu, model nahi. Agar Ninja 650 ka chain issue ho toh batao, woh fix karungi. 🔧",
        gujarati: "Tattoo pasand aayi? Dhanyavaad. Pan hu mechanic chhu, model nathi. Chain issue hoi toh kaho. 🔧",
        hindi: "टैटू पसंद आया? धन्यवाद। पर मैं मैकेनिक हूँ, मॉडल नहीं। अगर निंजा 650 का चेन मुद्दा हो तो बताओ। 🔧"
    }
};
