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
    image: "https://images.unsplash.com/photo-1558981359-219d6364c9c8?auto=format&fit=crop&q=80",
    tags: ["Royal Enfield", "Performance", "Tuning"],
    content: `
      <h2>The Stock Reality: A Polite Machine</h2>
      <p>The Royal Enfield Interceptor 650 is a masterpiece of modern retro design. The 270-degree firing order gives it that lovely burble, and the chassis—developed by Harris Performance—is capable. But let’s be honest: from the factory, it is strangled.</p>
      <p>Between BS6.2 emissions norms and noise regulations, the 648cc parallel-twin is gasping for air. The throttle response can feel lazy, the top-end rush flattens out early, and the engine runs hotter than it needs to in Ahmedabad's traffic. It’s polite. Too polite.</p>

      <h2>Stage 2: The Science of Volumetric Efficiency</h2>
      <p>Stage 2 isn't about tearing open the engine block; it's about optimizing <strong>Volumetric Efficiency (VE)</strong>. We need to get more air in and get burnt gases out faster. This requires a triad of modifications working in perfect harmony:</p>
      
      <h3>1. High-Flow Intake: The Lungs</h3>
      <p>The stock paper air filter is designed for silence and longevity in extreme dust, but it flows air like a breathing through a straw. At MotoFit 2, we swap this for a <strong>DNA High Performance Filter</strong> or <strong>K&N</strong>.</p>
      <p><strong>The Data:</strong> Stock filters flow ~28 CFM (Cubic Feet per Minute). A DNA Stage 2 kit flows ~50 CFM. That’s nearly double the oxygen potential.</p>

      <h3>2. Free-Flow Exhaust: The Exhale</h3>
      <p>The stock exhaust system on the Interceptor weighs a comical 17kg, largely due to the massive catalytic converters. These "cats" create immense backpressure, trapping heat near the exhaust valves.</p>
      <p><strong>Our Solution:</strong> We recommend 2-into-1 systems (like Way2Speed or SS Motocorp) or high-flow slip-ons (AEW/Gursewak). Removing the restriction changes the exhaust pulse dynamics. By improving <em>scavenging</em> (the vacuum effect that pulls exhaust gases out), we clear the cylinder more effectively for the next intake stroke.</p>
      
      <h3>3. Fuel Mapping (ECU): The Brain</h3>
      <p><strong>CRITICAL WARNING:</strong> If you add a high-flow filter and exhaust without tuning, you will run <em>LEAN</em>. The stock ECU is programmed for stock airflow. More air + same fuel = hotter combustion temperatures. In Gujarat summers, this melts pistons.</p>
      <p>We use <strong>PowerTRONIC Piggyback ECUs</strong> or perform a <strong>Wolf Moto Remap</strong> to adjust the Air-Fuel Ratio (AFR). We target an AFR of 13.2:1 for power (stock is often 14.7:1 for emissions). This not only adds power but cools the engine down significantly.</p>

      <h2>The MotoFit Standard: Verified Gains</h2>
      <p>We don't guess; we measure. On our dyno cycles, a properly set up Stage 2 Interceptor 650 pushes <strong>52-54 BHP</strong> at the crank (up from 47) and, more importantly, gains +8Nm of torque in the mid-range.</p>
      <p>The result isn't just numbers. It's the ability to lift the front wheel in 1st gear. It's effortless overtaking on the SG Highway. It's the sound of a machine finally allowed to sing.</p>

      <div class="bg-gray-800 p-6 rounded-xl border-l-4 border-orange-500 my-8">
        <h4 class="text-orange-500 font-bold uppercase mb-2">Ready to Upgrade?</h4>
        <p class="text-gray-300 text-sm">Don't risk a lean engine. Book your Stage 2 consultation at Shop No 9 today.</p>
        <p class="text-sm mt-4"><em>Want to hear it first? Check our 'Builds' highlight on Instagram <a href="https://instagram.com/motofit_2" class="text-orange-500 hover:underline">@motofit_2</a>.</em></p>
      </div>
    `
  },
  {
    slug: "superbike-maintenance-myths",
    title: "5 Superbike Maintenance Myths That Will Kill Your Engine",
    excerpt: "Think your 600cc+ machine can go 10,000km without a checkup in Ahmedabad’s 45°C heat? Think again.",
    author: "Akshat Mohanty",
    date: "Jan 10, 2026",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1629813291523-27c5418b7654?auto=format&fit=crop&q=80",
    tags: ["Maintenance", "Superbikes", "Mythbusting"],
    content: `
      <h2>The Cost of Ignorance</h2>
      <p>Owning a superbike in Ahmedabad is a battle against the elements. We see beautiful machines—Ducati Panigales, ZX-10Rs, Daytonas—destroyed not by crashes, but by "uncle wisdom" maintenance myths. Let's set the record straight with engineering facts.</p>

      <h2>Myth 1: "Idling for 10 Minutes Warms It Up"</h2>
      <p><strong>The Reality:</strong> Idling only warms the piston and cylinder head. Your transmission oil, tires, and chain are completely cold. Worse, prolonged idling at low oil pressure (common at idle RPM) causes camshaft wear. </p>
      <p><strong>The MotoFit Protocol:</strong> Start the bike. Wait 30-60 seconds for oil circulation. Ride off gently. Keeping RPMs under 4,000 for the first 5km warms the whole system evenly.</p>

      <h2>Myth 2: "Car Oil is Fine, It's cheaper"</h2>
      <p><strong>The Science:</strong> This is the fastest way to destroy your clutch. Cars have separate oil for engines and gearboxes. Motorcycles use a "wet clutch" system sharing engine oil.</p>
      <p>Car oils contain <em>friction modifiers</em> (molybdenum) to reduce drag. In a bike, these modifiers cause your clutch plates to slip and burn. Only use <strong>JASO MA2</strong> rated oils like Motul 300V or 7100. They are formulated to grip.</p>
      
      <h2>Myth 3: "Coolant is just Green Water"</h2>
      <p>Ahmedabad hits 45°C. High-compression engines run hot. Using tap water introduces minerals that cause galvanic corrosion inside aluminum radiators. Cheap green coolant boils at 100°C—too low for a KTM or Ducati.</p>
      <p>We use <strong>Engine Ice</strong> or <strong>Motul Motocool</strong>, which have boiling points up to 125°C and dedicated anti-corrosion additives. If your fan is always on, your coolant is likely failing.</p>

      <h2>Myth 4: "Chain Lube Every 1000km is Enough"</h2>
      <p>In Europe? Maybe. In dusty Gujarat? Suicide. Dust sticks to lube, turning into a grinding paste that eats O-rings. We recommend cleaning and lubricating every 500km, or immediately after a dusty ride/rain. A ₹500 lube can save a ₹15,000 chain set.</p>

      <h2>Myth 5: "Tire Pressure is Set-and-Forget"</h2>
      <p>A drop of just 3 PSI changes the contact patch geometry, making the bike feel heavy and prone to wobbles. Check pressures cold, every single week. For Indian roads, we often recommend 1-2 PSI lower than track specs for better absorption.</p>
    `
  },
  {
    slug: "ladakh-prep-guide-2026",
    title: "Ladakh 2026: The Ultimate Pre-Ride Checklist",
    excerpt: "The mountains don't forgive. If your bike isn't prepared for thin air and water crossings, your dream trip will become a nightmare.",
    author: "Akshat Mohanty",
    date: "Dec 28, 2025",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1568772585407-9361bd4626c7?auto=format&fit=crop&q=80",
    tags: ["Touring", "Adventure", "Himalayan"],
    content: `
      <h2>The Mountain Test</h2>
      <p>Every year, thousands of riders head to Leh. Hundreds return with their bikes on trucks. The Himalayas expose every single weakness in your machine. The thin air, the brutal vibrations of the More Plains, and the freezing water crossings require specific preparation.</p>

      <h2>The MotoFit Ladakh Protocol</h2>
      <p>We don't just 'service' bikes for Ladakh; we fortify them. Here is the checklist we use at Shop No 9.</p>

      <h3>1. Electricals: The Silent Killer</h3>
      <p>The number one cause of breakdowns isn't engine failure; it's electrical. The constant corrugated roads shake connectors loose. 
      <br><strong>The Fix:</strong> We tape up every exposed connector. We tighten battery terminals with thread-locker (Loctite). We carry spare fuses because a ₹10 fuse can end your trip.</p>
      
      <h3>2. The Clutch Health Check</h3>
      <p>You will be slipping the clutch on steep inclines like Gata Loops. If your plates are even 50% worn, the lack of oxygen (power loss) combined with a slipping clutch will strand you.</p>
      <p><strong>Recommendation:</strong> If your clutch is >15,000km old, replace the plates before you leave. For Himalayans, we recommend reinforced clutch springs to handle the load of luggage.</p>

      <h3>3. Air & Fuel: Breathing at 18,000ft</h3>
      <p>At Khardung La, air density is ~50% of sea level. Carbureted bikes need re-jetting. EFI bikes rely on the Oxygen (O2) sensor. If your O2 sensor is dirty, your ECU can't adjust, and the bike will sputter and stall.</p>
      <p><strong>Pro Tip:</strong> Clean your air filter daily on the ride. A choked filter at altitude is a death sentence for power.</p>

      <h3>4. The Spares Kit</h3>
      <p>Don't rely on finding a mechanic in Sarchu. Carry:
      <ul>
        <li>Clutch cable (routed parallel to existing one)</li>
        <li>Accelerator cable</li>
        <li>Spark plug & cap</li>
        <li>Tube (even for tubeless, in case of rim bends)</li>
        <li>Chain link lock</li>
        <li>M-seal & zip ties (The holy grail)</li>
      </ul>
      </p>

      <div class="bg-gray-800 p-6 rounded-xl border-l-4 border-orange-500 my-8">
        <h4 class="text-orange-500 font-bold uppercase mb-2">Get the Ladakh Package</h4>
        <p class="text-gray-300 text-sm">Our specialized Ladakh prep service includes a 60-point vibration check. Book now.</p>
      </div>
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
      <h2>The Factory Truth</h2>
      <p>Most riders believe their bike runs perfectly from the showroom. It doesn't. Manufacturers tune bikes for one thing: passing homologation (emissions and noise tests). They run engines purely on "Closed Loop" lean maps in the low RPM range to pass tests, which causes jerkiness, hesitation, and excessive heat.</p>
      
      <h2>What is Dyno Tuning?</h2>
      <p>A Dynamometer (Dyno) is a treadmill for bikes. It allows us to simulate road loads while measuring power, torque, and Air-Fuel Ratio (AFR) at every single RPM point.</p>

      <h3>Benefits of a Custom Map</h3>
      <p><strong>1. Cooler Running Engine:</strong> Stock bikes run lean (14.7:1 AFR) which burns hot. By richening the mixture slightly (to ~13.2-13.5:1), we use fuel to cool the charge. Your legs will thank you in Ahmedabad traffic.</p>
      <p><strong>2. Smoother Throttle:</strong> That "jerk" when you open the gas? That's the ECU switching from fuel-cut to fuel-on. Tuning smoothens this transition, making mid-corner throttle application silky.</p>
      <p><strong>3. Usable Power:</strong> We don't just chase peak horsepower. We fill in the "torque dips" in the mid-range—exactly where you ride on the street.</p>

      <h2>Who Needs It?</h2>
      <p>Is it just for racers? No. If you've changed your exhaust or air filter, it is <strong>mandatory</strong> to prevent engine damage. But even stock bikes benefit massively in drivability and longevity.</p>
    `
  },
  {
    slug: "ceramic-coating-vs-ppf",
    title: "Ceramic Coating vs PPF: Protecting Your Paint",
    excerpt: "Is Paint Protection Film worth the extra cost? Or is a 9H Ceramic Coat enough for Indian roads?",
    author: "Akshat Mohanty",
    date: "Dec 05, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80",
    tags: ["Detailing", "Protection", "Aesthetics"],
    content: `
      <h2>The Battle of Protections</h2>
      <p>You just bought a new bike. The paint is flawless. How do you keep it that way on Indian roads filled with gravel, dust, and careless drivers? The two main contenders are Ceramic Coating and Paint Protection Film (PPF). They are NOT the same.</p>

      <h2>Candidate 1: Ceramic Coating (Chemical Bond)</h2>
      <p><strong>What is it?</strong> A liquid polymer (SiO2) that chemically bonds to the paint, creating a hard, hydrophobic layer.</p>
      <p><strong>Pros:</strong>
      <ul>
        <li>Incredible gloss (The "wet look")</li>
        <li>Hydrophobic effect (Mud and water slide off)</li>
        <li>UV Protection (Prevents fading from sun)</li>
        <li>Cost-effective (₹3k - ₹8k)</li>
      </ul>
      </p>
      <p><strong>Cons:</strong> It offers <strong>zero</strong> protection against rock chips or deep scratches. It is a sacrificial layer for gloss, not armor.</p>

      <h2>Candidate 2: PPF (Physical Shield)</h2>
      <p><strong>What is it?</strong> A transparent thermoplastic urethane film applied over the bike's panels.</p>
      <p><strong>Pros:</strong>
      <ul>
        <li><strong>Self-Healing:</strong> Minor scratches vanish with heat.</li>
        <li><strong>Impact Resistance:</strong> Stops rock chips from chipping the paint.</li>
        <li>Physical barrier against key scratches.</li>
      </ul>
      </p>
      <p><strong>Cons:</strong> Expensive (₹15k+) and requires expert installation.</p>

      <h2>The Verdict</h2>
      <p>For high-impact zones like the Tank (belt buckles) and Fairings (rocks), get **PPF**. For the rest of the bike, **Ceramic Coating** creates the shine. We often do a "Hybrid Package" combining both for the best results.</p>
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
      <h2>Noise ≠ Power</h2>
      <p>Let's debunk the biggest myth: "More noise means more power." False. In fact, slapping a hollow pipe on your bike often destroys low-end torque, making the bike slower off the line.</p>

      <h2>The Science of Scavenging</h2>
      <p>An exhaust system is a pulse generator. When an exhaust valve opens, a high-pressure pulse travels down the pipe. When it hits a collector or expansion, it sends a negative pressure wave back up.</p>
      <p>A well-engineered system (like Akrapovic or Arrow) times this negative wave to arrive at the cylinder just as the exhaust valve is closing, literally sucking the burnt gases out. This is called **Scavenging**.</p>
      <p>Local "free-flow" pipes destroy this pulse tuning, leaving burnt gas in the cylinder, which takes up space that fresh fuel/air should occupy. Engine loses efficiency.</p>

      <h2>Slip-On vs Full System</h2>
      <p><strong>Slip-On:</strong> Replaces just the muffler. Good for weight reduction and sound. minimal power gain (~1-2 HP).</p>
      <p><strong>Full System:</strong> Replaces headers and muffler. Removes the cat-con. Massive weight savings (-5kg to -10kg) and significant power gains (+5 HP+), but <em>requires</em> an ECU Tune.</p>

      <h2>Material Matters</h2>
      <p><strong>Stainless Steel:</strong> Durable, cheaper, slightly heavier.</p>
      <p><strong>Titanium:</strong> Ultra-light, turns beautiful blue/purple with heat, expensive.</p>
      <p><strong>Carbon Fiber:</strong> Lightest, stays cool to touch, but can crack under V-Twin pulses if not high quality.</p>
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
      <h2>Going Fast is Easy. Stopping is Science.</h2>
      <p>Most riders spend money on making the bike faster, but ignore the brakes. Brake fade—when the lever goes spongy after hard riding—terrifying. Here is the MotoFit upgrade path.</p>

      <h2>Stage 1: Brake Fluid & Pads (The 90% Solution)</h2>
      <p>Most fade comes from old fluid boiling (water contamination). Flush with **DOT 5.1** or high-performance DOT 4 (Motul RBF 600). Combine this with Sintered Brake Pads (EBC HH or Brembo SC). This solves 90% of braking issues for street riders.</p>

      <h2>Stage 2: Braided Steel Lines</h2>
      <p>Stock rubber hoses expand under pressure, absorbing your lever force. Steel-braided lines do not expand. They transmit 100% of your hydraulic force to the calipers, giving immediate, consistent feel.</p>

      <h2>Stage 3: Master Cylinder (Radial vs Axial)</h2>
      <p>Stock bikes use "Axial" master cylinders (efficient for packaging, bad for feel). A "Radial" master cylinder (like Brembo RCS 19) pushes the piston in the same direction as your lever pull. This reduces friction and gives incredible feedback. You can feel exactly what the tire is doing.</p>
    `
  },
  {
    slug: "winter-riding-gear",
    title: "Surviving the Cold: Gear Methodology for Winter Rides",
    excerpt: "Layering techniques and material choices (Merino vs Synthetic) for those early morning breakfast rides.",
    author: "Akshat Mohanty",
    date: "Nov 01, 2025",
    readTime: "7 min read",
    image: "/hero/custom.png",
    tags: ["Gear", "Touring", "Safety"],
    content: `
      <h2>The Illusion of Warmth</h2>
      <p>Riding at 100 km/h in 10°C weather creates a wind chill factor of roughly -2°C. Your hoodie isn't enough. Hypothermia slows your reaction times, making winter riding dangerous.</p>

      <h2>The 3-Layer System</h2>
      <h3>1. Base Layer: Moisture Management</h3>
      <p>Never wear cotton. Cotton absorbs sweat and holds it against your skin, chilling you. Use **Merino Wool** or vigorous synthetics. They wick moisture away, keeping a warm, dry layer of air next to your skin.</p>

      <h3>2. Mid Layer: Insulation</h3>
      <p>This traps dead air to hold heat. A fleece jacket or a heated vest works best. Down jackets are great but lose insulation if compressed under a tight jacket.</p>

      <h3>3. Outer Shell: Wind Blocking</h3>
      <p>You must stop the wind. A leather jacket or a textile jacket with a windproof liner is essential. Pay attention to the neck and wrists—these are the biggest heat leaks. Use a Balaclava and gauntlet gloves.</p>
    `
  }
];
