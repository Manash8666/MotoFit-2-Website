import { Metadata } from 'next';
import ServiceLandingPage from '@/components/sections/ServiceLandingPage';
import { customModPage } from '@/data/service-pages';

export const metadata: Metadata = {
    title: 'Custom Bike Modification in Ahmedabad | Royal Enfield, KTM, Sports Bike Builds',
    description: 'Custom motorcycle modification builds in Chandkheda, Ahmedabad. ECU remap, performance exhaust, touring setup, tail tidy, LED upgrades for RE, KTM, Pulsar, Apache. MotoFit2.',
    keywords: ['custom bike modification ahmedabad', 'motorcycle modification ahmedabad', 'royal enfield modification', 'ktm modification', 'touring setup ahmedabad'],
};

export default function CustomModPage() {
    return <ServiceLandingPage config={customModPage} />;
}
