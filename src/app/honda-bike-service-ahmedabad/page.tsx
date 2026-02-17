import { Metadata } from 'next';
import ServiceLandingPage from '@/components/sections/ServiceLandingPage';
import { hondaPage } from '@/data/service-pages';

export const metadata: Metadata = {
    title: 'Honda Bike & Scooter Service in Ahmedabad | Activa, Shine, Hornet, BigWing',
    description: 'Honda two-wheeler service in Chandkheda, Ahmedabad. Activa, Dio, Shine, Unicorn, Hornet, CB350, BigWing. Genuine parts, same-day service. MotoFit2.',
    keywords: ['honda service ahmedabad', 'activa service near me', 'honda bike repair ahmedabad', 'honda scooter service', 'activa spare parts ahmedabad'],
};

export default function HondaPage() {
    return <ServiceLandingPage config={hondaPage} />;
}
