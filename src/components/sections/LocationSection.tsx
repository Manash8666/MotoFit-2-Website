"use client";

import { MapPin, Clock, Phone, Navigation } from "lucide-react";
import { GlassButton } from "@/components/ui/buttons/GlassButton";
import { COMPANY_DETAILS } from "@/config/company";
import dynamic from 'next/dynamic';

// Dynamically import LeafletMap with no SSR to avoid 'window is not defined'
const LeafletMap = dynamic(() => import("@/components/maps/LeafletMap"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full min-h-[400px] bg-[#0a0a0a] border border-[#333] rounded-2xl flex items-center justify-center">
            <span className="text-gray-500">Loading Map...</span>
        </div>
    )
});

export default function LocationSection() {
    return (
        <section className="py-20 bg-gray-900 border-t border-gray-800">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12">

                <div className="flex flex-col justify-center">
                    <h2 className="text-4xl font-black uppercase text-orange-500 mb-6 italic">Visit the Lab</h2>
                    <div className="space-y-6 text-gray-300">
                        <div className="flex items-start gap-4">
                            <div className="text-2xl text-orange-500 mt-1">📍</div>
                            <div>
                                <p className="font-bold text-white text-xl">MotoFit 2 Hub</p>
                                <p>Shop No 9, Kirtan Complex,</p>
                                <p>Nigam Nagar, New CG Road,</p>
                                <p>Chandkheda, Ahmedabad, Gujarat 382424</p>
                                <div className="mt-4 p-3 bg-white/5 border border-white/10 rounded-sm">
                                    <p className="text-xs font-mono text-orange-500 uppercase tracking-widest">Franchise Support Zone</p>
                                    <p className="text-xs text-gray-400 mt-1">Our hub covers Naroda, Kalol, Halol, Nikol, Vastral, and Rakhiyal.</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="text-xl text-orange-500">📞</div>
                            <p className="font-bold text-white">+91 72596 25881</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="text-xl text-orange-500">🕒</div>
                            <div>
                                <p><span className="text-white font-bold">Mon - Sat:</span> 09:00 AM - 08:00 PM</p>
                                <p><span className="text-orange-500 font-bold">Wednesday:</span> Closed</p>
                                <p><span className="text-white font-bold">Sunday:</span> 10:00 AM - 06:00 PM</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 flex gap-4">
                        <a href={COMPANY_DETAILS.location.mapsLink} target="_blank" className="bg-white text-black px-6 py-3 rounded-sm font-bold uppercase text-sm hover:bg-orange-500 hover:text-white transition flex items-center gap-2">
                            <span>🗺️</span> Get Directions
                        </a>
                    </div>
                </div>

                <div className="h-full min-h-[400px]">
                    <div className="w-full h-full min-h-[400px] bg-[#0a0a0a] border border-[#333] rounded-2xl flex flex-col items-center justify-center p-8 text-center bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px]">
                        <h2 className="text-3xl font-black uppercase text-white mb-2 tracking-tighter">
                            Chandkheda
                        </h2>
                        <h3 className="text-xl text-[#ff5e1a] font-mono mb-6">
                            AHMEDABAD, GUJARAT
                        </h3>
                        <div className="space-y-1 text-gray-400 font-sans text-sm">
                            <p>Shop No 9, Kirtan Complex</p>
                            <p>Nigam Nagar, New CG Road</p>
                            <p className="opacity-50 mt-2">PIN: 382424</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
