import { Metadata } from 'next';
import ServiceLandingPage from '@/components/sections/ServiceLandingPage';
import { royalEnfieldPage } from '@/data/service-pages';

export const metadata: Metadata = {
    title: 'Royal Enfield Service & Modification in Ahmedabad | Classic, Meteor, Hunter, GT 650',
    description: 'Royal Enfield specialist garage in Chandkheda, Ahmedabad. Service, performance upgrades, touring setup, accident restoration for Classic 350, Meteor, Hunter, Continental GT 650, Interceptor 650, Himalayan. MotoFit2.',
    keywords: ['royal enfield service ahmedabad', 'royal enfield modification ahmedabad', 'RE mechanic ahmedabad', 'continental gt 650 service', 'royal enfield touring setup'],
};

export default function RoyalEnfieldPage() {
    return <ServiceLandingPage config={royalEnfieldPage} />;
}
