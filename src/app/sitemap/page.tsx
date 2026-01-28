import Link from 'next/link';
import { ArrowRight, MapPin, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/graphics/Badge';

export const metadata = {
    title: 'Sitemap | MotoFit 2 Ahmedabad',
    description: 'Navigate through all pages of the MotoFit 2 website. Find services, gallery, parts, and more.',
};

export default function SitemapPage() {
    const sections = [
        {
            title: 'Main Navigation',
            links: [
                { name: 'Home', href: '/' },
                { name: 'About Us', href: '/about' },
                { name: 'Services', href: '/services' },
                { name: 'Gallery', href: '/gallery' },
                { name: 'Performance Parts', href: '/parts' },
                { name: 'Blog & Articles', href: '/blog' },
            ],
        },
        {
            title: 'Services',
            links: [
                { name: 'General Service', href: '/services#general' },
                { name: 'Engine Rebuilds', href: '/services#engine' },
                { name: 'Custom Fabrication', href: '/services#custom' },
                { name: 'Dyno Tuning', href: '/services#dyno' },
            ],
        },
        {
            title: 'Connect',
            links: [
                { name: 'Contact Us', href: '/#contact' },
                { name: 'Book an Appointment', href: '/#booking' },
                { name: 'Google Maps Location', href: 'https://maps.google.com/?q=MotoFit+Ahmedabad', external: true },
            ],
        }
    ];

    return (
        <main className="min-h-screen bg-[#050505] pt-24 pb-20 px-4 md:px-8">
            <div className="container mx-auto max-w-4xl">
                <div className="mb-12 border-b border-[#333] pb-8">
                    <Badge variant="default" glow className="mb-4">Navigation</Badge>
                    <h1 className="text-4xl md:text-6xl font-black text-white uppercase mb-4">
                        Site <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5e1a] to-[#ff8a3d]">Map</span>
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Overview of all pages and resources available on MotoFit 2.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sections.map((section, idx) => (
                        <div key={idx} className="bg-[#0a0a0a] border border-[#333]/30 rounded-xl p-6 hover:border-[#ff5e1a]/50 transition-colors group">
                            <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                                <span className="w-2 h-8 bg-[#ff5e1a] rounded-sm"></span>
                                {section.title}
                            </h2>
                            <ul className="space-y-4">
                                {section.links.map((link, lIdx) => (
                                    <li key={lIdx}>
                                        <Link
                                            href={link.href}
                                            target={link.external ? '_blank' : undefined}
                                            className="group/link flex items-center text-gray-400 hover:text-white transition-colors"
                                        >
                                            <ArrowRight className="w-4 h-4 mr-2 text-[#333] group-hover/link:text-[#ff5e1a] transition-colors" />
                                            <span className="font-mono text-sm uppercase tracking-wide border-b border-transparent group-hover/link:border-[#ff5e1a] pb-0.5 transition-all">
                                                {link.name}
                                            </span>
                                            {link.external && <ExternalLink className="w-3 h-3 ml-2 opacity-50" />}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-20 pt-12 border-t border-[#333] text-center">
                    <p className="text-gray-500 font-mono text-xs">
                        &copy; {new Date().getFullYear()} MotoFit. All rights reserved. <br />
                        <span className="text-[#ff5e1a]">Ahmedabad, Gujarat, India.</span>
                    </p>
                </div>
            </div>
        </main>
    );
}
