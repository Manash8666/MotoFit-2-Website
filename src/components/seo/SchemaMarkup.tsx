'use client';

import Script from 'next/script';

export default function SchemaMarkup() {
    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "MotorcycleRepair",
        "name": "MotoFit 2",
        "alternateName": "MotoFit Ahmedabad",
        "description": "Ahmedabad's #1 multi-brand motorcycle garage. Expert service, crash repair, ECU tuning, and custom modifications for Royal Enfield, KTM, Ducati, Kawasaki, and all superbikes.",
        "url": "https://motofit2.in",
        "telephone": "+91-72596-25881",
        "email": "service@motofit2.in",
        "image": "https://motofit2.in/og-image.png",
        "logo": "https://motofit2.in/logo.png",
        "priceRange": "₹₹",
        "currenciesAccepted": "INR",
        "paymentAccepted": "Cash, Credit Card, UPI, Google Pay, PhonePe",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "9 Kirtan Complex, New CG Rd, Nigam Nagar",
            "addressLocality": "Chandkheda, Ahmedabad",
            "addressRegion": "Gujarat",
            "postalCode": "382424",
            "addressCountry": "IN"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "23.1067",
            "longitude": "72.5942"
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Thursday", "Friday", "Saturday"],
                "opens": "09:00",
                "closes": "20:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Sunday",
                "opens": "10:00",
                "closes": "18:00"
            }
        ],
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "127",
            "bestRating": "5",
            "worstRating": "1"
        },
        "areaServed": [
            { "@type": "City", "name": "Ahmedabad" },
            { "@type": "Place", "name": "New CG Road" },
            { "@type": "Place", "name": "Chandkheda" },
            { "@type": "Place", "name": "Naroda" },
            { "@type": "Place", "name": "Kalol" },
            { "@type": "Place", "name": "Halol" },
            { "@type": "Place", "name": "Nikol" },
            { "@type": "Place", "name": "Vastral" },
            { "@type": "Place", "name": "Rakhiyal" },
            { "@type": "Place", "name": "S.G. Highway" },
            { "@type": "Place", "name": "Satellite" }
        ],
        "sameAs": [
            "https://www.instagram.com/motofit2",
            "https://www.facebook.com/motofit2",
            "https://www.youtube.com/@motofit2"
        ],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Motorcycle Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "General Bike Service",
                        "description": "Complete inspection, oil change, brake adjustment, and chain lubrication"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Crash Repair",
                        "description": "Full accident repair including dent removal, painting, and part replacement"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "ECU Tuning",
                        "description": "Professional ECU remapping for improved performance"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Custom Modifications",
                        "description": "Custom exhaust, suspension upgrades, and aesthetic modifications"
                    }
                }
            ]
        }
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Who is the best superbike mechanic in Ahmedabad?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "MotoFit 2 in Chandkheda is rated as the best superbike garage in Ahmedabad. Led by Akshat Mohanty, we specialize in Ducati, Kawasaki, Triumph, BMW, and KTM repair with advanced diagnostics tools."
                }
            },
            {
                "@type": "Question",
                "name": "Where is MotoFit 2 located in Ahmedabad?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "MotoFit 2 is located at Shop No 9, Kirtan Complex, Nigam Nagar, Chandkheda, Ahmedabad 382424. We are near New CG Road, NOT in Maninagar."
                }
            },
            {
                "@type": "Question",
                "name": "Do you offer doorstep bike service in Ahmedabad?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, we offer free pickup and drop service for major repairs and servicing across Ahmedabad, including SG Highway, Satellite, Bopal, and Naroda."
                }
            },
            {
                "@type": "Question",
                "name": "What is the cost of general service for Royal Enfield in Ahmedabad?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "General service for Royal Enfield typically starts from ₹1500 (labor + consumables). This includes Motul oil change, chain cleaning, brake overhaul, and electrical checkup."
                }
            },
            {
                "@type": "Question",
                "name": "Can you repair accident bikes or crash damage?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, MotoFit 2 specializes in crash repair, restoration, and insurance claim processing. We restore bikes to factory condition using genuine parts and computerized chassis alignment."
                }
            },
            {
                "@type": "Question",
                "name": "Do you do ECU tuning or remapping in Gujarat?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, we provide professional ECU tuning (Stage 1, 2) for performance bikes like KTM 390, Continental GT 650, and Ninja 300 to improve acceleration and fuel mapping."
                }
            }
        ]
    };

    return (
        <>
            <Script
                id="local-business-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />
            <Script
                id="faq-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
        </>
    );
}
