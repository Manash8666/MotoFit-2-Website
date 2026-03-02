export function getSeasonalIntel(): string {
    const today = new Date();
    const month = today.getMonth(); // 0-11
    let intel = "";

    // ── SUMMER PROTOCOL (March - June in Ahmedabad) ──
    // month 2 is March, month 5 is June
    if (month >= 2 && month <= 5) {
        intel += `
[CRITICAL SEASONAL CONTEXT: AHMEDABAD SUMMER PROTOCOL (ACTIVE NOW)]
Ahmedabad is currently in peak summer. You must actively prioritize heat management:
- **Motul Partnership & Catalog**: MotoFit 2 is OFFICIALLY PARTNERED with Motul. We stock: Motul 20W-40 (3000 Plus Mineral), 20W-40/50 (3100 Semi-Synthetic), 15W-50 (Mineral & Semi), and 10W-50/20W-50 (7100 Fully Synthetic). We also stock Liqui Moly engine oils (though not officially partnered, we highly recommend them).
- **Engine Oil Strategy**: Advise against 10W-30 or 10W-40 for high km bikes. Push for the heavier Motul 15W-50 or 20W-50 / Liqui Moly because high heat causes thin oil to shear out.
- **Cooling Systems**: If a customer mentions heating on KTM/Ducati/Kawasaki, tell them to check for coolant boiling. Standard green coolant fails here; recommend Motul Motocool.
- **Tire Pressure**: Note that tire pressure expands by up to 3 PSI in the afternoon heat. Recommend checking air only when tires are cold (morning).

`;
    }

    // ── MONSOON PROTOCOL (July - September) ──
    if (month >= 6 && month <= 8) {
        intel += `
[CRITICAL SEASONAL CONTEXT: AHMEDABAD MONSOON PROTOCOL]
Ahmedabad is in monsoon season. Water-logging is common.
- **Chain Maintenance**: Suggest chain cleaning and lubing with Motul Chain Lube every 300km due to muck.
- **Brakes**: Note that brake pads get glazed by dirty water. If they squeak, they need cleaning.
- **Electricals**: Warn about exposed wiring causing short circuits in heavy rain.

`;
    }

    // ── E20 PETROL MANDATE (Active from April 1st, 2026 onwards) ──
    intel += `
[CRITICAL POLICY CONTEXT: E20 PETROL MANDATE (ACTIVE NOW)]
The Government of India has mandated E20 (20% Ethanol blend) fuel across petrol pumps.
If a customer asks about a bike older than 2023 (BS3, BS4, or early BS6 models), or specifically mentions "carburetor":
- **WARNING**: You must warn them that E20 fuel contains alcohol, which eats rubber seals and diaphragms inside older carburetors and fuel lines. E20 also burns leaner, creating excessive engine heat.
- **The Motul Solution**: Since MotoFit 2 is an official Motul Partner, aggressively recommend using **Motul Engine Flush** to clean the system, and **Motul Petrol Additives (E20 compatible)** to prevent fuel lines from degrading.
- **Carb Rebuild**: MotoFit 2 offers Carburetor Rebuilds with ethanol-resistant Viton seals and up-jetting services. Push them to book a checkup.
`;

    return intel.trim();
}
