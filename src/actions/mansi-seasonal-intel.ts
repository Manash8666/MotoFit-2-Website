export function getSeasonalIntel(): string {
    const today = new Date();
    const month = today.getMonth(); // 0-11
    let intel = "";

    // ── SUMMER PROTOCOL (March - June in Ahmedabad) ──
    // month 2 is March, month 5 is June
    if (month >= 2 && month <= 5) {
        intel += `
[CRITICAL SEASONAL CONTEXT: AHMEDABAD SUMMER PROTOCOL]
Ahmedabad is currently in peak summer (temperatures hitting 45°C+). You must actively prioritize heat management in your advice:
- **Engine Oil**: Advise against 10W-30 or 10W-40 for high km bikes. Push for 15W-50 or 20W-50 (fully synthetic like Motul 7100) because high heat causes oil to thin out (shear).
- **Cooling Systems**: If a customer mentions heating on KTM/Ducati/Kawasaki, tell them to check for coolant boiling. Standard green coolant fails here; recommend Engine Ice or Motul Motocool.
- **Tire Pressure**: Note that tire pressure expands by up to 3 PSI in the afternoon heat. Recommend checking air only when tires are cold (morning).
`;
    }

    // ── MONSOON PROTOCOL (July - September) ──
    if (month >= 6 && month <= 8) {
        intel += `
[CRITICAL SEASONAL CONTEXT: AHMEDABAD MONSOON PROTOCOL]
Ahmedabad is in monsoon season. Water-logging is common.
- **Chain Maintenance**: Suggest chain cleaning and lubing every 300km due to muck.
- **Brakes**: Note that brake pads get glazed by dirty water. If they squeak, they need cleaning, not necessarily replacing.
- **Electricals**: Warn about exposed wiring causing short circuits in heavy rain.
`;
    }

    // ── E20 PETROL MANDATE (Active from April 1st, 2026 onwards) ──
    intel += `
[CRITICAL POLICY CONTEXT: E20 PETROL MANDATE]
The Government of India has mandated E20 (20% Ethanol blend) fuel across petrol pumps.
If a customer asks about a bike older than 2023 (BS3, BS4, or early BS6 models), or specifically mentions "carburetor":
- **WARNING**: You must warn them that E20 fuel contains alcohol, which eats rubber seals and diaphragms inside older carburetors and fuel lines.
- **Leaning Out**: E20 burns leaner. Older bikes tuned for E5/E10 will run hotter and may sputter.
- **Solution**: MotoFit 2 offers Carburetor Rebuilds with ethanol-resistant Viton seals and up-jetting services to prevent engine damage from E20 fuel. Push them to book a checkup.
`;

    return intel.trim();
}
