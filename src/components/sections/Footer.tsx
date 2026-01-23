'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-16 px-4 md:px-8 bg-[#050505] border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 border-b border-[#1a1a1a] pb-12">
          <div>
            <h3 className="font-black uppercase tracking-tighter mb-4 text-lg">
              MotoFit 2
            </h3>
            <p className="text-[#a0a0a0] text-sm">
              Advanced motorcycle engineering & PWA diagnostics.
            </p>
          </div>

          <div>
            <h4 className="font-bold uppercase text-xs tracking-widest mb-4 text-[#a0a0a0]">
              Services
            </h4>
            <ul className="space-y-2 text-sm text-[#a0a0a0]">
              <li>
                <Link href="#" className="hover:text-[#ff5e1a] transition-colors">
                  Custom Fabrication
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#ff5e1a] transition-colors">
                  ECU Remapping
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#ff5e1a] transition-colors">
                  PWA Health Check
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase text-xs tracking-widest mb-4 text-[#a0a0a0]">
              Connect
            </h4>
            <ul className="space-y-2 text-sm text-[#a0a0a0]">
              <li>
                <Link href="#" className="hover:text-[#ff5e1a] transition-colors">
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#ff5e1a] transition-colors">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#ff5e1a] transition-colors">
                  GitHub
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase text-xs tracking-widest mb-4 text-[#a0a0a0]">
              Location
            </h4>
            <p className="text-sm text-[#a0a0a0]">
              Ahmedabad, India
              <br />
              Open: Mon-Sat 10AM-8PM
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-[#666]">
          <p>&copy; 2026 MotoFit 2. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-[#ff5e1a] transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-[#ff5e1a] transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
