import { Metadata } from 'next';
import ServiceLandingPage from '@/components/sections/ServiceLandingPage';
import { heroPage } from '@/data/service-pages';

export const metadata: Metadata = {
    title: 'Hero Bike Service in Ahmedabad | Splendor, Passion, Xtreme, Xpulse',
    description: 'Hero MotoCorp bike service in Chandkheda, Ahmedabad. Splendor, Passion, Glamour, Xtreme 160R, Xpulse 200. Genuine parts, affordable pricing. MotoFit2.',
    keywords: ['hero service ahmedabad', 'splendor service near me', 'hero bike mechanic', 'xpulse 200 service ahmedabad', 'hero spare parts ahmedabad'],
};

export default function HeroPage() {
    return <ServiceLandingPage config={heroPage} />;
}
