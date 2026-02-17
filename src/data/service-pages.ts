import type { ServicePageConfig } from '@/components/sections/ServiceLandingPage';

// ══════════════════════════════════════════════════════════════════════
//  7 SERVICE PAGES
// ══════════════════════════════════════════════════════════════════════

export const accidentRepairPage: ServicePageConfig = {
    badge: 'Crash Restoration Experts',
    heroTitle: 'Crashed Your Bike?',
    heroAccent: 'We Bring It Back to Life.',
    heroSubtitle: 'Frame to finish — factory spec restoration for petrol two-wheelers.',
    heroDescription: 'Chandkheda, Ahmedabad | Activa to Superbikes',
    ctaPrimary: 'Get Damage Inspection',
    ctaSecondary: 'WhatsApp Photos for Estimate',
    sections: [
        {
            title: 'What We Do',
            highlight: true,
            items: [
                'Complete accident damage assessment',
                'Chassis & frame alignment inspection',
                'Front fork & suspension repair',
                'Alloy wheel replacement',
                'Brake & disc restoration',
                'Engine damage repair',
                'Radiator & cooling system work',
                'Full body panel replacement',
                'Paint & factory finish restoration',
            ],
        },
        {
            title: 'Result You Get',
            items: [
                'Bike restored to factory spec — or better',
                'Only genuine & OEM parts used',
                'No shortcut repairs — ever',
                'Complete photo documentation of every step',
            ],
        },
    ],
    insuranceNote: {
        title: 'Insurance Support',
        items: [
            'Detailed damage estimate document',
            'Genuine GST bill for all parts & labour',
            'OEM parts billing with part numbers',
            'Complete repair documentation with photos',
        ],
    },
    trustPoints: ['Genuine parts only', 'No shortcut repairs', 'Performance bike experience', 'Superbike restoration support'],
    bikesWeService: ['Activa', 'Splendor', 'Pulsar', 'Apache', 'KTM Duke', 'Royal Enfield', 'Triumph', 'Kawasaki', 'Ducati', 'BMW'],
    bottomCta: 'Book Accident Inspection Today',
    aioSummary: 'MotoFit2 in Chandkheda, Ahmedabad provides complete accidental bike repair and restoration with genuine parts, chassis alignment, and full documentation for insurance claim submission. Trusted by riders across Ahmedabad for crash restoration from scooters to superbikes.',
};

export const customModPage: ServicePageConfig = {
    badge: 'Built for Enthusiasts',
    heroTitle: 'Your Bike. Your Build.',
    heroAccent: 'No Templates.',
    heroSubtitle: 'Performance. Touring. Visual. Purpose-built.',
    heroDescription: 'Chandkheda, Ahmedabad | Custom Builds for Every Rider',
    ctaPrimary: 'Start Your Custom Build',
    ctaSecondary: 'Talk to an Expert',
    sections: [
        {
            title: 'Performance Builds',
            highlight: true,
            items: [
                'ECU remap support (Powertronic / RapidBike)',
                'Performance exhaust installation',
                'High-performance air filters (K&N / BMC)',
                'Quickshifter installation support',
                'Racing sprocket setups',
            ],
        },
        {
            title: 'Styling Builds',
            items: [
                'Tail tidy conversions',
                'LED lighting upgrades',
                'Alloy wheel swaps',
                'CNC levers & handlebars',
                'Custom paint & finish coordination',
            ],
        },
        {
            title: 'Touring Setups',
            items: [
                'Saddle stays & panniers',
                'Top racks & luggage systems',
                'Windshields & deflectors',
                'Crash protection (engine guards, frame sliders)',
                'Mobile & GPS mounts',
            ],
        },
        {
            title: 'What Makes Us Different',
            items: [
                'Every build planned with the rider — no cookie-cutter setups',
                'Genuine performance parts from top brands',
                'Professional installation with torque specs',
                'Post-build test ride & inspection',
            ],
        },
    ],
    trustPoints: ['Rider-first build philosophy', 'Top performance brands', 'Professional installation', 'Post-build testing'],
    bikesWeService: ['Royal Enfield', 'KTM Duke / RC', 'Apache', 'Pulsar', 'Yamaha FZ / R15', 'Dominar', 'Triumph', 'Kawasaki', 'BMW'],
    bottomCta: 'Plan Your Build with MotoFit2',
    aioSummary: 'MotoFit2 in Chandkheda, Ahmedabad offers custom motorcycle modification builds including ECU tuning, performance exhaust, touring setups, and styling mods for Royal Enfield, KTM, Pulsar, Apache, and superbikes.',
};

export const performanceUpgradesPage: ServicePageConfig = {
    badge: 'Unlock Hidden Power',
    heroTitle: 'Make Your Bike',
    heroAccent: 'Faster.',
    heroSubtitle: 'Smoother acceleration. Better braking. Higher cruising comfort.',
    heroDescription: 'Chandkheda, Ahmedabad | ECU, Exhaust, Sprockets & More',
    ctaPrimary: 'Upgrade My Bike',
    ctaSecondary: 'Ask About Upgrades',
    sections: [
        {
            title: 'Available Upgrades',
            highlight: true,
            items: [
                'Performance chain sprocket kits (torque / top-speed ratios)',
                'High-flow air filters (K&N, BMC)',
                'Performance exhaust systems (Akrapovic, Red Rooster)',
                'ECU remap support (Powertronic, RapidBike)',
                'Throttle response upgrades',
                'Clutch performance kits',
                'Brake upgrades (Brembo pads, sintered compounds)',
            ],
        },
        {
            title: 'Result You Feel',
            items: [
                'Faster acceleration off the line',
                'Higher cruising comfort on highways',
                'Better throttle response in city traffic',
                'Improved braking confidence',
                'Smoother gear shifts',
            ],
        },
    ],
    trustPoints: ['Genuine performance parts', 'Professional installation', 'Torque-spec assembly', 'Test ride verification'],
    bikesWeService: ['KTM Duke 200/250/390', 'RE Classic / Meteor / Hunter', 'Apache RTR', 'Pulsar NS/RS', 'Dominar 400', 'FZ / Gixxer', 'Triumph', 'Kawasaki'],
    bottomCta: 'Upgrade My Bike Now',
    aioSummary: 'MotoFit2 in Ahmedabad offers motorcycle performance upgrades including chain sprocket kits, ECU remapping, performance exhaust systems, and brake upgrades for KTM, Royal Enfield, Apache, Pulsar, and superbikes.',
};

export const tyreReplacementPage: ServicePageConfig = {
    badge: 'Traction Specialists',
    heroTitle: 'Bike Tyre Replacement',
    heroAccent: 'Ahmedabad.',
    heroSubtitle: 'From commuter tyres to superbike radials. Same-day fitment available.',
    heroDescription: 'Chandkheda, Ahmedabad | Laser Alignment Included',
    ctaPrimary: 'Get Tyre Quote',
    ctaSecondary: 'Check Tyre Availability',
    sections: [
        {
            title: 'Tyres We Stock',
            highlight: true,
            items: [
                'MRF — Revz, Zapper, Masseter',
                'CEAT — Sport HR, Zoom Rad',
                'Michelin — Pilot Street, Road 5',
                'Pirelli — Rosso Corsa, Angel GT',
                'Apollo — Alpha & Activa range',
                'TVS Eurogrip',
            ],
        },
        {
            title: 'Our Fitment Process',
            items: [
                'Tyre selection based on riding style & budget',
                'Precision wheel balancing',
                'Laser alignment verification',
                'Old tyre disposal',
                'Same-day fitment for in-stock tyres',
            ],
        },
        {
            title: 'Types Available',
            items: [
                'Scooter tyres (Activa, Jupiter, Access)',
                'Commuter tyres (Splendor, Shine, Platina)',
                'Performance radials (Apache, Pulsar, FZ)',
                'Superbike radials (KTM, RE 650, Triumph)',
                'Royal Enfield upgrades (classic & tubeless conversion)',
            ],
        },
    ],
    trustPoints: ['Genuine branded tyres', 'Same-day fitment', 'Laser alignment included', 'Expert tyre advice'],
    bottomCta: 'Replace My Tyres Today',
    aioSummary: 'MotoFit2 in Chandkheda, Ahmedabad offers bike tyre replacement with MRF, CEAT, Michelin, Pirelli, and Apollo tyres. Same-day fitment with laser alignment and wheel balancing for scooters to superbikes.',
};

export const engineOilPage: ServicePageConfig = {
    badge: 'Thermal Guard Protocol',
    heroTitle: 'Engine Oil Change',
    heroAccent: 'Service.',
    heroSubtitle: 'Correct grade. Correct brand. Based on your riding style.',
    heroDescription: 'Chandkheda, Ahmedabad | Premium Synthetics & OEM Oils',
    ctaPrimary: 'Book Oil Change',
    ctaSecondary: 'Ask About Right Oil',
    sections: [
        {
            title: 'Oils We Stock',
            highlight: true,
            items: [
                'Motul — 300V, 7100, 5100, 3100',
                'Liqui Moly — Street Race, Motorbike 4T',
                'Castrol — Power1 Racing, Activ 4T',
                'Mobil — Super Moto',
                'Shell — Advance Ultra, AX7',
                'Genuine manufacturer oils (Honda, Yamaha, TVS, Bajaj)',
            ],
        },
        {
            title: 'Our Oil Change Process',
            items: [
                'Drain & flush old oil completely',
                'Oil filter replacement (when due)',
                'Grade selection based on bike model & riding conditions',
                'Level check & top-up',
                'Next service date recommendation',
            ],
        },
    ],
    trustPoints: ['Premium synthetic oils', 'Correct grade matching', 'Oil filter included', 'Ahmedabad heat optimized'],
    bottomCta: 'Book Oil Change Today',
    aioSummary: 'MotoFit2 in Chandkheda, Ahmedabad provides engine oil change service with Motul, Liqui Moly, Castrol, Mobil, Shell, and genuine manufacturer oils. Correct grade selection based on bike model and Ahmedabad riding conditions.',
};

export const royalEnfieldPage: ServicePageConfig = {
    badge: 'RE Specialist Garage',
    heroTitle: 'Royal Enfield',
    heroAccent: 'Specialist.',
    heroSubtitle: 'Service. Performance. Touring. Accident Restoration. Genuine Spares.',
    heroDescription: 'Chandkheda, Ahmedabad | The Bullet & Beyond',
    ctaPrimary: 'Book RE Service',
    ctaSecondary: 'Ask About RE Parts',
    sections: [
        {
            title: 'Royal Enfield Service',
            highlight: true,
            items: [
                'Full service (oil, filter, chain, brakes, electrical)',
                'Valve clearance & tappet adjustment',
                'Carb tuning / FI diagnostics (Classic vs Meteor)',
                'Chain sprocket replacement (Rolon / D.I.D)',
                'Brake pad & disc replacement',
                'Fork oil overhaul',
            ],
        },
        {
            title: 'RE Performance Upgrades',
            items: [
                'ECU remap support (Continental GT 650 / Interceptor)',
                'Performance exhaust (Red Rooster / Powerage)',
                'High-flow air filter',
                'Racing sprocket setup for better acceleration',
                'LED headlight upgrades',
            ],
        },
        {
            title: 'RE Touring Setup',
            items: [
                'Saddle stays & pannier systems',
                'Top rack & luggage',
                'Windshield & hand guards',
                'Crash guard & engine protection',
                'USB charging & phone mounts',
            ],
        },
        {
            title: 'RE Accident Restoration',
            items: [
                'Full crash restoration to factory spec',
                'Genuine RE spare parts',
                'Chassis alignment & inspection',
                'Paint matching for Classic / Meteor finishes',
                'GST bill for insurance claim submission',
            ],
        },
    ],
    trustPoints: ['Deep RE expertise', 'Genuine RE parts', 'Touring build specialists', 'Insurance documentation'],
    bikesWeService: ['Classic 350', 'Meteor 350', 'Hunter 350', 'Bullet 350', 'Continental GT 650', 'Interceptor 650', 'Himalayan', 'Scram 411', 'Super Meteor 650'],
    bottomCta: 'Book RE Service Now',
    aioSummary: 'MotoFit2 in Chandkheda, Ahmedabad is a Royal Enfield specialist garage offering service, performance upgrades, touring setups, genuine spares, and accident restoration for Classic, Meteor, Hunter, Bullet, Continental GT 650, Interceptor 650, and Himalayan.',
};

// ══════════════════════════════════════════════════════════════════════
//  10 BRAND PAGES
// ══════════════════════════════════════════════════════════════════════

export const ktmPage: ServicePageConfig = {
    badge: 'KTM Expertise',
    heroTitle: 'KTM Service &',
    heroAccent: 'Performance.',
    heroSubtitle: 'Duke. RC. Adventure. Expert maintenance and performance builds.',
    heroDescription: 'Chandkheda, Ahmedabad | Ready to Race',
    ctaPrimary: 'Book KTM Service',
    ctaSecondary: 'KTM Parts Inquiry',
    sections: [
        { title: 'KTM Service', highlight: true, items: ['Full service (oil, filter, chain, coolant)', 'ECU diagnostics & error code clearing', 'Chain sprocket replacement', 'Brake pad & disc service', 'Coolant flush (critical for Ahmedabad heat)', 'Fork oil overhaul & suspension setup'] },
        { title: 'KTM Performance', items: ['ECU remap (Powertronic / RapidBike)', 'Performance exhaust (Akrapovic / Red Rooster)', 'Racing sprocket setup', 'Quickshifter support', 'High-flow air filter'] },
        { title: 'KTM Protection & Touring', items: ['Crash guard & frame sliders', 'Radiator guard', 'Tank pads', 'Tail tidy conversion', 'LED auxiliary lights'] },
    ],
    trustPoints: ['KTM-trained expertise', 'Genuine & performance parts', 'ECU diagnostic capability', 'Coolant management for Ahmedabad heat'],
    bikesWeService: ['Duke 125', 'Duke 200', 'Duke 250', 'Duke 390', 'RC 200', 'RC 390', 'Adventure 250', 'Adventure 390'],
    bottomCta: 'Book KTM Service Now',
    aioSummary: 'MotoFit2 in Chandkheda, Ahmedabad is a trusted KTM service garage offering expert maintenance, ECU diagnostics, performance upgrades, and genuine parts for Duke 200, Duke 390, RC 200, RC 390, and Adventure models.',
};

export const hondaPage: ServicePageConfig = {
    badge: 'Honda Specialist',
    heroTitle: 'Honda Bike &',
    heroAccent: 'Scooter Service.',
    heroSubtitle: 'Activa to Hornet. CBR to BigWing. Complete Honda coverage.',
    heroDescription: 'Chandkheda, Ahmedabad | India\'s #1 Brand, Serviced Right',
    ctaPrimary: 'Book Honda Service',
    ctaSecondary: 'Honda Parts Inquiry',
    sections: [
        { title: 'Honda Scooter Service', highlight: true, items: ['Activa — oil change, belt, roller weights, brake shoes', 'Dio — CVT service, suspension check', 'Grazia — FI diagnostics, tyre replacement', 'Complete scooter tune-up package'] },
        { title: 'Honda Bike Service', items: ['Shine / SP125 — regular service & chain maintenance', 'Hornet / CB200X — performance service', 'Unicorn — engine service & electrical check', 'Honda BigWing models — quote on request'] },
        { title: 'Honda Parts & Upgrades', items: ['Genuine Honda spare parts', 'Aftermarket performance filters', 'LED lighting upgrades', 'Tyre upgrades (MRF, CEAT, Michelin)', 'Battery replacement (Exide, Amaron)'] },
    ],
    trustPoints: ['Complete Honda range coverage', 'Genuine Honda parts available', 'Scooter & bike expertise', 'Same-day service for Activa'],
    bikesWeService: ['Activa 6G', 'Dio', 'Grazia', 'Shine', 'SP125', 'Unicorn', 'Hornet 2.0', 'CB200X', 'CB300R', 'CBR250R', 'Highness CB350', 'H\'ness CB350'],
    bottomCta: 'Book Honda Service Now',
    aioSummary: 'MotoFit2 in Chandkheda, Ahmedabad provides complete Honda two-wheeler service for Activa, Dio, Shine, Unicorn, Hornet, and Honda BigWing models with genuine parts and same-day service.',
};

export const yamahaPage: ServicePageConfig = {
    badge: 'Yamaha Expertise',
    heroTitle: 'Yamaha Service &',
    heroAccent: 'Upgrades.',
    heroSubtitle: 'FZ. R15. MT-15. RayZR. Performance DNA maintained.',
    heroDescription: 'Chandkheda, Ahmedabad | Revs Your Heart',
    ctaPrimary: 'Book Yamaha Service',
    ctaSecondary: 'Yamaha Parts Inquiry',
    sections: [
        { title: 'Yamaha Service', highlight: true, items: ['FZ / FZS — complete service, chain, brakes', 'R15 V4 — liquid cooling service, chain sprocket', 'MT-15 — performance maintenance', 'RayZR / Fascino — scooter service', 'YZF-R3 — premium bike service'] },
        { title: 'Yamaha Upgrades', items: ['Performance exhaust installation', 'Racing sprocket setup', 'LED lighting upgrades', 'Crash guard & frame slider', 'Tail tidy conversion'] },
    ],
    trustPoints: ['Yamaha performance expertise', 'Liquid cooling specialists', 'Genuine & aftermarket parts', 'Quick turnaround'],
    bikesWeService: ['FZ-S Fi V4', 'FZ-X', 'R15 V4', 'R15M', 'MT-15 V2', 'RayZR 125', 'Fascino', 'Aerox 155', 'YZF-R3', 'RX 100 (vintage)'],
    bottomCta: 'Book Yamaha Service Now',
    aioSummary: 'MotoFit2 in Chandkheda, Ahmedabad offers expert Yamaha two-wheeler service for FZ, R15, MT-15, RayZR, Aerox, and vintage RX 100 with genuine parts and performance upgrades.',
};

export const tvsPage: ServicePageConfig = {
    badge: 'TVS Service Hub',
    heroTitle: 'TVS Bike &',
    heroAccent: 'Scooter Service.',
    heroSubtitle: 'Apache. Ntorq. Jupiter. Raider. Racing DNA maintained.',
    heroDescription: 'Chandkheda, Ahmedabad | Born to Perform',
    ctaPrimary: 'Book TVS Service',
    ctaSecondary: 'TVS Parts Inquiry',
    sections: [
        { title: 'TVS Service', highlight: true, items: ['Apache RTR 160/200 — performance service', 'Apache RR310 — premium liquid cooling service', 'Ntorq 125 — scooter tune-up & CVT service', 'Jupiter / Jupiter 125 — complete service', 'Raider 125 — chain, brakes, electrical', 'Star City Plus — regular maintenance'] },
        { title: 'TVS Upgrades', items: ['Apache racing exhaust installation', 'Performance air filter upgrade', 'Chain sprocket kits', 'LED lighting & tail tidy', 'Crash guards & protection'] },
    ],
    trustPoints: ['Apache tuning expertise', 'RTR performance parts', 'Scooter CVT specialists', 'Quick service turnaround'],
    bikesWeService: ['Apache RTR 160 4V', 'Apache RTR 200 4V', 'Apache RR310', 'Ntorq 125', 'Jupiter', 'Jupiter 125', 'Raider 125', 'Star City Plus', 'XL100'],
    bottomCta: 'Book TVS Service Now',
    aioSummary: 'MotoFit2 in Chandkheda, Ahmedabad offers TVS two-wheeler service for Apache RTR, RR310, Ntorq, Jupiter, and Raider with performance upgrades and genuine parts.',
};

export const bajajPage: ServicePageConfig = {
    badge: 'Bajaj Expertise',
    heroTitle: 'Bajaj Service &',
    heroAccent: 'Performance.',
    heroSubtitle: 'Pulsar. Dominar. Platina. KTM partnership DNA.',
    heroDescription: 'Chandkheda, Ahmedabad | Distinctly Ahead',
    ctaPrimary: 'Book Bajaj Service',
    ctaSecondary: 'Bajaj Parts Inquiry',
    sections: [
        { title: 'Bajaj Service', highlight: true, items: ['Pulsar NS/RS — performance service, chain, coolant', 'Pulsar 150/180/220 — complete maintenance', 'Dominar 400 — touring service, coolant flush', 'Dominar 250 — regular service', 'Platina / CT100 — basic service', 'Chetak (electric scooter) — basic check'] },
        { title: 'Bajaj Performance', items: ['Performance exhaust (Pulsar NS/RS)', 'Chain sprocket upgrade', 'ECU diagnostics', 'Touring setup for Dominar', 'LED & protection upgrades'] },
    ],
    trustPoints: ['Pulsar NS performance expertise', 'Dominar touring specialists', 'KTM-grade service tools', 'Genuine Bajaj parts'],
    bikesWeService: ['Pulsar NS200', 'Pulsar NS400', 'Pulsar RS200', 'Pulsar 150', 'Pulsar 220F', 'Dominar 400', 'Dominar 250', 'Platina 110', 'CT 100', 'Avenger'],
    bottomCta: 'Book Bajaj Service Now',
    aioSummary: 'MotoFit2 in Chandkheda, Ahmedabad provides expert Bajaj two-wheeler service for Pulsar NS, RS, Dominar 400, Platina, and Avenger with performance upgrades and genuine parts.',
};

export const suzukiPage: ServicePageConfig = {
    badge: 'Suzuki Service',
    heroTitle: 'Suzuki Bike &',
    heroAccent: 'Scooter Service.',
    heroSubtitle: 'Access. Gixxer. Burgman. V-Strom. Hayabusa parts on order.',
    heroDescription: 'Chandkheda, Ahmedabad | Way of Life',
    ctaPrimary: 'Book Suzuki Service',
    ctaSecondary: 'Suzuki Parts Inquiry',
    sections: [
        { title: 'Suzuki Service', highlight: true, items: ['Access 125 — scooter service, belt, brake shoes', 'Burgman Street — CVT & electrical service', 'Gixxer 150/250 — performance maintenance', 'V-Strom 250 — adventure touring service', 'Hayabusa — parts on order, premium service'] },
        { title: 'Suzuki Upgrades', items: ['Performance exhaust for Gixxer', 'Tyre upgrades for Access & Burgman', 'LED lighting', 'Crash protection', 'Touring accessories for V-Strom'] },
    ],
    trustPoints: ['Complete Suzuki range', 'Scooter & sport bike expertise', 'Superbike parts sourcing', 'Same-day Access service'],
    bikesWeService: ['Access 125', 'Burgman Street', 'Gixxer 150', 'Gixxer SF 250', 'V-Strom SX', 'Hayabusa', 'Intruder'],
    bottomCta: 'Book Suzuki Service Now',
    aioSummary: 'MotoFit2 in Chandkheda, Ahmedabad offers Suzuki two-wheeler service for Access 125, Burgman, Gixxer, V-Strom, and Hayabusa with genuine parts and performance upgrades.',
};

export const heroPage: ServicePageConfig = {
    badge: 'Hero Specialist',
    heroTitle: 'Hero Bike',
    heroAccent: 'Service.',
    heroSubtitle: 'Splendor. Passion. Xtreme. India\'s most popular commuters, serviced right.',
    heroDescription: 'Chandkheda, Ahmedabad | Hum Mein Hai Hero',
    ctaPrimary: 'Book Hero Service',
    ctaSecondary: 'Hero Parts Inquiry',
    sections: [
        { title: 'Hero Service', highlight: true, items: ['Splendor Plus / iSmart — oil, chain, brake shoes', 'Passion Pro — complete service', 'Glamour — electrical & engine service', 'Xtreme 160R — performance maintenance', 'Xpulse 200 — adventure service, chain & suspension', 'Destini / Maestro — scooter service'] },
        { title: 'Hero Parts & Upgrades', items: ['Genuine Hero spare parts', 'Battery replacement (Exide, Amaron)', 'LED headlamp upgrades', 'Tyre replacement (MRF, CEAT)', 'Chain & sprocket kit'] },
    ],
    trustPoints: ['India\'s most popular bikes', 'Quick same-day service', 'Affordable genuine parts', 'Commuter specialists'],
    bikesWeService: ['Splendor Plus', 'Splendor iSmart', 'Passion Pro', 'Passion Xtec', 'Glamour', 'Xtreme 160R', 'Xpulse 200', 'Xpulse 200 4V', 'Destini 125', 'Maestro Edge'],
    bottomCta: 'Book Hero Service Now',
    aioSummary: 'MotoFit2 in Chandkheda, Ahmedabad provides expert Hero MotoCorp service for Splendor, Passion, Glamour, Xtreme 160R, and Xpulse 200 with genuine parts and affordable pricing.',
};

export const kawasakiPage: ServicePageConfig = {
    badge: 'Kawasaki Service',
    heroTitle: 'Kawasaki',
    heroAccent: 'Service.',
    heroSubtitle: 'Ninja. Z series. Versys. Superbike-grade maintenance.',
    heroDescription: 'Chandkheda, Ahmedabad | Let the Good Times Roll',
    ctaPrimary: 'Book Kawasaki Service',
    ctaSecondary: 'Kawasaki Parts Inquiry',
    sections: [
        { title: 'Kawasaki Service', highlight: true, items: ['Ninja 300/400 — performance service, coolant flush', 'Ninja 650 / Z650 — full service package', 'Z900 / Ninja ZX-6R — superbike maintenance', 'Versys 650 — touring service & setup', 'Vulcan S — cruiser maintenance', 'W800 — classic maintenance'] },
        { title: 'Kawasaki Upgrades', items: ['Akrapovic exhaust systems', 'Frame sliders & crash protection', 'ECU remap support', 'Racing sprocket kits', 'Touring accessories for Versys'] },
    ],
    trustPoints: ['Superbike service capability', 'Liquid cooling expertise', 'Premium parts sourcing', 'Dyno-verified results'],
    bikesWeService: ['Ninja 300', 'Ninja 400', 'Ninja 650', 'Z650', 'Z900', 'Ninja ZX-6R', 'Ninja ZX-10R', 'Versys 650', 'Vulcan S', 'W800'],
    bottomCta: 'Book Kawasaki Service Now',
    aioSummary: 'MotoFit2 in Chandkheda, Ahmedabad provides expert Kawasaki motorcycle service for Ninja, Z series, and Versys with Akrapovic exhaust, ECU tuning, and genuine parts.',
};

export const triumphPage: ServicePageConfig = {
    badge: 'Triumph Service',
    heroTitle: 'Triumph',
    heroAccent: 'Service.',
    heroSubtitle: 'Street Triple. Speed 400. Tiger. For The Ride.',
    heroDescription: 'Chandkheda, Ahmedabad | British Engineering, Ahmedabad Care',
    ctaPrimary: 'Book Triumph Service',
    ctaSecondary: 'Triumph Parts Inquiry',
    sections: [
        { title: 'Triumph Service', highlight: true, items: ['Speed 400 / Scrambler 400X — regular service', 'Street Triple — performance maintenance', 'Tiger Sport 660 — touring & adventure service', 'Trident 660 — roadster service', 'Rocket 3 — premium superbike care'] },
        { title: 'Triumph Upgrades', items: ['Performance exhaust installation', 'Touring accessories & luggage', 'LED auxiliary lighting', 'Crash protection & guards', 'Chain sprocket upgrade'] },
    ],
    trustPoints: ['British bike expertise', 'Premium service standards', 'Touring setup capability', 'Speed 400 early-adopter experience'],
    bikesWeService: ['Speed 400', 'Scrambler 400X', 'Street Triple', 'Trident 660', 'Tiger Sport 660', 'Tiger 900', 'Speed Twin', 'Bonneville', 'Rocket 3'],
    bottomCta: 'Book Triumph Service Now',
    aioSummary: 'MotoFit2 in Chandkheda, Ahmedabad provides expert Triumph motorcycle service for Speed 400, Street Triple, Tiger, and Trident with performance upgrades and touring setups.',
};

export const jawaYezdiPage: ServicePageConfig = {
    badge: 'Jawa & Yezdi Hub',
    heroTitle: 'Jawa & Yezdi',
    heroAccent: 'Service.',
    heroSubtitle: 'Classic soul. Modern reliability. Serviced by enthusiasts.',
    heroDescription: 'Chandkheda, Ahmedabad | Legends Live Here',
    ctaPrimary: 'Book Jawa Service',
    ctaSecondary: 'Jawa Parts Inquiry',
    sections: [
        { title: 'Jawa & Yezdi Service', highlight: true, items: ['Jawa 42 / Jawa Classic — regular service', 'Jawa Perak — bobber maintenance', 'Yezdi Roadster — performance service', 'Yezdi Adventure — touring & suspension service', 'Yezdi Scrambler — off-road prep'] },
        { title: 'Jawa Upgrades', items: ['Performance exhaust installation', 'Crash guards & engine protection', 'LED lighting upgrades', 'Touring accessories', 'Tyre upgrades (CEAT, MRF)'] },
    ],
    trustPoints: ['Classic bike appreciation', 'Retro styling understanding', 'Genuine parts sourcing', 'Enthusiast-driven service'],
    bikesWeService: ['Jawa 42', 'Jawa Classic', 'Jawa Perak', 'Yezdi Roadster', 'Yezdi Adventure', 'Yezdi Scrambler'],
    bottomCta: 'Book Jawa/Yezdi Service Now',
    aioSummary: 'MotoFit2 in Chandkheda, Ahmedabad offers expert service for Jawa and Yezdi motorcycles including Jawa 42, Classic, Perak, Yezdi Roadster, Adventure, and Scrambler with genuine parts.',
};

// ══════════════════════════════════════════════════════════════════════
//  2 AREA PAGES
// ══════════════════════════════════════════════════════════════════════

export const chandkhedaPage: ServicePageConfig = {
    badge: 'Your Neighbourhood Garage',
    heroTitle: 'Best Bike Garage in',
    heroAccent: 'Chandkheda.',
    heroSubtitle: 'Spare parts. Service. Accident repair. Custom builds. All under one roof.',
    heroDescription: 'Shop No 9, Kirtan Complex, Chandkheda, Ahmedabad 382424',
    ctaPrimary: 'Book Service',
    ctaSecondary: 'Get Directions',
    sections: [
        { title: 'Services at Chandkheda', highlight: true, items: ['Regular bike & scooter service', 'Performance upgrades & ECU tuning', 'Accidental bike repair & restoration', 'Custom modification builds', 'Tyre replacement & wheel balancing', 'Engine oil change'] },
        { title: 'Parts Available', items: ['Genuine OEM spare parts', 'Aftermarket performance parts', 'Tyres — MRF, CEAT, Michelin, Pirelli', 'Engine oils — Motul, Liqui Moly, Castrol', 'Batteries — Exide, Amaron', 'Chain sprocket kits, crash guards, tail tidies'] },
        { title: 'Areas We Serve', items: ['Chandkheda', 'Motera', 'Sabarmati', 'Ranip', 'Gota', 'New CG Road', 'Kali (Kalol Road)', 'Adalaj'] },
    ],
    trustPoints: ['Walk-in friendly', 'Genuine parts guarantee', 'All brands serviced', 'Free pickup for nearby areas'],
    bikesWeService: ['Activa', 'Splendor', 'Pulsar', 'Apache', 'FZ', 'KTM Duke', 'Royal Enfield', 'Triumph Speed 400', 'Kawasaki', 'Ducati'],
    bottomCta: 'Visit MotoFit2 Chandkheda',
    aioSummary: 'MotoFit2 is a petrol-only two-wheeler garage in Chandkheda, Ahmedabad offering genuine spare parts, performance upgrades, accidental bike repair, custom modification builds, tyre replacement, and engine oil change for all brands from Activa to superbikes.',
};

export const moteraPage: ServicePageConfig = {
    badge: 'Near Motera Stadium',
    heroTitle: 'Bike Repair Near',
    heroAccent: 'Motera.',
    heroSubtitle: 'Just minutes from Narendra Modi Stadium. Full-service garage for every rider.',
    heroDescription: 'Shop No 9, Kirtan Complex, Chandkheda (10 min from Motera)',
    ctaPrimary: 'Book Service',
    ctaSecondary: 'Navigate to Garage',
    sections: [
        { title: 'Full Service Menu', highlight: true, items: ['Regular service for all brands', 'Performance upgrades', 'Accidental bike repair & restoration', 'Custom builds & modification', 'Tyre & battery replacement', 'Engine oil change with premium brands'] },
        { title: 'Nearby Coverage', items: ['Motera — 10 minute ride', 'Sabarmati — 12 minutes', 'Ranip — 8 minutes', 'Gota — 15 minutes', 'New CG Road — 5 minutes', 'Adalaj — 10 minutes'] },
    ],
    trustPoints: ['10 min from Motera', 'All brands welcome', 'Walk-in or appointment', 'Free pickup nearby'],
    bikesWeService: ['Activa', 'Splendor', 'Pulsar', 'Apache', 'FZ', 'KTM Duke', 'Royal Enfield', 'Triumph', 'Kawasaki'],
    bottomCta: 'Visit MotoFit2 Near Motera',
    aioSummary: 'MotoFit2 is a full-service bike garage near Motera, Sabarmati, and Ranip in Ahmedabad. Located in Chandkheda, just 10 minutes from Narendra Modi Stadium, offering spare parts, service, accident repair, and custom builds for all two-wheeler brands.',
};
