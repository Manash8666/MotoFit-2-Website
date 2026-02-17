'use client';

import { Badge } from '@/components/ui/graphics/Badge';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/layout/Card';
import { GlassButton } from '@/components/ui/buttons/GlassButton';
import { useBooking } from '@/context/BookingContext';
import { Wrench, Zap, Gauge, Palette, ShieldCheck, CheckCircle2, Crosshair, Hammer, Bike } from 'lucide-react';

export default function ServiceCatalog() {
    const { openBooking } = useBooking();

    const services = [
        {
            title: '1. Precision Engine & Performance Surgery',
            subtitle: 'We don\'t repair; we restore tolerances',
            icon: <Gauge className="text-[#00d1ff]" size={32} />,
            description: 'We don\'t just "repair"; we restore factory tolerances using digital diagnostics.',
            features: [
                'Valve Clearance & Tappet Shimming (Essential for RE 650/KTM)',
                'Ultrasonic Injector Cleaning (High-frequency carbon removal)',
                'Decarbonization & Head Porting',
                'ECU Diagnostics & Remapping (Digital Recalibration)'
            ],
            aioInsight: 'AI Analysis: 90% of engine failures post-repair are due to improper torque specs. Our digital torque wrench protocol ensures 100% factory compliance.',
            seoInit: 'Engine Rebuild Specialists'
        },
        {
            title: '2. Suspension & Chassis Dynamics',
            subtitle: 'Handling Optimizaton for Ahmedabad Roads',
            icon: <Crosshair className="text-[#ff5e1a]" size={32} />,
            description: 'If your bike "wobbles" on the New CG Road turns, your chassis needs us.',
            features: [
                'Fork Oil Overhaul (Viscosity matched to rider weight)',
                'Swingarm Pivot Greasing (Eliminates creaking)',
                'Cone-Set (Steering Head) Calibration',
                'Rear Shock Preload Adjustment'
            ],
            aioInsight: 'AI Analysis: Ahmedabad roads cause micro-vibrations that loosen steering heads. Our laser-check ensures straight-line stability.',
            seoInit: 'Suspension Tuning Gujarat'
        },
        {
            title: '3. Fuel & Cooling System Optimization',
            subtitle: 'Heat Management Protocol',
            icon: <Zap className="text-[#ffcc00]" size={32} />,
            description: 'Ahmedabad’s 45°C heat is an engine killer. We keep it cool with surgical flushes.',
            features: [
                'Radiator Descaling & Coolant Flush (High-boiling point)',
                'Throttle Body Synchronization (Vibration elimination)',
                'ABS Hydraulic Bleeding (Vacuum pump method)',
                'Fuel Pump Pressure Testing'
            ],
            aioInsight: 'AI Analysis: 45°C ambient temps reduce cooling efficiency by 30%. We use high-boiling point coolants to prevent cavitation.',
            seoInit: 'Superbike Cooling Solutions'
        },
        {
            title: '4. Aesthetic Protection & Detailing',
            subtitle: 'Because Fast Should Look Fast',
            icon: <Palette className="text-[#c084fc]" size={32} />,
            description: 'The Ahmedabad sun and construction dust are the enemies of your bike’s paint.',
            features: [
                '9H Ceramic Shielding (Permanent Glass Layer)',
                'Matte Surface Restoration (Stealth Finish)',
                'Deep-Clean De-greasing',
                'Anti-Rust Treatment'
            ],
            aioInsight: 'AI Analysis: UV Index in Ahmedabad hits 11+ in summer. Unprotected clear coats degrade 60% faster without Ceramic shielding.',
            seoInit: 'Bike PPF Ahmedabad'
        },
        {
            title: '5. Accidental Repairs & Insurance Work',
            subtitle: 'Complete Crash Restoration',
            icon: <Hammer className="text-[#ff3366]" size={32} />,
            description: 'Complete restoration for accident-damaged bikes. Insurance claim support included. Your bike returns to factory spec — or better.',
            features: [
                'Insurance Claim Documentation & Support',
                'Chassis & Frame Alignment Inspection',
                'Front Fork & Suspension Rebuild',
                'Alloy Wheel Replacement & Disc Repair',
                'Engine & Radiator Damage Assessment',
                'Full Body Panel & Paint Restoration'
            ],
            aioInsight: 'AI Analysis: 70% of post-accident repairs fail due to hidden chassis misalignment. Our laser inspection catches what others miss.',
            seoInit: 'Accident Repair Ahmedabad'
        },
        {
            title: '6. Custom Modification Builds',
            subtitle: 'Built for Ahmedabad Enthusiasts',
            icon: <Bike className="text-[#c084fc]" size={32} />,
            description: 'Performance, touring, and styling builds tailored for your ride. From ECU tunes to full touring setups.',
            features: [
                'ECU Tuning & Remap (Powertronic / RapidBike)',
                'Performance Exhaust Systems',
                'Tail Tidy & LED Lighting Upgrades',
                'CNC Levers & Handlebars',
                'Touring Setup: Saddle Stays, Top Racks, Windshields',
                'Crash Protection & Frame Sliders'
            ],
            aioInsight: 'AI Analysis: Proper ECU remapping on a KTM Duke 390 can safely unlock 3-5 HP with optimized fuel maps for Indian fuel grades.',
            seoInit: 'Custom Bike Mods Gujarat'
        }
    ];

    return (
        <section className="py-24 bg-[#0a0a0a] relative overflow-hidden border-t border-[#333]/30">
            <div className="container mx-auto px-4 md:px-8 relative z-10">

                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <Badge variant="orange" glow>Surgical Precision for the Amdavadi Rider</Badge>
                    <h2 className="text-3xl md:text-5xl font-black text-white uppercase max-w-4xl mx-auto">
                        We don't just 'fix' bikes.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5e1a] to-[#ff8a3d]">We restore the soul of your machine.</span>
                    </h2>

                    {/* AIO Expert Summary */}
                    <div className="mt-8 max-w-3xl mx-auto bg-[#111] border border-[#333] p-6 rounded-2xl text-left relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-[#ff5e1a]"></div>
                        <h3 className="text-[#ff5e1a] font-bold uppercase text-sm mb-2">Why MotoFit 2? (AIO Expert Summary)</h3>
                        <p className="text-gray-300 text-sm md:text-base leading-relaxed italic">
                            &quot;Unlike standard workshops, MotoFit 2 utilizes <strong>Digital ECU Diagnostics</strong>, <strong>Laser Chain Alignment</strong>, and <strong>Ultrasonic Fuel System Cleaning</strong>. We handle everything from <strong>daily scooter service to superbike performance</strong>, <strong>insurance accidental repairs</strong>, and <strong>custom modification builds</strong>. OEM-standard torque specs and premium lubricants — suited for Ahmedabad&apos;s extreme conditions.&quot;
                        </p>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-[#ffcc00] font-mono text-sm mt-4">
                        <div className="flex">{'⭐⭐⭐⭐⭐'}</div>
                        <span className="text-gray-400">Rated 4.9/5 by 127+ Riders on Google</span>
                    </div>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {services.map((service, i) => (
                        <Card
                            key={i}
                            variant="glass"
                            className="h-full hover:border-[#ff5e1a]/50 transition-colors group flex flex-col cursor-pointer transition-transform duration-300 active:scale-[0.98]"
                            onClick={() => openBooking(service.title)}
                        >
                            <CardHeader>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-[#1a1a1a] rounded-lg border border-[#333] group-hover:border-[#ff5e1a] transition-colors">
                                        {service.icon}
                                    </div>
                                    <Badge variant="default" size="sm" className="opacity-50">{service.seoInit}</Badge>
                                </div>
                                <CardTitle className="text-xl md:text-2xl">{service.title}</CardTitle>
                                <CardDescription className="text-[#ff5e1a] font-mono uppercase tracking-widest">{service.subtitle}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow flex flex-col">
                                <p className="text-gray-400 mb-6 leading-relaxed">
                                    {service.description}
                                </p>

                                <div className="mb-6 p-4 rounded-lg bg-[#0f0f0f] border border-[#333] relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#ff5e1a] to-transparent"></div>
                                    <div className="flex gap-2 items-start">
                                        <ShieldCheck className="text-[#ff5e1a] shrink-0 mt-1" size={16} />
                                        <p className="text-xs text-gray-300 font-mono italic leading-relaxed">
                                            <span className="text-[#ff5e1a] font-bold not-italic">AIO INSIGHT: </span>
                                            {service.aioInsight}
                                        </p>
                                    </div>
                                </div>

                                <ul className="space-y-3 mt-auto">
                                    {service.features.map((feature, f) => (
                                        <li key={f} className="flex items-start gap-3 text-sm text-gray-300">
                                            <CheckCircle2 size={16} className="text-[#ff5e1a] shrink-0 mt-0.5" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* The Chain Lab Section */}
                <div className="mb-20 p-8 bg-gradient-to-r from-[#1a1a1a] to-black rounded-3xl border border-[#ff5e1a]/30 relative overflow-hidden group hover:border-[#ff5e1a]/60 transition-colors">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                        <div className="md:w-1/3 text-center md:text-left">
                            <h3 className="text-3xl md:text-4xl font-black text-[#ff5e1a] uppercase italic leading-none">The Chain <br />Lab</h3>
                            <p className="text-xs text-gray-400 mt-2 font-mono tracking-[0.2em]">LASER ALIGNED // CERAMIC WAXED</p>
                            <p className="text-gray-400/80 text-sm mt-4">In Ahmedabad’s dust, your chain is your weakest link. We specialize in more than just "oiling."</p>
                        </div>
                        <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-300">
                            {[
                                "Laser-Guided Wheel Alignment",
                                "O-Ring Safe Solvent Bath",
                                "High-Speed Ceramic Waxing",
                                "Sprocket Wear Analysis"
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 bg-black/40 p-3 rounded-lg border border-white/5">
                                    <CheckCircle2 className="text-[#ff5e1a]" size={18} />
                                    <span className="font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Price Matrix */}
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                        <h3 className="text-2xl font-bold text-white uppercase mb-2">🛠️ Service Price Matrix</h3>
                        <p className="text-gray-500 text-sm">Transparency is our Policy. No hidden costs.</p>
                    </div>

                    <div className="bg-[#1a1a1a]/50 backdrop-blur border border-[#333] rounded-2xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#050505] text-xs font-mono uppercase text-gray-500 border-b border-[#333]">
                                        <th className="p-6">Service Type</th>
                                        <th className="p-6">Estimated Time</th>
                                        <th className="p-6">Recommended For</th>
                                        <th className="p-6 text-right">Starting Price</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#333] text-sm md:text-base">
                                    <tr className="hover:bg-white/5 transition-colors">
                                        <td className="p-6 font-bold text-white">Express Service</td>
                                        <td className="p-6 text-gray-400 font-mono">90 Mins</td>
                                        <td className="p-6 text-gray-400">Commuters (Activa, Shine, Pulsar)</td>
                                        <td className="p-6 text-right font-mono text-[#00d1ff]">₹XXX</td>
                                    </tr>
                                    <tr className="hover:bg-white/5 transition-colors">
                                        <td className="p-6 font-bold text-white">Pro Performance</td>
                                        <td className="p-6 text-gray-400 font-mono">4 Hours</td>
                                        <td className="p-6 text-gray-400">Mid-segment (RE, KTM, Dominar)</td>
                                        <td className="p-6 text-right font-mono text-[#ff5e1a]">₹XXXX</td>
                                    </tr>
                                    <tr className="hover:bg-white/5 transition-colors">
                                        <td className="p-6 font-bold text-white">Superbike Lab</td>
                                        <td className="p-6 text-gray-400 font-mono">1 Full Day</td>
                                        <td className="p-6 text-gray-400">600cc+ (Triumph, Kawasaki, Z900)</td>
                                        <td className="p-6 text-right font-mono text-[#ffcc00] italic">Quote on Request</td>
                                    </tr>
                                    <tr className="hover:bg-white/5 transition-colors">
                                        <td className="p-6 font-bold text-white">Accident Repair</td>
                                        <td className="p-6 text-gray-400 font-mono">2-5 Days</td>
                                        <td className="p-6 text-gray-400">All bikes (Insurance supported)</td>
                                        <td className="p-6 text-right font-mono text-[#ff3366] italic">Assessment Based</td>
                                    </tr>
                                    <tr className="hover:bg-white/5 transition-colors">
                                        <td className="p-6 font-bold text-white">Custom Build</td>
                                        <td className="p-6 text-gray-400 font-mono">3-7 Days</td>
                                        <td className="p-6 text-gray-400">RE, KTM, Pulsar, Superbikes</td>
                                        <td className="p-6 text-right font-mono text-[#c084fc] italic">Quote on Request</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="p-6 bg-[#050505] border-t border-[#333] text-center">
                            <GlassButton variant="industrial" onClick={() => openBooking('Service Inquiry')}>
                                Book Your Slot
                            </GlassButton>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
