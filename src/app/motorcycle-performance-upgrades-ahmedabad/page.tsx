import { Metadata } from 'next';
import ServiceLandingPage from '@/components/sections/ServiceLandingPage';
import { performanceUpgradesPage } from '@/data/service-pages';

export const metadata: Metadata = {
    title: 'Motorcycle Performance Upgrades in Ahmedabad | ECU, Exhaust, Sprockets',
    description: 'Performance upgrades for motorcycles in Chandkheda, Ahmedabad. Chain sprocket kits, ECU remap, performance exhaust, brake upgrades for KTM, RE, Apache, Pulsar. MotoFit2.',
    keywords: ['motorcycle performance upgrades ahmedabad', 'ecu remap ahmedabad', 'performance exhaust ahmedabad', 'chain sprocket upgrade', 'bike performance'],
};

export default function PerformanceUpgradesPage() {
    return <ServiceLandingPage config={performanceUpgradesPage} />;
}
