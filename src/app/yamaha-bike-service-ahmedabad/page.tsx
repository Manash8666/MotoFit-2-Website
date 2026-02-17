import { Metadata } from 'next';
import ServiceLandingPage from '@/components/sections/ServiceLandingPage';
import { yamahaPage } from '@/data/service-pages';

export const metadata: Metadata = {
    title: 'Yamaha Service & Upgrades in Ahmedabad | FZ, R15, MT-15, RayZR',
    description: 'Expert Yamaha service in Chandkheda, Ahmedabad. FZ, R15 V4, MT-15, RayZR, Aerox, RX 100 vintage. Performance upgrades and genuine parts. MotoFit2.',
    keywords: ['yamaha service ahmedabad', 'yamaha r15 service', 'yamaha fz mechanic', 'yamaha aerox service ahmedabad', 'yamaha rx 100 parts'],
};

export default function YamahaPage() {
    return <ServiceLandingPage config={yamahaPage} />;
}
