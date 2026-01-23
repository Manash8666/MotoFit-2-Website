"use client";

export default function Footer() {
  return (
    <footer className="py-16 px-4 bg-[#050505] border-t border-neutral-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 border-b border-neutral-800 pb-12">
          <div>
            <h3 className="font-black uppercase tracking-tighter mb-4">
              MotoFit 2
            </h3>
            <p className="text-gray-400 text-sm">
              Advanced motorcycle engineering & PWA diagnostics.
            </p>
          </div>

          <div>
            <h4 className="font-bold uppercase text-xs tracking-widest mb-4 text-gray-300">
              Services
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-[#ff6b35] transition-colors">
                  Custom Fabrication
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#ff6b35] transition-colors">
                  ECU Remapping
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#ff6b35] transition-colors">
                  PWA Health Check
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase text-xs tracking-widest mb-4 text-gray-300">
              Connect
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-[#ff6b35] transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#ff6b35] transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#ff6b35] transition-colors">
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase text-xs tracking-widest mb-4 text-gray-300">
              Location
            </h4>
            <p className="text-sm text-gray-400">
              Ahmedabad, India
              <br />
              Open: Mon-Sat 10AM-8PM
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; 2026 MotoFit 2. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-[#ff6b35] transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-[#ff6b35] transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-[#ff6b35] transition-colors">
              Credits
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
