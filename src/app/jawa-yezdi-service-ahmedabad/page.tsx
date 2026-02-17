import { Metadata } from 'next';
import ServiceLandingPage from '@/components/sections/ServiceLandingPage';
import { jawaYezdiPage } from '@/data/service-pages';

export const metadata: Metadata = {
    title: 'Jawa & Yezdi Service in Ahmedabad | Classic, Perak, Roadster, Adventure',
    description: 'Jawa and Yezdi motorcycle service in Chandkheda, Ahmedabad. Jawa 42, Classic, Perak, Yezdi Roadster, Adventure, Scrambler. Genuine parts and upgrades. MotoFit2.',
    keywords: ['jawa service ahmedabad', 'yezdi service ahmedabad', 'jawa mechanic', 'jawa 42 service', 'yezdi adventure service'],
};

export default function JawaYezdiPage() {
    return <ServiceLandingPage config={jawaYezdiPage} />;
}
