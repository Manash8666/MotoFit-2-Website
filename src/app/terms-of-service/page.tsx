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

                    <section>
                        <h2 className="text-xl font-bold uppercase text-white mb-3">6. Booking Campaign &amp; Coupon Terms</h2>
                        <p className="mb-3">
                            MotoFit 2 periodically runs booking campaigns exclusively for clients who book via <strong className="text-white">motofit2.in</strong> or our official <strong className="text-white">Instagram</strong> page. The following terms govern these campaigns:
                        </p>
                        <h3 className="text-base font-bold text-[#22c55e] uppercase tracking-wide mb-2">6.1 Live Booking Coupon (5% Discount)</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-400 mb-4">
                            <li>All clients who complete a booking request via the website or Instagram receive a personalized coupon code.</li>
                            <li>The live coupon provides a fixed <strong className="text-white">5% discount</strong> on the final service invoice, regardless of service type or vehicle.</li>
                            <li>The discount message displayed is: <em className="text-[#22c55e]">"Thank You, [Client Name], You are Special. 5% Applied on Your Service."</em></li>
                            <li><strong className="text-white">Activation Requirement:</strong> Every coupon must be <strong className="text-white">manually confirmed</strong> by <strong className="text-white">Akshat Mohanty</strong> on WhatsApp (+91-7259625881). If Akshat does not respond within <strong className="text-white">1 hour</strong>, the confirmation request is escalated to <strong className="text-white">Samael M</strong> (+91-6359635416). Coupons not confirmed within 24 hours of the booking slot are automatically void.</li>
                        </ul>
                        <h3 className="text-base font-bold text-[#ff5e1a] uppercase tracking-wide mb-2">6.2 Monthly Lucky Draw (100% Free Service)</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-400 mb-4">
                            <li><strong className="text-white">Prize:</strong> 5 lucky clients per month receive a complimentary General Service &amp; Engine Oil change (100% free), irrespective of their vehicle model.</li>
                            <li><strong className="text-white">Eligibility Pool:</strong> Selection occurs within every 500 bookings made by new and returning clients combined.</li>
                            <li><strong className="text-white">Counter Reset:</strong> The Lucky Coupon eligibility counter resets every 99 bookings. This is an internal safeguard managed and monitored by the MotoFit 2 team to prevent unintended activations.</li>
                            <li><strong className="text-white">Cancellation Penalty:</strong> If a confirmed booking is cancelled, the client's eligibility count resets to zero for the following calendar month.</li>
                            <li><strong className="text-white">Mansi Oversight:</strong> The AI assistant Mansi performs periodic automated checks to ensure the Lucky Coupon system remains within its designated operational parameters.</li>
                            <li><strong className="text-white">Activation Requirement:</strong> Lucky coupon winners are notified and must receive explicit confirmation from <strong className="text-white">Akshat Mohanty</strong> (+91-7259625881) to redeem the prize. If Akshat does not respond within <strong className="text-white">1 hour</strong>, confirmation escalates to <strong className="text-white">Samael M</strong> (+91-6359635416). No walk-in redemptions are accepted without prior WhatsApp confirmation.</li>
                        </ul>
                        <h3 className="text-base font-bold text-gray-400 uppercase tracking-wide mb-2">6.3 General Campaign Terms</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-400">
                            <li>MotoFit 2 reserves the right to modify, pause, or terminate any campaign at any time without prior notice.</li>
                            <li>Coupons are non-transferable, non-encashable, and valid for a single use only.</li>
                            <li>Any attempt to manipulate booking counts or misrepresent information to gain coupon benefits will result in permanent disqualification.</li>
                            <li>In case of any dispute regarding coupon eligibility, MotoFit 2's decision shall be final and binding.</li>
                        </ul>
                    </section>
                </div>
            </div>
        </main>
    );
}
