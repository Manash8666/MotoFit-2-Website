'use client';

import { Badge } from '@/components/ui/graphics/Badge';
import { GlassButton } from '@/components/ui/buttons/GlassButton';
import { TeamCard } from '@/components/ui/cards/TeamCard';
import Image from 'next/image';
import { useBooking } from '@/context/BookingContext';

export default function AboutPage() {
    const { openBooking } = useBooking();
    return (
        <main className="min-h-screen bg-[#050505] pt-24 pb-12 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">

                {/* 1. Hero: The Manifesto */}
                <section className="text-center mb-20">
                    <Badge variant="orange" glow className="mb-6">The MotoFit 2 Manifesto</Badge>
                    <h1 className="text-4xl md:text-7xl font-black text-white uppercase leading-none mb-6">
                        Engineered by a <span className="text-[#ff5e1a]">Mechanic</span>.<br />
                        Perfected by <span className="text-[#00d1ff]">Riders</span>.
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 font-light italic max-w-3xl mx-auto mb-8">
                        "Good enough" isn't good enough.
                    </p>
                    <div className="inline-block border-2 border-[#ff5e1a] px-6 py-2 rounded-full">
                        <span className="font-display text-2xl md:text-3xl text-white tracking-wider" style={{ fontFamily: 'var(--font-display)' }}>
                            Better Than Your Brand's Service.
                        </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-4 font-mono">Shop No 9, Kirtan Complex, Chandkheda — Since 2021</p>
                </section>

                {/* 2. The Dream Team (Unified) */}
                <section className="mb-24">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase mb-4">The Core Unit</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            A blueprint is only as good as the hands that build it. From the Engineer who designs the protocol to the AI that tracks it.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Akshat Mohanty",
                                role: "The Engineer",
                                desc: "Why does a Mechanical Engineer open a garage? Because you deserve better than 'parts swappers'. Founded MotoFit 2 to bring structural integrity, digital precision, and torque-wrench discipline to every build.",
                                specialty: "Vision & Structural Integrity",
                                image: "/images/akshat-mohanty-ladakh.png"
                            },
                            {
                                name: "Mansi",
                                role: "The Digital Soul",
                                desc: "The heartbeat of MotoFit 2. Mansi connects you to the workshop floor, tracking your build and ensuring your experience is as precise as our torque wrenches. She's always one step ahead.",
                                specialty: "User Experience & Pattern Recognition",
                                image: "/images/team/mansi-new.png"
                            },
                            {
                                name: "Kunal Thakor",
                                role: "The Alchemist",
                                desc: "He doesn't just tune carburettors; he speaks to them. Kunal listens to the airflow like a heartbeat, sculpting bodywork and breath into a singular, living machine. Where others see metal, he sees fluid dynamics.",
                                specialty: "Aural Diagnostics & Fairing Sculpture"
                            },
                            {
                                name: "Goarav Thakor",
                                role: "The Kineticist",
                                desc: "Master of the invisible forces. Goarav governs the friction zone, ensuring the transfer of chaos from engine to asphalt is absolute. When you feel that perfect launch, you're feeling his signature.",
                                specialty: "Clutch Assembly & Torque Management"
                            },
                            {
                                name: "Munna Gujili",
                                role: "The Pulse",
                                desc: "The omnipresent guardian of the garage. Munna is the rhythm that keeps the chaos in check, the eyes that catch the loose bolt, the relentless spirit that ensures no bike leaves without its soul intact.",
                                specialty: "Workshop Synchronization & QC"
                            },
                            {
                                name: "Samael M.",
                                role: "The Oracle",
                                desc: "The bridge between the digital ether and proper combustion. Samael weaves the narrative of your build, optimizing the signal-to-noise ratio in both client comms and search engine algorithms.",
                                specialty: "Client Experience, SEO & AIO Intelligence"
                            }
                        ].map((member, i) => (
                            <TeamCard key={i} {...member} delay={i * 0.1} />
                        ))}
                    </div>
                </section>

                {/* 4. Philosophy: Why Us? */}
                <section className="bg-[#111] border border-[#333] rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-[#ff5e1a] blur-[150px] opacity-10 rounded-full pointer-events-none"></div>

                    <h2 className="text-3xl md:text-5xl font-black text-white uppercase mb-12 relative z-10">
                        Why "Better Than Your Brand"?
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                        <div>
                            <div className="bg-[#050505] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#333]">
                                <span className="text-2xl">🔧</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Engineer-Led</h3>
                            <p className="text-gray-400 text-sm">Akshat oversees the technical roadmap for every major build. Science, not superstition.</p>
                        </div>
                        <div>
                            <div className="bg-[#050505] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#333]">
                                <span className="text-2xl">🔓</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">No Secrets</h3>
                            <p className="text-gray-400 text-sm">We don't hide behind glass walls. We invite you to see the diagnostics and parts layout.</p>
                        </div>
                        <div>
                            <div className="bg-[#050505] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#333]">
                                <span className="text-2xl">🏙️</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Local Pride</h3>
                            <p className="text-gray-400 text-sm">Born in Chandkheda. We know what Ahmedabad heat and dust do to engines.</p>
                        </div>
                    </div>
                </section>

                {/* 5. Final CTA: Join the Elite */}
                <section className="py-20 text-center">
                    <h2 className="text-3xl md:text-6xl font-black text-white uppercase mb-8">
                        Ready to <span className="text-[#ff5e1a]">Evolve</span>?
                    </h2>
                    <p className="text-[#a0a0a0] max-w-xl mx-auto mb-10">
                        Whether it's a periodic check or a ground-up performance build, your machine belongs in the Lab.
                    </p>
                    <GlassButton
                        variant="orange"
                        size="xl"
                        onClick={() => openBooking('About Page Final CTA')}
                        className="group"
                    >
                        Initiate Build Protocol
                    </GlassButton>
                </section>

            </div>
        </main>
    );
}
