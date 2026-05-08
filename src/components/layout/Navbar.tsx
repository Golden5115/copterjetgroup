'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileSubMenu, setOpenMobileSubMenu] = useState<string | null>(null);
  
  const navStructure = [
    { label: 'HOME', href: '/' },
    {
      label: 'ABOUT US',
      href: '/about',
      subItems: [
        { label: 'Who We Are', href: '/about/who-we-are' },
        { label: 'Our People', href: '/about/people' },
        { label: 'Our History', href: '/about/history' },
        { label: 'Management Team', href: '/about/management' },
        { label: 'Board of Directors', href: '/about/board' },
        { label: 'Corporate Governance Framework', href: '/about/governance' },
      ]
    },
    {
      label: 'OUR BUSINESSES',
      href: '/businesses',
      subItems: [
        { label: 'CopterJet International', href: '/businesses/international' },
        { label: 'CopterJet Services', href: '/businesses/services' },
        { label: 'CopterJet Logistics', href: '/businesses/logistics' },
      ]
    },
    { label: 'OUR SERVICES', href: '/services' },
    { label: 'INDUSTRY INSIGHTS', href: '/insights' },
    { label: 'PARTNERSHIP', href: '/partnership' },
    { label: 'CONTACT US', href: '/contact' },
  ];

  const toggleMobileSubMenu = (label: string) => {
    if (openMobileSubMenu === label) {
      setOpenMobileSubMenu(null);
    } else {
      setOpenMobileSubMenu(label);
    }
  };

  return (
    <header className="w-full relative z-50">
      {/* Top Utility Bar - Mobile Optimized */}
      <div className="bg-copter-blue text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center text-[9px] sm:text-[10px] md:text-[11px] uppercase font-bold tracking-wider gap-2 md:gap-0">
          
          <div className="text-white/90 tracking-widest text-center md:text-left">
            COPTERJET INTERNATIONAL
          </div>

          <div className="flex items-center gap-3 sm:gap-4 md:gap-6 w-full md:w-auto justify-center md:justify-end">
            <Link href="/news" className="hover:text-copter-red transition flex items-center">
               <span className="mr-1 text-copter-red font-black">v</span> NEWS <span className="hidden sm:inline">& EVENTS</span>
            </Link>
            <Link href="/gallery" className="hover:text-copter-red transition flex items-center">
               <span className="mr-1 text-copter-red font-black">v</span> GALLERY
            </Link>
            <Link href="/careers" className="hover:text-copter-red transition flex items-center">
               <span className="mr-1 text-copter-red font-black">v</span> CAREERS
            </Link>

            <div className="hidden md:flex items-center gap-3 ml-2 sm:ml-4 pl-4 sm:pl-6 border-l border-white/20">
              {/* FB Icon */}
              <a href="#" className="w-5 h-5 bg-[#3b5998] rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
              </a>
              {/* IG Icon */}
              <a href="#" className="w-5 h-5 bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </a>
              {/* X Icon */}
              <a href="#" className="w-5 h-5 bg-[#007bb5] rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-white shadow-corporate w-full relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex justify-between items-center h-20 md:h-24">
          
          <div className="flex-shrink-0 mr-4 flex items-center h-full py-4">
            <Link href="/" className="relative h-10 md:h-12 w-32 md:w-40 block">
              <Image 
                src="/images/logo.png" 
                alt="CopterJet International Logo" 
                fill
                className="object-contain object-left"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-5 text-[11px] xl:text-[12px] font-bold text-copter-blue tracking-wide h-full">
             {/* ... (Desktop map remains exactly the same as before) ... */}
            {navStructure.map((item) => (
              <div key={item.label} className="relative group h-full flex items-center">
                <Link href={item.href} className="hover:text-copter-red transition-colors duration-300 flex items-center gap-1 h-full px-1 border-b-4 border-transparent hover:border-copter-red">
                  {item.label}
                  {item.subItems && (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  )}
                </Link>
                {item.subItems && (
                  <div className="absolute top-20 md:top-24 left-0 w-64 bg-white shadow-2xl border-t-2 border-copter-red opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top translate-y-2 group-hover:translate-y-0">
                    <div className="py-2 flex flex-col">
                      {item.subItems.map((subItem) => (
                        <Link key={subItem.label} href={subItem.href} className="px-6 py-3 text-xs text-copter-grey hover:bg-copter-light hover:text-copter-red hover:pl-8 transition-all duration-300 border-b border-gray-50 last:border-0">
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <Link href="/rfq" className="ml-2 bg-copter-blue text-white px-5 py-2.5 rounded-sm hover:bg-opacity-90 transition-all font-bold tracking-wide">
              SUBMIT RFQ
            </Link>
          </div>

          {/* Mobile Menu Button - Animated Hamburger */}
          <button 
            className="lg:hidden text-copter-blue p-2 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
              <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`w-full h-0.5 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {/* SLEEK MOBILE MENU TRANSITION */}
        <div 
          className={`lg:hidden absolute w-full bg-white shadow-2xl overflow-y-auto transition-all duration-500 ease-in-out border-t border-gray-100 origin-top
            ${isMobileMenuOpen ? 'max-h-[85vh] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4 pointer-events-none'}`}
        >
          <div className="flex flex-col text-copter-blue font-bold pb-6">
            {navStructure.map((item) => (
              <div key={item.label} className="flex flex-col border-b border-gray-50">
                <div className="flex justify-between items-center px-6 py-4">
                  <Link 
                    href={item.href} 
                    className="hover:text-copter-red flex-grow text-sm"
                    onClick={() => !item.subItems && setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.subItems && (
                    <button 
                      onClick={() => toggleMobileSubMenu(item.label)}
                      className="p-2 bg-copter-light rounded-sm text-copter-blue"
                    >
                      <svg className={`w-4 h-4 transition-transform duration-300 ${openMobileSubMenu === item.label ? 'rotate-180 text-copter-red' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                </div>
                
                {/* Smooth Mobile Sub-menu Accordion */}
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openMobileSubMenu === item.label ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="bg-copter-light/50 py-2 px-6 flex flex-col gap-2 border-l-4 border-copter-red ml-4 mb-4">
                    {item.subItems?.map((subItem) => (
                      <Link 
                        key={subItem.label} 
                        href={subItem.href}
                        className="text-xs text-copter-grey hover:text-copter-red py-2.5"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <div className="px-6 pt-6 pb-4">
              <Link href="/rfq" className="block text-center bg-copter-blue text-white px-6 py-4 rounded-sm hover:bg-[#113a60] transition-all font-bold tracking-widest text-sm" onClick={() => setIsMobileMenuOpen(false)}>
                SUBMIT RFQ
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}