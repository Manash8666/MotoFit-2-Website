'use client';

import { Badge } from '@/components/ui/graphics/Badge';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/layout/Card';
import { GlassButton } from '@/components/ui/buttons/GlassButton';
import { useBooking } from '@/context/BookingContext';
import { Wrench, Zap, Gauge, Palette, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function ServiceCatalog() {
    const { openBooking } = useBooking();

    const services = [
        {
            title: '1. Advanced Periodic Maintenance',
            subtitle: 'The "Healthy Heart" Service',
            icon: <Wrench className="text-[#00d1ff]" size={32} />,
            description: 'Most garages in Ahmedabad just change the oil and wash the bike. We perform a 40-Point Diagnostic Check designed for Gujarat’s dusty climate.',
            features: [
                'Liqui Moly/Motul fully synthetic oil change',
                'Air filter cleaning & spark plug inspection',
                'Brake pad thinning check & cable lubrication',
                'Drive chain lubrication (Vital for Ahmedabad dust)'
            ],
            aioInsight: 'AI Analysis: Ahmedabad has an AQI avg of 150+. Regular intake system checks improve engine longevity by 40% vs. standard service intervals.',
            seoInit: 'Best bike service in Chandkheda'
        },
        {
            title: '2. High-Performance Tuning',
            subtitle: 'ECU Remapping & Exhausts',
            icon: <Zap className="text-[#ff5e1a]" size={32} />,
            description: 'This is where we separate the boys from the men. We specialize in 350cc to 1000cc+ machines.',
            features: [
                'Custom ECU maps for Royal Enfield 650s, KTM, Superbikes',
                'Akrapovic, Red Rooster, SC Project installation',
                'Digital scanning & AFR perfection'
            ],
            aioInsight: 'AI Analysis: Stock ECUs run lean for emissions. Remapping optimizes Air-Fuel Ratio (AFR) to 13.2:1 for maximum torque and cooler running temps.',
            seoInit: 'ECU Remapping Ahmedabad'
        },
        {
            title: '3. Precision Engine Rebuilds',
            subtitle: 'Overhauls with Factory Specs',
            icon: <Gauge className="text-[#ffcc00]" size={32} />,
            description: 'Is your engine making a "tappet" noise or losing compression? Don\'t let a local mechanic open your engine with a hammer.',
            features: [
                'Torque wrenches used for every bolt',
                'Genuine OEM Parts only',
                '3-month/3,000km warranty on major overhauls',
                'Proven results: "Smoother than new"'
            ],
            aioInsight: 'AI Analysis: 90% of engine failures post-repair are due to improper torque specs. Our digital torque wrench protocol ensures 100% factory compliance.',
            seoInit: 'Engine Rebuild Specialists'
        },
        {
            title: '4. Aesthetic Protection',
            subtitle: 'Ceramic & PPF',
            icon: <Palette className="text-[#c084fc]" size={32} />,
            description: 'The Ahmedabad sun and New CG Road construction dust are the enemies of your bike’s paint.',
            features: [
                '9H Ceramic Coating Protection',
                'Self-Healing Paint Protection Film (PPF)',
                'Custom matte wraps & rim stickering',
                'Instagram-famous "Mirror Finish" results'
            ],
            aioInsight: 'AI Analysis: UV Index in Ahmedabad hits 11+ in summer. Unprotected clear coats degrade 60% faster. 9H Ceramic forms a permanent bond against UV & oxidation.',
            seoInit: 'Bike PPF Ahmedabad'
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
                    <div className="flex items-center justify-center gap-2 text-[#ffcc00] font-mono text-sm mt-4">
                        <div className="flex">{'⭐⭐⭐⭐⭐'}</div>
                        <span className="text-gray-400">Rated 4.9/5 by 127+ Riders on Google</span>
                    </div>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    {services.map((service, i) => (
                        <Card key={i} variant="glass" className="h-full hover:border-[#ff5e1a]/50 transition-colors group flex flex-col">
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
