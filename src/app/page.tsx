import Hero from '@/components/sections/Hero';
import TrustBadges from '@/components/ui/TrustBadges';
import IndustrialStats from '@/components/sections/IndustrialStats';
import HolographicServices from '@/components/sections/HolographicServices';
import DynoLeaderboard from '@/components/sections/DynoLeaderboard';
import ClientReviews from '@/components/sections/ClientReviews';
import LocationSection from '@/components/sections/LocationSection';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import MansiKnowledgeHub from '@/components/sections/MansiKnowledgeHub';
import PartsCatalog from '@/components/sections/PartsCatalog';
import FAQSection from '@/components/sections/FAQSection';
import AhmedabadReach from '@/components/sections/AhmedabadReach';
import CouponBanner from '@/components/sections/CouponBanner';
import { getStatsFromDB, getLeaderboardFromDB, getProjectsFromDB } from '@/actions/admin-store-db';

// Revalidate every 60s so admin updates via Mansi chat appear quickly
export const revalidate = 60;

export default async function Home() {
  // Fetch all admin data server-side in parallel — no client-side waterfalls
  const [stats, leaderboard, projects] = await Promise.all([
    getStatsFromDB(),
    getLeaderboardFromDB(),
    getProjectsFromDB(),
  ]);

  return (
    <main id="main-content" className="w-full bg-[#050505] text-white">
      <Hero />
      <TrustBadges />
      <IndustrialStats stats={stats} />
      <HolographicServices />
      <CouponBanner />
      <AhmedabadReach />
      <DynoLeaderboard leaderboard={leaderboard} />
      <FeaturedProjects projects={projects} />
      <MansiKnowledgeHub />
      <PartsCatalog />
      <FAQSection />
      <ClientReviews />
      <LocationSection />
    </main>
  );
}
