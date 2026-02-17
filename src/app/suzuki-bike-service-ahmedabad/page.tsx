import { Metadata } from 'next';
import ServiceLandingPage from '@/components/sections/ServiceLandingPage';
import { suzukiPage } from '@/data/service-pages';

export const metadata: Metadata = {
    title: 'Suzuki Service in Ahmedabad | Access, Gixxer, Burgman, Hayabusa',
    description: 'Suzuki two-wheeler service in Chandkheda, Ahmedabad. Access 125, Burgman, Gixxer, V-Strom, Hayabusa. Genuine parts and performance upgrades. MotoFit2.',
    keywords: ['suzuki service ahmedabad', 'access 125 service', 'gixxer service ahmedabad', 'suzuki mechanic', 'hayabusa service ahmedabad'],
};

export default function SuzukiPage() {
    return <ServiceLandingPage config={suzukiPage} />;
}
