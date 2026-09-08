import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Privacy Policy | MotoFit 2 Ahmedabad",
    description: "MotoFit 2 privacy policy governing customer data protection, digital job-card privacy, and communications.",
    alternates: {
        canonical: "https://motofit2.in/privacy-policy",
    },
};

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24 font-sans">
            <div className="container mx-auto px-4 md:px-8 max-w-4xl">
                <div className="mb-12 border-b border-[#222] pb-8">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#ff5e1a] mb-2 block">
                        Legal Transparency
                    </span>
                    <h1 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Last Updated: September 4, 2026 • MotoFit 2 Workshop Pvt. Ltd.
                    </p>
                </div>

                <div className="space-y-8 text-gray-300 text-sm md:text-base leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold uppercase text-white mb-3">1. Information We Collect</h2>
                        <p className="mb-3">
                            When you schedule a service, request bike pickup, or interact with our digital systems (including our website and Mansi AI assistant), we collect:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-400">
                            <li><strong className="text-white">Contact Information:</strong> Full name, phone number, email address, and pickup/drop-off physical address.</li>
                            <li><strong className="text-white">Motorcycle Technical Data:</strong> Vehicle make, model, year, VIN/chassis number, odometer reading, and maintenance history.</li>
                            <li><strong className="text-white">Diagnostic &amp; Service Telemetry:</strong> OBD-2 scan data, ECU parameters, and dyno output logs collected during tuning.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold uppercase text-white mb-3">2. How We Use Your Information</h2>
                        <p>We use your information strictly to:</p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-400 mt-2">
                            <li>Generate transparent digital job-cards and itemized estimates.</li>
                            <li>Send real-time WhatsApp updates, photos, and inspection videos from our service bay.</li>
                            <li>Maintain warranty validity records under our 1-Year Engine Guarantee program.</li>
                            <li>Coordinate door-to-door hydraulic pickup and delivery logistics across Ahmedabad and Gandhinagar.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold uppercase text-white mb-3">3. Data Sharing &amp; Third Parties</h2>
                        <p>
                            We do not sell, lease, or monetize your personal data. Your contact details are never shared with unsolicited third-party advertisers. Third-party integrations are limited to verified logistics providers, parts distributors for warranty registration, and WhatsApp Cloud APIs for direct client messaging.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold uppercase text-white mb-3">4. Data Security &amp; Retention</h2>
                        <p>
                            We employ enterprise-grade SSL encryption and security headers to safeguard all data transmitted through our web portals. Motorcycle diagnostic histories are archived securely to assist with future maintenance and resale certification.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold uppercase text-white mb-3">5. Your Rights &amp; Contact Information</h2>
                        <p>
                            You have the right to review, update, or request the deletion of your customer records at any time. For privacy inquiries, contact our data administrator at:
                        </p>
                        <address className="not-italic mt-3 p-4 bg-[#0a0a0a] border border-[#222] rounded-xl text-xs space-y-1 font-mono">
                            <p className="font-bold text-white">MotoFit 2 Data Protection Desk</p>
                            <p>Shop No 9, Kirtan Complex, Nigam Nagar, Chandkheda, Ahmedabad 382424</p>
                            <p>Email: contact@motofit2.in | Phone: +91 72596 25881</p>
                        </address>
                    </section>
                </div>
            </div>
        </main>
    );
}
