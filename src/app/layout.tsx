import type { Metadata } from "next";
import { Exo_2, Alegreya_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import CustomCursor from "@/components/Cursor";
import Background3D from "@/components/Background3D";
import LenisWrapper from "@/components/LenisWrapper";
import CyberNav from "@/components/layout/CyberNav";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { BookingProvider } from "@/context/BookingContext";
import BookingModal from "@/components/features/BookingModal";
import { Analytics } from '@vercel/analytics/next';

const exo2 = Exo_2({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const alegreyaSans = Alegreya_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const agale = localFont({
  src: "../fonts/Agale.otf",
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MotoFit 2 | #1 Bike Garage in Chandkheda, Ahmedabad",
    template: "%s | MotoFit 2 Ahmedabad",
  },
  description: "Looking for a reliable bike garage near you in Ahmedabad? MotoFit 2 is the top-rated multi-brand motorcycle workshop in Chandkheda, New CG Road. Expert mechanics for Royal Enfield, KTM, Ducati, Kawasaki, and all superbikes. Free pickup & drop. Call: 72596 25881",
  keywords: [
    // Primary Local Keywords
    "garage near me ahmedabad",
    "bike garage near me",
    "motorcycle workshop ahmedabad",
    "two-wheeler garage near me",
    "bike mechanic ahmedabad",
    "bike repair near me",
    // Brand-Specific
    "royal enfield garage ahmedabad",
    "ktm service center ahmedabad",
    "ducati service india",
    "kawasaki workshop gujarat",
    "triumph service ahmedabad",
    "bmw motorrad service india",
    "harley davidson repair ahmedabad",
    // Service-Specific
    "superbike service center ahmedabad",
    "ecu tuning ahmedabad",
    "bike oil change near me",
    "motorcycle oil change ahmedabad",
    "bike puncture repair near me",
    "bike wash near me ahmedabad",
    "crash repair ahmedabad",
    "accident repair bike ahmedabad",
    "bike restoration ahmedabad",
    "custom bike modification ahmedabad",
    "bike detailing ahmedabad",
    // Location-Specific
    "bike repair s.g. highway",
    "garage near s.g. highway",
    "bike service satellite ahmedabad",
    "motorcycle garage bodakdev",
    "two-wheeler repair prahlad nagar",
    "bike garage vastrapur",
    "motorcycle service thaltej",
    // Long-tail / Voice Search
    "best bike garage in ahmedabad",
    "affordable bike service ahmedabad",
    "trusted motorcycle mechanic near me",
    "genuine spare parts ahmedabad",
    "free pickup bike service ahmedabad",
    "doorstep bike service ahmedabad",
    "MotoFit Ahmedabad",
    "MotoFit 2",
    // New High-Value Keywords
    "better than brand service ahmedabad",
    "better than authorized service center",
    "superbike specialist ahmedabad",
    "japanese bike service ahmedabad",
    "italian bike service india",
    "european bike mechanic ahmedabad",
    "aprilia service ahmedabad",
    "benelli service center ahmedabad",
    "husqvarna repair ahmedabad",
    "cfmoto service india",
    "zontes service ahmedabad",
    "jawa yezdi service ahmedabad",
    "hero xpulse service ahmedabad",
    "dominar service ahmedabad",
    "interceptor 650 service ahmedabad",
    "continental gt service ahmedabad",
    "himalayan service ahmedabad",
    "bike insurance claim ahmedabad",
    "quick bike service ahmedabad",
    "same day bike service ahmedabad",
    "weekend bike service ahmedabad"
  ],
  authors: [{ name: "MotoFit 2 Garage" }],
  creator: "MotoFit 2",
  publisher: "MotoFit 2 Workshop Pvt. Ltd.",
  alternates: {
    canonical: "https://motofit.in",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://motofit.in",
    title: "MotoFit 2 | #1 Bike Garage Near S.G. Highway, Ahmedabad",
    description: "Ahmedabad's most trusted superbike garage. Expert service for Royal Enfield, KTM, Ducati & more. Free pickup. Book now!",
    siteName: "MotoFit 2",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MotoFit 2 Workshop - Best Bike Garage in Ahmedabad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MotoFit 2 | #1 Bike Garage in Ahmedabad",
    description: "Looking for a bike garage near you? Visit MotoFit 2 on S.G. Highway, Ahmedabad. Free pickup & drop!",
    images: ["/og-image.png"],
    creator: "@motofit2",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
};

import HighVoltageFooter from '@/components/sections/HighVoltageFooter';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${exo2.variable} ${alegreyaSans.variable} ${agale.variable} font-sans bg-[#050505] text-white`}>
        <SchemaMarkup />
        <LenisWrapper>
          <div className="noise-overlay" />
          <BookingProvider>
            <CustomCursor />
            {/* <Background3D /> */}
            <CyberNav />
            {children}
            <HighVoltageFooter />
            <BookingModal />
          </BookingProvider>
        </LenisWrapper>
        <Analytics />
      </body>
    </html>
  );
}
