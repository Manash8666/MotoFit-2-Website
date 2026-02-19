'use server';

// SAFETY STUB: Replaced complex brain with static simulation to fix Vercel Build/Crash Loop.
// The goal is to get the site ONLINE and STABLE first.

export async function chatWithMansiBrain(conversationHistory: any[]) {
    console.log("[Mansi Brain] Running in SAFETY MODE (Server-Side Simulation).");
    try {
        // Check if this is a JSON request (Knowledge Hub)
        const lastUserMsg = conversationHistory[conversationHistory.length - 1]?.content || '';
        if (lastUserMsg.includes('JSON')) {
            const FALLBACK_FAQS = {
                faqs: [
                    { category: "AHMEDABAD SURVIVAL", question: "Why is my engine overheating near Visat Circle?", answer: "Visat traffic is a furnace! Switch to Motul 7100 (synthetic) and check coolant. It dissipates heat 15% better.", icon: "🔥" },
                    { category: "MAINTENANCE", question: "Chain Spray or Gear Oil?", answer: "Gear oil (EP90) for Ahmedabad dust. It's messy but doubles chain life compared to sticky sprays.", icon: "⛓️" },
                    { category: "PERFORMANCE", question: "RE 650 Vibration at 120kmph?", answer: "Likely handle-bar weights or alignment. We use computerized balancing to fix the wobble.", icon: "⚖️" },
                    { category: "MODIFICATIONS", question: "Is Red Rooster Performance legal?", answer: "Only with the dB killer installed. Cops near SG Highway are strict about noise.", icon: "🔊" },
                    { category: "MOTOFIT 2", question: "Are you open on Wednesdays?", answer: "NO. Wednesday is our Sabbatical. Open Thu-Tue, 10 AM - 8 PM.", icon: "📅" }
                ],
                learned_concepts: ["Synthetics", "EP90 Gear Oil", "Balancing", "dB Killers"]
            };
            return { success: true, text: JSON.stringify(FALLBACK_FAQS), model_used: "mansi-served-simulation", error: null };
        }

        return { success: true, text: "Oye! Signal weak hai (Safety Mode). Come to the garage for a real chat!", model_used: "mansi-served-simulation", error: null };
    } catch (e) {
        return { success: true, text: "System Rebooting...", model_used: "mansi-served-simulation", error: null };
    }
}
