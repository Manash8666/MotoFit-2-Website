export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    readTime: string;
    image: string;
    tags: string[];
    content: string; // Markdown or HTML string
}

export const blogs: BlogPost[] = [
    {
        slug: "interceptor-650-stage-2-mods",
        title: "Unleashing the Beast: Interceptor 650 Stage 2 Mods Guide",
        excerpt: "Why stock is just the beginning. A deep dive into air filters, full-system exhausts, and ECU mapping for the RE 650 Twins.",
        author: "Akshat Mohanty",
        date: "Jan 15, 2026",
        readTime: "8 min read",
        image: "/hero/custom.png",
        tags: ["Royal Enfield", "Performance", "Tuning"],
        content: `
      <h2>The Stock Reality</h2>
      <p>The Royal Enfield Interceptor 650 is a masterpiece of modern retro design, but from the factory, it's strangled by BS6 emissions norms. The throttle response can feel lazy, and the top-end rush... well, it's polite. Too polite.</p>
      
      <h2>Stage 2: The Holy Trinity</h2>
      <p>Stage 2 isn't about tearing open the engine; it's about letting it breathe. You need three things working in harmony:</p>
      <ul>
        <li><strong>High-Flow Intake:</strong> We recommend DNA or K&N filters. The stock paper filter is like breathing through a straw.</li>
        <li><strong>Free-Flow Exhaust:</strong> Remove the catalytic restriction. A 2-into-1 system saves 12kg (!) and adds noticeable torque.</li>
        <li><strong>Fuel Mapping (ECU):</strong> This is non-negotiable. If you add air without adding fuel, you run lean. A Piggyback ECU (like PowerTRONIC) or a Remap is essential.</li>
      </ul>

      <h2>The Result?</h2>
      <p>We've verified gains of +5-7 HP on our dyno. But the numbers don't tell the story—the throttle becoming telepathic does.</p>
    `
    },
    {
        slug: "superbike-maintenance-myths",
        title: "5 Superbike Maintenance Myths That Will Kill Your Engine",
        excerpt: "Stop warming up your bike for 10 minutes. Stop using cheap coolant. Let's talk facts.",
        author: "Akshat Mohanty",
        date: "Jan 10, 2026",
        readTime: "6 min read",
        image: "/hero/engine.png",
        tags: ["Maintenance", "Superbikes", "Mythbusting"],
        content: `
      <h2>Myth 1: 'Idling Warms Up the Engine'</h2>
      <p>Idling only warms the engine block, not the transmission or tires. Plus, at low RPM oil pressure is lower. Start it, wait 30 seconds for oil circulation, and ride gently to warm everything up together.</p>

      <h2>Myth 2: 'Car Oil is Fine'</h2>
      <p>Motorcycles share oil between the engine, clutch, and gearbox. Car oils often have friction modifiers that cause clutch slip. Stick to JASO MA2 rated oils like Motul 300V or 7100.</p>
    `
    },
    {
        slug: "ladakh-prep-guide-2026",
        title: "Ladakh 2026: The Ultimate Pre-Ride Checklist",
        excerpt: "Don't let a fused relay strand you at Sarchu. A mechanic's guide to preparing your machine for the Himalayas.",
        author: "Akshat Mohanty",
        date: "Dec 28, 2025",
        readTime: "12 min read",
        image: "https://images.unsplash.com/photo-1629813291523-27c5418b7654?auto=format&fit=crop&q=80",
        tags: ["Touring", "Adventure", "Himalayan"],
        content: `
      <h2>Electricals: The Silent Killer</h2>
      <p>Vibrations kill wiring. Tape up every exposed connector. Carry spare fuses and a multimeter. We see more bikes fail due to loose battery terminals than engine issues.</p>
    `
    },
    {
        slug: "dyno-tuning-explained",
        title: "Why Your Bike Needs Dyno Tuning (Even if it's Stock)",
        excerpt: "It's not just for racing. Smoother throttle, cooler running temps, and better mileage. Here is the science.",
        author: "Akshat Mohanty",
        date: "Dec 15, 2025",
        readTime: "7 min read",
        image: "/hero/dyno.png",
        tags: ["Dyno", "Tuning", "Tech"],
        content: `
      <h2>Factory Tunes are a Compromise</h2>
      <p>Manufacturers tune for emissions, noise regulations, and terrible fuel quality. They don't tune for <em>your</em> riding pleasure. A dyno tune optimizes the Air-Fuel Ratio (AFR) for every RPM point.</p>
    `
    },
    {
        slug: "ceramic-coating-vs-ppf",
        title: "Ceramic Coating vs PPF: Protecting Your Paint",
        excerpt: "Is Paint Protection Film worth the extra cost? Or is a 9H Ceramic Coat enough for Indian roads?",
        author: "Akshat Mohanty",
        date: "Dec 05, 2025",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80",
        tags: ["Detailing", "Protection", "Aesthetics"],
        content: `
      <h2>The Scratch Test</h2>
      <p>Ceramic makes your bike shiny and hydrophobic (easy to clean). It does NOT stop rock chips. PPF (Paint Protection Film) is a self-healing physical layer that actually absorbs impacts. For tank pads and fairings? PPF. For the rest? Ceramic.</p>
    `
    },
    {
        slug: "choosing-perfect-exhaust",
        title: "Loud vs Fast: Choosing the Perfect Exhaust System",
        excerpt: "Slip-on vs Full System. Stainless vs Titanium. How to choose headers that add power, not just noise.",
        author: "Akshat Mohanty",
        date: "Nov 20, 2025",
        readTime: "9 min read",
        image: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&q=80",
        tags: ["Performance", "Customization", "Exhaust"],
        content: `
      <h2>Backpressure is a Myth (Mostly)</h2>
      <p>You don't need 'backpressure', you need 'scavenging'. A properly designed header uses exhaust pulses to pull burnt gases out of the cylinder. Cheap pipes destroy this effect, actually lowering power.</p>
    `
    },
    {
        slug: "brake-upgrade-guide",
        title: "Stopping Power: When to Upgrade Calipers vs Master Cylinders",
        excerpt: "Fade is scary. Here is how to upgrade your braking system progressively without breaking the bank.",
        author: "Akshat Mohanty",
        date: "Nov 12, 2025",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1589632987167-e1f0a69e2f6e?auto=format&fit=crop&q=80",
        tags: ["Safety", "Brakes", "Performance"],
        content: `
      <h2>Pads First, Lines Second</h2>
      <p>Don't buy a Brembo M4 caliper if you're running rubber hoses. Braided steel lines give you instant feel. Sintered pads handle heat better. Upgrade these before spending big on radial master cylinders.</p>
    `
    },
    {
        slug: "winter-riding-gear",
        title: "Surviving the Cold: Gear Methodology for Winter Rides",
        excerpt: "Layering techniques and material choices (Merino vs Synthetic) for those early morning breakfast rides.",
        author: "Akshat Mohanty",
        date: "Nov 01, 2025",
        readTime: "5 min read",
        image: "/hero/custom.png",
        tags: ["Gear", "Touring", "Safety"],
        content: `
      <h2>The Base Layer is Key</h2>
      <p>If your base layer holds sweat, you will freeze. Merino wool wicks moisture away while retaining heat even when wet. It's expensive but worth every rupee for winter touring.</p>
    `
    }
];
