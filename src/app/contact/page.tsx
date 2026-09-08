import type { Metadata } from 'next';
import { MapPin, Phone, MessageSquare, Clock, ShieldCheck, Truck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Contact & Workshop Location | MotoFit 2 Ahmedabad",
    description: "Visit MotoFit 2 bike workshop in Chandkheda, Ahmedabad. Doorstep pickup, superbike service, dyno tuning, & emergency recovery. Call: +91 72596 25881.",
    alternates: {
        canonical: "https://motofit2.in/contact",
    },
};

export default function ContactPage() {
    const contactSchema = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact MotoFit 2 Motorcycle Workshop",
        "url": "https://motofit2.in/contact",
        "mainEntity": {
            "@type": "MotorcycleRepairShop",
            "name": "MotoFit 2",
            "telephone": "+917259625881",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Shop No 9, Kirtan Complex, Nigam Nagar, New CG Road",
                "addressLocality": "Chandkheda",
                "addressRegion": "Gujarat",
                "postalCode": "382424",
                "addressCountry": "IN"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 23.1116,
                "longitude": 72.5728
            }
        }
    };

    return (
        <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24 font-sans">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
            />

            <div className="container mx-auto px-4 md:px-8 max-w-6xl">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff5e1a]/10 border border-[#ff5e1a]/30 mb-4">
                        <MapPin className="w-4 h-4 text-[#ff5e1a]" />
                        <span className="text-xs font-mono uppercase tracking-widest text-[#ff5e1a]">
                            Chandkheda Workshop Bay
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-4">
                        Contact &amp; Bay Location
                    </h1>
                    <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                        Drop in for a diagnostic checkup, book doorstep bike pickup, or speak directly with our master mechanics.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
                    {/* Left: Contact Info & Address Cards */}
                    <div className="lg:col-span-7 space-y-6">
                        {/* Physical Address Card */}
                        <div className="p-8 bg-[#0a0a0a] border border-[#222] rounded-2xl relative overflow-hidden">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-[#ff5e1a]/10 border border-[#ff5e1a]/20 rounded-xl text-[#ff5e1a] shrink-0">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold uppercase text-white mb-2 tracking-wide">
                                        Workshop Address
                                    </h2>
                                    <address className="not-italic text-gray-300 text-sm leading-relaxed space-y-1">
                                        <p className="font-semibold text-white">MotoFit 2 Garage</p>
                                        <p>Shop No 9, Kirtan Complex, Nigam Nagar</p>
                                        <p>Near New CG Road, Chandkheda</p>
                                        <p>Ahmedabad, Gujarat — 382424, India</p>
                                    </address>
                                    <div className="mt-4 flex flex-wrap gap-3">
                                        <a
                                            href="https://maps.app.goo.gl/MotoFit2"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#ff5e1a] text-white text-xs font-bold uppercase rounded-lg hover:bg-[#e04e0e] transition-colors"
                                        >
                                            <span>Open in Google Maps</span>
                                            <ArrowRight size={14} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Direct Lines Card */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="p-6 bg-[#0a0a0a] border border-[#222] rounded-2xl">
                                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-500 w-fit mb-4">
                                    <Phone size={20} />
                                </div>
                                <h3 className="text-sm font-bold uppercase text-white tracking-wide mb-1">
                                    Direct Phone
                                </h3>
                                <p className="text-xs text-gray-400 mb-3">Instant technician access</p>
                                <a
                                    href="tel:+917259625881"
                                    className="text-base font-mono font-bold text-[#ff5e1a] hover:underline"
                                >
                                    +91 72596 25881
                                </a>
                            </div>

                            <div className="p-6 bg-[#0a0a0a] border border-[#222] rounded-2xl">
                                <div className="p-3 bg-[#00d1ff]/10 border border-[#00d1ff]/20 rounded-xl text-[#00d1ff] w-fit mb-4">
                                    <MessageSquare size={20} />
                                </div>
                                <h3 className="text-sm font-bold uppercase text-white tracking-wide mb-1">
                                    WhatsApp Bay
                                </h3>
                                <p className="text-xs text-gray-400 mb-3">Live job-card photos &amp; estimates</p>
                                <a
                                    href="https://wa.me/917259625881?text=Hello%20MotoFit2%20I%20want%20to%20inquire%20about%20service"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-base font-mono font-bold text-[#00d1ff] hover:underline"
                                >
                                    Chat on WhatsApp
                                </a>
                            </div>
                        </div>

                        {/* Timings Card */}
                        <div className="p-6 bg-[#0a0a0a] border border-[#222] rounded-2xl flex items-start gap-4">
                            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-500 shrink-0">
                                <Clock size={20} />
                            </div>
                            <div className="text-sm">
                                <h3 className="text-base font-bold uppercase text-white mb-2">Operating Hours</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 text-gray-300">
                                    <p><span className="text-white font-semibold">Mon – Tue, Thu – Sat:</span> 09:00 AM – 08:00 PM</p>
                                    <p><span className="text-white font-semibold">Sunday:</span> 10:00 AM – 06:00 PM</p>
                                    <p className="text-orange-400 font-semibold sm:col-span-2">Wednesday: Mechanical Sabbatical (Closed for deep bay maintenance)</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Recovery & Quick Booking CTA */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="p-8 bg-gradient-to-br from-[#120800] to-[#0a0a0a] border border-[#ff5e1a]/40 rounded-2xl relative overflow-hidden">
                            <div className="flex items-center gap-2 text-[#ff5e1a] text-xs font-mono uppercase tracking-widest mb-3">
                                <Truck size={16} /> Hydraulic Recovery Vehicle
                            </div>
                            <h2 className="text-2xl font-black uppercase text-white mb-3">
                                Stalled or Accident Recovery
                            </h2>
                            <p className="text-gray-300 text-sm leading-relaxed mb-6">
                                Broken down on S.G. Highway, Gandhinagar, or anywhere in Ahmedabad? Our zero-scrape hydraulic recovery ramp safely picks up your motorcycle without frame or fairing damage.
                            </p>
                            <a
                                href="https://wa.me/917259625881?text=EMERGENCY%20PICKUP%20REQUEST:%20My%20bike%20is%20stalled"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-center w-full py-4 px-6 bg-[#ff5e1a] text-white font-bold uppercase text-sm tracking-wider rounded-xl hover:bg-[#e04e0e] transition-colors shadow-[0_0_25px_rgba(255,94,26,0.4)]"
                            >
                                Request Immediate Pickup
                            </a>
                        </div>

                        <div className="p-6 bg-[#0a0a0a] border border-[#222] rounded-2xl flex items-center gap-4">
                            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 shrink-0">
                                <ShieldCheck size={24} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold uppercase text-white">100% Genuine OEM Parts</h3>
                                <p className="text-xs text-gray-400 mt-0.5">
                                    Official distributor ties with Motul, Brembo, Rolon, EBC, &amp; Pirelli.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
