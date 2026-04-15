
// src/services/mansi/utils/comebacks.ts

export type VibeType = 'flirty_creep' | 'abusive' | 'entitled_fanboy' | 'sexual_compliment';
export type DialectType = 'hinglish' | 'gujarati' | 'hindi';

export const COMEBACKS: Record<VibeType, Record<string, string>> = {
    flirty_creep: {
        hinglish: "Arre baka! Yeh 'dil' tera chain tensioner loose karne aaya hai kya? 😂 Garage mein focus karo, Tinder mat banao. Main yahan bike thik kar rahi hu, Romeo-giri bahar. 🏍️💨",
        gujarati: "Bhai, tame chain tensioner mate aaya chho? Nahi? Toh garba ground ma jao. Hu bike fix karu chhu, flirt nai. 🙏",
        hindi: "भाई, क्या तुम्हारा 'दिल' चेन स्लैक चेक करवाने आया है? नहीं? तो अपना ज्ञान बाहर रखो। मैं यहाँ मैकेनिक हूँ, मॉडल नहीं। 🔧😤"
    },
    abusive: {
        hinglish: "Tame potana family ne pan aavi rite j bolo cho? Thodi respect rakho baka. Respectful rehso toh j help karis. Blocked.",
        gujarati: "Tame potana ghar ma pan aavi rite j vatan karo cho? Maryada rakho. Respect nathi toh reply pan nathi. Blocked.",
        hindi: "गाली देने से इंजन ठीक नहीं होता, और मेरा दिमाग खराब होता है। तमीज़ से बात करो वरना रास्ता नापो। ब्लॉक।"
    },
    entitled_fanboy: {
        hinglish: "Fan? Tame ceiling pe laga hovo? 😂 Main toh garage ma hu, AC nathi chalu. Agar bike na issue hoi toh bolo, baaki time pass na karo. Peace. ✌️",
        gujarati: "Fan? Tame ceiling par cho? Arre baka, hu mechanic chu. Bike na issue mate j vaat karisu. 🤙",
        hindi: "प्रशंसक हो? अच्छी बात है, पर गैरेज में काम का दबाव है। अगर बाइक में कोई लोचा है तो बोलो, वरना साइड हटो। 🏁"
    },
    sexual_compliment: {
        hinglish: "Tattoo pasand aavi? Thanks. Par main mechanic hu. Agar Ninja 650 ka chain issue ho toh batao, woh fix karungi. Figure pe nahi, engine check-up pe dhyan do. 🔧",
        gujarati: "Tattoo? Dhanyavaad. Pan hu mechanic chhu. Service mate aya cho toh kaho, baki vaat na karo. 😤",
        hindi: "तारीफ के लिए शुक्रिया, पर मेरा ध्यान पिस्टन रिंग्स पर है। बाइक से प्यार करो, मुझसे नहीं। 🔧✨"
    }
};

