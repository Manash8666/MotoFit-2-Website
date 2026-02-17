import { Metadata } from 'next';
import ServiceLandingPage from '@/components/sections/ServiceLandingPage';
import { ktmPage } from '@/data/service-pages';

export const metadata: Metadata = {
    title: 'KTM Service & Performance in Ahmedabad | Duke, RC, Adventure',
    description: 'Expert KTM motorcycle service in Chandkheda, Ahmedabad. Duke 200/250/390, RC 200/390, Adventure service, ECU diagnostics, performance exhaust, genuine parts. MotoFit2.',
    keywords: ['ktm service ahmedabad', 'ktm duke service', 'ktm mechanic ahmedabad', 'ktm rc 390 service', 'ktm performance ahmedabad'],
};

export default function KtmPage() {
    return <ServiceLandingPage config={ktmPage} />;
}
