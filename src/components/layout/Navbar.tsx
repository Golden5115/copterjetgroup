'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type SubItem = { label: string; href: string };
type NavItem = { label: string; href: string; subItems?: SubItem[]; megaMenu?: MegaMenuGroup[] };
type MegaMenuGroup = { heading: string; items: SubItem[] };

const navStructure: NavItem[] = [
  { label: 'HOME', href: '/' },
  {
    label: 'ABOUT US',
    href: '/about',
    subItems: [
      { label: 'Who We Are', href: '/about#who-we-are' },
      { label: 'Our History', href: '/about#history' },
      { label: 'Our People', href: '/about#people' },
      { label: 'Management Team', href: '/about#management' },
      { label: 'Board of Directors', href: '/about#board' },
      { label: 'Corporate Governance', href: '/about#governance' },
    ],
  },
  {
    label: 'OUR BUSINESSES',
    href: '/businesses',
    subItems: [
      { label: 'CopterJet Spares & Components', href: '/businesses#spares-components' },
      { label: 'CopterJet Ground Equipment', href: '/businesses#ground-equipment' },
      { label: 'CopterJet Logistics', href: '/businesses#logistics' },
      { label: 'CopterJet Asset Management', href: '/businesses#maintenance' },
      { label: 'CopterJet Services', href: '/businesses#services' },
      { label: 'CopterJet Leasing', href: '/businesses#leasing' },
      { label: 'CopterJet Flight Operations', href: '/businesses#flight-operations' },
    ],
  },
  {
    label: 'OUR SERVICES',
    href: '/services',
    megaMenu: [
      {
        heading: 'Aerospace Supply Chain & Technical',
        items: [
          { label: 'Aircraft Spares, Components & Engines Sales', href: '/services#spares-engines' },
          { label: 'Ground Equipment Procurement & Sales', href: '/services#ground-equipment' },
          { label: 'Aircraft Acquisition & Sales', href: '/services#aircraft-sales' },
          { label: 'Aircraft & Equipment Leasing Solutions', href: '/services#leasing' },
          { label: 'Aircraft Appraisal & Valuation', href: '/services#appraisal' },
          { label: 'Focused Aviation Procurement & Ancillary', href: '/services#procurement' },
          { label: 'Express Air Freight & Logistics', href: '/services#logistics' },
        ],
      },
      {
        heading: 'Airline & Helicopter Operations',
        items: [
          { label: 'Jets & Helicopters Charter Services', href: '/services#charter' },
          { label: 'Airline Joint Venture Operations', href: '/services#airline-jvo' },
          { label: 'Aircraft Management', href: '/services#aircraft-mng' },
        ],
      },
      {
        heading: 'Aviation Specialist Services',
        items: [
          { label: 'Consultancy & Advisory', href: '/services#consultancy' },
          { label: 'Infrastructure Development', href: '/services#infrastructure' },
          { label: 'Business Intelligence Solutions', href: '/services#intelligence' },
          { label: 'Aviation Credit Risk Management & Financial Gatekeeping', href: '/services#risk' },
          { label: 'Independent Audit Programmes', href: '/services#audit' },
        ],
      },
    ],
  },
  { label: 'INDUSTRY INSIGHTS', href: '/insights' },
  { label: 'PARTNERSHIP', href: '/partnership' },
  { label: 'CAREERS', href: '/careers' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileSub, setOpenMobileSub] = useState<string | null>(null);
  const [desktopOpenDropdown, setDesktopOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Update scrolled state based on window position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(37, 211, 102, 0); }
          100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }
        .whatsapp-pulse {
          animation: pulse-ring 2s infinite;
        }
        @keyframes wave {
          0%, 60%, 100% { transform: rotate(0deg); }
          10%, 30% { transform: rotate(14deg); }
          20%, 40% { transform: rotate(-8deg); }
          50% { transform: rotate(10deg); }
        }
        .waving-hand {
          display: inline-block;
          transform-origin: 70% 70%;
          animation: wave 2.5s infinite;
        }
      `}</style>

      {/* ── STICKY HEADER WRAPPER ── */}
      <header 
        className={`w-full fixed top-0 left-0 right-0 z-[100] transition-transform duration-500 ease-in-out ${
          scrolled ? '-translate-y-0' : 'translate-y-0'
        }`}
      >
        {/* ── Top Bar ── */}
        <div className="bg-copter-blue h-9">
          <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12 h-full flex items-center justify-between">
            <span className="hidden md:block text-[10px] font-semibold tracking-[0.2em] uppercase text-white">
              COPTERJET INTERNATIONAL GROUP
            </span>
            <div className="flex items-center gap-5 ml-auto">
              {['News & Events', 'Gallery', 'Contact Us'].map(lbl => (
                <Link key={lbl} href={`/${lbl.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                  className="hidden sm:block text-[10px] font-bold tracking-widest uppercase text-white hover:text-copter-red transition-colors duration-300"
                >
                  {lbl}
                </Link>
              ))}
              <span className="hidden md:block w-px h-4 bg-white/15" />
              <div className="hidden md:flex items-center gap-2">
                {[
                  { label: 'Facebook', brandBg: '#3b5998', path: 'M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z' },
                  { label: 'Instagram', brandBg: '#e1306c', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                  { label: 'LinkedIn', brandBg: '#0077b5', path: 'M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z' },
                  { label: 'X', brandBg: '#000000', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
                  { label: 'YouTube', brandBg: '#FF0000', path: 'M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z' }
                ].map(s => (
                  <a key={s.label} href="#" aria-label={s.label}
                    className="w-6 h-6 flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:brightness-110"
                    style={{ background: s.brandBg, borderRadius: '2px', color: '#fff' }}
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d={s.path} /></svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Main Nav ── */}
         <nav 
          className={`w-full relative z-50 transition-all duration-300 ${
            scrolled ? 'bg-white backdrop-blur-md shadow-[0_4px_24px_rgba(22,72,120,0.12)]' : 'bg-white shadow-[0_2px_8px_rgba(22,72,120,0.06)]'
          }`}
        >
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-copter-red" />
          <div className="max-w-[90rem] mx-auto px-4 xl:px-12 flex justify-between items-center h-[76px]">
            {/* FIXED LOGO SIZING */}
            <Link href="/" className="relative h-[40px] w-[180px] xl:h-[52px] xl:w-[235px] flex-shrink-0 block transition-all duration-300">
              <Image src="/images/logo.png" alt="CopterJet International" fill sizes="(max-width: 1280px) 180px, 235px" className="object-contain object-left" priority />
            </Link>
            {/* Desktop Links */}
            <div className="hidden min-[900px]:flex items-center h-full">
              {navStructure.map(item => (
                <div key={item.label} className="relative group h-full flex items-center" onMouseLeave={() => setDesktopOpenDropdown(null)}>
                  <div className="relative flex items-center gap-1 lg:gap-1.5 h-full px-2 xl:px-4 text-[9.5px] xl:text-[11px] font-bold text-copter-blue tracking-wide xl:tracking-wider hover:text-copter-red transition-colors duration-300 overflow-visible whitespace-nowrap cursor-pointer">
                    <Link href={item.href} className="relative z-10 flex items-center h-full">
                      {item.label}
                    </Link>
                    {(item.subItems || item.megaMenu) && (
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setDesktopOpenDropdown(desktopOpenDropdown === item.label ? null : item.label);
                        }}
                        className="p-2 -mr-2 relative z-10 focus:outline-none flex items-center justify-center h-full"
                        aria-label={`Toggle ${item.label} dropdown`}
                      >
                        <svg className={`w-3 h-3 transition-transform duration-300 ${desktopOpenDropdown === item.label ? 'rotate-180 opacity-100' : 'opacity-50 group-hover:rotate-180 group-hover:opacity-100'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    )}
                    <span className="absolute bottom-0 left-0 w-full h-[3px] bg-copter-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </div>
                  {/* Standard dropdown */}
                  {item.subItems && !item.megaMenu && (
                    <div className={`absolute top-full left-0 w-64 bg-white border-t-2 border-copter-red shadow-[0_12px_40px_rgba(22,72,120,0.15)] transition-all duration-300 ease-out origin-top z-50 ${desktopOpenDropdown === item.label ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0'}`}>
                      {item.subItems.map(sub => (
                        <Link key={sub.href} href={sub.href} onClick={() => setDesktopOpenDropdown(null)}
                          className="flex items-center gap-3 px-6 py-4 text-[11.5px] font-semibold text-copter-grey border-b border-gray-50 last:border-0 hover:bg-copter-light hover:text-copter-red transition-all duration-300 group/sub">
                          <span className="w-1.5 h-1.5 rounded-full bg-copter-red opacity-0 -translate-x-2 group-hover/sub:opacity-100 group-hover/sub:translate-x-0 transition-all duration-300 flex-shrink-0" />
                          <span className="transform group-hover/sub:translate-x-1 transition-transform duration-300">{sub.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                  {/* Mega menu — Our Services */}
                  {item.megaMenu && (
                    <div className={`absolute top-full left-1/2 -translate-x-1/2 w-[850px] bg-white border-t-2 border-copter-red shadow-[0_16px_48px_rgba(22,72,120,0.18)] transition-all duration-300 ease-out origin-top z-50 ${desktopOpenDropdown === item.label ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0'}`}>
                      <div className="grid grid-cols-3 divide-x divide-gray-100">
                        {item.megaMenu.map(group => (
                          <div key={group.heading} className="p-8">
                            <p className="text-[10px] font-bold text-copter-red tracking-[0.2em] uppercase mb-5 pb-3 border-b border-gray-100">
                              {group.heading}
                            </p>
                            <div className="flex flex-col gap-2">
                              {group.items.map(sub => (
                                <Link key={sub.href} href={sub.href}
                                  className="flex items-start gap-3 py-2 text-[11.5px] font-medium text-copter-grey hover:text-copter-red transition-all duration-300 group/sub">
                                  <span className="mt-1.5 w-1 h-1 rounded-full bg-copter-red/40 group-hover/sub:bg-copter-red group-hover/sub:scale-150 flex-shrink-0 transition-all duration-300" />
                                  <span className="transform group-hover/sub:translate-x-1 transition-transform duration-300 leading-snug">{sub.label}</span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="bg-copter-light px-8 py-4 flex items-center justify-between border-t border-gray-100">
                        <p className="text-[11px] text-copter-grey font-medium">Integrated aviation solutions across the full value chain.</p>
                        <Link href="/services" className="group text-[11px] font-bold text-copter-blue hover:text-copter-red transition-colors tracking-wider flex items-center gap-2">
                          VIEW ALL SERVICES
                          <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {/* Action Buttons: FIXED sizes to squeeze down on smaller screens */}
              <div className="ml-2 xl:ml-5 flex flex-col justify-center gap-1 xl:gap-1.5 h-[50px] border-l border-gray-100 pl-2 xl:pl-5">
                <Link href="/rfp" className="bg-copter-blue text-white text-[8px] xl:text-[9px] font-bold tracking-widest xl:tracking-[0.15em] uppercase px-3 xl:px-6 py-1 xl:py-1.5 hover:bg-copter-red hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0 text-center rounded-sm shadow-sm whitespace-nowrap">
                  SUBMIT RFP
                </Link>
                <Link href="/rfq" className="bg-copter-blue text-white text-[8px] xl:text-[9px] font-bold tracking-widest xl:tracking-[0.15em] uppercase px-3 xl:px-6 py-1 xl:py-1.5 hover:bg-copter-red hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0 text-center rounded-sm shadow-sm whitespace-nowrap">
                  SUBMIT RFQ
                </Link>
              </div>
            </div>

            {/* Mobile hamburger */}
            <button className="min-[900px]:hidden text-copter-blue p-2 focus:outline-none" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-current transform transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[9px]' : ''}`} />
                <span className={`w-full h-0.5 bg-current transition-all duration-300 ${mobileOpen ? 'opacity-0 scale-x-0' : 'opacity-100'}`} />
                <span className={`w-full h-0.5 bg-current transform transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[9px]' : ''}`} />
              </div>
            </button>
          </div>

          {/* Mobile menu */}
          <div className={`min-[900px]:hidden absolute w-full bg-white z-40 overflow-y-auto border-t border-gray-100 shadow-[0_12px_40px_rgba(22,72,120,0.15)] transition-all duration-500 ease-in-out origin-top ${mobileOpen ? 'max-h-[82vh] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
            <div className="flex flex-col text-copter-blue font-bold">
              {navStructure.map(item => (
                <div key={item.label} className="flex flex-col border-b border-gray-50 last:border-0">
                  <div className="flex justify-between items-center">
                    <Link href={item.href} className="flex-grow px-6 py-4 text-[12.5px] tracking-wider hover:text-copter-red transition-colors"
                      onClick={() => !(item.subItems || item.megaMenu) && setMobileOpen(false)}>
                      {item.label}
                    </Link>
                    {(item.subItems || item.megaMenu) && (
                      <button onClick={() => setOpenMobileSub(prev => prev === item.label ? null : item.label)} className="w-12 h-12 flex items-center justify-center text-copter-grey">
                        <svg className={`w-4 h-4 transition-transform duration-300 ${openMobileSub === item.label ? 'rotate-180 text-copter-red' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    )}
                  </div>

                  <div className={`overflow-hidden transition-all duration-300 ${openMobileSub === item.label ? 'max-h-[800px]' : 'max-h-0'}`}>
                    {item.subItems && (
                      <div className="bg-copter-light py-2 ml-4 mr-4 mb-4 border-l-[3px] border-copter-red pl-4">
                        {item.subItems.map(sub => (
                          <Link key={sub.href} href={sub.href} className="block py-3 text-[11.5px] font-semibold text-copter-grey hover:text-copter-red hover:translate-x-1 transition-all duration-300" onClick={() => setMobileOpen(false)}>
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                    {item.megaMenu && (
                      <div className="ml-4 mr-4 mb-4">
                        {item.megaMenu.map(group => (
                          <div key={group.heading} className="mb-5">
                            <p className="text-[9px] font-bold text-copter-red tracking-[0.2em] uppercase px-4 py-2.5 bg-copter-light border-l-[3px] border-copter-red">
                              {group.heading}
                            </p>
                            <div className="pl-4 border-l-[3px] border-copter-red/20 pt-1">
                              {group.items.map(sub => (
                                <Link key={sub.href} href={sub.href} className="block py-2.5 text-[11.5px] font-semibold text-copter-grey hover:text-copter-red hover:translate-x-1 transition-all duration-300" onClick={() => setMobileOpen(false)}>
                                  {sub.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div className="px-6 py-6 bg-gray-50 flex flex-col gap-3">
                <Link href="/rfp" className="block text-center bg-copter-red text-white font-bold tracking-[0.15em] text-[11px] py-3.5 uppercase hover:bg-red-800 transition-colors rounded-sm" onClick={() => setMobileOpen(false)}>
                  SUBMIT RFP
                </Link>
                <Link href="/rfq" className="block text-center border-2 border-[#0a1e35] text-[#0a1e35] font-bold tracking-[0.15em] text-[11px] py-3.5 uppercase hover:bg-[#0a1e35] hover:text-white transition-colors rounded-sm" onClick={() => setMobileOpen(false)}>
                  SUBMIT RFQ
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* ── BUFFER TO PREVENT CONTENT JUMP ── */}
      <div className="pt-[112px]"></div>

      {/* ── FLOATING ACTION BUTTONS ── */}
      <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-4">
        
        {/* NEW: Chat Widget Button */}
        <a 
          href="https://wa.me/09139347442" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center gap-3 cursor-pointer"
          aria-label="Chat on WhatsApp"
        >
          {/* Chat Bubble Message (Expands slightly on hover) */}
          <div className="bg-white text-gray-800 text-sm font-semibold px-4 py-2.5 rounded-2xl rounded-br-sm shadow-[0_4px_12px_rgba(0,0,0,0.15)] flex items-center gap-2 transform origin-right transition-all duration-300 group-hover:scale-105 border border-gray-100">
            <span className="text-base waving-hand">👋</span> 
            <span>Hello! Need Help? Let's Chat...</span>
          </div>

          {/* Glowing WhatsApp Icon */}
          <div className="w-14 h-14 bg-[#25D366] hover:bg-[#1EBE55] text-white rounded-full flex items-center justify-center shadow-lg transition-colors duration-300 whatsapp-pulse">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
          </div>
        </a>

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className={`w-12 h-12 bg-[#0a1e35] text-white hover:bg-copter-red rounded-sm flex items-center justify-center shadow-lg transition-all duration-500 ease-in-out ${
            scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
          aria-label="Scroll to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>
    </>
  );
}