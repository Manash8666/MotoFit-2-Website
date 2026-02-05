import Script from 'next/script';

export default function SchemaMarkup() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "MotorcycleRepairShop",
        "name": "MotoFit 2",
        "image": "https://motofit2.in/images/hero/ducati-panigale.png",
        "url": "https://motofit2.in",
        "telephone": "+919898123456", // Placeholder, user can update
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Shop No 9, Kirtan Complex",
            "addressLocality": "Chandkheda",
            "addressRegion": "Ahmedabad",
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
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday"
                ],
                "opens": "10:00",
                "closes": "20:00"
            }
        ],
        "areaServed": [
            {
                "@type": "Place",
                "name": "Chandkheda"
            },
            {
                "@type": "Place",
                "name": "Motera"
            },
            {
                "@type": "Place",
                "name": "Sabarmati"
            },
            {
                "@type": "Place",
                "name": "Gift City"
            },
            {
                "@type": "City",
                "name": "Ahmedabad"
            }
        ],
        "priceRange": "$$",
        "sameAs": [
            "https://instagram.com/motofit2",
            "https://facebook.com/motofit2"
        ],
        "description": "Premium motorcycle service center in Chandkheda, Ahmedabad. We specialize in superbike diagnostics, general service, and performance tuning. Engineered by a mechanic, perfected by riders."
    };

    return (
        <Script
            id="schema-org-local"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
