// v2.1 Deterministic Knowledge Database

export interface FAQItem {
    id: string; // unique string for virality tracking
    category: string;
    question: string;
    answer: string;
    icon?: string;
}

export const MANSI_KNOWLEDGE_VAULT: FAQItem[] = [
    // --- AHMEDABAD SURVIVAL ---
    { id: "intel-1", category: "AHMEDABAD SURVIVAL", question: "Why is my engine overheating near Visat Circle?", answer: "Visat traffic is a furnace! Stop-and-go creates heat soak. Switch to Motul 7100 (synthetic) and check your coolant levels. It dissipates heat 15% better than stock mineral oil.", icon: "🔥" },
    { id: "intel-2", category: "AHMEDABAD SURVIVAL", question: "Dust on New CG Road vs Air Filter?", answer: "The construction dust here chokes paper filters in 2000km. If you ride daily in Chandkheda, switch to a BMC or K&N performance filter. It's washable and breathes better.", icon: "🌬️" },
    { id: "intel-3", category: "AHMEDABAD SURVIVAL", question: "Monsoon Potholes vs R15 Rims?", answer: "The 'Smart City' craters will bend soft alloy rims. Keep tyre pressure at 32PSI (not 35) for better shock absorption, or upgrade to 140-section radials for sidewall flex.", icon: "🕳️" },
    { id: "intel-4", category: "AHMEDABAD SURVIVAL", question: "SG Highway High-Speed Wobble?", answer: "Going 120kmph over the Sola flyover and feeling a tank slapper? Your cone-set is loose or your front tire isn't balanced. Get laser balancing done.", icon: "⚠️" },
    { id: "intel-5", category: "AHMEDABAD SURVIVAL", question: "Corrosion in Sabarmati Riverfront?", answer: "High humidity next to the river causes micro-rust on exposed chromes. Use a silicone spray on engine fins and chain links if you park nearby.", icon: "💧" },

    // --- PERFORMANCE & TUNING ---
    { id: "intel-6", category: "PERFORMANCE", question: "RE 650 Vibration at 120kmph?", answer: "It's likely handle-bar weights or wheel balancing. Bring it to MotoFit 2. We use computerized balancing to neutralize the wobble. Don't ignore it.", icon: "⚖️" },
    { id: "intel-7", category: "PERFORMANCE", question: "Duke 390 Jerking at Low RPM?", answer: "Lean AFR mixture from the factory (BS6 norms). We can install a FuelX Pro to enrich the mix at low revs. Smoothens the ride instantly.", icon: "💨" },
    { id: "intel-8", category: "PERFORMANCE", question: "Braking Upgrade for Himalayan 411?", answer: "Stock brakes are wooden. Upgrade to EBC Sintered Pads (Double-H). The bite improves by 40%. Mandatory for highway runs.", icon: "🛑" },
    { id: "intel-9", category: "PERFORMANCE", question: "My ECU remap killed my mileage?", answer: "Yes, baka! ECU remaps dump more fuel to give you more power at the top end. If you want mileage, stick to stock mapping. Power isn't free.", icon: "⛽" },
    { id: "intel-10", category: "PERFORMANCE", question: "Best spark plug for MT-15?", answer: "NGK Iridium. Period. It gives a cleaner burn and slightly crisper throttle response than the stock nickel plugs.", icon: "⚡" },

    // --- MAINTENANCE TRUTHS ---
    { id: "intel-11", category: "MAINTENANCE", question: "Chain Spray or Gear Oil?", answer: "For Ahmedabad dust? Gear oil (EP90). It doesn't attract grit like sticky sprays. It's messy but your chain will last 25,000km instead of 15,000km.", icon: "⛓️" },
    { id: "intel-12", category: "MAINTENANCE", question: "When to change Fork Oil?", answer: "Every 15,000km! Nobody does this. Old oil turns to sludge, destroying damping. If your front end dives too much, it's time.", icon: "🔧" },
    { id: "intel-13", category: "MAINTENANCE", question: "Why is 10W50 better than 20W50?", answer: "10W50 flows faster when the engine is cold (morning starts), providing instant lubrication, but stays just as thick (50) at 100°C engine temps.", icon: "🌡️" },
    { id: "intel-14", category: "MAINTENANCE", question: "DOT 3 vs DOT 4 Brake Fluid?", answer: "DOT 4 has a higher boiling point. If you ride hard or do track days, upgrade to DOT 4 so your brakes don't fade when they get hot. Flush every 2 years.", icon: "🧪" },
    { id: "intel-15", category: "MAINTENANCE", question: "Why do my gears feel hard?", answer: "Clutch free-play is wrong or your engine oil has lost its viscosity. A quick oil change to a fully synthetic grade usually solves 90% of hard-shifting.", icon: "⚙️" },

    // --- MODIFICATIONS (SAFE) ---
    { id: "intel-16", category: "MODIFICATIONS", question: "Is Red Rooster Performance legal?", answer: "It's barely legal on decibels, but heavily penalized by cops if caught. Keep the dB killer IN inside city limits. We stock them.", icon: "🔊" },
    { id: "intel-17", category: "MODIFICATIONS", question: "Ceramic Coating worth it?", answer: "Only if you have a covered parking. In direct sun, it fades in 6 months. For daily rough use, PPF (Paint Protection Film) on the tank is smarter.", icon: "✨" },
    { id: "intel-18", category: "MODIFICATIONS", question: "Which Fog Lights for Leh?", answer: "HJG 60W or Maddog Alphas. Do NOT connect them directly to your battery without a relay circuit switch, otherwise you'll fry your stator coil.", icon: "💡" },
    { id: "intel-19", category: "MODIFICATIONS", question: "Upsizing rear tyre for looks?", answer: "Slapping a 150-section tyre on an R15 drops acceleration and messes up cornering angles. Don't upsize by more than 10mm over stock.", icon: "🛞" },
    { id: "intel-20", category: "MODIFICATIONS", question: "Putting a Quickshifter on a Duke?", answer: "BS6 Duke 390 comes with it. For older bikes, aftermarket quickshifters are available but require precise ECU tuning to avoid destroying your gearbox.", icon: "🏎️" },

    // --- MOTOFIT 2 RULES ---
    { id: "intel-21", category: "MOTOFIT 2", question: "Do you repair Superbikes?", answer: "Yes. From Hayabusa to Z900. We have the paddock stands, dyno diagnostics tool (scanner), and the patience. Visual inspection is mandatory.", icon: "🏍️" },
    { id: "intel-22", category: "MOTOFIT 2", question: "Are you open on Wednesdays?", answer: "NO. Wednesday is Sabbatical. Akshat and the team need to reboot. We are open Thu-Tue, 10 AM to 8 PM.", icon: "📅" },
    { id: "intel-23", category: "MOTOFIT 2", question: "Can I get a quote on WhatsApp?", answer: "No 'Jugaad' pricing. Without opening the bike, a quote is a lie. Come to Shop No 9, Nigam Nagar for a real check-up.", icon: "💬" },
    { id: "intel-24", category: "MOTOFIT 2", question: "Do you build Cafe Racers?", answer: "Yes! We specialize in custom ground-up builds. Rx100 restorations, Royal Enfield Bobbers, you name it. Booking an appointment is mandatory for customs.", icon: "🔨" },
    { id: "intel-25", category: "MOTOFIT 2", question: "What is your Service Guarantee?", answer: "If you face an issue related to our mechanical service within 7 days, we fix the labor for free. Parts are subject to manufacturer warranty.", icon: "🛡️" }
];
