import { Metadata } from 'next';
import ServiceLandingPage from '@/components/sections/ServiceLandingPage';
import { moteraPage } from '@/data/service-pages';

export const metadata: Metadata = {
    title: 'Bike Repair Near Motera, Ahmedabad | MotoFit2 Chandkheda',
    description: 'Bike repair near Motera, Sabarmati, Ranip in Ahmedabad. MotoFit2 in Chandkheda — 10 min from Narendra Modi Stadium. Service, parts, accident repair, custom builds. All brands.',
    keywords: ['bike repair near motera', 'bike garage sabarmati', 'motorcycle repair ranip', 'two wheeler service near motera ahmedabad', 'bike mechanic near me'],
};

export default function MoteraPage() {
    return <ServiceLandingPage config={moteraPage} />;
}
