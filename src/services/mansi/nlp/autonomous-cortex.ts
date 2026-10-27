// src/services/mansi/nlp/autonomous-cortex.ts
/**
 * 🏍️ Mansi Autonomous Dialogue Cortex (Multi-Lingual Indic Neural Engine)
 * 
 * Provides human-level, in-character conversational synthesis for Mansi when external
 * cloud LLMs encounter network, quota, or rate-limit issues.
 * 
 * Features:
 * - Tri-Lingual Mirroring: Automatically responds in English, Hindi/Hinglish, or Gujarati/Gujlish
 *   matching the user's input language.
 * - Deep motorcycle diagnostic resolution (tappet, smoke, wobble, gear, cooling, tuning)
 * - Empathetic sibling & friendship greeting resolution ("Good. And How Are You Sis?")
 * - Zero robotic AI tropes (strict anti-AI compliance)
 * - Letta stateful profile awareness (remembers user bike & name)
 */

import { IndicNLP } from './indic-intel';

export type UserLanguage = 'english' | 'hindi' | 'gujarati';

/**
 * Accurately detects whether user is speaking English, Hindi/Hinglish, or Gujarati/Gujlish.
 */
export function detectUserLanguage(message: string): UserLanguage {
    const text = message.toLowerCase().trim();

    // 1. Script checks
    if (/[\u0A80-\u0AFF]/.test(text)) return 'gujarati'; // Gujarati Unicode
    if (/[\u0900-\u097F]/.test(text)) return 'hindi';    // Devanagari Unicode

    // 2. Gujarati Transliteration Markers (strong cues)
    const gujaratiMarkers = [
        /\b(kem cho|su chale|su khabar|majama|maja ma|kem chho|shu chale|shu khabar)\b/i,
        /\b(baka|locha|nathi|chhe|che|aavjo|tamare|tamaru|tame|tari|maru|ahiya|kahu|samjho|joiye|joi|hamesha|aapo|aapjo)\b/i,
        /\b(savare|sanje|ghasi|nakho|nakhsho|puchvu|kevi|kevo|kyo|kyare|pan|sathe|thai|jashe|apisu)\b/i
    ];
    if (gujaratiMarkers.some(re => re.test(text))) {
        return 'gujarati';
    }

    // 3. Hindi / Hinglish Transliteration Markers (strong cues)
    const hindiMarkers = [
        /\b(kaise ho|kaisa hai|kaisi ho|kya haal|kya chal raha|kuch nahi|sab badhiya)\b/i,
        /\b(kya|kyu|kyon|kaha|kidhar|kab|kaise|kitna|kitne|bhai|bhaiya|didi|yaar|dost|batao|bataiye)\b/i,
        /\b(karna|karwana|hoga|hogi|hota|hoti|chahiye|nahi|nhi|hai|hain|hoon|tha|thi|the|raha|rahi)\b/i,
        /\b(meri|mera|apna|apni|aap|tum|hum|mujhe|tumhe|isko|usko|theek|badhiya|shukriya|dhanyavad)\b/i
    ];
    if (hindiMarkers.some(re => re.test(text))) {
        return 'hindi';
    }

    // 4. Default to English for English phrases & universal queries
    return 'english';
}

interface MultiLingualResponses {
    english: (ctx?: { userName?: string; bikeModel?: string }) => string[];
    hindi: (ctx?: { userName?: string; bikeModel?: string }) => string[];
    gujarati: (ctx?: { userName?: string; bikeModel?: string }) => string[];
}

interface DialogueRule {
    category: string;
    patterns: RegExp[];
    responses: MultiLingualResponses;
}

export const MANSI_DIALOGUE_RULES: DialogueRule[] = [
    // ── 1. SIBLING & WARM CASUAL GREETINGS ("How are you sis?", "Kem cho", "What's up") ──
    {
        category: 'sibling_greeting',
        patterns: [
            /\b(how are you|how r u|how are u|how do you do|how's it going|hows it going|how are things)\b.*?\b(sis|sister|didi|ben|bro|yaar|friend)?\b/i,
            /\b(sis|sister|didi|ben)\b.*?\b(how are you|how r u|kaisa hai|kaisi ho|kem cho|su chale)\b/i,
            /\b(good|fine|mast|all good|doing good|pretty good)\b.*?\b(how are you|how about you|and you|what about you|tu bol|tame bolo)\b/i,
            /\b(how are you|how r u)\b/i,
            /\b(kem cho|su chale|kaisa hai|kaisi ho)\b/i
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
            ]
        }
    },

    // ── 2. CASUAL POSITIVE CONFIRMATIONS ("Good", "Fine", "Mast", "Super", "Badhiya") ──
    {
        category: 'positive_status',
        patterns: [
            /^\s*(good|fine|mast|super|all good|ekdum mast|badhiya|kadak|sab badhiya|thik chu|saras|great|awesome)\s*[.!]?$/i,
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
            ]
        }
    },

    // ── 3. SIBLING / FAMILY / IDENTITY BANTER ("Sis", "Sister", "Didi", "Who are you") ──
    {
        category: 'identity_sibling',
        patterns: [
            /\b(who are you|who r u|kaun ho|naam kya hai|tamaru naam|identity|what is your name)\b/i,
            /\b(sis|sister|didi|ben)\b/i
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
            ]
        }
    },

    // ── 4. GENERAL SERVICE & MAINTENANCE INQUIRIES ──
    {
        category: 'general_service',
        patterns: [
            /\b(general service|full service|servicing|service karvavi|service karwana|periodic service|checkup|maintenance)\b/i
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
            ]
        }
    },

    // ── 6. SMOKE DIAGNOSTIC (POLYAI / INDIC DECISION TREE) ──
    {
        category: 'smoke_diagnostic',
        patterns: [
            /\b(white smoke|safed dhuan|dhuan|smoke|kaalo dhuan|black smoke)\b/i
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
                "Ahmedabad ke gaddhon mein 80% handle wobble cone-set bearings kharab hone se ya front wheel rim mein minor bend hone se hota hai. 50-70 km/h par handle chhodne par shake hota hai toh Chandkheda workshop aao, align kar denge!",
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
            /\b(noise|sound|avaj|awaaz|khad khad|tik tik|tappet|rattling|tick tick)\b/i
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
                "Ahmedabad ki garmi aur dhool radiator fins ko choke kar deti hai! Distilled coolant flush aur descaling se operating temperature 8-12°C drop hota hai. Motul Inugel use karo, engine cool rahega! ❄️",
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
            /\b(price|cost|rate|kitna|ketla|charge|how much|charges|estimate|quote)\b/i
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
            ]
        }
    },

    // ── 14. LOCATION, TIMINGS & SCHEDULE ──
    {
        category: 'location_timings',
        patterns: [
            /\b(location|address|kaha|kaha par|kirtan|chandkheda|where|timing|timings|open|sunday|wednesday|kab aavu|when can i visit)\b/i
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
            ]
        }
    },

    // ── 19. GRATITUDE & CLOSING ("Thank you", "Aabhar", "Bye", "Good night") ──
    {
        category: 'gratitude_closing',
        patterns: [
            /\b(thank you|thanks|thx|aabhar|dhanyavad|shukriya|bye|tata|good night|shubh ratri|see you)\b/i
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
            ]
        }
    }
];

/**
 * Intelligent local conversational synthesis function.
 * Matches multi-topic semantic intent, applies tri-lingual language mirroring,
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

    const context = {
        userName: profile.userName,
        bikeModel: profile.bikeModel
    };

    // 2. Scan dialogue rules
    for (const rule of MANSI_DIALOGUE_RULES) {
        if (rule.patterns.some(p => p.test(trimmed))) {
            const langResponses = rule.responses[lang] || rule.responses.english;
            const candidates = langResponses(context);
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
        } else {
            return `${diagnostic.clarificationPrompt}\n\n💡 Tip: ${diagnostic.inspectionTip}\n\nChandkheda bay ma lai aavo, live inspection kari apisu! 🏍️🔧`;
        }
    }

    // 4. In-character Conversational Catch-alls (NEVER robotic "Signal weak")
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
        ]
    };

    const fallbackList = dynamicDefaults[lang] || dynamicDefaults.english;
    return fallbackList[Math.floor(Math.random() * fallbackList.length)];
}
