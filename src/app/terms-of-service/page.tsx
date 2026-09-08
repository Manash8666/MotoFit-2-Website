import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Terms of Service & Engine Warranty Terms | MotoFit 2 Ahmedabad",
    description: "Terms of service, workshop job-card agreements, and 1-Year Engine Guarantee terms at MotoFit 2 motorcycle workshop Ahmedabad.",
    alternates: {
        canonical: "https://motofit2.in/terms-of-service",
    },
};

export default function TermsOfServicePage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24 font-sans">
            <div className="container mx-auto px-4 md:px-8 max-w-4xl">
                <div className="mb-12 border-b border-[#222] pb-8">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#ff5e1a] mb-2 block">
                        Workshop Terms &amp; Warranty Guidelines
                    </span>
                    <h1 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight mb-4">
                        Terms of Service
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Effective Date: September 4, 2026 • MotoFit 2 Workshop Pvt. Ltd.
                    </p>
                </div>

                <div className="space-y-8 text-gray-300 text-sm md:text-base leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold uppercase text-white mb-3">1. Service Authorization &amp; Job-Cards</h2>
                        <p>
                            Prior to commencing diagnostic disassembly, fluid flushes, or component replacement, MotoFit 2 issues an itemized digital job-card. Work begins solely upon clear authorization by the client via WhatsApp, electronic signature, or physical consent. Any unforeseen mechanical failure discovered during teardown will be documented via video evidence and approved before proceeding.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold uppercase text-white mb-3">2. 1-Year Engine Guarantee Conditions</h2>
                        <p className="mb-2">
                            Our premier 1-Year Engine Guarantee provides peace of mind for complete engine overhauls:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-400">
                            <li><strong className="text-white">Coverage:</strong> Crankshaft assembly, main journal bearings, connecting rods, piston rings, cylinder sleeve, camshafts, and timing chain tensioners.</li>
                            <li><strong className="text-white">Duration:</strong> 365 days or 10,000 km (whichever occurs first) from the date of final delivery.</li>
                            <li><strong className="text-white">Mandatory Maintenance:</strong> The owner must adhere to the 500 km break-in inspection and return to MotoFit 2 for scheduled oil changes using certified lubricants (e.g., Motul 300V or manufacturer spec).</li>
                            <li><strong className="text-white">Exclusions:</strong> Stunt riding, track days, redline bouncing, running on contaminated or insufficient engine oil, water ingress due to flooded monsoon wading, or tampering by third-party mechanics void the warranty.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold uppercase text-white mb-3">3. ECU Remapping &amp; Dyno Testing</h2>
                        <p>
                            All ECU remapping calibrations and dyno testing are engineered within the mechanical thermal endurance of the motorcycle engine. The client acknowledges that aggressive aftermarket exhausts or air-fuel tweaks alter factory emissions and performance traits. MotoFit 2 tests every calibration for knock-free combustion under Ahmedabad atmospheric conditions.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold uppercase text-white mb-3">4. Vehicle Pickup &amp; Storage Terms</h2>
                        <p>
                            Upon job completion, clients receive automated notification. Vehicles must be collected within 48 hours unless prior storage arrangements are made. Completed motorcycles left beyond 7 days without notification may incur secure bay holding charges.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold uppercase text-white mb-3">5. Dispute Resolution</h2>
                        <p>
                            All contracts and transactions are governed under the jurisdiction of the courts of Ahmedabad, Gujarat, India.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
