import { Metadata } from 'next';
import ServiceLandingPage from '@/components/sections/ServiceLandingPage';
import { tvsPage } from '@/data/service-pages';

export const metadata: Metadata = {
    title: 'TVS Service in Ahmedabad | Apache RTR, Ntorq, Jupiter, Raider',
    description: 'TVS two-wheeler service in Chandkheda, Ahmedabad. Apache RTR, RR310, Ntorq, Jupiter, Raider. Performance upgrades and genuine parts. MotoFit2.',
    keywords: ['tvs service ahmedabad', 'apache rtr service', 'tvs ntorq service', 'tvs mechanic ahmedabad', 'apache performance upgrade'],
};

export default function TvsPage() {
    return <ServiceLandingPage config={tvsPage} />;
}
