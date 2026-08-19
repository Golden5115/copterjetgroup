'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// ══════════════════════════════════════════════════════════════
// HOOKS
// ══════════════════════════════════════════════════════════════

function useInView<T extends HTMLElement = HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
    }, { threshold });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { ref, isVisible };
}

// ══════════════════════════════════════════════════════════════
// DATA
// ══════════════════════════════════════════════════════════════

type Insight = {
  year: string;
  title: string;
  url: string;
  source: string;
  category: string;
  description: string;
};

const insights: Insight[] = [
  {
    year: "2026",
    title: "Nigeria's Minister urges Africa to unify African skies",
    url: "https://aviationweek.com/",
    source: "Aviation Week",
    category: "Policy & Regulation",
    description: "A bold call for a unified continental airspace to boost intra-African connectivity, reduce costs, and position the continent as a global aviation hub."
  },
  {
    year: "2026",
    title: "Airbus strategic cooperation with Nigeria",
    url: "https://aviationweek.com/",
    source: "Aviation Week",
    category: "Partnerships",
    description: "Airbus deepens its footprint in West Africa with a landmark strategic cooperation agreement, signalling major aerospace investment opportunities."
  },
  {
    year: "2026",
    title: "Nigeria National Aircraft Leasing Company",
    url: "https://aviationweek.com/",
    source: "Aviation Week",
    category: "Finance & Leasing",
    description: "Nigeria establishes a national aircraft leasing entity to address fleet acquisition challenges and reduce dependency on foreign lessors."
  },
  {
    year: "2026",
    title: "Nigerian airlines suspend strike",
    url: "https://www.reuters.com/",
    source: "Reuters",
    category: "Operations",
    description: "After days of industrial action that grounded domestic flights, Nigerian airlines reach an agreement to resume operations."
  },
  {
    year: "2026",
    title: "ICAO Aviation Climate Week 2026",
    url: "https://www.icao.int/events/env/icao-aviation-climate-week-2026",
    source: "ICAO",
    category: "Sustainability",
    description: "Global leaders convene to discuss sustainable aviation fuels, carbon offset mechanisms, and the path to net-zero emissions by 2050."
  },
  {
    year: "2026",
    title: "African airlines and jet fuel challenges",
    url: "https://apnews.com/",
    source: "AP News",
    category: "Supply Chain",
    description: "Rising jet fuel costs and supply disruptions across Africa threaten airline profitability and route expansion in one of the world's fastest-growing markets."
  },
  {
    year: "2025",
    title: "10th ICAO AFI Aviation Week",
    url: "https://www.icao.int/",
    source: "ICAO",
    category: "Events",
    description: "The premier gathering for African and Indian Ocean aviation stakeholders, focusing on safety, air navigation, and regional cooperation frameworks."
  },
  {
    year: "2025",
    title: "Paris Air Show 2025",
    url: "https://www.siae.fr/en/",
    source: "SIAE",
    category: "Events",
    description: "The world's largest aerospace exhibition returns to Le Bourget with record-breaking orders, next-gen aircraft reveals, and defence showcases."
  },
  {
    year: "2024",
    title: "9th ICAO AFI Aviation Week",
    url: "https://www.icao.int/",
    source: "ICAO",
    category: "Events",
    description: "Key milestones in African aviation safety and infrastructure development discussed among 54 member states and international partners."
  },
  {
    year: "2024–2026",
    title: "Nigeria Ministry of Aviation News",
    url: "https://aviation.gov.ng/",
    source: "Ministry of Aviation",
    category: "Government",
    description: "Ongoing policy updates, regulatory reforms, and infrastructure initiatives shaping the future of Nigeria's aviation sector."
  }
];

const categoryColors: Record<string, { bg: string; text: string; dot: string }> = {
  "Policy & Regulation": { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" },
  "Partnerships": { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
  "Finance & Leasing": { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
  "Operations": { bg: "bg-orange-50", text: "text-orange-700", dot: "bg-orange-500" },
  "Sustainability": { bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500" },
  "Supply Chain": { bg: "bg-rose-50", text: "text-rose-700", dot: "bg-rose-500" },
  "Events": { bg: "bg-purple-50", text: "text-purple-700", dot: "bg-purple-500" },
  "Government": { bg: "bg-slate-100", text: "text-slate-700", dot: "bg-slate-500" },
};

// ══════════════════════════════════════════════════════════════
// COMPONENTS
// ══════════════════════════════════════════════════════════════

function FeaturedCard({ insight, index }: { insight: Insight; index: number }) {
  const { ref, isVisible } = useInView<HTMLAnchorElement>(0.1);
  const cat = categoryColors[insight.category] || categoryColors["Government"];

  return (
    <a
      ref={ref}
      href={insight.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Background gradient based on category */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1e35] via-[#112e50] to-[#1a4070] group-hover:from-[#112e50] group-hover:via-[#1a4070] group-hover:to-[#204a7a] transition-all duration-500" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/[0.03] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-700" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/[0.02] rounded-full translate-y-1/2 -translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
      
      {/* Red accent line */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-copter-red via-copter-red to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

      <div className="relative z-10 p-7 md:p-8 flex flex-col h-full min-h-[280px]">
        {/* Top row */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-white/50">{insight.year}</span>
            <span className="w-px h-4 bg-white/10" />
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${cat.bg} ${cat.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${cat.dot}`} />
              {insight.category}
            </span>
          </div>
          <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center group-hover:border-copter-red group-hover:bg-copter-red transition-all duration-300">
            <svg className="w-4 h-4 text-white/40 group-hover:text-white transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold text-white mb-4 leading-tight group-hover:text-copter-red transition-colors duration-300 flex-grow">
          {insight.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-white/50 leading-relaxed mb-6 line-clamp-3 group-hover:text-white/70 transition-colors duration-300">
          {insight.description}
        </p>

        {/* Source footer */}
        <div className="flex items-center justify-between pt-5 border-t border-white/[0.06]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-white/5 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-white/30 uppercase tracking-wider">{insight.source}</span>
          </div>
          <span className="text-[11px] font-bold text-copter-red tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5">
            Read More
            <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
}

function TimelineItem({ insight, index, side }: { insight: Insight; index: number; side: 'left' | 'right' }) {
  const { ref, isVisible } = useInView<HTMLDivElement>(0.1);
  const cat = categoryColors[insight.category] || categoryColors["Government"];

  return (
    <div
      ref={ref}
      className={`relative flex items-center w-full mb-0 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Desktop: alternating layout */}
      <div className={`hidden lg:flex w-full items-center ${side === 'left' ? 'flex-row' : 'flex-row-reverse'}`}>
        {/* Card */}
        <div className="w-[calc(50%-30px)]">
          <a
            href={insight.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group block bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(10,30,53,0.12)] hover:border-copter-red/30 transition-all duration-400 hover:-translate-y-1`}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${cat.bg} ${cat.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${cat.dot}`} />
                {insight.category}
              </span>
              <span className="text-[11px] font-semibold text-gray-300 tracking-wider">{insight.source}</span>
            </div>
            <h4 className="text-[15px] font-bold text-copter-blue group-hover:text-copter-red transition-colors duration-300 leading-snug mb-3">
              {insight.title}
            </h4>
            <p className="text-[13px] text-gray-400 leading-relaxed line-clamp-2">
              {insight.description}
            </p>
            <div className="flex items-center gap-1.5 mt-4 text-[11px] font-bold text-copter-red opacity-0 group-hover:opacity-100 transition-opacity duration-300 tracking-wider uppercase">
              Read Article
              <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </a>
        </div>

        {/* Center dot + line */}
        <div className="flex flex-col items-center w-[60px] flex-shrink-0 relative">
          <div className="w-4 h-4 rounded-full bg-copter-red border-4 border-white shadow-md z-10" />
        </div>

        {/* Year label (other side) */}
        <div className="w-[calc(50%-30px)] flex items-center">
          <span className={`text-[13px] font-bold text-copter-blue/40 tracking-[0.2em] uppercase ${side === 'left' ? '' : 'ml-auto'}`}>
            {insight.year}
          </span>
        </div>
      </div>

      {/* Mobile: single column */}
      <div className="lg:hidden flex w-full">
        <div className="flex flex-col items-center mr-5 flex-shrink-0">
          <div className="w-3.5 h-3.5 rounded-full bg-copter-red border-[3px] border-white shadow-md z-10" />
        </div>
        <div className="flex-1 pb-8">
          <span className="text-[11px] font-bold text-gray-300 tracking-[0.2em] uppercase mb-2 block">{insight.year}</span>
          <a
            href={insight.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-white rounded-xl p-5 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(10,30,53,0.1)] hover:border-copter-red/30 transition-all duration-300"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase ${cat.bg} ${cat.text}`}>
                <span className={`w-1 h-1 rounded-full ${cat.dot}`} />
                {insight.category}
              </span>
            </div>
            <h4 className="text-sm font-bold text-copter-blue group-hover:text-copter-red transition-colors leading-snug mb-2">
              {insight.title}
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{insight.description}</p>
            <span className="text-[10px] font-semibold text-gray-300 mt-3 block">{insight.source}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// PAGE
// ══════════════════════════════════════════════════════════════

export default function InsightsPage() {
  const heroRef = useInView<HTMLDivElement>(0.1);
  const statsRef = useInView<HTMLDivElement>(0.15);
  const featuredRef = useInView<HTMLDivElement>(0.05);
  const timelineRef = useInView<HTMLDivElement>(0.05);

  // Split insights: first 3 are featured, rest go in timeline
  const featured = insights.slice(0, 3);
  const timeline = insights.slice(3);

  return (
    <>
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-1.5deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.3; }
        }
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .float-slow { animation: float-slow 8s ease-in-out infinite; }
        .float-slower { animation: float-slower 10s ease-in-out infinite; }
        .pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
      `}</style>

      <div className="bg-[#f7f8fa] min-h-screen">
        {/* ═══════ HERO ═══════ */}
        <section className="relative min-h-[55vh] md:min-h-[60vh] flex items-center overflow-hidden bg-gradient-to-br from-[#0a1e35] via-[#0d2844] to-[#122d4f]">
          {/* Decorative floating shapes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[15%] left-[8%] w-64 h-64 rounded-full bg-copter-red/[0.06] blur-3xl float-slow" />
            <div className="absolute bottom-[10%] right-[5%] w-80 h-80 rounded-full bg-blue-400/[0.04] blur-3xl float-slower" />
            <div className="absolute top-[40%] right-[20%] w-40 h-40 rounded-full bg-white/[0.02] blur-2xl pulse-glow" />
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          </div>

          {/* Hero content */}
          <div
            ref={heroRef.ref}
            className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 w-full transition-all duration-1000 ${heroRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-8">
                <span className="w-10 h-[2px] bg-copter-red" />
                <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-copter-red">Aviation Intelligence</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-[1.08] tracking-tight">
                Industry<br />
                <span className="bg-gradient-to-r from-copter-red via-red-400 to-copter-red bg-clip-text text-transparent">Insights</span>
              </h1>

              <p className="text-lg md:text-xl text-white/50 max-w-xl leading-relaxed mb-10">
                Tracking the pulse of global aviation — from policy shifts and strategic alliances to sustainability milestones shaping Africa&apos;s aerospace future.
              </p>

              {/* Stats row */}
              <div
                ref={statsRef.ref}
                className={`flex flex-wrap gap-8 md:gap-12 transition-all duration-700 delay-300 ${statsRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              >
                {[
                  { value: "10+", label: "Key Developments" },
                  { value: "2024–26", label: "Coverage Span" },
                  { value: "6+", label: "Global Sources" }
                ].map(stat => (
                  <div key={stat.label} className="flex flex-col">
                    <span className="text-2xl md:text-3xl font-bold text-white">{stat.value}</span>
                    <span className="text-[11px] font-semibold text-white/30 tracking-widest uppercase mt-1">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom decorative fade */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f7f8fa] to-transparent" />
        </section>

        {/* ═══════ FEATURED INSIGHTS ═══════ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 mb-24">
          <div
            ref={featuredRef.ref}
            className={`mb-12 transition-all duration-700 ${featuredRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="flex items-center gap-4 mb-2">
              <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-copter-red">Featured</span>
              <span className="flex-1 h-px bg-gray-200" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((item, idx) => (
              <FeaturedCard key={idx} insight={item} index={idx} />
            ))}
            {/* 4th Card: Picture Card */}
            <div className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0c2340] to-[#163a60] border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_40px_rgba(196,14,20,0.15)] hover:border-copter-red/40 transition-all duration-500 min-h-[280px] h-full flex flex-col justify-end">
              <Image
                src="/images/DSC_1898@3269977.JPG"
                alt="CopterJet Aviation Operations"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1e35]/80 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </section>

        {/* ═══════ TIMELINE SECTION ═══════ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
          <div
            ref={timelineRef.ref}
            className={`mb-16 transition-all duration-700 ${timelineRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="flex items-center gap-4 mb-2">
              <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-copter-red">All Developments</span>
              <span className="flex-1 h-px bg-gray-200" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-copter-blue mt-6">
              Aviation Timeline
            </h2>
            <p className="text-gray-400 mt-3 max-w-xl">
              A chronological view of the most significant events and policy changes across the aviation and aerospace landscape.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical center line (desktop) */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-copter-red/20 via-gray-200 to-transparent -translate-x-1/2" />
            {/* Vertical left line (mobile) */}
            <div className="lg:hidden absolute left-[6px] top-0 bottom-0 w-px bg-gradient-to-b from-copter-red/30 via-gray-200 to-transparent" />

            {timeline.map((item, idx) => (
              <TimelineItem key={idx} insight={item} index={idx} side={idx % 2 === 0 ? 'left' : 'right'} />
            ))}
          </div>
        </section>

        {/* ═══════ CTA SECTION ═══════ */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1e35] via-[#0d2844] to-[#1a4070] py-20 md:py-28">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-copter-red/[0.05] rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/[0.04] rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6">
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-copter-red mb-6 block">Stay Ahead</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Partner with CopterJet for<br />
              <span className="text-copter-red">Strategic Aviation Intelligence</span>
            </h2>
            <p className="text-white/40 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Our team monitors global aviation developments to keep our clients informed and positioned for success. Get in touch to learn how we can support your operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-copter-red text-white font-bold text-[12px] tracking-[0.15em] uppercase px-8 py-4 rounded-sm hover:bg-red-700 hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-copter-red/20"
              >
                Contact Us
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="/rfp"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/20 text-white font-bold text-[12px] tracking-[0.15em] uppercase px-8 py-4 rounded-sm hover:border-white/40 hover:bg-white/5 transition-all duration-300"
              >
                Submit RFP
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
