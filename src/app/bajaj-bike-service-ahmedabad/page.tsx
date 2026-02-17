import { Metadata } from 'next';
import ServiceLandingPage from '@/components/sections/ServiceLandingPage';
import { bajajPage } from '@/data/service-pages';

export const metadata: Metadata = {
    title: 'Bajaj Service & Performance in Ahmedabad | Pulsar, Dominar, Platina',
    description: 'Bajaj motorcycle service in Chandkheda, Ahmedabad. Pulsar NS/RS, Dominar 400, Platina, Avenger. Performance upgrades and genuine parts. MotoFit2.',
    keywords: ['bajaj service ahmedabad', 'pulsar service near me', 'dominar 400 service', 'bajaj mechanic ahmedabad', 'pulsar performance upgrade'],
};

export default function BajajPage() {
    return <ServiceLandingPage config={bajajPage} />;
}
