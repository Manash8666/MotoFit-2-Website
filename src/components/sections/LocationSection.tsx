"use client";

import { MapPin, Clock, Phone, Navigation } from "lucide-react";
import { GlassButton } from "@/components/ui/buttons/GlassButton";

export default function LocationSection() {
    return (
        <section id="location" className="py-20 bg-[#050505] relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                {/* Info Side */}
                <div>
                    <h2 className="text-4xl md:text-5xl font-black mb-8 uppercase tracking-tighter">
                        Visit <span className="text-[#ff6b35]">MotoFit Ahmedabad</span>
                    </h2>
                    <p className="text-gray-400 mb-8 max-w-md">
                        Looking for a bike garage near you? Stop by for a consultation, a quick check-up, or just to hang out with fellow petrolheads. We're the most trusted motorcycle workshop near New CG Road!
                    </p>

                    {/* NAP Block (Name, Address, Phone) - Critical for Local SEO */}
                    <address className="not-italic space-y-6 mb-8">
                        <div className="flex items-start gap-4">
                            <MapPin className="text-[#ff6b35] w-6 h-6 mt-1" />
                            <div>
                                <h3 className="text-xl font-bold text-white">MotoFit 2 Workshop</h3>
                                <p className="text-gray-400">
                                    9 Kirtan Complex, New CG Rd,<br />
                                    Chandkheda, Ahmedabad,<br />
                                    Gujarat 382424
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <Clock className="text-[#ff6b35] w-6 h-6 mt-1" />
                            <div>
                                <h4 className="text-xl font-bold text-white">Opening Hours</h4>
                                <p className="text-gray-400">
                                    Mon, Tue, Thu, Fri, Sat: 9:00 AM - 8:00 PM<br />
                                    Wednesday: Closed<br />
                                    Sunday: 10:00 AM - 6:00 PM
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <Phone className="text-[#ff6b35] w-6 h-6 mt-1" />
                            <div>
                                <h4 className="text-xl font-bold text-white">Call Us Now</h4>
                                <p className="text-gray-400">
                                    <a href="tel:+917259625881" className="hover:text-[#ff6b35] transition-colors">+91 72596 25881</a><br />
                                    <a href="mailto:service@motofit.in" className="hover:text-[#ff6b35] transition-colors">service@motofit.in</a>
                                </p>
                            </div>
                        </div>
                    </address>

                    <div className="flex gap-4">
                        <a href="https://maps.google.com/?q=MotoFit+2+Ahmedabad" target="_blank" rel="noopener noreferrer">
                            <GlassButton variant="orange" className="flex items-center gap-2">
                                <Navigation className="w-4 h-4" /> Get Directions
                            </GlassButton>
                        </a>
                        <a href="tel:+917259625881">
                            <GlassButton variant="industrial" className="flex items-center gap-2">
                                <Phone className="w-4 h-4" /> Call Now
                            </GlassButton>
                        </a>
                    </div>
                </div>

                {/* Map Side - Chandkheda, Ahmedabad */}
                <div className="h-[400px] w-full rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 relative group">
                    {/* Clickable overlay to open Google Maps */}
                    <a
                        href="https://www.google.com/maps/place/MotoFit+2/@23.0916,72.5963,17z/data=!3m1!4b1!4m6!3m5!1s0x395e84f8a8a8a8a8:0xf0f0f0f0f0f0f0f0!8m2!3d23.0916!4d72.5963!16s%2Fg%2F11c1p1p1p1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40"
                    >
                        <span className="bg-[#ff6b35] text-white px-6 py-3 rounded-lg font-bold uppercase tracking-wider flex items-center gap-2">
                            <Navigation className="w-5 h-5" /> Open in Google Maps
                        </span>
                    </a>

                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.5!2d72.5963!3d23.0916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8416a0a0a0a0%3A0x1234567890abcdef!2s9%20Kirtan%20Complex%2C%20New%20CG%20Rd%2C%20Chandkheda%2C%20Ahmedabad%2C%20Gujarat%20382424!5e0!3m2!1sen!2sin!4v1705689123456!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(90%)' }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="MotoFit 2 Ahmedabad Location - Chandkheda"
                        className="grayscale group-hover:grayscale-0 transition-all duration-500"
                    ></iframe>

                    <div className="absolute inset-0 pointer-events-none border-[4px] border-[#ff6b35]/20 rounded-2xl z-10" />
                </div>
            </div>
        </section>
    );
}
