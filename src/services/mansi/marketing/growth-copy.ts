// src/services/mansi/marketing/growth-copy.ts
/**
 * 📈 Founder Marketing & Growth CRO Engine for Mansi
 * Inspired by:
 * - EdoStra/Marketing-for-Founders (Growth frameworks, CRO, founder-led social proof)
 * - coreyhaines31/marketingskills (Copywriting formulas, conversion triggers, offer design)
 */

export interface CROHook {
    triggerKeywords: string[];
    framework: 'PAS' | 'AIDA' | 'TRUST_PROOF' | 'URGENCY_SLOT';
    headline: string;
    agitation: string;
    solutionOffer: string;
    callToAction: string;
}

export const CRO_PLAYBOOKS: Record<string, CROHook> = {
    "engine_oil": {
        triggerKeywords: ['oil', 'motul', 'service', 'oil change', 'engine sound'],
        framework: 'PAS',
        headline: "Counterfeit Oil Destroys Engines Before You Notice.",
        agitation: "Ahmedabad's roadside counters often sell diluted recycled 20W40. In 45°C summer heat, cheap oil shears into water within 800 km, scoring cylinder walls and costing ₹15,000+ in rebuilds.",
        solutionOffer: "At MotoFit 2, every barrel of Motul 300V / 7100 is direct OEM batch-certified with digital barcode verification.",
        callToAction: "Book a slot for surgical fluid flush + 21-point checkup with coupon MOTOFIT-RIDER-5 (5% Off)."
    },
    "suspension_wobble": {
        triggerKeywords: ['wobble', 'vibration', 'fork', 'cone set', 'handle'],
        framework: 'PAS',
        headline: "High-Speed Wobble is an Unseen Safety Hazard on SG Highway.",
        agitation: "Taking a curve at 70 km/h with a notched steering cone-set causes front-end tank slappers. Traditional mechanics just tighten the nut with a hammer, making turning stiff and hazardous.",
        solutionOffer: "We disassemble the steering stem, clean races, install genuine taper roller bearings, and torque to factory Nm spec.",
        callToAction: "WhatsApp photos or drop by Shop No 9 in Chandkheda for free laser alignment check."
    },
    "superbike_tuning": {
        triggerKeywords: ['ecu', 'remap', 'dyno', 'stage 1', 'stage 2', 'hp', 'power'],
        framework: 'AIDA',
        headline: "Unleash True Throttle Response Without Voiding Reliability.",
        agitation: "Generic downloaded ECU maps run dangerous lean AFRs that melt spark plugs under Indian heat conditions.",
        solutionOffer: "Every MotoFit 2 tune is logged on our in-house Dynojet 250i chassis dyno with real-time lambda air-fuel verification.",
        callToAction: "Lock in your Dyno Slot today — see your baseline vs tuned power curve live on the monitor."
    },
    "accident_repair": {
        triggerKeywords: ['accident', 'crash', 'insurance', 'damage', 'dent', 'bend'],
        framework: 'TRUST_PROOF',
        headline: "Crash Recovery with Zero Shortcut Repairs.",
        agitation: "Insurance aggregators often push for patched fairings and bent forks pushed straight on hydraulic presses, compromising high-speed stability.",
        solutionOffer: "We provide complete laser frame alignment, OEM parts billing with part numbers, and 100% factory finish restoration. Plus, lapsed insurance renewal assistance.",
        callToAction: "Send accident photos to Akshat on WhatsApp (+91 72596 25881) for immediate damage assessment."
    }
};

export class MansiGrowthEngine {
    /**
     * Match user intent to the most effective conversion hook (Marketing-for-Founders).
     */
    static getApplicableCROHook(userMessage: string): CROHook | null {
        const text = userMessage.toLowerCase();
        for (const [key, playbook] of Object.entries(CRO_PLAYBOOKS)) {
            if (playbook.triggerKeywords.some(kw => text.includes(kw))) {
                return playbook;
            }
        }
        return null;
    }

    /**
     * Build Growth CRO guidance to guide Mansi's conversational answer toward booking.
     */
    static buildCROContext(userMessage: string): string {
        const hook = this.getApplicableCROHook(userMessage);
        if (!hook) {
            return `
=== 📈 GROWTH & CONVERSION CRO GUIDELINES ===
- Goal: Build authority first, then naturally guide rider to WhatsApp booking (+91 72596 25881).
- Active Coupon: Remind them of "MOTOFIT-RIDER-5" (5% Off Service) if they show high interest.
- Social Proof: Mention our 4.7⭐ rating across 162+ local riders and 1-Year Engine Warranty.
=== END CRO GUIDELINES ===
`.trim();
        }

        return `
=== 📈 GROWTH & CONVERSION CRO TRIGGERED (${hook.framework}) ===
- Focus Topic: ${hook.headline}
- Agitation / Problem to highlight: ${hook.agitation}
- MotoFit 2 Engineering Value: ${hook.solutionOffer}
- Recommended Action to Nudge: ${hook.callToAction}
- Rule: Deliver this value organically in Mansi's voice without sounding like a pushy salesman.
=== END CRO TRIGGER ===
`.trim();
    }
}
