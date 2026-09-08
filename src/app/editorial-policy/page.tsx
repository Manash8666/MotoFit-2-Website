import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Editorial Policy & Mechanical Standards | MotoFit 2 Ahmedabad",
    description: "MotoFit 2's editorial standards for motorcycle technical advice, repair guides, and engineering integrity.",
    alternates: {
        canonical: "https://motofit2.in/editorial-policy",
    },
};

export default function EditorialPolicyPage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24 font-sans">
            <div className="container mx-auto px-4 md:px-8 max-w-4xl">
                <div className="mb-12 border-b border-[#222] pb-8">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#ff5e1a] mb-2 block">
                        Technical Integrity &amp; Diagnostic Standards
                    </span>
                    <h1 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight mb-4">
                        Editorial Policy
                    </h1>
                    <p className="text-gray-400 text-sm">
                        MotoFit 2 Engineering Standards • Author: Akshat Mohanty, Founder &amp; Chief Diagnostic Specialist
                    </p>
                </div>

                <div className="space-y-8 text-gray-300 text-sm md:text-base leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold uppercase text-white mb-3">1. Mission &amp; Technical Accuracy</h2>
                        <p>
                            At MotoFit 2, every article, diagnostic troubleshooting guide, dyno telemetry graph, and mechanical advice published on our blog or served by Mansi AI is written or reviewed by certified motorcycle technicians with hands-on workbench experience. We prioritize rider safety and mechanical longevity above all commercial shortcuts.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold uppercase text-white mb-3">2. No Paid Bias or Counterfeit Endorsements</h2>
                        <p>
                            We do not accept paid compensation to recommend subpar oils, counterfeit parts, or dubious performance gadgets. When we endorse lubricants like Motul 300V, braking components from Brembo or EBC, or chain kits from Rolon, our recommendation is backed by real-world dyno measurements, thermal tests, and tear-down inspections in our Chandkheda bays.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold uppercase text-white mb-3">3. Fact-Checking &amp; Engineering Review</h2>
                        <p>
                            Motorcycle engineering involves complex thermodynamics, friction mechanics, and electronic management systems. All published torque values, valve clearance tolerances, suspension sag settings, and ECU calibration notes are cross-checked against official OEM factory service manuals before release.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold uppercase text-white mb-3">4. Corrections &amp; Updates</h2>
                        <p>
                            Automotive knowledge evolves with new manufacturer service bulletins and recall notices. We continuously update our guides to reflect the latest field experience. If you spot an inaccuracy or wish to suggest an addition, email our engineering team at <a href="mailto:contact@motofit2.in" className="text-[#ff5e1a] hover:underline">contact@motofit2.in</a>.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
