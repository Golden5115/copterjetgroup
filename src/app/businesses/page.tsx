'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// ══════════════════════════════════════════════════════════════
// HOOKS
// ══════════════════════════════════════════════════════════════

function useInView(options: { threshold?: number } = { threshold: 0.15 }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
    }, { threshold: options.threshold });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { ref, isVisible };
}

// ══════════════════════════════════════════════════════════════
// BUSINESS DATA & ICONS
// ══════════════════════════════════════════════════════════════

const businesses = [
  {
    id: 'spares-components',
    title: 'Spares & Components',
    desc: 'CopterJet Spares & Components delivers trusted aviation supply chain solutions through the sourcing, trading, and distribution of certified aircraft spares, components, engines, and technical inventory. We support operators with reliable access to mission-critical aviation assets that enhance operational continuity, safety, and fleet performance.',
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
    image: '/images/businesses/spares2.jpg'
  },
  {
    id: 'ground-equipment',
    title: 'Ground Equipment',
    desc: 'CopterJet Ground Equipment provides dependable aviation ground support solutions tailored to airport, airline, and operational environments. From procurement to supply of specialized equipment, we help clients strengthen efficiency, turnaround capability, and operational readiness.',
    icon: 'M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12',
    image: '/images/businesses/gse.jpg'
  },
  {
    id: 'logistics',
    title: 'Logistics',
    desc: 'CopterJet Logistics specializes in responsive air freight, technical logistics, and supply chain coordination for time-sensitive aviation and industrial operations. Our integrated logistics framework ensures the seamless movement of critical cargo, equipment, and operational materials across global networks.',
    icon: 'M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418',
    image: '/images/businesses/logistics.jpg'
  },
  {
    id: 'maintenance',
    title: 'Asset Management',
    desc: 'CopterJet Asset Management delivers strategic oversight, commercialisation, and optimisation solutions for private jets and helicopter assets across their operational life-cycle. We provide comprehensive aircraft management services covering private and commercial operations, technical oversight, crewing, maintenance coordination, regulatory compliance, and operational support.',
    icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
    image: '/images/businesses/asset-management2.jpg'
  },
  {
    id: 'services',
    title: 'Services',
    desc: 'CopterJet Services provides specialized aviation consultancy, advisory, infrastructure development, and operational support solutions designed to drive growth, efficiency, and industry transformation. We combine technical expertise with strategic insight to support aviation stakeholders across Africa and beyond.',
    icon: 'M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z',
    image: '/images/businesses/services2.jpg'
  },
  {
    id: 'leasing',
    title: 'Leasing',
    desc: 'CopterJet Leasing offers flexible aircraft and aviation equipment leasing solutions that enable operators to scale operations efficiently while optimizing financial and operational performance. Our leasing structures are designed to support sustainability, accessibility, and business continuity within dynamic aviation markets.',
    icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z',
    image: '/images/businesses/leasing2.jpg'
  },
  {
    id: 'flight-operations',
    title: 'Flight Operations',
    desc: 'CopterJet Flight Operations delivers premium jet and helicopter operational services with a commitment to safety, precision, discretion, and reliability. From charter services to aircraft management and joint venture operations, we provide integrated flight solutions tailored to commercial, corporate, humanitarian, and specialized aviation missions.',
    icon: 'M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5',
    image: '/images/businesses/flight-ops.jpg'
  }
];

// ══════════════════════════════════════════════════════════════
// COMPONENTS
// ══════════════════════════════════════════════════════════════

function BusinessDivision({ data, index }: { data: typeof businesses[0]; index: number }) {
  const { ref, isVisible } = useInView({ threshold: 0.2 });
  const isEven = index % 2 === 0;

  return (
    <div id={data.id} ref={ref} className="relative py-14 lg:py-20 border-b border-white/[0.04] last:border-0 overflow-hidden group scroll-mt-[100px]">

      {/* Faint watermark number */}
      <div className={`absolute top-1/2 -translate-y-1/2 ${isEven ? '-right-6' : '-left-6'} text-[18vw] font-bold text-white/[0.012] pointer-events-none select-none leading-none`}>
        0{index + 1}
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center`}>

          {/* ── Image Side ── */}
          <div
            className={`w-full lg:w-5/12 transition-all duration-[1.2s] cubic-ease ${isVisible
              ? 'opacity-100 translate-x-0 scale-100'
              : isEven
                ? 'opacity-0 -translate-x-16 scale-95'
                : 'opacity-0 translate-x-16 scale-95'
              }`}
          >
            <div className="relative w-full aspect-[3/2] max-w-md mx-auto overflow-hidden bg-[#0c2d4d] rounded-lg shadow-xl">

              {/* Image with clip-path reveal */}
              <div
                className={`absolute inset-0 transition-all duration-[1.4s] cubic-ease ${isVisible ? 'clip-reveal-visible' : 'clip-reveal-hidden'
                  }`}
                style={{ transitionDelay: '200ms' }}
              >
                <Image
                  src={data.image}
                  alt={data.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out"
                />
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030912]/80 via-transparent to-[#030912]/20 z-10" />
              <div className="absolute inset-0 bg-copter-blue/10 mix-blend-multiply group-hover:bg-transparent transition-colors duration-700 z-10" />

              {/* Frosted Icon Badge */}
              <div className="absolute bottom-4 left-4 w-11 h-11 bg-[#030912]/70 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:bg-copter-red group-hover:border-copter-red/60 transition-all duration-500 z-20 rounded badge-shimmer">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={data.icon} />
                </svg>
              </div>

              {/* Bottom wipe accent */}
              <div className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-copter-red to-copter-blue w-0 group-hover:w-full transition-all duration-700 ease-out z-20" />
            </div>
          </div>

          {/* ── Text Side ── */}
          <div className={`w-full lg:w-7/12 ${isEven ? '' : 'lg:text-right'}`}>

            {/* Division label */}
            <div
              className={`flex items-center gap-3 mb-4 transition-all duration-700 cubic-ease ${isEven ? '' : 'lg:justify-end'} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              style={{ transitionDelay: '300ms' }}
            >
              <div className="w-8 h-[2px] bg-copter-red" />
              <span className="text-copter-red font-bold tracking-[0.2em] text-[10px] uppercase">Division 0{index + 1}</span>
            </div>

            {/* Title */}
            <h2
              className={`text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-[1.15] tracking-tight mb-5 transition-all duration-900 cubic-ease ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              style={{ transitionDelay: '450ms' }}
            >
              {data.title}
            </h2>

            {/* Full Description */}
            <p
              className={`text-white/55 text-[15px] md:text-base leading-[1.85] transition-all duration-900 cubic-ease ${isEven ? '' : 'lg:ml-auto'} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              style={{ transitionDelay: '600ms' }}
            >
              {data.desc}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// PAGE COMPONENT
// ══════════════════════════════════════════════════════════════

export default function BusinessesPage() {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="min-h-screen bg-[#030912] overflow-hidden">

      <style>{`
        /* Premium easing */
        .cubic-ease { transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }

        /* Clip-path image reveal */
        .clip-reveal-hidden { clip-path: inset(0 100% 0 0); }
        .clip-reveal-visible { clip-path: inset(0 0% 0 0); }

        /* Badge shimmer */
        @keyframes shimmer {
          0% { box-shadow: 0 0 0 0 rgba(196,14,20,0); }
          50% { box-shadow: 0 0 16px 2px rgba(196,14,20,0.3); }
          100% { box-shadow: 0 0 0 0 rgba(196,14,20,0); }
        }
        .group:hover .badge-shimmer { animation: shimmer 2s ease-in-out infinite; }

        /* Hero line entrance */
        @keyframes heroLineIn {
          from { opacity: 0; transform: translateY(40px) skewY(1.5deg); filter: blur(6px); }
          to   { opacity: 1; transform: translateY(0) skewY(0deg); filter: blur(0); }
        }
        .hero-line-hidden { opacity: 0; }
        .hero-line-visible { animation: heroLineIn 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards; }

        /* Transition duration utilities */
        .duration-900 { transition-duration: 900ms; }
      `}</style>

      {/* ════════════════════════════════════════════════════════
          1. HERO SECTION
      ════════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[60svh] flex flex-col items-center justify-center overflow-hidden pt-24 pb-14 bg-[#030912]">

        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#164878]/15 via-[#030912] to-[#030912]" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-copter-red/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-copter-blue/8 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-10 text-center">
          <div className={`flex items-center justify-center gap-4 mb-6 transition-all duration-700 delay-300 cubic-ease ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="w-10 h-[2px] bg-copter-red" />
            <span className="text-white font-bold tracking-[0.3em] text-[10px] uppercase">Integrated Solutions</span>
            <div className="w-10 h-[2px] bg-copter-red" />
          </div>

          <h1 className="mb-8" style={{ perspective: '1000px' }}>
            <span className="block overflow-hidden pb-1">
              <span className={`block text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-white ${heroVisible ? 'hero-line-visible' : 'hero-line-hidden'}`} style={{ animationDelay: '500ms' }}>
                Our Businesses
              </span>
            </span>
          </h1>

          <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-1000 cubic-ease ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <p className="text-white/70 text-base md:text-lg leading-[1.85] mb-5">
              Copterjet International Group is a diversified aviation and specialist services organization structured to deliver integrated solutions across Africa&apos;s aerospace supply chain, aviation operations, technical services, logistics, and infrastructure ecosystem.
            </p>
            <p className="text-white/50 text-sm md:text-base leading-[1.85] mb-5 max-w-3xl mx-auto">
              Operating through its specialized business divisions — CopterJet Spares &amp; Components, CopterJet Ground Equipment, CopterJet Logistics, CopterJet Asset Management, CopterJet Services, CopterJet Leasing, and CopterJet Flight Operations — the Group provides end-to-end aviation solutions tailored to commercial, government, humanitarian, oilfield, and private sector operations.
            </p>
            <p className="text-white/40 text-sm leading-[1.85] max-w-3xl mx-auto">
              Driven by innovation, operational excellence, and strategic partnerships, Copterjet International Group is positioned to support sustainable aviation growth, infrastructure development, and operational efficiency across Africa and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          2. BUSINESS DIVISIONS
      ════════════════════════════════════════════════════════ */}
      <section className="bg-[#060e1a] relative z-20">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {businesses.map((business, index) => (
          <BusinessDivision key={index} data={business} index={index} />
        ))}
      </section>

      {/* Bottom accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-copter-blue via-copter-red to-copter-blue" />
    </main>
  );
}