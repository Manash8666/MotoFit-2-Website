import { Metadata } from 'next';
import ServiceLandingPage from '@/components/sections/ServiceLandingPage';
import { triumphPage } from '@/data/service-pages';

export const metadata: Metadata = {
    title: 'Triumph Service in Ahmedabad | Speed 400, Street Triple, Tiger',
    description: 'Triumph motorcycle service in Chandkheda, Ahmedabad. Speed 400, Scrambler 400X, Street Triple, Tiger, Trident 660. Performance upgrades and touring setups. MotoFit2.',
    keywords: ['triumph service ahmedabad', 'speed 400 service', 'street triple service ahmedabad', 'triumph mechanic', 'triumph Gujarat'],
};

export default function TriumphPage() {
    return <ServiceLandingPage config={triumphPage} />;
}
