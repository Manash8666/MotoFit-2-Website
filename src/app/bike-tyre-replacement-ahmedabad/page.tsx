import { Metadata } from 'next';
import ServiceLandingPage from '@/components/sections/ServiceLandingPage';
import { tyreReplacementPage } from '@/data/service-pages';

export const metadata: Metadata = {
    title: 'Bike Tyre Replacement in Ahmedabad | MRF, Michelin, Pirelli, CEAT',
    description: 'Bike tyre replacement in Chandkheda, Ahmedabad. MRF, CEAT, Michelin, Pirelli, Apollo tyres for scooters to superbikes. Same-day fitment, laser alignment. MotoFit2.',
    keywords: ['bike tyre replacement ahmedabad', 'motorcycle tyre ahmedabad', 'tyre change near me', 'mrf tyre ahmedabad', 'pirelli tyre ahmedabad'],
};

export default function TyreReplacementPage() {
    return <ServiceLandingPage config={tyreReplacementPage} />;
}
