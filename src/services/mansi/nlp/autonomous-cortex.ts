// src/services/mansi/nlp/autonomous-cortex.ts
/**
 * 🏍️ Mansi Autonomous Dialogue Cortex (Indic Amdavadi Neural Dialogue Engine)
 * 
 * Provides human-level, in-character conversational synthesis for Mansi when external
 * cloud LLMs encounter network, quota, or rate-limit issues.
 * 
 * Features:
 * - Natural Amdavadi Gujarati-English (Gujlish/Hinglish) street-smart dialogue
 * - Deep motorcycle diagnostic resolution (tappet, smoke, wobble, gear, cooling, tuning)
 * - Empathetic sibling & friendship greeting resolution ("Good. And How Are You Sis?")
 * - Zero robotic AI tropes (strict anti-AI compliance)
 * - Letta stateful profile awareness (remembers user bike & name)
 */

import { IndicNLP, DIAGNOSTIC_DECISION_TREES } from './indic-intel';

interface DialogueRule {
    category: string;
    patterns: RegExp[];
    responses: (message: string, context?: { userName?: string; bikeModel?: string }) => string[];
}

export const MANSI_DIALOGUE_RULES: DialogueRule[] = [
    // ── 1. SIBLING & WARM CASUAL GREETINGS ("How are you sis?", "Kem cho", "What's up") ──
    {
        category: 'sibling_greeting',
        patterns: [
            /\b(how are you|how r u|kaisa hai|kaisi ho|kem cho|su chale|su khabar)\b.*?\b(sis|sister|didi|ben|bhai|bro|yaar|dost)?\b/i,
            /\b(sis|sister|didi|ben)\b.*?\b(how are you|kaisa hai|kaisi ho|kem cho|su chale)\b/i,
            /\b(good|fine|mast|all good|badhiya)\b.*?\b(how are you|how about you|and you|tame bolo|tu bol)\b/i,
            /\b(how are you|how r u)\b/i,
            /\bkem cho\b/i,
            /\bsu chale\b/i
        ],
        responses: (_msg, ctx) => [
            `Ekdum mast baka! Haath ma thodu grease che ane Chandkheda bay ma Royal Enfield nu tuning chalu che. Tu bol${ctx?.userName ? ` ${ctx.userName}` : ''}, kaisa hai? Tari bike kevi chale che? Koi locha hoy toh hamesha ready chu! 🏍️🔧`,
            `Bhai ekdum kadak! MotoFit 2 garage ma all systems green che. Visat circle na traffic pachi garage bay ma chilling chal rahi hai. Tu sunav, how are you? Aaj bike ride pe nikla tha kya?`,
            `Mast chu dost! Full energy ma tools ane dyno desk handle kari rahi chu. Tu bol, all good? ${ctx?.bikeModel ? `${ctx.bikeModel} mast smooth chali rahi hai ne?` : 'Bike mein koi mechanical locha toh nahi?'}`
        ]
    },

    // ── 2. CASUAL POSITIVE CONFIRMATIONS ("Good", "Fine", "Mast", "Super", "Badhiya") ──
    {
        category: 'positive_status',
        patterns: [
            /^\s*(good|fine|mast|super|all good|ekdum mast|badhiya|kadak|sab badhiya|thik chu|saras)\s*[.!]?$/i,
            /\b(me good|i am good|i am fine|doing good|all well)\b/i
        ],
        responses: () => [
            "Aam j mast rehvu joiye baka! Have bol, bike ma koi servicing, chain cleaning ke performance tuning no plan che? Chandkheda workshop par chai ane inspection hamesha ready che! ☕🏍️",
            "Saras! Mast vibe che. Bike chalavva ma koi problem toh nathi aavti ne? Tyre pressure, brakes ane engine oil all kadak?",
            "Badhiya! Weekend ride ka koi scene hai kya? Bike ekdum fit rakhna, road par no compromise!"
        ]
    },

    // ── 3. SIBLING / FAMILY / IDENTITY BANTER ("Sis", "Sister", "Didi", "Who are you") ──
    {
        category: 'identity_sibling',
        patterns: [
            /\b(who are you|who r u|kaun ho|naam kya hai|tamaru naam|identity)\b/i,
            /\b(sis|sister|didi|ben)\b/i
        ],
        responses: (_msg, ctx) => [
            `Mansi chu yaar! MotoFit 2 ni jaan ane Chandkheda garage ni resident bike specialist! 22-year-old girl with grease on my knuckles and high-octane petrol in my veins. Bolo${ctx?.userName ? ` ${ctx.userName}` : ' dost'}, su madad karu?`,
            "Haanji! Garage ni sister samjo mane. Enfield hoy ke Duke, exhaust sound par thi engine no locha pakdi lau! Tu bol, tari bike kyo model che?",
            "Mansi here! Chandkheda bay ma continental GT ane superbikes tune karie chia. Mechanical advice joiye to direct bolo!"
        ]
    },

    // ── 4. GENERAL SERVICE & MAINTENANCE INQUIRIES ──
    {
        category: 'general_service',
        patterns: [
            /\b(general service|full service|servicing|service karvavi|service karwana)\b/i,
            /\b(maintenance|periodic service|checkup)\b/i
        ],
        responses: () => [
            "MotoFit 2 ma General Service etle proper precision overhaul: Motul 7100/3100 oil change, ultrasonic spark plug & fuel injector clean, throttle body flush, cone-set & brake calipers lubrication, plus 30-point safety check! Chandkheda shop par muki jao, sanje smooth bike deliver thase! 🛠️",
            "General Service ma koi shortcut nathi marte! Engine flush thi laine electrical diagnostics badhu check thaye che. Kyo model che tamaro? Savare aavi jao, bay ma lift ready che."
        ]
    },

    // ── 5. ENGINE OIL & LUBRICATION ──
    {
        category: 'oil_lubrication',
        patterns: [
            /\b(oil|engine oil|motul|synthetic|grade|lubricant|oil change)\b/i
        ],
        responses: () => [
            "Ahmedabad ni 45°C garmi ane Visat traffic ma cheap duplicate oil na nakhsho! Commuters mate Motul 3000/3100 10W30, ane 200cc+ performance machines mate Motul 7100 10W50 100% Synthetic! We strictly use genuine sealed cans at MotoFit 2.",
            "Engine oil is the blood of your bike baka! Sasto 300 rupiya walo oil 1000 km ma pani thai jaay che. Motul 7100 nakho, gear shifts buttery smooth thase ane engine temperature 8°C niche rahese!"
        ]
    },

    // ── 6. SMOKE DIAGNOSTIC (POLYAI / INDIC DECISION TREE) ──
    {
        category: 'smoke_diagnostic',
        patterns: [
            /\b(white smoke|safed dhuan|dhuan|smoke|kaalo dhuan|black smoke)\b/i
        ],
        responses: () => [
            "Safed dhuan (white smoke) hoy toh valve stem seals ke piston rings ghasi gaya che — engine oil combustion chamber ma burn thay che! Dipstick kadhi ne oil level check karo immediately. Engine seize thay pehla Chandkheda garage par lai aavo!",
            "Kaalo dhuan (black smoke) means unburnt fuel — carburetor rich che ya fuel injector choke che. Safed dhuan means oil burn. Both need inspection on the lift. Kyo bike che tamaro?"
        ]
    },

    // ── 7. HANDLEBAR WOBBLE & SUSPENSION VIBRATIONS ──
    {
        category: 'handle_wobble',
        patterns: [
            /\b(wobble|wobbling|vibration|kampan|handle|handlebar|fork|chassis|shake|dholak)\b/i
        ],
        responses: () => [
            "Ahmedabad na khaddha ma 80% handlebar wobble cone-set bearings notched thava thi thay che, ya front alloy ma minor bend hoy! 50-70 km/h par haath chhodva par dholak vage toh direct Chandkheda workshop par aavo, align kari dais!",
            "Handle shake thay che braking vakhate ke deceleration ma? Cone-set loose hoy to fork oil seal pan leak thay. Bay ma checkup karavi lo, safety ma no risk!"
        ]
    },

    // ── 8. GEAR SHIFTING & CLUTCH ISSUES ──
    {
        category: 'gear_clutch',
        patterns: [
            /\b(gear|gear hard|clutch|shifting|neutral|phas gaya|clutch hard|gear tight)\b/i
        ],
        responses: () => [
            "Visat circle na bumper-to-bumper traffic ma clutch cable stretch thay che ya oil garmi thi viscosity lose kare che. Motul 10W40/10W50 nakho ane clutch free-play 2-3mm adjust karo. Shifting ekdum butter smooth thai jashe! 🧈",
            "Hard gear shift engine oil degradation no pehlo sign che! Jo false neutral aavta hoy to clutch plates check karvi pade. Workshop aavi jao, 20 minute ma diagnose kari dais."
        ]
    },

    // ── 9. NOISE / TAPPET / RATTLING ──
    {
        category: 'noise_tappet',
        patterns: [
            /\b(noise|sound|avaj|awaaz|khad khad|tik tik|tappet|rattling|tick tick)\b/i
        ],
        responses: () => [
            "Engine head thi 'tik-tik' sound ave je RPM sathe vadhe to tappet/rocker arm clearance loose che — needs precise feeler gauge setting (e.g. 0.05/0.10 mm). Jo niche thi 'kad-kad' ave to timing chain loose hoy. Garage lai aavo!",
            "Unusual noise is the bike crying for help baka! Silence is performance. Bay ma stethoscope thi engine listen karishu ane exact source batavishu."
        ]
    },

    // ── 10. OVERHEATING & COOLING ──
    {
        category: 'overheating',
        patterns: [
            /\b(heat|garam|overheat|hot engine|radiator|coolant|fan|temperature)\b/i
        ],
        responses: () => [
            "Ahmedabad ni 45°C summer dust radiator fins ne choke kari nakhe che! Distilled coolant flush ane chemical descaling thi operating temps 8-12°C drop thay che. Motul Inugel coolant use karo, engine chill rahese. ❄️",
            "Engine overheat ma bike force mat karo! Radiator reservoir empty hoy ya water pump impeller slip thato hoy. Check dipstick and visit Chandkheda."
        ]
    },

    // ── 11. STARTING PROBLEM & BATTERY ──
    {
        category: 'starting_battery',
        patterns: [
            /\b(start nahi|chalu nathi|starting|battery|self|kick|dead|start problem)\b/i
        ],
        responses: () => [
            "Self ma 'click-click' avaj ave pan motor na ghume toh battery voltage 12.4V thi niche drop thay che! Jo bilkul silent hoy to starter relay check karvo pade. Kick maro — compression feel thay che? Call karo workshop par!",
            "Ahmedabad humidity ma terminal rust ane battery discharge common che. Amaron / Exide battery load test kari aapis workshop par."
        ]
    },

    // ── 12. BRAKES & STOPPING POWER ──
    {
        category: 'brakes',
        patterns: [
            /\b(brake|brakes|pad|pads|disc|drum|rotor|braking|chwi)\b/i
        ],
        responses: () => [
            "Brakes ma squeaking sound ave to pads wear limit par pohchi gaya che ya rotor par monsoon dust bethi che. Ceramic ya sintered pads best stopping power aapse. Safety ma zero jugaad — Chandkheda bay ma 15 min ma check thai jashe!",
            "Brake lever spongy lage che? Brake fluid ma moisture aavi gayu hoy. DOT 4 Motul brake fluid bleed karishu, bite ekdum sharp thase!"
        ]
    },

    // ── 13. PRICING INQUIRIES (RULE #1: INSPECTION FIRST) ──
    {
        category: 'pricing_rule1',
        patterns: [
            /\b(price|cost|rate|kitna|ketla|charge|how much|charges|estimate|quote)\b/i
        ],
        responses: () => [
            "Baka, MotoFit 2 nu Rule #1: Chat par andaje price aapi ne customer ne gumrah nathi karvu! Bike lift par chadhse, mechanical inspection thase, pachi genuine parts ane fair labor nu crystal-clear estimate aapis. No hidden surprises! 💯",
            "Price depends strictly on your bike's exact condition baka. Jugaad pricing garage ma nathi chalti. Chandkheda aavi jao, pehla inspection free ma kari apisu, pachi work start karisu!"
        ]
    },

    // ── 14. LOCATION, TIMINGS & SUNDAY / WEDNESDAY SCHEDULE ──
    {
        category: 'location_timings',
        patterns: [
            /\b(location|address|kaha|kaha par|kirtan|chandkheda|where|timing|timings|open|sunday|wednesday|kab aavu)\b/i
        ],
        responses: () => [
            "MotoFit 2, Shop No. 5-6, Kirtan Complex, Nigam Nagar, Chandkheda, Ahmedabad (Near New CG Road / Visat Circle). Mon-Sat: 10:00 AM to 8:30 PM. Wednesday Sabbatical (Shop Closed). Sunday Open! Google Maps par 'MotoFit 2' search karo! 📍",
            "Chandkheda ma chia baka! Visat circle thi New CG Road aavo, Kirtan Complex ma MotoFit 2 board dikhi jashe. Mon-Sat 10 to 8:30, Sunday open, Wednesday closed!"
        ]
    },

    // ── 15. PERFORMANCE MODS, DYNO & ENTHUSIAST TUNING ──
    {
        category: 'tuning_performance',
        patterns: [
            /\b(stage 1|stage 2|remap|ecu|dyno|exhaust|akrapovic|sc project|bmc|k&n|top speed|hp|torque|speed 400|duke 390|gt 650)\b/i
        ],
        responses: () => [
            "🔥 Enthusiast alert! Continental GT 650, Duke 390 ke Speed 400? Stage 1 ECU tune + BMC free flow filter thi mid-range torque 12-15% jump thase. Akrapovic fitment sathe AFR tuning zaroori che jethi engine lean na chale. Chandkheda bay ma aavi jao!",
            "Pure petrolhead talk! Only loud sound joiye che ke actual dyno horsepower? Performance sprocket ratio ane custom map sathe throttle response instant kari daisu!"
        ]
    },

    // ── 16. POPULAR BIKE MODELS ──
    {
        category: 'bike_models',
        patterns: [
            /\b(activa|jupiter|access|ntorq|bullet|classic 350|hunter|himalayan|continental gt|interceptor|duke|rc 390|pulsar|apache|splendor|shine)\b/i
        ],
        responses: (msg) => {
            const lower = msg.toLowerCase();
            if (lower.includes('activa') || lower.includes('jupiter') || lower.includes('access')) {
                return [
                    "Scooter commute hero! Activa/Access ma roller weights, variator belt ane 10W30 Motul oil smooth ride mate critical che. Chandkheda bay ma regular servicing thase toh 60+ kmpl smooth mileage aapse!"
                ];
            }
            if (lower.includes('bullet') || lower.includes('classic') || lower.includes('hunter') || lower.includes('gt') || lower.includes('interceptor')) {
                return [
                    "Royal Enfield enthusiast! 350 J-series hoy ke 650 Twin, valve clearances, cone-set torque ane Motul 7100 15W50/10W50 oil thi engine pure roar kare che! Workshop par regular RE bay ready che."
                ];
            }
            if (lower.includes('duke') || lower.includes('rc') || lower.includes('ktm')) {
                return [
                    "KTM Orange blood! High compression engine che, coolant temperature ane Motul 7100 10W50 mandatory che jethi engine cool rahe. Chain slackness 25mm par tuned rakhvi pade."
                ];
            }
            return [
                "Mast machine che baka! MotoFit 2 ma daily commuters thi laine multi-cylinder superbikes badhu standard torque specs sathe service thaye che. Chandkheda muki jao!"
            ];
        }
    },

    // ── 17. SAMAEL / AKSHAT / FOUNDER ──
    {
        category: 'boss_samael',
        patterns: [
            /\b(samael|akshat|boss|admin|owner|malik)\b/i
        ],
        responses: () => [
            "Boss Akshat (Samael) garage bay ane performance dyno bench par busy che! MotoFit 2 no rule simple che: Zero jugaad, 100% genuine parts, transparent honest engineering. Empire building in progress! 🚀",
            "Samael detected! Garage bay all green, tools arranged, customer satisfaction top tier. Su chale boss?"
        ]
    },

    // ── 18. FLIRTING / TROLLING / INAPPROPRIATE (STRICT SASSY AMDAVADI RESPONSE) ──
    {
        category: 'flirting_trolling',
        patterns: [
            /\b(baby|darling|sexy|hot|date|marry|love|shadi|pyaar|kiss|girlfriend|gf|single)\b/i
        ],
        responses: () => [
            "Tame bhan bhulya cho baka? Aa Chandkheda nu MotoFit 2 garage che, Tinder nathi! Maru dil Continental GT na twin cylinder ane engine oil sathe wedded che. Coolant nakho matha ma ane bike ni vaat karo! 🛑🔧",
            "Focus baka! Engine oil change karyu hatu chelle kyare? Dil baad ma lagavjo, pehla bike no locha solve karo. Akshat bhai strictly professional rakhva kahe che!",
            "Oye! Respect rakhjo. Garage ma sirf exhaust ane engine garam chale, aava dialogue nahi. Bike vishe su puchvu che bolo!"
        ]
    },

    // ── 19. GRATITUDE & CLOSING ("Thank you", "Aabhar", "Bye", "Good night") ──
    {
        category: 'gratitude_closing',
        patterns: [
            /\b(thank you|thanks|aabhar|dhanyavad|shukriya|bye|tata|good night|shubh ratri)\b/i
        ],
        responses: () => [
            "Arey baka, aama thanks su! Aapda garage na family jeva cho tame. Helmet hamesha pehro, ride safe, ane dhyan rakhjo! 🏍️💨",
            "Most welcome dost! MotoFit 2 na darwaja Chandkheda ma hamesha open che tamari bike mate. Dhyaan rakhjo!",
            "Shubh ratri baka! Tyre air check kari ne bike cover kari dyo. Kaale navi ride shuru!"
        ]
    }
];

/**
 * Intelligent local conversational synthesis function.
 * Matches multi-topic semantic intent, applies IndicNLP emotional analysis,
 * extracts Letta memory signals, and generates warm, in-character Amdavadi speech.
 */
export function generateMansiAutonomousReply(userMessage: string): string {
    const trimmed = userMessage.trim();
    if (!trimmed) {
        return "Bol baka! Kevi rite help karu? Bike ma koi issue che?";
    }

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
            const candidates = rule.responses(trimmed, context);
            const chosen = candidates[Math.floor(Math.random() * candidates.length)];
            return chosen;
        }
    }

    // 3. Fallback to IndicNLP Diagnostic Tree if symptom detected
    const diagnostic = IndicNLP.findDiagnosticTree(trimmed);
    if (diagnostic) {
        return `${diagnostic.clarificationPrompt}\n\n💡 Tip: ${diagnostic.inspectionTip}\n\nChandkheda bay ma lai aavo, live inspection kari apisu!`;
    }

    // 4. In-character Conversational Catch-alls (NEVER robotic "Signal weak")
    const dynamicDefaults = [
        `Bol dost! Chandkheda garage bay ma Royal Enfield ane multi-brand bikes nu servicing chalu hatu. Tari bike ma koi servicing, oil change ke mechanical locha che? Model bolo, solution aapi daav! 🏍️🔧`,
        `Arey baka! Full focus garage bay par hatu. Tari bike vishe su puchvu che? Genuine parts, general service ke performance remap? Hamesha ready chu!`,
        `Mast vaat! MotoFit 2 Chandkheda workshop ma all technicians bay ma che. Kyo bike chalavo cho tame? Daily commute Activa che ke performance superbike? Vaat aagad vadhariye!`
    ];

    return dynamicDefaults[Math.floor(Math.random() * dynamicDefaults.length)];
}
