import { Metadata } from 'next';
import ServiceLandingPage from '@/components/sections/ServiceLandingPage';
import { chandkhedaPage } from '@/data/service-pages';

export const metadata: Metadata = {
    title: 'Best Bike Garage in Chandkheda, Ahmedabad | MotoFit2',
    description: 'MotoFit2 is the best bike garage in Chandkheda, Ahmedabad. Spare parts, service, accident repair, custom builds, tyres, engine oil for all two-wheeler brands. Walk-in friendly.',
    keywords: ['bike garage chandkheda', 'bike mechanic chandkheda', 'two wheeler garage near me', 'motorcycle workshop chandkheda ahmedabad', 'bike repair chandkheda'],
};

export default function ChandkhedaPage() {
    return <ServiceLandingPage config={chandkhedaPage} />;
}
