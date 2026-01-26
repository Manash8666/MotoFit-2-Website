"use client";

import { MapPin, Clock, Phone, Navigation } from "lucide-react";
import { GlassButton } from "@/components/ui/buttons/GlassButton";

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
                                    <p className="text-[10px] text-gray-400 mt-1">Our hub covers Naroda, Kalol, Halol, Nikol, Vastral, and Rakhiyal.</p>
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
                        <a href="https://www.google.com/maps/dir/?api=1&destination=MotoFit+2+Shop+No+9+Kirtan+Complex+Chandkheda" target="_blank" className="bg-white text-black px-6 py-3 rounded-sm font-bold uppercase text-sm hover:bg-orange-500 hover:text-white transition flex items-center gap-2">
                            <span>🗺️</span> Get Directions
                        </a>
                    </div>
                </div>

                <div className="rounded-2xl overflow-hidden border-2 border-gray-800 h-80 md:h-full min-h-[350px]">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3669.764432128456!2d72.593!3d23.109!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDA2JzMyLjQiTiA3MsKwMzUnMzQuOCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                        className="w-full h-full grayscale opacity-80 contrast-125"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy">
                    </iframe>
                </div>
            </div>
        </section>
    );
}
