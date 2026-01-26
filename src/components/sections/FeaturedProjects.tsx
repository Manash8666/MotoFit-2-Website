'use client';

import { Badge } from '@/components/ui/graphics/Badge';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import { useBooking } from '@/context/BookingContext';

export default function FeaturedProjects() {
  const { openBooking } = useBooking();
  const projects = [
    { name: 'Royal Enfield 650 Twins', date: 'Jan 2026', status: 'Complete', type: 'Major Service' },
    { name: 'KTM Duke 390', date: 'Dec 2025', status: 'Delivered', type: 'Engine Rebuild' },
    { name: 'Triumph Street Triple', date: 'Dec 2025', status: 'Complete', type: 'Crash Repair' }
  ];

  return (
    <section className="relative bg-[#050505] py-20 overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-12">
          <Badge variant="orange" glow className="mb-4">Recent Work</Badge>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5e1a] to-[#ff8a3d]">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-xl">
            From routine services to complex restorations. Here's what we've been working on at MotoFit Ahmedabad.
          </p>
        </div>

        {/* Main Feature Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Large Featured Image */}
          <div
            onClick={() => openBooking('Interceptor 650 Service Inquiry')}
            className="lg:col-span-2 relative h-[400px] bg-[#0a0a0a] rounded-xl overflow-hidden group border border-[#333]/30 cursor-pointer active:scale-[0.99] transition-transform duration-300"
          >
            <Image
              src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80"
              alt="Featured Service"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#000] via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <Badge variant="orange" glow className="mb-3">Latest Delivery</Badge>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Interceptor 650 Complete Service</h3>
              <p className="text-gray-400 text-sm max-w-md">
                Full engine service, chain adjustment, brake overhaul, and 40-point inspection completed with genuine parts.
              </p>
            </div>
          </div>

          {/* Project List */}
          <div className="bg-[#0a0a0a] rounded-xl border border-[#333]/30 p-6 flex flex-col">
            <h4 className="text-[#ff5e1a] font-mono text-xs uppercase tracking-widest mb-4">
              Recent Deliveries
            </h4>

            <div className="flex-grow space-y-3">
              {projects.map((project, i) => (
                <div
                  key={i}
                  onClick={() => openBooking(`Project Inquiry: ${project.name}`)}
                  className="group flex items-center justify-between p-3 rounded-lg hover:bg-[#1a1a1a] transition-colors cursor-pointer border border-transparent hover:border-[#333] active:scale-[0.98]"
                >
                  <div>
                    <div className="text-white font-medium text-sm group-hover:text-[#ff5e1a] transition-colors">{project.name}</div>
                    <div className="text-[#666] text-xs font-mono">{project.type} • {project.date}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#333] group-hover:text-[#ff5e1a] transition-all" />
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-[#333]/50">
              <Link href="/gallery" className="flex items-center justify-center gap-2 text-sm font-bold text-white uppercase tracking-widest hover:text-[#ff5e1a] transition-colors group">
                View Full Gallery
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
