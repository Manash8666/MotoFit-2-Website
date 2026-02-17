import { Metadata } from 'next';
import ServiceLandingPage from '@/components/sections/ServiceLandingPage';
import { kawasakiPage } from '@/data/service-pages';

export const metadata: Metadata = {
    title: 'Kawasaki Service in Ahmedabad | Ninja, Z Series, Versys',
    description: 'Expert Kawasaki motorcycle service in Chandkheda, Ahmedabad. Ninja 300/400/650, Z650/Z900, ZX-6R, Versys 650. Akrapovic exhaust, ECU tuning, genuine parts. MotoFit2.',
    keywords: ['kawasaki service ahmedabad', 'ninja 300 service', 'z900 service ahmedabad', 'kawasaki mechanic', 'kawasaki performance ahmedabad'],
};

export default function KawasakiPage() {
    return <ServiceLandingPage config={kawasakiPage} />;
}
