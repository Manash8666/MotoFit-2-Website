'use client';

import Script from 'next/script';

export default function SchemaMarkup() {
    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "AutoRepair",
        "name": "MotoFit 2",
        "alternateName": "MotoFit Ahmedabad",
        "description": "Ahmedabad's #1 multi-brand motorcycle garage. Expert service, crash repair, ECU tuning, and custom modifications for Royal Enfield, KTM, Ducati, Kawasaki, and all superbikes.",
        "url": "https://motofit.in",
        "telephone": "+91-72596-25881",
        "email": "service@motofit.in",
        "image": "https://motofit.in/og-image.png",
        "logo": "https://motofit.in/logo.png",
        "priceRange": "₹₹",
        "currenciesAccepted": "INR",
        "paymentAccepted": "Cash, Credit Card, UPI, Google Pay, PhonePe",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "9 Kirtan Complex, New CG Rd",
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
            { "@type": "Place", "name": "S.G. Highway" },
            { "@type": "Place", "name": "Satellite" },
            { "@type": "Place", "name": "Bodakdev" },
            { "@type": "Place", "name": "Prahlad Nagar" },
            { "@type": "Place", "name": "Vastrapur" },
            { "@type": "Place", "name": "Thaltej" },
            { "@type": "Place", "name": "Makarba" }
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
                "name": "Where is the best bike garage near me in Ahmedabad?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "MotoFit 2 is the top-rated bike garage in Ahmedabad, located in Chandkheda near New CG Road. We offer expert service for all brands including Royal Enfield, KTM, Ducati, and Kawasaki."
                }
            },
            {
                "@type": "Question",
                "name": "Does MotoFit offer free pickup and drop for bike service?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! MotoFit 2 offers complimentary pickup and drop service within Ahmedabad for all major services. Book online or call us at 7259625881."
                }
            },
            {
                "@type": "Question",
                "name": "What are the service charges at MotoFit Ahmedabad?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our service charges are transparent and competitive. General service starts at ₹1,500, while specialized services like ECU tuning and crash repair are quoted after inspection. No hidden costs!"
                }
            },
            {
                "@type": "Question",
                "name": "Which bike brands does MotoFit service?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "MotoFit 2 is a multi-brand workshop. We service Royal Enfield, KTM, Ducati, Kawasaki, Triumph, BMW Motorrad, Harley-Davidson, Yamaha, Honda, Suzuki, and all Indian motorcycles."
                }
            },
            {
                "@type": "Question",
                "name": "Is MotoFit open on Sundays?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, we are open on Sundays from 10:00 AM to 6:00 PM. On weekdays and Saturdays, we operate from 9:00 AM to 8:00 PM."
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
