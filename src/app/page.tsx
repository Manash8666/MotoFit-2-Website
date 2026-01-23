import Hero from '@/components/sections/Hero';
import TrustBadges from '@/components/ui/TrustBadges';
import IndustrialStats from '@/components/sections/IndustrialStats';
import HolographicServices from '@/components/sections/HolographicServices';
import DynoLeaderboard from '@/components/sections/DynoLeaderboard';
import ClientReviews from '@/components/sections/ClientReviews';
import LocationSection from '@/components/sections/LocationSection';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import PartsCatalog from '@/components/sections/PartsCatalog';
import { fetchReviews } from '@/actions/reviews';

export default async function Home() {
  const reviews = await fetchReviews();

  return (
    <main className="w-full bg-[#050505] text-white">
      <Hero />
      <TrustBadges />
      <IndustrialStats />
      <HolographicServices />
      <DynoLeaderboard />
      <FeaturedProjects />
      <PartsCatalog />
      <ClientReviews initialReviews={reviews} />
      <LocationSection />
    </main>
  );
}
