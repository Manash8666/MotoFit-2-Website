import { Metadata } from 'next';
import ServiceLandingPage from '@/components/sections/ServiceLandingPage';
import { engineOilPage } from '@/data/service-pages';

export const metadata: Metadata = {
    title: 'Engine Oil Change Service in Ahmedabad | Motul, Liqui Moly, Castrol',
    description: 'Engine oil change service in Chandkheda, Ahmedabad. Motul, Liqui Moly, Castrol, Mobil, Shell, genuine manufacturer oils. Correct grade for your bike. MotoFit2.',
    keywords: ['engine oil change ahmedabad', 'bike oil change near me', 'motul oil change', 'liqui moly ahmedabad', 'motorcycle oil service'],
};

export default function EngineOilPage() {
    return <ServiceLandingPage config={engineOilPage} />;
}
