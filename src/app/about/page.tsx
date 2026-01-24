import { Badge } from '@/components/ui/graphics/Badge';
import { GlassButton } from '@/components/ui/buttons/GlassButton';
import Image from 'next/image';

export default function AboutPage() {
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

                {/* 2. The Engineer's Vision */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
                    <div className="relative h-[500px] rounded-2xl overflow-hidden border border-[#333]">
                        {/* Placeholder for Akshat's potentially real photo, using a high-quality mechanic stock for now if unavailable, 
                            but prompting user to replace it. Ideally we use a generic 'Engineer' shot if no asset provided. */}
                        <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
                            <p className="text-gray-500">[Photo: Akshat Mohanty]</p>
                        </div>
                        {/* If we had the image, it would go here. I'll use a placeholder style div for now to avoid broken images */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                            <h3 className="text-3xl font-bold text-white">Akshat Mohanty</h3>
                            <p className="text-[#ff5e1a] font-mono">Founder & Mechanical Engineer</p>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-3xl md:text-4xl font-black text-white uppercase mb-6">The Engineer’s Vision</h2>
                        <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
                            <p>
                                Why does a Mechanical Engineer open a garage? Because you deserve better than "parts swappers".
                            </p>
                            <p>
                                I founded MotoFit 2 in 2021 with one obsession: bringing structural integrity and digital precision to every two-wheeler in Ahmedabad. I saw the gaps in "Brand Service Centers"—the lack of transparency, the robotic checklist, and the missing soul.
                            </p>
                            <p>
                                We decided to build something better. A workshop where torque wrenches are mandatory, not optional. Where we diagnose with data, not guesswork.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 3. The Dream Team */}
                <section className="mb-24">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase mb-4">The Dream Team</h2>
                        <p className="text-gray-400">A blueprint is only as good as the hands that build it.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Kunal Thakor",
                                role: "Master of Precision",
                                desc: "If there’s a sound in your engine, Kunal finds it before you even describe it. The diagnostic genius."
                            },
                            {
                                name: "Goarav Thakor",
                                role: "Performance Specialist",
                                desc: "From suspension tuning to high-speed stability, Goarav ensures your bike handles like a dream on SG Highway."
                            },
                            {
                                name: "Munna Gujili",
                                role: "Heart of the Workshop",
                                desc: "Munna’s fanatical attention to detail ensures that every nut, bolt, and wire is exactly where it needs to be."
                            }
                        ].map((member, i) => (
                            <div key={i} className="bg-[#0a0a0a] border border-[#333] p-8 rounded-2xl hover:border-[#ff5e1a] transition-colors group">
                                <div className="w-16 h-1 bg-[#ff5e1a] mb-6 group-hover:w-full transition-all duration-500"></div>
                                <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                                <p className="text-[#ff5e1a] font-mono text-sm uppercase mb-4">{member.role}</p>
                                <p className="text-gray-400">{member.desc}</p>
                            </div>
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

            </div>
        </main>
    );
}
