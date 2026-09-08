export default function SchemaMarkup() {
    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "MotorcycleRepairShop",
        "@id": "https://motofit2.in/#organization",
        "name": "MotoFit 2",
        "legalName": "MotoFit 2 Workshop Pvt. Ltd.",
        "image": [
            "https://motofit2.in/og-image.png"
        ],
        "url": "https://motofit2.in",
        "telephone": "+917259625881",
        "priceRange": "$$",
        "currenciesAccepted": "INR",
        "paymentAccepted": "Cash, UPI, Credit Card, Debit Card, Net Banking",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Shop No 9, Kirtan Complex, Nigam Nagar, New CG Road",
            "addressLocality": "Chandkheda",
            "addressRegion": "Gujarat",
            "postalCode": "382424",
            "addressCountry": "IN"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 23.1116,
            "longitude": 72.5728
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Thursday",
                    "Friday",
                    "Saturday"
                ],
                "opens": "09:00",
                "closes": "20:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Sunday"],
                "opens": "10:00",
                "closes": "18:00"
            }
        ],
        "areaServed": [
            { "@type": "Place", "name": "Chandkheda" },
            { "@type": "Place", "name": "Motera" },
            { "@type": "Place", "name": "Sabarmati" },
            { "@type": "Place", "name": "Gandhinagar" },
            { "@type": "Place", "name": "Gift City" },
            { "@type": "Place", "name": "New CG Road" },
            { "@type": "Place", "name": "Naroda" },
            { "@type": "Place", "name": "Kalol" },
            { "@type": "City", "name": "Ahmedabad" }
        ],
        "founder": {
            "@type": "Person",
            "name": "Akshat Mohanty",
            "jobTitle": "Lead Motorcycle Engineer & Founder",
            "knowsAbout": ["Motorcycle Mechanics", "Dyno Tuning", "ECU Remapping", "Engine Rebuilds"]
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.7",
            "reviewCount": "162",
            "bestRating": "5",
            "worstRating": "1"
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Motorcycle Services & Tuning",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "1-Year Engine Guarantee Rebuild",
                        "description": "Complete motorcycle engine overhaul with 1-Year warranty on full build, micrometer-precise tolerances."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "ECU Remapping & Dyno Tuning",
                        "description": "Custom air-fuel map optimization, ignition timing adjustment, and dyno-verified horsepower gains."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "General Periodic Motorcycle Service",
                        "description": "Multi-point safety inspection, fluid flush, Motul 300V synthesis, and throttle valve calibration."
                    }
                }
            ]
        },
        "sameAs": [
            "https://www.instagram.com/motofit_2",
            "https://maps.app.goo.gl/MotoFit2"
        ],
        "description": "Ahmedabad's highest-rated motorcycle workshop in Chandkheda specializing in superbikes, Royal Enfield, KTM, engine rebuilds with 1-year guarantee, and custom dyno tuning."
    };

    return (
        <script
            id="schema-org-local"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
    );
}
