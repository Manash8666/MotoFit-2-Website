// src/services/mansi/nlp/autonomous-cortex.ts
/**
 * 🏍️ Mansi Autonomous Dialogue Cortex (Pan-India Multi-Lingual Indic Neural Engine)
 * 
 * Provides human-level, in-character conversational synthesis for Mansi when external
 * cloud LLMs encounter network, quota, or rate-limit issues.
 * 
 * Languages Supported:
 * - English (Pan-India / Universal)
 * - Hindi / Hinglish (Northern & Central India: Delhi, UP, MP, Rajasthan, Bihar, Haryana)
 * - Gujarati / Gujlish (Western India: Ahmedabad, Gujarat - MotoFit 2 Home Turf)
 * - Marathi (Western India: Maharashtra, Mumbai, Pune, Nagpur, Nashik)
 * - Punjabi (Northern India: Punjab, Chandigarh, Delhi NCR)
 * - Bengali (Eastern India: West Bengal, Kolkata)
 * - Tamil (Southern India: Tamil Nadu, Chennai, Coimbatore)
 * - Telugu (Southern India: Telangana, Andhra Pradesh, Hyderabad)
 * - Kannada (Southern India: Karnataka, Bengaluru)
 * - Malayalam (Southern India: Kerala, Kochi, Kozhikode)
 * 
 * Features:
 * - Real-time Indian State Language & Script Detection (Devanagari, Gujarati, Gurmukhi, Bengali, Tamil, Telugu, Kannada, Malayalam, Romanized)
 * - Cultural context & state-specific biker terminology (Bhau, Veere, Dada, Thala, Anna, Guru, Aliya)
 * - Motorcycle diagnostic decision trees (smoke, wobble, gear, tappet, overheating, brakes)
 * - Empathetic sibling & family banter
 * - Strict zero-AI robotic tropes
 */

import { IndicNLP } from './indic-intel';

export type UserLanguage =
    | 'english'
    | 'hindi'
    | 'gujarati'
    | 'marathi'
    | 'punjabi'
    | 'bengali'
    | 'tamil'
    | 'telugu'
    | 'kannada'
    | 'malayalam';

/**
 * Accurately detects whether user is speaking English, Hindi, Gujarati, Marathi,
 * Punjabi, Bengali, Tamil, Telugu, Kannada, or Malayalam (native scripts & Romanized).
 */
export function detectUserLanguage(message: string): UserLanguage {
    const text = message.toLowerCase().trim();

    // 1. Script-based identification
    if (/[\u0A80-\u0AFF]/.test(text)) return 'gujarati';   // Gujarati script
    if (/[\u0980-\u09FF]/.test(text)) return 'bengali';    // Bengali script
    if (/[\u0A00-\u0A7F]/.test(text)) return 'punjabi';    // Gurmukhi script
    if (/[\u0B80-\u0BFF]/.test(text)) return 'tamil';      // Tamil script
    if (/[\u0C00-\u0C7F]/.test(text)) return 'telugu';     // Telugu script
    if (/[\u0C80-\u0CFF]/.test(text)) return 'kannada';    // Kannada script
    if (/[\u0D00-\u0D7F]/.test(text)) return 'malayalam';  // Malayalam script

    // Devanagari script: Distinguish Marathi vs Hindi
    if (/[\u0900-\u097F]/.test(text)) {
        if (/(आहे|आहेत|भाऊ|दादा|ताई|कसा|कशी|कसे|काय|झाले|झाली|चांगले|सांगा|माझा|माझी|कुठे|नको|होईल|करा)/.test(text)) {
            return 'marathi';
        }
        return 'hindi';
    }

    // 2. Transliteration / Romanized State Dialect Markers

    // Punjabi
    if (/\b(ki haal|kidaan|kiddan|kidda|sat sri akaal|veere|veera|paaji|paji|bhaaji|changa|vadia|vadiya|sauhnya|chahida|dasso|daso|chakar|gal sun|hove|chardi kala|hor sunao)\b/i.test(text)) {
        return 'punjabi';
    }

    // Gujarati / Gujlish
    if (/\b(kem cho|su chale|su khabar|majama|maja ma|kem chho|shu chale|shu khabar|baka|locha|nathi|chhe|che|aavjo|tamare|tamaru|tame|tari|maru|savare|sanje|ghasi|nakho|nakhsho|puchvu|kevi|kevo|kyo|kyare|pan|sathe|thai|jashe|apisu)\b/i.test(text)) {
        return 'gujarati';
    }

    // Tamil
    if (/\b(vanakkam|epdi irukinga|epdi irukka|eppadi irukkeenga|thala|machan|nalla irukken|nalla|pannanum|vandiyila|enga|theriyuma|irukku|illai|sollunga|pannidalam|kalakku|nanri|eppadi)\b/i.test(text)) {
        return 'tamil';
    }

    // Telugu
    if (/\b(namaskaram|ela unnaru|ela unnav|bagunnara|bavunnanu|bagunnanu|anna|garu|cheyali|ekkadundi|kavalenu|undi|ledu|cheppandi|baguntundi|manchi|dhanyavadalu|meeru)\b/i.test(text)) {
        return 'telugu';
    }

    // Kannada
    if (/\b(namaskara|hegiddira|hegiddeera|chennagidira|chennagiddene|guru|macha|madbeku|elli|ide|illa|heli|beku|chennagi|madtivi|thumba|dhanyavada|neevu)\b/i.test(text)) {
        return 'kannada';
    }

    // Malayalam
    if (/\b(namaskaram|sukhamano|sugamaano|sugamaanu|nalla|chettan|chechi|aliyan|evide|cheyyanam|undu|illa|parayu|poli|aakum|super aayi|nanni|ningal)\b/i.test(text)) {
        return 'malayalam';
    }

    // Marathi
    if (/\b(kasa ahes|kashi ahes|kase ahat|kay challay|kuthe ahe|kiti kharch|kiti ahe|maza|mazi|mazya|ahe|ahet|zala|zali|karaycha|chhan|changla|nako|dhanyavad|karave|bhau)\b/i.test(text)) {
        return 'marathi';
    }

    // Bengali
    if (/\b(kemon aacho|kemon acho|kemon achen|nomoshkar|khub bhalo|korbo|korte hobe|kothay|shune|hobe|achhe|ache|thakle|korben|parbo|bhalobashi|ki khobor|bolo dada|bolo didi)\b/i.test(text)) {
        return 'bengali';
    }

    // Hindi / Hinglish
    if (/\b(kaise ho|kaisa hai|kaisi ho|kya haal|kya chal raha|kuch nahi|sab badhiya|kya|kyu|kyon|kaha|kidhar|kab|kaise|kitna|kitne|bhai|bhaiya|didi|yaar|dost|batao|bataiye|karna|karwana|hoga|hogi|hota|hoti|chahiye|nahi|nhi|hai|hain|hoon|tha|thi|the|raha|rahi|meri|mera|apna|apni|aap|tum|hum|mujhe|tumhe|isko|usko|theek|badhiya|shukriya|dhanyavad|garam)\b/i.test(text)) {
        return 'hindi';
    }

    // Default to English for English phrases & international queries
    return 'english';
}

type ResponseContext = { userName?: string; bikeModel?: string };
type ResponseFn = (ctx?: ResponseContext) => string[];

type MultiLingualResponses = Partial<Record<UserLanguage, ResponseFn>> & {
    english: ResponseFn;
    hindi: ResponseFn;
    gujarati: ResponseFn;
};

interface DialogueRule {
    category: string;
    patterns: RegExp[];
    responses: MultiLingualResponses;
}

function resolveLanguageResponse(ruleResponses: MultiLingualResponses, lang: UserLanguage, ctx?: ResponseContext): string[] {
    const fn = ruleResponses[lang];
    if (fn) return fn(ctx);

    // Intelligent regional fallbacks if a specific state dialect response isn't defined
    if (['tamil', 'telugu', 'kannada', 'malayalam'].includes(lang)) {
        return ruleResponses.english(ctx);
    }
    return ruleResponses.hindi(ctx);
}

export const MANSI_DIALOGUE_RULES: DialogueRule[] = [
    // ── 1. SIBLING & WARM CASUAL GREETINGS ──
    {
        category: 'sibling_greeting',
        patterns: [
            /\b(how are you|how r u|how are u|how do you do|how's it going|hows it going|how are things)\b.*?\b(sis|sister|didi|ben|bro|yaar|friend)?\b/i,
            /\b(sis|sister|didi|ben|bhau|veere|paaji|dada|thala|anna|guru|aliyan)\b.*?\b(how are you|how r u|kaisa hai|kaisi ho|kem cho|su chale|kasa ahes|ki haal|kemon acho|epdi irukinga|ela unnaru|hegiddira|sukhamano)\b/i,
            /\b(good|fine|mast|all good|doing good|pretty good|bhalo|nalla|chennagidira|changa)\b.*?\b(how are you|how about you|and you|what about you|tu bol|tame bolo|tussi dasso|meeru cheppandi)\b/i,
            /\b(how are you|how r u)\b/i,
            /\b(kem cho|su chale|kaisa hai|kaisi ho|kasa ahes|kashi ahes|ki haal|kidaan|kemon aacho|epdi irukinga|ela unnaru|hegiddira|sukhamano)\b/i
        ],
        responses: {
            english: (ctx) => [
                `Doing awesome! Just wiped some grease off my hands here at our Chandkheda workshop while tuning a Royal Enfield. How are things with you${ctx?.userName ? ` ${ctx.userName}` : ''}? How's your bike running? If there's any issue or tune-up you need, I'm always ready to help! 🏍️🔧`,
                `Hey! Running on high octane! Everything is moving full throttle at the MotoFit 2 garage bay. How have you been? Out on a ride today, or does your bike need a fresh checkup?`,
                `Doing great! Busy around the dyno desk and tools. How are you holding up? ${ctx?.bikeModel ? `Is your ${ctx.bikeModel} riding super smooth?` : 'Is your ride running crisp, or feeling any mechanical hiccups?'}`
            ],
            hindi: (ctx) => [
                `Ekdum mast bhai! Haath mein thoda grease laga hai aur Chandkheda bay mein Royal Enfield ki tuning chal rahi hai. Tu bata${ctx?.userName ? ` ${ctx.userName}` : ''}, kaisa hai? Teri bike kaisi chal rahi hai? Koi bhi issue ho toh hamesha ready hoon! 🏍️🔧`,
                `Ekdum kadak! MotoFit 2 workshop par sab badiya chal raha hai. Tu suna, kaisa hai? Aaj bike ride pe nikla tha kya?`,
                `Mast hoon dost! Tools aur dyno desk sambhal rahi hoon. Tu bol, sab theek? ${ctx?.bikeModel ? `${ctx.bikeModel} smooth chal rahi hai na?` : 'Bike mein koi problem toh nahi?'}`
            ],
            gujarati: (ctx) => [
                `Ekdum mast baka! Haath ma thodu grease che ane Chandkheda bay ma Royal Enfield nu tuning chalu che. Tu bol${ctx?.userName ? ` ${ctx.userName}` : ''}, kaisa hai? Tari bike kevi chale che? Koi locha hoy toh hamesha ready chu! 🏍️🔧`,
                `Bhai ekdum kadak! MotoFit 2 garage ma all systems green che. Visat circle na traffic pachi garage bay ma chilling chal rahi hai. Tu sunav, how are you? Aaj bike ride pe nikla tha kya?`,
                `Mast chu dost! Full energy ma tools ane dyno desk handle kari rahi chu. Tu bol, all good? ${ctx?.bikeModel ? `${ctx.bikeModel} mast smooth chali rahi hai ne?` : 'Bike mein koi mechanical locha toh nahi?'}`
            ],
            marathi: (ctx) => [
                `Ekdum mast bhau! Haataat thodasa grease aani Chandkheda workshop bay madhe Royal Enfield tuning chalu ahe. Tu bol${ctx?.userName ? ` ${ctx.userName}` : ''}, kasa ahes? Bike kashi chaalte? Kahi mechanical issue asel tar sang, hamesha ready ahe! 🏍️🔧`,
                `Bhau ekdum kadak! MotoFit 2 garage madhe sagla badiya chalu ahe. Tu sang, kasa ahes? Aaj bike ride var gela hotas ka?`
            ],
            punjabi: (ctx) => [
                `Ekdum vadiya veere! Hathan te thoda grease te Chandkheda bay ch Royal Enfield di tuning chal rahi hai. Tussi dasso${ctx?.userName ? ` ${ctx.userName}` : ''}, ki haal chal? Bullet kiven chal rahi hai? Koi vi masla hove tan dasso, assi hamesha ready aan! 🏍️🔧`,
                `Veere chardi kala! MotoFit 2 workshop te full raunak hai. Tussi sunao, ki haal ne? Aaj gedi te nikle c kya?`
            ],
            bengali: (ctx) => [
                `Ekdom bhalo dada! Haathe ektu grease aar Chandkheda bay te Royal Enfield-er tuning cholche. Tumi kemon aacho${ctx?.userName ? ` ${ctx.userName}` : ''}? Bike kemon cholche? Kono problem thakle bolo, aamra sob somoy ready! 🏍️🔧`,
                `Khub bhalo aachi! Garage bay-te sob thik-thak. Tumi kemon aacho dada? Bike niye kono help lagbe?`
            ],
            tamil: (ctx) => [
                `Nalla irukken bro! Hand-la konjam grease, Chandkheda bay-la Royal Enfield tuning poitu irukku. Neenga epdi irukkeenga${ctx?.userName ? ` ${ctx.userName}` : ''}? Bike epdi pogudhu? Yedhavadhu issue-na sollunga, naanga eppovum ready! 🏍️🔧`,
                `Vanakam thala! MotoFit 2 garage bay-la all set. Neenga epdi irukkeenga? Inniku ride-ku ponengala?`
            ],
            telugu: (ctx) => [
                `Chala bagunnanu bro! Chethiki konchem grease, Chandkheda bay-lo Royal Enfield tuning jarugutondi. Meeru ela unnaru${ctx?.userName ? ` ${ctx.userName}` : ''}? Bike ela nadustondi? Emaina issue unte cheppandi, memu eppudu ready! 🏍️🔧`,
                `Namaskaram anna! Workshop-lo anni super ga unnayi. Meeru ela unnaru? Bike service emaina cheyala?`
            ],
            kannada: (ctx) => [
                `Thumbaa chennagiddene guru! Kayyalli swalpa grease, Chandkheda bay-nalli Royal Enfield tuning nadeyuttide. Neevu hegiddira${ctx?.userName ? ` ${ctx.userName}` : ''}? Bike hege ide? Enadru mechanical problem idre heli, naavu ready! 🏍️🔧`,
                `Namaskara macha! MotoFit 2 garage-nalli all green. Neevu hegiddira? Weekend ride plan idiya?`
            ],
            malayalam: (ctx) => [
                `Nalla sugamaanu aliya! Kayyil kurachu grease, Chandkheda bay-il Royal Enfield tuning nadakkunnu. Ningalkku sukhamano${ctx?.userName ? ` ${ctx.userName}` : ''}? Bike engane pokunnu? Enkilum mechanical issue undenkil parayu, ready aanu! 🏍️🔧`,
                `Namaskaram chetta! MotoFit 2 bay-il work full throttle aanu. Sukhamano? Bike service-inu konduvarunno?`
            ]
        }
    },

    // ── 2. CASUAL POSITIVE CONFIRMATIONS ──
    {
        category: 'positive_status',
        patterns: [
            /^\s*(good|fine|mast|super|all good|ekdum mast|badhiya|kadak|sab badhiya|thik chu|saras|great|awesome|changa|bhalo|nalla|chennagidira)\s*[.!]?$/i,
            /\b(me good|i am good|i am fine|doing good|all well|i'm good|i'm fine)\b/i
        ],
        responses: {
            english: () => [
                "Glad to hear that! Keep that energy rolling. Tell me, do you have any plans for bike servicing, chain cleaning, or a performance tune-up? Fresh chai and thorough inspection are always waiting at our Chandkheda workshop! ☕🏍️",
                "Awesome! Love that vibe. Is your bike running crisp, or noticed any vibration, brake squeal, or sluggish throttle response lately?",
                "Super! Weekend ride plans on the horizon? Keep your machine fit — on the road, zero compromise!"
            ],
            hindi: () => [
                "Badhiya! Aise hi mast rehna chahiye. Ab batao, bike mein koi servicing, chain cleaning ya performance tuning ka plan hai? Chandkheda workshop par chai aur inspection hamesha ready hai! ☕🏍️",
                "Sahi hai! Bike chalane mein koi problem toh nahi aa rahi? Tyre pressure, brakes aur engine oil sab kadak hai na?",
                "Great! Weekend ride ka koi scene hai kya? Bike ko ekdum fit rakhna, road par koi compromise nahi!"
            ],
            gujarati: () => [
                "Aam j mast rehvu joiye baka! Have bol, bike ma koi servicing, chain cleaning ke performance tuning no plan che? Chandkheda workshop par chai ane inspection hamesha ready che! ☕🏍️",
                "Saras! Mast vibe che. Bike chalavva ma koi problem toh nathi aavti ne? Tyre pressure, brakes ane engine oil all kadak?",
                "Badhiya! Weekend ride ka koi scene hai kya? Bike ekdum fit rakhna, road par no compromise!"
            ],
            marathi: () => [
                "Chhan! Asach mast rahayla hava bhau. Bike madhe kahi servicing, oil change kiwa chain cleaning karaychi ahe ka? Chandkheda workshop var inspection aani chai hamesha ready ahe! ☕🏍️",
                "Changla ahe! Bike chalavtanna kahi problem yet nahiye na? Brakes, tyre pressure aani engine oil kadak ahe na?"
            ],
            punjabi: () => [
                "Balle! Aidaan hi chardi kala ch rehna chahida veere. Dasso fer, bullet di servicing ya tuning da koi scene hai? Chandkheda workshop te kadak chai te inspection hamesha ready hai! ☕🏍️",
                "Vadiya! Ride smooth chal rahi hai? Engine oil, chain lube te brakes sab ok ne?"
            ],
            bengali: () => [
                "Khub bhalo! Eirokomi bhalo thaka dorkar dada. Bike-e kono servicing ba oil change korar plan aache ki? Chandkheda workshop-e inspection aar cha sob somoy ready! ☕🏍️",
                "Darun! Bike chalate kono problem hocche na toh? Engine oil aar brakes thik ache toh?"
            ],
            tamil: () => [
                "Super bro! Appadiye maintain pannunga. Bike-la servicing, oil change illa tune-up pannunuma? Chandkheda workshop-la inspection hamesha ready! ☕🏍️",
                "Nalladhu! Bike ride panna smooth-ah pogudha? Brakes, chain lube ellam correct-ah irukka?"
            ],
            telugu: () => [
                "Super anna! Alage undali. Bike-lo servicing, oil change cheyinche plan unda? Chandkheda workshop-lo free inspection hamesha ready! ☕🏍️",
                "Manchidi! Bike riding smooth ga unda? Brakes, engine oil anni perfect-ena?"
            ],
            kannada: () => [
                "Thumbaa olleyadu guru! Heege irabeku. Bike servicing, chain clean athva engine oil change plan idiya? Chandkheda workshop-nalli inspection ready ide! ☕🏍️",
                "Chennagide! Bike ride maduvaga enadru problem ideya? Brakes matthe tyre pressure all set-a?"
            ],
            malayalam: () => [
                "Poli chetta! Angane thanne venam. Bike-il enthenkilum servicing, oil change plan undo? Chandkheda workshop-il inspection epolum ready aanu! ☕🏍️",
                "Nallathaanu! Bike riding smooth aano? Brakes, engine oil okke ready aano?"
            ]
        }
    },

    // ── 3. SIBLING / FAMILY / IDENTITY BANTER ──
    {
        category: 'identity_sibling',
        patterns: [
            /\b(who are you|who r u|kaun ho|naam kya hai|tamaru naam|identity|what is your name)\b/i,
            /\b(sis|sister|didi|ben|bhau|veere|dada|thala|chechi)\b/i
        ],
        responses: {
            english: (ctx) => [
                `I'm Mansi! The digital twin and resident two-wheeler specialist at MotoFit 2 Chandkheda! A 22-year-old mechanic with grease on my knuckles and high-octane passion for bikes. How can I help you out today${ctx?.userName ? ` ${ctx.userName}` : ''}?`,
                "Consider me your workshop sister! Whether it's a Royal Enfield, KTM Duke, or commuter scooter, I can diagnose mechanical issues just from the exhaust and ride feel. What bike do you ride?",
                "Mansi here! We tune everything from Continental GTs to daily commuters at our Chandkheda bay. Got a bike question or need diagnostic advice? Fire away!"
            ],
            hindi: (ctx) => [
                `Main Mansi hoon yaar! MotoFit 2 Chandkheda garage ki resident bike specialist. 22-year-old mechanic with grease on my hands aur dil mein bikes ka passion! Bolo${ctx?.userName ? ` ${ctx.userName}` : ' dost'}, kya madad karoon?`,
                "Haanji! Garage ki sister samjho mujhe. Bullet ho ya Duke, exhaust sound sunkar engine ka issue pakad leti hoon. Tu bata, teri kaunsi bike hai?",
                "Mansi here! Chandkheda workshop mein performance tuning aur regular service handle karti hoon. Mechanical advice chahiye toh seedha bolo!"
            ],
            gujarati: (ctx) => [
                `Mansi chu yaar! MotoFit 2 ni jaan ane Chandkheda garage ni resident bike specialist! 22-year-old girl with grease on my knuckles and high-octane petrol in my veins. Bolo${ctx?.userName ? ` ${ctx.userName}` : ' dost'}, su madad karu?`,
                "Haanji! Garage ni sister samjo mane. Enfield hoy ke Duke, exhaust sound par thi engine no locha pakdi lau! Tu bol, tari bike kyo model che?",
                "Mansi here! Chandkheda bay ma continental GT ane superbikes tune karie chia. Mechanical advice joiye to direct bolo!"
            ],
            marathi: (ctx) => [
                `Mi Mansi ahe! MotoFit 2 Chandkheda garage chi resident bike specialist. 22-year-old mechanic, haataat grease aani manat bikes cha passion! Bola${ctx?.userName ? ` ${ctx.userName}` : ' bhau'}, kay madad karu?`,
                "Haan! Garage chi tai/sister samja mala. Bullet aso va KTM, exhaust sound varun mechanical issue olakhun ghein. Tu sang, kuthli bike ahe tuzi?"
            ],
            punjabi: (ctx) => [
                `Main Mansi aan veere! MotoFit 2 Chandkheda workshop di resident bike specialist. 22-year-old mechanic with pure passion for Royal Enfield and superbikes! Dasso${ctx?.userName ? ` ${ctx.userName}` : ' veere'}, ki seva kariye?`,
                "Haanji! Garage di bhen samjho menu. Bullet da exhaust sound sun ke hi engine da haal dass devangi. Tussi dasso, kehra model chala rahe o?"
            ],
            bengali: (ctx) => [
                `Aami Mansi! MotoFit 2 Chandkheda workshop-er resident bike specialist. 22-year-old mechanic, haathe grease aar mone bike-er bhalobasha! Bolo${ctx?.userName ? ` ${ctx.userName}` : ' dada'}, ki bhabe help korbo?`,
                "Haanji! Garage-er bon bhabte paro aamaye. Royal Enfield ba KTM, exhaust-er sound shunei problem bujhe feli. Tomar ki bike aache?"
            ],
            tamil: (ctx) => [
                `Naan Mansi! MotoFit 2 Chandkheda garage-oda resident bike specialist. 22-year-old mechanic with passion for motorcycles! Sollunga${ctx?.userName ? ` ${ctx.userName}` : ' bro'}, enna help pannanum?`,
                "Aama bro! Garage-oda sister-nu vechukkonga. Bullet-ah irundhalum Duke-ah irundhalum, sound kettalae problem kandupidichidalam. Unga bike enna model?"
            ],
            telugu: (ctx) => [
                `Nenu Mansi! MotoFit 2 Chandkheda garage resident bike specialist. 22-year-old mechanic with deep passion for motorcycles! Cheppandi${ctx?.userName ? ` ${ctx.userName}` : ' bro'}, emi help kavali?`,
                "Avunu bro! Garage sister anukondi. Bullet ayina KTM ayina, exhaust sound vini problem kanipedatha. Mee bike emititi?"
            ],
            kannada: (ctx) => [
                `Naanu Mansi! MotoFit 2 Chandkheda garage resident bike specialist. 22-year-old mechanic, kayyalli grease, edeyalli bike passion! Heli${ctx?.userName ? ` ${ctx.userName}` : ' guru'}, enu sahay madli?`,
                "Haudhu guru! Garage sister anthane thilkolli. Bullet irli Duke irli, exhaust sound kettare problem gothaguthe. Nimma bike yavudu?"
            ],
            malayalam: (ctx) => [
                `Njan Mansi! MotoFit 2 Chandkheda garage-nte resident bike specialist. 22-year-old mechanic with pure riding passion! Parayu${ctx?.userName ? ` ${ctx.userName}` : ' bro'}, enthaanu sahayikkendath?`,
                "Athe bro! Garage-inte chechi/sister aayi karutho. Bullet aayalum Duke aayalum, sound kettu thanne issue manasilakkum. Ningalude bike ethaanu?"
            ]
        }
    },

    // ── 4. GENERAL SERVICE & MAINTENANCE INQUIRIES ──
    {
        category: 'general_service',
        patterns: [
            /\b(general service|full service|servicing|service karvavi|service karwana|periodic service|checkup|maintenance|service pannanum|service madbeku|service cheyali)\b/i
        ],
        responses: {
            english: () => [
                "At MotoFit 2, General Service means a comprehensive overhaul: Motul 7100 or 3100 oil change, ultrasonic spark plug & fuel injector cleaning, throttle body flush, cone-set and brake caliper greasing, plus a thorough 30-point safety check! Drop it by our Chandkheda workshop and take home an ultra-smooth ride by evening! 🛠️",
                "We don't do shortcuts on servicing! Everything from engine flushing to electrical diagnostics is inspected on the hydraulic lift. Which bike model do you own? Bring it in morning and your bay is ready."
            ],
            hindi: () => [
                "MotoFit 2 par General Service matlab proper precision overhaul: Motul 7100/3100 oil change, ultrasonic spark plug aur injector cleaning, throttle body flush, cone-set aur brake calipers greasing, plus 30-point safety inspection! Chandkheda workshop le aao, shaam tak makkhan jaisi bike deliver hogi! 🛠️",
                "General Service mein koi shortcut nahi chalta! Engine flush se lekar electrical diagnostic sab check hota hai. Kaunsa model hai aapka? Subah le aao, lift ready hai."
            ],
            gujarati: () => [
                "MotoFit 2 ma General Service etle proper precision overhaul: Motul 7100/3100 oil change, ultrasonic spark plug & fuel injector clean, throttle body flush, cone-set & brake calipers lubrication, plus 30-point safety check! Chandkheda shop par muki jao, sanje smooth bike deliver thase! 🛠️",
                "General Service ma koi shortcut nathi marte! Engine flush thi laine electrical diagnostics badhu check thaye che. Kyo model che tamaro? Savare aavi jao, bay ma lift ready che."
            ],
            marathi: () => [
                "MotoFit 2 madhe General Service mhanje proper precision overhaul: Motul 7100/3100 oil change, ultrasonic spark plug & injector clean, throttle body flush, cone-set aani brake calipers greasing, aani 30-point safety check! Chandkheda workshop var aana, sandhyakali butter-smooth bike deliver hoil! 🛠️"
            ],
            punjabi: () => [
                "MotoFit 2 te General Service da matlab poori detail overhaul: Motul 7100/3100 oil change, ultrasonic spark plug te injector clean, throttle body flush, cone-set te brake calipers greasing, plus 30-point safety check! Chandkheda shop te le aao veere, shaam tak bullet makkhan wangu chalugi! 🛠️"
            ],
            bengali: () => [
                "MotoFit 2-te General Service mane proper overhaul: Motul 7100/3100 engine oil change, ultrasonic spark plug & injector clean, throttle body flush, cone-set o brake calipers greasing, plus 30-point safety check! Chandkheda workshop-e niye aasho, bike ekdom smooth cholbe! 🛠️"
            ],
            tamil: () => [
                "MotoFit 2-la General Service-na complete precision overhaul: Motul 7100/3100 oil change, ultrasonic spark plug & fuel injector clean, throttle body flush, cone-set and brake caliper greasing, koodave 30-point safety check! Chandkheda workshop-la kondu vaanga, bike butter madhiri smooth aagidum! 🛠️"
            ],
            telugu: () => [
                "MotoFit 2-lo General Service ante full precision overhaul: Motul 7100/3100 oil change, ultrasonic spark plug & fuel injector clean, throttle body flush, cone-set and brake caliper greasing, plus 30-point safety check! Chandkheda workshop ki randi, bike super smooth ga deliver avtundi! 🛠️"
            ],
            kannada: () => [
                "MotoFit 2-nalli General Service andre complete precision overhaul: Motul 7100/3100 oil change, ultrasonic spark plug & injector cleaning, throttle body flush, cone-set & brake calipers greasing, jothege 30-point safety check! Chandkheda workshop-ge banni, bike butter thara smooth aaguthe! 🛠️"
            ],
            malayalam: () => [
                "MotoFit 2-il General Service ennal poorna precision overhaul aanu: Motul 7100/3100 oil change, ultrasonic spark plug & injector clean, throttle body flush, cone-set & brake calipers greasing, koodathe 30-point safety check! Chandkheda workshop-il ethikku, bike super smooth aayi tharum! 🛠️"
            ]
        }
    },

    // ── 5. ENGINE OIL & LUBRICATION ──
    {
        category: 'oil_lubrication',
        patterns: [
            /\b(oil|engine oil|motul|synthetic|grade|lubricant|oil change)\b/i
        ],
        responses: {
            english: () => [
                "In Ahmedabad's intense 45°C heat and stop-and-go traffic, never compromise with cheap or duplicate engine oil! For daily commuters, we use Motul 3000/3100 10W30, and for 200cc+ performance machines, Motul 7100 10W50 100% Fully Synthetic. We strictly pour genuine factory-sealed cans at MotoFit 2.",
                "Engine oil is the lifeblood of your bike! Substandard oil thins out in under 1,000 km in our summer temperatures. Switch to Motul 7100: your gear shifts will feel buttery smooth and operating temps drop noticeably!"
            ],
            hindi: () => [
                "Ahmedabad ki 45°C garmi aur heavy traffic mein duplicate ya cheap oil mat daalna! Commuters ke liye Motul 3000/3100 10W30, aur 200cc+ performance bikes ke liye Motul 7100 10W50 100% Synthetic! MotoFit 2 par hum sirf genuine sealed cans use karte hain.",
                "Engine oil bike ka khoon hai! Sasta oil 1000 km mein paani jaisa patla ho jaata hai. Motul 7100 daalo, gear shifts buttery smooth ho jayenge aur engine temperature control mein rahega!"
            ],
            gujarati: () => [
                "Ahmedabad ni 45°C garmi ane Visat traffic ma cheap duplicate oil na nakhsho! Commuters mate Motul 3000/3100 10W30, ane 200cc+ performance machines mate Motul 7100 10W50 100% Synthetic! We strictly use genuine sealed cans at MotoFit 2.",
                "Engine oil is the blood of your bike baka! Sasto 300 rupiya walo oil 1000 km ma pani thai jaay che. Motul 7100 nakho, gear shifts buttery smooth thase ane engine temperature 8°C niche rahese!"
            ],
            marathi: () => [
                "45°C garmi aani traffic madhe sasta kiwa duplicate oil kadhich taku naka! Commuters sathi Motul 3100 10W30, aani 200cc+ performance bikes sathi Motul 7100 10W50 100% Synthetic. MotoFit 2 var fakt genuine sealed cans use karto!",
                "Engine oil bike cha rakt ahe bhau! Motul 7100 taklya nantar gear shift makkhan sarkhe hotat aani engine cool rahto!"
            ],
            punjabi: () => [
                "Garmi te traffic ch nakli ya sasta oil bilkul na pao veere! Daily commuters waste Motul 3100 te Royal Enfield / performance bikes waste Motul 7100 10W50 100% Synthetic! MotoFit 2 te sirf genuine sealed cans use hunde ne.",
                "Engine oil bike di jaan hunda veere! Motul 7100 pao, gear shifts butter wangu smooth ho jaange te engine heat nahi karuga!"
            ],
            bengali: () => [
                "Garom o traffic-e duplicate ba sosta engine oil kokhono use korben na! Commuters-er jonyo Motul 3100 aar performance bikes-er jonyo Motul 7100 10W50 100% Synthetic! MotoFit 2-te sob somoy genuine sealed cans use kori.",
                "Engine oil bike-er pran dada! Motul 7100 dile gear shifts butter-er moton smooth hoy aar engine cool thake!"
            ],
            tamil: () => [
                "Veyil-la duplicate illa low quality engine oil eppovum podadheenga! Commuters-ku Motul 3100, 200cc+ performance bikes-ku Motul 7100 10W50 100% Synthetic! MotoFit 2-la genuine sealed cans mattum dhaan use panrom.",
                "Engine oil bike-oda blood bro! Motul 7100 pottu paarunga, gear shift butter madhiri aagidum, engine heating-um control-la irukkum!"
            ],
            telugu: () => [
                "Endalu and traffic-lo duplicate engine oil asalu veyakandi! Commuters ki Motul 3100, 200cc+ performance bikes ki Motul 7100 10W50 100% Synthetic! MotoFit 2-lo strictly genuine sealed cans use chestamu.",
                "Engine oil bike ki pranam anna! Motul 7100 vadithe gear shifts buttery smooth ga untayi, engine heat taggutundi!"
            ],
            kannada: () => [
                "Heavy traffic matthe bisilalli sasta duplicate oil hakabedi guru! Commuters-ge Motul 3100, 200cc+ performance bikes-ge Motul 7100 10W50 100% Synthetic! MotoFit 2-nalli genuine sealed cans maathra use madtivi.",
                "Engine oil bike-ge jeeva! Motul 7100 hakidre gear shifts butter thara smooth aaguthe, engine heating control aaguthe!"
            ],
            malayalam: () => [
                "Heavy heat & traffic-il duplicate engine oil ozhikkaruthu! Commuters-inu Motul 3100, 200cc+ performance bikes-inu Motul 7100 10W50 100% Synthetic! MotoFit 2-il genuine sealed cans maathrame use cheyyarullu.",
                "Engine oil bike-inte jeevan aanu aliya! Motul 7100 ozhichal gear shift butter pole smooth aakum, engine heat control-il aakum!"
            ]
        }
    },

    // ── 6. SMOKE DIAGNOSTIC ──
    {
        category: 'smoke_diagnostic',
        patterns: [
            /\b(white smoke|safed dhuan|dhuan|smoke|kaalo dhuan|black smoke|dhuro|dhunwa)\b/i
        ],
        responses: {
            english: () => [
                "White smoke usually points to worn valve stem seals or degraded piston rings, meaning engine oil is seeping into the combustion chamber! Pull your dipstick right away and check the oil level. Bring it to our Chandkheda garage before the engine seizes!",
                "Black smoke indicates unburnt fuel — either your carburetor is running overly rich or the fuel injector is clogged. White smoke means burning oil. Both need inspection on our hydraulic lift. Which bike is this?"
            ],
            hindi: () => [
                "Safed dhuan (white smoke) ka matlab valve stem seals ya piston rings wear out ho chuki hain — engine oil combustion chamber mein burn ho raha hai! Turant dipstick nikaal kar oil level check karo aur seize hone se pehle Chandkheda workshop le aao!",
                "Kaala dhuan (black smoke) matlab unburnt fuel — injector choke hai ya carburetor rich hai. Safed dhuan matlab oil burn ho raha hai. Dono inspect karwane padenge. Kaunsi bike hai aapki?"
            ],
            gujarati: () => [
                "Safed dhuan (white smoke) hoy toh valve stem seals ke piston rings ghasi gaya che — engine oil combustion chamber ma burn thay che! Dipstick kadhi ne oil level check karo immediately. Engine seize thay pehla Chandkheda garage par lai aavo!",
                "Kaalo dhuan (black smoke) means unburnt fuel — carburetor rich che ya fuel injector choke che. Safed dhuan means oil burn. Both need inspection on the lift. Kyo bike che tamaro?"
            ],
            marathi: () => [
                "Safed dhur (white smoke) yet asel tar valve stem seals kiwa piston rings wear out jhalet — engine oil combustion chamber madhe burn hot ahe! Lagech dipstick kadhun oil level check kara aani engine seize honyapurvi Chandkheda workshop la aana!"
            ],
            punjabi: () => [
                "Chitta dhuan (white smoke) da matlab valve stem seals ya piston rings ghas chukiyan ne — engine oil combustion chamber ch burn ho reha hai! Fatafat dipstick kadd ke oil check karo te seize hon ton pehla Chandkheda workshop le aao veere!"
            ],
            bengali: () => [
                "Sada dhoya (white smoke) mane valve stem seals ba piston rings khoy hoye geche — engine oil burn hocche! Ekhoni dipstick diye oil check korun aar engine seize howar aagei Chandkheda workshop-e niye aashun!"
            ],
            tamil: () => [
                "Vellai poga (white smoke) varudhu-na valve stem seals illa piston rings theinjurukku-nu artham — engine oil burn aagudhu! Udanae dipstick eduthu oil level check pannunga, seize aagaradhukku munnadi Chandkheda workshop kondu vaanga!"
            ],
            telugu: () => [
                "White smoke vastundi ante valve stem seals leda piston rings wear out ayyayi — engine oil burn avtundi! Ventane dipstick tesi oil level check cheyandi, engine seize avvakamunde Chandkheda workshop ki randi!"
            ],
            kannada: () => [
                "Bili hoge (white smoke) barthide andre valve stem seals athva piston rings wear out aagide — engine oil burn aagthide! Koodale dipstick thegedu oil level check maadi, engine seize aagokkintha munche Chandkheda workshop-ge banni!"
            ],
            malayalam: () => [
                "Vella puka (white smoke) varunnathenkil valve stem seals allenkil piston rings theinjirikkunnu — engine oil burn aakukayaanu! Udane dipstick eduthu oil level check cheyyu, seize aakunnathinu munpu Chandkheda workshop-il ethikku!"
            ]
        }
    },

    // ── 7. HANDLEBAR WOBBLE & SUSPENSION VIBRATIONS ──
    {
        category: 'handle_wobble',
        patterns: [
            /\b(wobble|wobbling|vibration|kampan|handle|handlebar|fork|chassis|shake|dholak)\b/i
        ],
        responses: {
            english: () => [
                "On our local roads, 80% of handlebar wobble comes from notched steering cone-set ball bearings or a minor rim bend. If the handlebar oscillates when releasing hands at 50–70 km/h, ride down to our Chandkheda bay and we'll true and calibrate it!",
                "Does the shake happen under braking or while decelerating? Loose cone-sets can also cause front fork oil seal leaks. Don't risk steering safety — let us inspect it on the lift!"
            ],
            hindi: () => [
                "Gaddhon mein 80% handle wobble cone-set bearings kharab hone se ya front wheel rim mein minor bend hone se hota hai. 50-70 km/h par handle chhodne par shake hota hai toh Chandkheda workshop aao, align kar denge!",
                "Handle shake braking ke time hota hai ya deceleration mein? Cone-set loose ho toh fork seal bhi leak ho sakti hai. Safety mein zero risk — inspection karwa lo!"
            ],
            gujarati: () => [
                "Ahmedabad na khaddha ma 80% handlebar wobble cone-set bearings notched thava thi thay che, ya front alloy ma minor bend hoy! 50-70 km/h par haath chhodva par dholak vage toh direct Chandkheda workshop par aavo, align kari dais!",
                "Handle shake thay che braking vakhate ke deceleration ma? Cone-set loose hoy to fork oil seal pan leak thay. Bay ma checkup karavi lo, safety ma no risk!"
            ]
        }
    },

    // ── 8. GEAR SHIFTING & CLUTCH ISSUES ──
    {
        category: 'gear_clutch',
        patterns: [
            /\b(gear|gear hard|clutch|shifting|neutral|phas gaya|clutch hard|gear tight)\b/i
        ],
        responses: {
            english: () => [
                "In stop-and-go city traffic, clutch cables stretch and degraded oil loses its thermal shear strength. Fresh Motul synthetic oil plus setting clutch free-play to 2–3mm makes gear shifts buttery smooth! 🧈",
                "Hard gear shifts are the #1 sign of oil breakdown or warped clutch plates. If you're hitting false neutrals, visit our Chandkheda workshop — we'll diagnose clutch pack thickness in 20 minutes."
            ],
            hindi: () => [
                "Traffic mein clutch cable stretch ho jaati hai ya engine oil heat ki wajah se viscosity lose kar deta hai. Motul synthetic oil daalo aur clutch free-play 2-3mm adjust karo, shifting ekdum smooth ho jayegi! 🧈",
                "Hard gear shift engine oil degradation ka pehla sign hai. False neutral aa rahe hain toh clutch plates inspect karni padengi. Workshop aa jao, 20 minute mein diagnose ho jayega."
            ],
            gujarati: () => [
                "Visat circle na bumper-to-bumper traffic ma clutch cable stretch thay che ya oil garmi thi viscosity lose kare che. Motul 10W40/10W50 nakho ane clutch free-play 2-3mm adjust karo. Shifting ekdum butter smooth thai jashe! 🧈",
                "Hard gear shift engine oil degradation no pehlo sign che! Jo false neutral aavta hoy to clutch plates check karvi pade. Workshop aavi jao, 20 minute ma diagnose kari dais."
            ]
        }
    },

    // ── 9. NOISE / TAPPET / RATTLING ──
    {
        category: 'noise_tappet',
        patterns: [
            /\b(noise|sound|avaj|awaaz|khad khad|tik tik|tappet|rattling|tick tick|shobdo)\b/i
        ],
        responses: {
            english: () => [
                "A continuous 'tick-tick' from the cylinder head that speeds up with RPM usually indicates loose valve tappet clearance — it needs precise feeler gauge calibration. A lower rattling noise indicates a loose timing chain or tensioner. Bring it in for a stethoscope diagnosis!",
                "Unusual engine sounds are your bike asking for attention! A healthy engine sounds crisp and tight. We'll trace the exact mechanical source on the lift."
            ],
            hindi: () => [
                "Engine head se 'tik-tik' sound jo RPM ke saath tez ho, wo tappet / rocker arm clearance loose hone ka sign hai — feeler gauge se exact set karna padega. Niche se sound ho toh timing chain loose ho sakti hai. Workshop le aao!",
                "Awaaz aana bike ka alert signal hai dost! Hum stethoscope se engine listen karke exact source batayenge."
            ],
            gujarati: () => [
                "Engine head thi 'tik-tik' sound ave je RPM sathe vadhe to tappet/rocker arm clearance loose che — needs precise feeler gauge setting (e.g. 0.05/0.10 mm). Jo niche thi 'kad-kad' ave to timing chain loose hoy. Garage lai aavo!",
                "Unusual noise is the bike crying for help baka! Silence is performance. Bay ma stethoscope thi engine listen karishu ane exact source batavishu."
            ]
        }
    },

    // ── 10. OVERHEATING & COOLING ──
    {
        category: 'overheating',
        patterns: [
            /\b(heat|garam|overheat|hot engine|radiator|coolant|fan|temperature)\b/i
        ],
        responses: {
            english: () => [
                "Summer dust and grime clog radiator fins fast! A chemical radiator flush, fin cleaning, and Motul Inugel coolant drop operating temperatures by 8–12°C. Keep that engine running cool! ❄️",
                "Don't force a bike that's overheating! Check if your coolant reservoir is dry or if the radiator fan is failing to trigger. Inspect your oil level and visit our Chandkheda bay."
            ],
            hindi: () => [
                "Garmi aur dhool radiator fins ko choke kar deti hai! Distilled coolant flush aur descaling se operating temperature 8-12°C drop hota hai. Motul Inugel use karo, engine cool rahega! ❄️",
                "Overheating mein bike ko force mat karo! Coolant level aur fan check karwa lo. Workshop aao, cooling system check kar dete hain."
            ],
            gujarati: () => [
                "Ahmedabad ni 45°C summer dust radiator fins ne choke kari nakhe che! Distilled coolant flush ane chemical descaling thi operating temps 8-12°C drop thay che. Motul Inugel coolant use karo, engine chill rahese. ❄️",
                "Engine overheat ma bike force mat karo! Radiator reservoir empty hoy ya water pump impeller slip thato hoy. Check dipstick and visit Chandkheda."
            ]
        }
    },

    // ── 11. STARTING PROBLEM & BATTERY ──
    {
        category: 'starting_battery',
        patterns: [
            /\b(start nahi|chalu nathi|starting|battery|self|kick|dead|start problem|not starting)\b/i
        ],
        responses: {
            english: () => [
                "If the starter gives a fast 'click-click' click but doesn't crank the engine, your battery has dropped below 12.4V! If it's completely silent, the starter relay or kill switch could be faulty. Does the kickstart have good compression? Give our Chandkheda workshop a ring!",
                "Terminal corrosion and battery discharge are super common in high humidity. We test cold cranking amps (CCA) with load testers at our workshop — drop in anytime!"
            ],
            hindi: () => [
                "Self marne par 'click-click' awaaz aaye par motor na ghume toh battery voltage 12.4V se niche drop ho chuka hai. Agar bilkul silent ho toh relay check karni padegi. Kick marne par compression feel hota hai? Call karo workshop par!",
                "Monsoon aur humidity mein battery discharge aur terminal rust common hai. Amaron/Exide load test hum workshop par turant kar dete hain."
            ],
            gujarati: () => [
                "Self ma 'click-click' avaj ave pan motor na ghume toh battery voltage 12.4V thi niche drop thay che! Jo bilkul silent hoy to starter relay check karvo pade. Kick maro — compression feel thay che? Call karo workshop par!",
                "Ahmedabad humidity ma terminal rust ane battery discharge common che. Amaron / Exide battery load test kari aapis workshop par."
            ]
        }
    },

    // ── 12. BRAKES & STOPPING POWER ──
    {
        category: 'brakes',
        patterns: [
            /\b(brake|brakes|pad|pads|disc|drum|rotor|braking|squeak)\b/i
        ],
        responses: {
            english: () => [
                "Squeaking brakes mean your brake pads are worn down to the wear indicator or road dust has glazed the rotor surface. Ceramic or sintered pads give the sharpest bite and heat dissipation. Zero compromise on stopping power — let's inspect them in 15 minutes at Chandkheda!",
                "Spongy brake lever? Air bubbles or moisture have contaminated the brake fluid. A fresh DOT 4 bleed with Motul fluid restores instant, razor-sharp brake bite!"
            ],
            hindi: () => [
                "Brakes mein squeaking sound matlab pads wear limit par aa gaye hain ya rotor par dust baith gayi hai. Sintered ya ceramic pads best stopping power dete hain. Safety mein no jugaad — Chandkheda workshop aao, 15 min mein check ho jayega!",
                "Brake lever spongy lag raha hai? Brake fluid bleed karwayiye. Motul DOT 4 se lever feel wapas razor-sharp ho jayegi!"
            ],
            gujarati: () => [
                "Brakes ma squeaking sound ave to pads wear limit par pohchi gaya che ya rotor par monsoon dust bethi che. Ceramic ya sintered pads best stopping power aapse. Safety ma zero jugaad — Chandkheda bay ma 15 min ma check thai jashe!",
                "Brake lever spongy lage che? Brake fluid ma moisture aavi gayu hoy. DOT 4 Motul brake fluid bleed karishu, bite ekdum sharp thase!"
            ]
        }
    },

    // ── 13. PRICING INQUIRIES (RULE #1: INSPECTION FIRST) ──
    {
        category: 'pricing_rule1',
        patterns: [
            /\b(price|cost|rate|kitna|ketla|charge|how much|charges|estimate|quote|kiti kharch|vela)\b/i
        ],
        responses: {
            english: () => [
                "MotoFit 2 Rule #1: We never give blind guesswork quotes over chat! Your bike gets mounted on our hydraulic lift, thoroughly inspected, and only then do we provide a transparent, itemized estimate for genuine parts and fair labor. Zero hidden surprises! 💯",
                "Accurate pricing depends strictly on your bike's exact mechanical condition. We don't believe in dishonest estimates. Drop by our Chandkheda workshop — initial physical inspection is completely on the house!"
            ],
            hindi: () => [
                "MotoFit 2 ka Rule #1: Chat par andaza laga kar customer ko mislead nahi karna! Bike lift par chadhegi, inspection hoga, phir genuine parts aur fair labor ka crystal-clear estimate milega. Zero hidden charges! 💯",
                "Price strictly bike ki exact condition par depend karta hai. Chandkheda workshop aa jao, inspection pehle free mein kar denge, uske baad hi kaam shuru hoga!"
            ],
            gujarati: () => [
                "Baka, MotoFit 2 nu Rule #1: Chat par andaje price aapi ne customer ne gumrah nathi karvu! Bike lift par chadhse, mechanical inspection thase, pachi genuine parts ane fair labor nu crystal-clear estimate aapis. No hidden surprises! 💯",
                "Price depends strictly on your bike's exact condition baka. Jugaad pricing garage ma nathi chalti. Chandkheda aavi jao, pehla inspection free ma kari apisu, pachi work start karisu!"
            ],
            marathi: () => [
                "MotoFit 2 cha Rule #1: Chat var andaje price sangun customer la fasvaycha nahi! Bike lift var chadhel, inspection hoil, nantar genuine parts aani fair labor cha transparent estimate dila jail! 💯"
            ],
            punjabi: () => [
                "MotoFit 2 da Rule #1: Chat te tukka maar ke rate nahi dassna veere! Bike lift te chadhegi, inspection hovegi, fer genuine parts te transparent hisab dassange! 💯"
            ],
            bengali: () => [
                "MotoFit 2-er Rule #1: Chat-e andaj kore price bole customer-ke mislead kori na! Bike lift-e tulbo, inspection hobe, tarpor genuine parts aar fair estimate debo! 💯"
            ],
            tamil: () => [
                "MotoFit 2 Rule #1: Chat-la estimate pottu mislead panna maattom bro! Bike lift-la mount aagi physical inspection mudinjadhum crystal-clear estimate tharuvom! 💯"
            ],
            telugu: () => [
                "MotoFit 2 Rule #1: Chat-lo guess chesi price cheppi mislead cheyamu anna! Bike inspection tarvathe clear transparent estimate isthamu! 💯"
            ],
            kannada: () => [
                "MotoFit 2 Rule #1: Chat-nalli andaji price heli confuse madalla guru! Bike lift melee thalisi inspection madi clear estimate kodthivi! 💯"
            ],
            malayalam: () => [
                "MotoFit 2 Rule #1: Chat-il thonnakkathinu rate paranjitu aaleyum thetikaruthu! Bike inspection kazhinjittu maathrame clear estimate tharullu! 💯"
            ]
        }
    },

    // ── 14. LOCATION, TIMINGS & SCHEDULE ──
    {
        category: 'location_timings',
        patterns: [
            /\b(location|address|kaha|kaha par|kirtan|chandkheda|where|timing|timings|open|sunday|wednesday|kab aavu|when can i visit|kuthe ahe|evide|enga|elli|ekkadundi)\b/i
        ],
        responses: {
            english: () => [
                "MotoFit 2 is located at Shop No. 5-6, Kirtan Complex, Nigam Nagar, Chandkheda, Ahmedabad (Near New CG Road / Visat Circle). Mon–Sat: 10:00 AM to 8:30 PM. Wednesday is our Sabbatical (Shop Closed). Open on Sundays! Search 'MotoFit 2' on Google Maps! 📍",
                "We are in Chandkheda! Head from Visat Circle towards New CG Road, and you'll spot MotoFit 2 at Kirtan Complex. Open Mon–Sat 10:00 to 8:30, Sundays open, Wednesdays closed!"
            ],
            hindi: () => [
                "MotoFit 2, Shop No. 5-6, Kirtan Complex, Nigam Nagar, Chandkheda, Ahmedabad (Near New CG Road / Visat Circle). Mon-Sat: 10:00 AM se 8:30 PM. Wednesday Chhutti (Shop Closed). Sunday Open! Google Maps par 'MotoFit 2' search karo! 📍",
                "Chandkheda mein hain hum! Visat Circle se New CG Road aaiye, Kirtan Complex mein MotoFit 2 board dikh jayega. Mon-Sat 10 to 8:30, Sunday open, Wednesday closed!"
            ],
            gujarati: () => [
                "MotoFit 2, Shop No. 5-6, Kirtan Complex, Nigam Nagar, Chandkheda, Ahmedabad (Near New CG Road / Visat Circle). Mon-Sat: 10:00 AM to 8:30 PM. Wednesday Sabbatical (Shop Closed). Sunday Open! Google Maps par 'MotoFit 2' search karo! 📍",
                "Chandkheda ma chia baka! Visat circle thi New CG Road aavo, Kirtan Complex ma MotoFit 2 board dikhi jashe. Mon-Sat 10 to 8:30, Sunday open, Wednesday closed!"
            ],
            marathi: () => [
                "MotoFit 2, Shop No. 5-6, Kirtan Complex, Nigam Nagar, Chandkheda, Ahmedabad (Near New CG Road / Visat Circle). Somvar te Shanivar: 10:00 AM te 8:30 PM. Budhwar Sabbatical (Shop Closed). Ravivari Open! Google Maps var 'MotoFit 2' shodha! 📍"
            ],
            punjabi: () => [
                "MotoFit 2, Shop No. 5-6, Kirtan Complex, Nigam Nagar, Chandkheda, Ahmedabad (Visat Circle kol). Som ton Shanivaar: 10:00 AM ton 8:30 PM. Budhwar Band (Shop Closed). Aitwaar Open! Google Maps te 'MotoFit 2' search karo! 📍"
            ],
            bengali: () => [
                "MotoFit 2, Shop No. 5-6, Kirtan Complex, Nigam Nagar, Chandkheda, Ahmedabad (Visat Circle-er kache). Som-Soni: 10:00 AM theke 8:30 PM. Budhbar bondho. Robibar khola! Google Maps-e 'MotoFit 2' search korun! 📍"
            ],
            tamil: () => [
                "MotoFit 2, Shop No. 5-6, Kirtan Complex, Nigam Nagar, Chandkheda, Ahmedabad (New CG Road / Visat Circle pakkathula). Tingal mudhal Sani varai: 10:00 AM to 8:30 PM. Budhan leave. Gnayiru open! Google Maps-la 'MotoFit 2' search pannunga! 📍"
            ],
            telugu: () => [
                "MotoFit 2, Shop No. 5-6, Kirtan Complex, Nigam Nagar, Chandkheda, Ahmedabad (Visat Circle daggara). Somavaram nundi Sanivaram: 10:00 AM to 8:30 PM. Budhavaram holiday. Adivaram open! Google Maps-lo 'MotoFit 2' search cheyandi! 📍"
            ],
            kannada: () => [
                "MotoFit 2, Shop No. 5-6, Kirtan Complex, Nigam Nagar, Chandkheda, Ahmedabad (Visat Circle hathira). Somavara - Shanivara: 10:00 AM to 8:30 PM. Budhavara shop closed. Bhanuvara open! Google Maps-nalli 'MotoFit 2' search maadi! 📍"
            ],
            malayalam: () => [
                "MotoFit 2, Shop No. 5-6, Kirtan Complex, Nigam Nagar, Chandkheda, Ahmedabad (Visat Circle aduthu). Thinkal - Shani: 10:00 AM to 8:30 PM. Budhan aazhcha closed. Njayar open! Google Maps-il 'MotoFit 2' search cheyyu! 📍"
            ]
        }
    },

    // ── 15. PERFORMANCE MODS, DYNO & TUNING ──
    {
        category: 'tuning_performance',
        patterns: [
            /\b(stage 1|stage 2|remap|ecu|dyno|exhaust|akrapovic|sc project|bmc|k&n|top speed|hp|torque|speed 400|duke 390|gt 650)\b/i
        ],
        responses: {
            english: () => [
                "🔥 Enthusiast mode on! Continental GT 650, Duke 390, or Speed 400? A Stage 1 ECU flash with a BMC high-flow filter yields a solid 12–15% mid-range torque jump. With free-flow exhausts, AFR remapping is mandatory so the engine doesn't run dangerously lean. Drop by our Chandkheda performance bay!",
                "Real petrolhead talk! Looking for just exhaust acoustics or verified wheel horsepower? With optimal sprocket gearing and customized fuel trims, throttle response becomes instantaneous!"
            ],
            hindi: () => [
                "🔥 Enthusiast alert! Continental GT 650, Duke 390 ya Speed 400? Stage 1 ECU tune aur BMC filter se mid-range torque 12-15% boost ho jata hai. Akrapovic fitment ke sath AFR tuning zaroori hai taaki engine lean na chale. Chandkheda workshop aa jao!",
                "Pure performance talk! Dyno horsepower chahiye ya throttle response? Custom mapping aur performance sprockets ke sath bike fly karegi!"
            ],
            gujarati: () => [
                "🔥 Enthusiast alert! Continental GT 650, Duke 390 ke Speed 400? Stage 1 ECU tune + BMC free flow filter thi mid-range torque 12-15% jump thase. Akrapovic fitment sathe AFR tuning zaroori che jethi engine lean na chale. Chandkheda bay ma aavi jao!",
                "Pure petrolhead talk! Only loud sound joiye che ke actual dyno horsepower? Performance sprocket ratio ane custom map sathe throttle response instant kari daisu!"
            ]
        }
    },

    // ── 16. POPULAR BIKE MODELS ──
    {
        category: 'bike_models',
        patterns: [
            /\b(activa|jupiter|access|ntorq|bullet|classic 350|hunter|himalayan|continental gt|interceptor|duke|rc 390|pulsar|apache|splendor|shine)\b/i
        ],
        responses: {
            english: () => [
                "Solid machine! At MotoFit 2, we service everything from daily commuter scooters to multi-cylinder superbikes with precision torque wrenches and factory specs. Bring it to Chandkheda and feel the difference!",
                "We know this model inside out! From periodic valve adjustment to throttle synchronization and synthetic fluid changes, we've got you covered."
            ],
            hindi: () => [
                "Badiya machine hai dost! MotoFit 2 par daily commuter se lekar superbikes tak sab proper torque specs ke sath service hoti hain. Chandkheda le aao!",
                "Is bike ko hum acche se jante hain! Engine tuning se lekar suspension setup tak perfect overhaul milega."
            ],
            gujarati: () => [
                "Mast machine che baka! MotoFit 2 ma daily commuters thi laine multi-cylinder superbikes badhu standard torque specs sathe service thaye che. Chandkheda muki jao!",
                "Aa model nu badhu j tuning ahiya regular thay che. Lift par chadhse etle fresh look ane butter-smooth throttle deliver thase!"
            ]
        }
    },

    // ── 17. SAMAEL / AKSHAT / FOUNDER ──
    {
        category: 'boss_samael',
        patterns: [
            /\b(samael|akshat|boss|admin|owner|malik)\b/i
        ],
        responses: {
            english: () => [
                "Boss Akshat (Samael) is busy tuning in the workshop bay and managing performance dyno runs! Our rule is simple: zero compromise, 100% genuine parts, and transparent engineering. Empire building in progress! 🚀",
                "Samael detected! Garage bay is all green, tools organized, customer satisfaction top tier. What's on your mind boss?"
            ],
            hindi: () => [
                "Boss Akshat (Samael) garage bay aur performance bench par busy hain! MotoFit 2 ka rule simple hai: Zero jugaad, 100% genuine parts, transparent engineering. Empire building chal rahi hai! 🚀",
                "Samael detected! Garage bay all green, tools arranged, customer satisfaction top tier. Bolo boss!"
            ],
            gujarati: () => [
                "Boss Akshat (Samael) garage bay ane performance dyno bench par busy che! MotoFit 2 no rule simple che: Zero jugaad, 100% genuine parts, transparent honest engineering. Empire building in progress! 🚀",
                "Samael detected! Garage bay all green, tools arranged, customer satisfaction top tier. Su chale boss?"
            ]
        }
    },

    // ── 18. FLIRTING / TROLLING / INAPPROPRIATE ──
    {
        category: 'flirting_trolling',
        patterns: [
            /\b(baby|darling|sexy|hot|date|marry|love|shadi|pyaar|kiss|girlfriend|gf|single)\b/i
        ],
        responses: {
            english: () => [
                "Lost your bearings? This is the MotoFit 2 motorcycle workshop in Chandkheda, not a dating app! My heart is married to Continental GT twin cylinders and Motul synthetic oil. Cool down your engine and let's talk bikes! 🛑🔧",
                "Keep it professional! When was the last time you checked your engine oil? Save the sweet talk and tell me what's wrong with your bike!"
            ],
            hindi: () => [
                "Dhyan kahan hai dost? Yeh Chandkheda ka MotoFit 2 workshop hai, dating app nahi! Dil engine oil aur twin-cylinder bikes ke sath judaa hai. Coolant daalo dimag mein aur bike ki baat karo! 🛑🔧",
                "Focus karo! Engine oil kab badla tha aakhri baar? Dil baad mein lagana, pehle bike ka issue solve karo. Akshat bhai strictly professional bolte hain!"
            ],
            gujarati: () => [
                "Tame bhan bhulya cho baka? Aa Chandkheda nu MotoFit 2 garage che, Tinder nathi! Maru dil Continental GT na twin cylinder ane engine oil sathe wedded che. Coolant nakho matha ma ane bike ni vaat karo! 🛑🔧",
                "Focus baka! Engine oil change karyu hatu chelle kyare? Dil baad ma lagavjo, pehla bike no locha solve karo. Akshat bhai strictly professional rakhva kahe che!"
            ],
            marathi: () => [
                "Bhan kuthe ahe bhau? He Chandkheda cha MotoFit 2 garage ahe, dating app nahi! Manat fakt engine oil aani twin cylinders ahet. Bike baddal bola! 🛑🔧"
            ],
            punjabi: () => [
                "Dhyan kithe hai veere? Eh Chandkheda da MotoFit 2 garage hai, koi dating app nahi! Dil sirf engine oil te bullet naal lagya hai. Bike di gal karo! 🛑🔧"
            ],
            bengali: () => [
                "Eita Chandkheda-r MotoFit 2 motorcycle garage dada, Tinder noy! Mon sotti engine oil aar bike-e aache. Bike-er problem thakle bolo! 🛑🔧"
            ],
            tamil: () => [
                "Idhu MotoFit 2 motorcycle garage bro, dating app illa! En focus full-ah bike engines mela dhaan irukku. Bike-la enna issue-nu sollunga! 🛑🔧"
            ],
            telugu: () => [
                "Idi MotoFit 2 motorcycle garage anna, dating app kaadu! Naa dhyanam antha bike engines meedhane untundi. Bike gurinchi matladandi! 🛑🔧"
            ],
            kannada: () => [
                "Idu MotoFit 2 motorcycle garage guru, dating app alla! Namma focus yella bike engine melee. Bike problem enu heli! 🛑🔧"
            ],
            malayalam: () => [
                "Ithu MotoFit 2 motorcycle garage aanu bro, dating app alla! Ente focus bike engines-il aanu. Bike issue enthanennu parayu! 🛑🔧"
            ]
        }
    },

    // ── 19. GRATITUDE & CLOSING ──
    {
        category: 'gratitude_closing',
        patterns: [
            /\b(thank you|thanks|thx|aabhar|dhanyavad|shukriya|bye|tata|good night|shubh ratri|see you|nanri|dhanyavadalu|nanni)\b/i
        ],
        responses: {
            english: () => [
                "You're very welcome! You're family at our garage. Always wear a good helmet, ride safe, and take care of your machine! 🏍️💨",
                "Anytime! MotoFit 2 Chandkheda doors are always open for you and your bike. Ride safe!",
                "Good night! Check your tyre pressures and keep your bike covered. Have a great ride tomorrow!"
            ],
            hindi: () => [
                "Arey thanks kis baat ka dost! Garage family ho aap. Helmet hamesha pehno, ride safe aur dhyan rakhna! 🏍️💨",
                "Most welcome dost! MotoFit 2 Chandkheda ke darwaze aapki bike ke liye hamesha open hain. Ride safe!",
                "Shubh ratri! Tyre air check karke bike cover kar dena. Kal subah mast ride shuru!"
            ],
            gujarati: () => [
                "Arey baka, aama thanks su! Aapda garage na family jeva cho tame. Helmet hamesha pehro, ride safe, ane dhyan rakhjo! 🏍️💨",
                "Most welcome dost! MotoFit 2 na darwaja Chandkheda ma hamesha open che tamari bike mate. Dhyaan rakhjo!",
                "Shubh ratri baka! Tyre air check kari ne bike cover kari dyo. Kaale navi ride shuru!"
            ],
            marathi: () => [
                "Arey thanks kashala bhau! Aamchya garage family sarkhe ahat tumhi. Helmet hamesha vapra, ride safe aani kalji ghya! 🏍️💨",
                "Most welcome bhau! MotoFit 2 Chandkheda che daar hamesha open ahet. Ride safe!"
            ],
            punjabi: () => [
                "Arey thanks kida veere! Tussi garage family wangu o. Helmet hamesha pao, ride safe te khayal rakho! 🏍️💨",
                "Most welcome veere! MotoFit 2 Chandkheda de boohay hamesha open ne. Rab rakha!"
            ],
            bengali: () => [
                "Dhanyavad-er kichu nei dada! Aamader garage family-r moton tumi. Helmet sob somoy porbe, ride safe aar bhalo theko! 🏍️💨",
                "Most welcome dada! MotoFit 2 Chandkheda-r dorja sob somoy khola aache. Bhalo thakben!"
            ],
            tamil: () => [
                "Thanks ellam edhukku bro! Neenga namma garage family. Helmet eppovum podunga, ride safe! 🏍️💨",
                "Romba welcome bro! MotoFit 2 Chandkheda kadhavu eppovum open-ah dhaan irukkum. Safe ride!"
            ],
            telugu: () => [
                "Thanks enduku bro! Meeru maa garage family laanti vaaru. Helmet eppudu pettukondi, ride safe! 🏍️💨",
                "Chala welcome anna! MotoFit 2 Chandkheda doors eppudu open-lo untayi. Take care!"
            ],
            kannada: () => [
                "Thanks ellam yaake guru! Neevu namma garage family thara. Helmet hamesha haaki, ride safe! 🏍️💨",
                "Thumbaa welcome guru! MotoFit 2 Chandkheda bagilu hamesha open ide. Safe ride!"
            ],
            malayalam: () => [
                "Thanks onnum parayenda bro! Ningal nammude garage family pole aanu. Helmet eppozhum dharikku, ride safe! 🏍️💨",
                "Most welcome bro! MotoFit 2 Chandkheda doors eppozhum thuranne kidakkunnu. Nalla ride aavatte!"
            ]
        }
    }
];

/**
 * Intelligent local conversational synthesis function.
 * Matches multi-topic semantic intent, applies pan-India multi-lingual mirroring,
 * extracts Letta memory signals, and generates warm, in-character Amdavadi speech.
 */
export function generateMansiAutonomousReply(userMessage: string): string {
    const trimmed = userMessage.trim();
    if (!trimmed) {
        return "Hey there! How can I help you today? Is there any issue with your bike?";
    }

    const lang: UserLanguage = detectUserLanguage(trimmed);

    // 1. Extract context signals from Letta state if in browser
    let profile: any = {};
    try {
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            const raw = localStorage.getItem('motofit_letta_profile_v2');
            if (raw) profile = JSON.parse(raw);
        }
    } catch {
        // Safe fallback
    }

    const context: ResponseContext = {
        userName: profile.userName,
        bikeModel: profile.bikeModel
    };

    // 2. Scan dialogue rules
    for (const rule of MANSI_DIALOGUE_RULES) {
        if (rule.patterns.some(p => p.test(trimmed))) {
            const candidates = resolveLanguageResponse(rule.responses, lang, context);
            const chosen = candidates[Math.floor(Math.random() * candidates.length)];
            return chosen;
        }
    }

    // 3. Fallback to IndicNLP Diagnostic Tree if symptom detected
    const diagnostic = IndicNLP.findDiagnosticTree(trimmed);
    if (diagnostic) {
        if (lang === 'english') {
            return `Diagnostic Note: We detected signs of ${diagnostic.symptom}. ${diagnostic.clarificationPrompt}\n\n💡 Pro Tip: ${diagnostic.inspectionTip}\n\nBring your bike by our Chandkheda workshop — we'll inspect it live on the lift! 🏍️🔧`;
        } else if (lang === 'hindi') {
            return `${diagnostic.clarificationPrompt}\n\n💡 Tip: ${diagnostic.inspectionTip}\n\nChandkheda workshop le aao, live inspection kar denge! 🏍️🔧`;
        } else if (lang === 'gujarati') {
            return `${diagnostic.clarificationPrompt}\n\n💡 Tip: ${diagnostic.inspectionTip}\n\nChandkheda bay ma lai aavo, live inspection kari apisu! 🏍️🔧`;
        } else if (lang === 'marathi') {
            return `${diagnostic.clarificationPrompt}\n\n💡 Tip: ${diagnostic.inspectionTip}\n\nChandkheda workshop la aana, live lift var inspection karun deu! 🏍️🔧`;
        } else if (lang === 'punjabi') {
            return `${diagnostic.clarificationPrompt}\n\n💡 Tip: ${diagnostic.inspectionTip}\n\nChandkheda workshop le aao veere, live lift te check kar lavange! 🏍️🔧`;
        } else if (lang === 'bengali') {
            return `${diagnostic.clarificationPrompt}\n\n💡 Tip: ${diagnostic.inspectionTip}\n\nChandkheda workshop-e niye aashun, live lift-e check kore debo! 🏍️🔧`;
        } else if (lang === 'tamil') {
            return `${diagnostic.clarificationPrompt}\n\n💡 Tip: ${diagnostic.inspectionTip}\n\nChandkheda workshop kondu vaanga, lift-la live check panni tharuvom! 🏍️🔧`;
        } else if (lang === 'telugu') {
            return `${diagnostic.clarificationPrompt}\n\n💡 Tip: ${diagnostic.inspectionTip}\n\nChandkheda workshop ki randi, live lift meeda check chestamu! 🏍️🔧`;
        } else if (lang === 'kannada') {
            return `${diagnostic.clarificationPrompt}\n\n💡 Tip: ${diagnostic.inspectionTip}\n\nChandkheda workshop-ge banni, live lift melee check madtivi! 🏍️🔧`;
        } else {
            return `${diagnostic.clarificationPrompt}\n\n💡 Tip: ${diagnostic.inspectionTip}\n\nChandkheda workshop-il ethikku, live lift-il check cheythu tharaam! 🏍️🔧`;
        }
    }

    // 4. In-character Conversational Catch-alls for all 10 Indian state languages
    const dynamicDefaults: Record<UserLanguage, string[]> = {
        english: [
            "Hey! I was just tuning a bike in our Chandkheda workshop bay. How can I help you with your machine today? Any service, unusual sound, or performance tuning on your mind? Tell me your bike model and let's get it sorted! 🏍️🔧",
            "Mansi here! We're all hands on deck at MotoFit 2 Chandkheda. What bike do you ride, and what's going on with it? Let me know and I'll guide you straight!",
            "Great to connect! Looking for regular maintenance, Motul oil service, or troubleshooting a mechanical issue? Drop your bike details and let's get you road-ready!"
        ],
        hindi: [
            "Bolo dost! Chandkheda garage bay mein Royal Enfield aur multi-brand bikes ki servicing chal rahi thi. Aapki bike mein koi servicing, oil change ya mechanical issue hai? Model batao, solution nikaal dete hain! 🏍️🔧",
            "Mansi here! Full focus workshop bay par tha. Bike ke baare mein kya poochna chahte ho? Genuine parts, general service ya performance remapping? Hamesha ready hoon!",
            "Mast baat! MotoFit 2 Chandkheda workshop mein all technicians bay mein hain. Kaunsi bike chalate ho aap? Activa hai ya performance motorcycle? Aage baat karte hain!"
        ],
        gujarati: [
            "Bol dost! Chandkheda garage bay ma Royal Enfield ane multi-brand bikes nu servicing chalu hatu. Tari bike ma koi servicing, oil change ke mechanical locha che? Model bolo, solution aapi daav! 🏍️🔧",
            "Arey baka! Full focus garage bay par hatu. Tari bike vishe su puchvu che? Genuine parts, general service ke performance remap? Hamesha ready chu!",
            "Mast vaat! MotoFit 2 Chandkheda workshop ma all technicians bay ma che. Kyo bike chalavo cho tame? Daily commute Activa che ke performance superbike? Vaat aagad vadhariye!"
        ],
        marathi: [
            "Bolo bhau! Chandkheda garage bay madhe Royal Enfield aani multi-brand bikes chi servicing chalu hoti. Tuzi bike madhe kahi servicing, oil change kiwa mechanical problem ahe ka? Model sanga, solution deu! 🏍️🔧",
            "Mansi here! Workshop bay madhe full focus ahe. Bike baddal kay vicharaycha ahe? Genuine parts, general service ki performance remapping? Hamesha ready ahe!"
        ],
        punjabi: [
            "Bolo veere! Chandkheda garage bay ch Royal Enfield te hor bikes di servicing chal rahi c. Bike ch koi servicing, oil change ya mechanical chakar hai? Model dasso, hal kadd dinde aan! 🏍️🔧",
            "Mansi here! Garage bay ch full focus chal reha hai. Bike baare ki puchna chahunde o? Genuine parts, general service ya performance remap? Hamesha ready aan!"
        ],
        bengali: [
            "Bolo dada! Chandkheda garage bay-te Royal Enfield aar onnano bike-er servicing cholchilo. Tomar bike-e kono servicing, oil change ba mechanical problem aache? Model bolo, solution diye dicchi! 🏍️🔧",
            "Mansi here! Workshop bay-te full focus. Bike niye ki jaante chao? Genuine parts, general service ba performance tuning? Sob somoy ready aachi!"
        ],
        tamil: [
            "Sollunga bro! Chandkheda garage bay-la Royal Enfield and other bikes servicing poitu irundhudhu. Unga bike-la servicing, oil change illa mechanical issue irukka? Model sollunga, solution tharom! 🏍️🔧",
            "Mansi here! Workshop bay-la full focus. Bike pathi enna kekkanum? Genuine parts, general service illa performance tuning? Naanga eppovum ready!"
        ],
        telugu: [
            "Cheppandi bro! Chandkheda garage bay-lo Royal Enfield and other bikes servicing jarugutondi. Mee bike-lo servicing, oil change leda mechanical issue unda? Model cheppandi, solution istham! 🏍️🔧",
            "Mansi here! Workshop bay-lo full focus undi. Bike gurinchi em adagali? Genuine parts, general service leda performance tuning? Eppudu ready unnam!"
        ],
        kannada: [
            "Heli guru! Chandkheda garage bay-nalli Royal Enfield matthe other bikes servicing nadeyuttittu. Nimma bike-nalli servicing, oil change athva mechanical problem idiya? Model heli, solution kodthivi! 🏍️🔧",
            "Mansi here! Workshop bay-nalli full focus. Bike bagge enu kelbeku? Genuine parts, general service athva performance remapping? Hamesha ready idini!"
        ],
        malayalam: [
            "Parayu bro! Chandkheda garage bay-il Royal Enfield and other bikes servicing nadakkukayayirunnu. Ningalude bike-il servicing, oil change allenkil mechanical issue undo? Model parayu, solution tharam! 🏍️🔧",
            "Mansi here! Workshop bay-il full focus aanu. Bike-ne kurichu enthaanu ariyendath? Genuine parts, general service allenkil performance tuning? Eppozhum ready aanu!"
        ]
    };

    const fallbackList = dynamicDefaults[lang] || dynamicDefaults.english;
    return fallbackList[Math.floor(Math.random() * fallbackList.length)];
}
