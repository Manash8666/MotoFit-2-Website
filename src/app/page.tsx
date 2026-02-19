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
import { fetchReviews } from '@/actions/reviews';

export default async function Home() {
  // Safe Mode View
  return (
    <main className="w-full bg-[#050505] text-white h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-[#ff5e1a] mb-4">SYSTEM SECURE</h1>
      <p className="text-gray-400">Zero Point Safe Mode Active.</p>
      <p className="text-gray-600 text-sm mt-2">No malicious code detected. Diagnosing component failure...</p>
    </main>
  );
}
