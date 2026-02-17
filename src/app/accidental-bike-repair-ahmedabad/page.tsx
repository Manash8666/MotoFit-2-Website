import { Metadata } from 'next';
import ServiceLandingPage from '@/components/sections/ServiceLandingPage';
import { accidentRepairPage } from '@/data/service-pages';

export const metadata: Metadata = {
    title: 'Accidental Bike Repair in Ahmedabad | Motorcycle Restoration Experts',
    description: 'Complete accident bike repair and restoration in Chandkheda, Ahmedabad. Chassis alignment, fork repair, genuine parts, paint restoration. GST bills for insurance claims. MotoFit2.',
    keywords: ['accident bike repair ahmedabad', 'motorcycle restoration ahmedabad', 'bike crash repair', 'insurance bike repair ahmedabad', 'accidental repair chandkheda'],
};

export default function AccidentRepairPage() {
    return <ServiceLandingPage config={accidentRepairPage} />;
}
