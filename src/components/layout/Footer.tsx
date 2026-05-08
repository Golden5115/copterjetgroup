import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-copter-blue pt-24 pb-10 border-t-4 border-copter-red">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Column 1: Brand & About (Takes up 4 columns) */}
          <div className="lg:col-span-4">
            <Link href="/" className="text-2xl font-bold text-white tracking-widest mb-6 block uppercase">
              CopterJet International
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed mb-8 pr-4">
              A fully integrated aviation specialist service firm designed to bridge structural and financial gaps in the regional and global aviation industry.
            </p>
            
            {/* Social Icons - Updated to include FB, IG, X, and LinkedIn */}
            <div className="flex gap-4">
              {/* Facebook */}
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#113a60] flex items-center justify-center rounded-sm hover:bg-[#3b5998] transition-colors text-white group">
                 <span className="sr-only">Facebook</span>
                 <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
              </a>
              {/* Instagram */}
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#113a60] flex items-center justify-center rounded-sm hover:bg-gradient-to-tr hover:from-yellow-500 hover:via-red-500 hover:to-purple-500 transition-colors text-white group">
                 <span className="sr-only">Instagram</span>
                 <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </a>
              {/* X (Formerly Twitter) - Updated SVG */}
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#113a60] flex items-center justify-center rounded-sm hover:bg-black transition-colors text-white group">
                 <span className="sr-only">X</span>
                 <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              {/* LinkedIn */}
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#113a60] flex items-center justify-center rounded-sm hover:bg-[#007bb5] transition-colors text-white group">
                 <span className="sr-only">LinkedIn</span>
                 <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" /></svg>
              </a>
            </div>
          </div>

          {/* Column 2: About Us (Takes up 2 columns) */}
          <div className="lg:col-span-2">
            <h4 className="text-white text-sm font-bold mb-6 tracking-widest uppercase">About Us</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li><Link href="/about/who-we-are" className="hover:text-copter-red hover:pl-2 transition-all block">Who We Are</Link></li>
              <li><Link href="/about/people" className="hover:text-copter-red hover:pl-2 transition-all block">Our People</Link></li>
              <li><Link href="/about/history" className="hover:text-copter-red hover:pl-2 transition-all block">Our History</Link></li>
              <li><Link href="/about/management" className="hover:text-copter-red hover:pl-2 transition-all block">Management Team</Link></li>
              <li><Link href="/about/governance" className="hover:text-copter-red hover:pl-2 transition-all block">Corporate Governance</Link></li>
            </ul>
          </div>

          {/* Column 3: Our Businesses (Takes up 2 columns) */}
          <div className="lg:col-span-2">
            <h4 className="text-white text-sm font-bold mb-6 tracking-widest uppercase">Businesses</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li><Link href="/businesses/international" className="hover:text-copter-red hover:pl-2 transition-all block">CopterJet International</Link></li>
              <li><Link href="/businesses/services" className="hover:text-copter-red hover:pl-2 transition-all block">CopterJet Services</Link></li>
              <li><Link href="/businesses/logistics" className="hover:text-copter-red hover:pl-2 transition-all block">CopterJet Logistics</Link></li>
              <li><Link href="/services" className="hover:text-copter-red hover:pl-2 transition-all block pt-2 border-t border-[#1a558c] mt-2">All Services</Link></li>
              <li><Link href="/partnership" className="hover:text-copter-red hover:pl-2 transition-all block">Partnership</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter/Contact (Takes up 4 columns) */}
          <div className="lg:col-span-4">
            <h4 className="text-white text-sm font-bold mb-6 tracking-widest uppercase">Stay Informed</h4>
            <p className="text-sm text-gray-300 mb-6 leading-relaxed">Subscribe to our intelligence newsletter for the latest regional aviation insights and market updates.</p>
            <form className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Business Email Address" 
                className="bg-[#0a1e35] border border-[#1a558c] text-white px-5 py-4 text-sm outline-none focus:border-copter-red transition-colors w-full rounded-sm"
                required
              />
              <button 
                type="submit" 
                className="bg-copter-red text-white font-bold tracking-widest text-sm py-4 rounded-sm hover:bg-red-800 transition-colors w-full uppercase"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Legal Bar */}
        <div className="border-t border-[#1a558c] pt-8 pb-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 font-medium tracking-wide">
          <p>&copy; {currentYear} CopterJet International. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/careers" className="hover:text-white transition-colors">Careers</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}