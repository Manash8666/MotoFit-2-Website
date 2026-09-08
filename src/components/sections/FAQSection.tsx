'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, Wrench, Clock, MapPin, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
    question: string;
    answer: string;
    category: string;
}

const FAQ_ITEMS: FAQItem[] = [
    {
        category: "Warranty & Quality",
        question: "What does MotoFit 2's 1-Year Engine Guarantee cover?",
        answer: "Our 1-Year Engine Guarantee covers complete engine overhauls including crank bearings, piston kits, valves, gaskets, and oil pump systems. If an overhauled engine faces any mechanical defect within 365 days or 10,000 kilometers, we rebuild and rectify it with zero labor charge and priority bay access. For half-engine services, we provide an 8-month unconditional warranty."
    },
    {
        category: "Pickup & Drop",
        question: "Do you offer free bike pickup and drop-off in Ahmedabad?",
        answer: "Yes, we provide doorstep pickup and drop across North Ahmedabad and Gandhinagar, including Chandkheda, Motera, Sabarmati, New CG Road, Zundal, Tragad, and Gift City. For stalled bikes or major accident recovery across S.G. Highway, Naroda, and Vastrapur, our specialized hydraulic recovery ramp safely transports your motorcycle."
    },
    {
        category: "Superbikes & Tuning",
        question: "Can MotoFit 2 service imported superbikes and modern multi-cylinder motorcycles?",
        answer: "Absolutely. Our technicians are trained on Japanese (Kawasaki, Yamaha, Honda, Suzuki), European (Ducati, BMW Motorrad, Triumph, Aprilia), and domestic performance bikes (KTM, Royal Enfield 650 Twins). We use dealership-grade OBD-2 diagnostic scanners, torque-to-yield calibrated wrenches, and genuine OEM or Motul 300V lubricants."
    },
    {
        category: "Pricing & Transparency",
        question: "How do you ensure zero surprise charges on my job-card?",
        answer: "We follow a strict zero-jugaad policy. Before touching any bolt, our service advisors generate a digital job-card with itemized component pricing and labor estimates. Throughout the service, you receive live WhatsApp photo and video updates from the mechanic bay. No part is replaced without your explicit prior approval."
    },
    {
        category: "Turnaround Time",
        question: "How fast can I get my bike serviced?",
        answer: "General periodic service and fluid changes are completed within 1 business day. Specialized ECU remapping and dyno runs take 24 to 48 hours. Major accident chassis straightening or custom motorcycle fabrication ranges from 5 to 15 days depending on bespoke parts sourcing."
    },
    {
        category: "Spare Parts",
        question: "Do you supply genuine OEM parts?",
        answer: "We source 100% authentic OEM parts directly from authorized distributors including Brembo, EBC Brakes, Motul, Rolon Brass Chains, BMC Air Filters, and Pirelli/Michelin tyres. Every component comes with original invoice backing and serial authenticity."
    },
    {
        category: "Location & Timings",
        question: "Where is MotoFit 2 located and what are your operating hours?",
        answer: "We are located at Shop No 9, Kirtan Complex, Nigam Nagar, near New CG Road, Chandkheda, Ahmedabad, Gujarat 382424. We are open Monday to Saturday from 9:00 AM to 8:00 PM, and Sunday from 10:00 AM to 6:00 PM. We observe a mechanical calibration break on Wednesdays."
    },
    {
        category: "Insurance & Accident",
        question: "How do you handle accidental damage and lapsed insurance assistance?",
        answer: "We offer comprehensive accident restoration, digital damage estimation, laser frame inspection, and guidance for lapsed insurance renewals so you get your machine safely back on the asphalt without bureaucratic delays."
    }
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleQuestion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Schema.org FAQPage structured data for rich snippet eligibility
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": FAQ_ITEMS.map((item) => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        }))
    };

    return (
        <section id="faq" className="py-20 bg-[#070707] border-t border-[#222] relative overflow-hidden">
            {/* JSON-LD Schema for FAQs */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-5xl">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff5e1a]/10 border border-[#ff5e1a]/30 mb-4">
                        <HelpCircle className="w-4 h-4 text-[#ff5e1a]" />
                        <span className="text-xs font-mono uppercase tracking-widest text-[#ff5e1a]">
                            Frequently Asked Questions
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-white mb-4">
                        Motorcycle Care &amp; Service Intel
                    </h2>
                    <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                        Clear answers on warranties, doorstep pickup, superbike diagnostics, and workshop pricing. No technical double-talk — just honest mechanics.
                    </p>
                </div>

                <div className="space-y-4">
                    {FAQ_ITEMS.map((item, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={index}
                                className={`border rounded-xl transition-all duration-300 ${
                                    isOpen
                                        ? 'bg-[#111] border-[#ff5e1a]/50 shadow-[0_0_20px_rgba(255,94,26,0.15)]'
                                        : 'bg-[#0a0a0a] border-[#222] hover:border-[#333]'
                                }`}
                            >
                                <button
                                    onClick={() => toggleQuestion(index)}
                                    className="w-full py-5 px-6 flex items-center justify-between text-left gap-4"
                                    aria-expanded={isOpen}
                                    aria-controls={`faq-answer-${index}`}
                                    id={`faq-question-${index}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-mono text-[#ff5e1a] font-bold px-2 py-0.5 rounded bg-[#ff5e1a]/10 border border-[#ff5e1a]/20">
                                            0{index + 1}
                                        </span>
                                        <h3 className="text-base md:text-lg font-bold text-white tracking-wide">
                                            {item.question}
                                        </h3>
                                    </div>
                                    <ChevronDown
                                        className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${
                                            isOpen ? 'rotate-180 text-[#ff5e1a]' : ''
                                        }`}
                                    />
                                </button>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            id={`faq-answer-${index}`}
                                            role="region"
                                            aria-labelledby={`faq-question-${index}`}
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6 pt-2 text-gray-300 text-sm md:text-base leading-relaxed border-t border-[#222]/50 font-sans">
                                                {item.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-12 text-center p-6 bg-[#0e0e0e] border border-[#222] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-left">
                        <p className="text-white font-bold text-base">Have a specific bike issue not listed here?</p>
                        <p className="text-gray-400 text-xs mt-1">Talk with Mansi AI or chat directly with our workshop technician on WhatsApp.</p>
                    </div>
                    <a
                        href="https://wa.me/917259625881?text=Hello%20MotoFit2%20I%20have%20a%20question%20about%20my%20motorcycle"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#ff5e1a] text-white font-bold uppercase text-xs tracking-wider rounded-lg hover:bg-[#e04e0e] transition-colors shrink-0 shadow-[0_0_15px_rgba(255,94,26,0.3)]"
                        aria-label="Ask questions on WhatsApp with MotoFit 2 mechanic"
                    >
                        <span>Ask a Mechanic</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
