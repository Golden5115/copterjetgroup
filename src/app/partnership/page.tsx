'use client';

import HomeCTA from '@/components/sections/HomeCTA';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

function useInView(options = {}) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (ref.current) observer.unobserve(ref.current);
      }
    }, { threshold: 0.15, ...options });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);

  return { ref, isInView };
}

const PARTNER_TYPES = [
  { label: 'Airlines', icon: 'M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5' },
  { label: 'Aircraft Owners', icon: 'M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z' },
  { label: 'Investors', icon: 'M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z' },
  { label: 'Governments', icon: 'M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z' },
  { label: 'Service Providers', icon: 'M11.42 15.17l-5.1-2.55a.75.75 0 010-1.24l5.1-2.55a1.5 1.5 0 011.16 0l5.1 2.55a.75.75 0 010 1.24l-5.1 2.55a1.5 1.5 0 01-1.16 0zM4.5 12.75l6.47 3.24a1.5 1.5 0 001.06 0l6.47-3.24' },
  { label: 'Infrastructure Developers', icon: 'M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z' },
  { label: 'Energy', icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z' },
  { label: 'Oil & Gas', icon: 'M12 2.25c-3.15 3.15-8.25 7.125-8.25 11.25a8.25 8.25 0 1016.5 0c0-4.125-5.1-8.1-8.25-11.25z' },
];

const COLLAB_AREAS = [
  {
    title: 'Supply Chain',
    desc: 'Optimizing procurement, distribution networks, and vendor relations for enhanced operational efficiency.',
    icon: 'M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244',
  },
  {
    title: 'Logistics',
    desc: 'Seamless coordination and management of complex transport, cargo, and delivery networks globally.',
    icon: 'M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12',
  },
  {
    title: 'Airline Development',
    desc: 'Strategic airline partnerships and joint venture operations that drive growth and expand market reach.',
    icon: 'M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5',
  },
  {
    title: 'Aircraft Operations',
    desc: 'End-to-end aircraft management, flight operations, and crew administration for maximum asset value.',
    icon: 'M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75',
  },
  {
    title: 'MRO Services',
    desc: 'Maintenance, repair, and overhaul solutions ensuring airworthiness and operational continuity.',
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
  },
  {
    title: 'Aviation Infrastructure',
    desc: 'Planning, development, and oversight of critical aviation infrastructure projects across Africa.',
    icon: 'M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21',
  },
  {
    title: 'Charter Services',
    desc: 'Premium private jet and helicopter charter for corporate, VIP, offshore, and humanitarian operations.',
    icon: 'M11.412 15.655L9.75 21.75l3.745-4.012M9.257 13.5H3.75l2.659-2.849m2.048-2.194L14.25 2.25 12 10.5h8.25l-4.707 5.043M8.457 8.457L3 3m5.457 5.457l7.086 7.086m0 0L21 21',
  },
  {
    title: 'Aerospace Investments',
    desc: 'Structured investment opportunities across the aviation and aerospace value chain.',
    icon: 'M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },

];

const PILLARS = [
  { word: 'Trust', desc: 'Transparent, accountable relationships built on integrity and mutual respect.' },
  { word: 'Expertise', desc: 'Deep aviation industry knowledge and multidisciplinary technical capabilities.' },
  { word: 'Vision', desc: 'A forward-looking, innovation-driven approach to opportunity and market expansion.' },
  { word: 'Excellence', desc: 'Unwavering commitment to operational standards, safety, and performance.' },
];

export default function PartnershipPage() {
  const { ref: introRef, isInView: introInView } = useInView();
  const { ref: pillarsRef, isInView: pillarsInView } = useInView();
  const { ref: partnersRef, isInView: partnersInView } = useInView();
  const { ref: areasRef, isInView: areasInView } = useInView();
  const { ref: closingRef, isInView: closingInView } = useInView();

  return (
    <div className="min-h-screen overflow-hidden selection:bg-copter-red selection:text-white">

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* HERO — Clean White Center Layout with Abstract Ribbons      */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="relative bg-white overflow-hidden min-h-[600px] lg:min-h-[700px] flex items-center justify-center pt-32 pb-20">

        {/* Abstract Flowing Ribbons Background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Main sweeping path */}
          <svg className="absolute w-[200%] h-auto -left-[50%] top-0 opacity-20" viewBox="0 0 1000 400" fill="none" preserveAspectRatio="none">
            <path d="M0,200 C300,400 400,-100 1000,150" stroke="url(#grad1)" strokeWidth="60" strokeLinecap="round" filter="blur(10px)" />
            <path d="M-100,250 C200,450 300,-50 900,200" stroke="url(#grad2)" strokeWidth="40" strokeLinecap="round" filter="blur(8px)" opacity="0.6" />
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#164878" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#164878" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#164878" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C40E14" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#C40E14" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#C40E14" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>

          {/* Soft glowing orbs to add depth */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-copter-blue/5 rounded-full blur-3xl mix-blend-multiply" />
          <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-copter-blue/5 rounded-full blur-3xl mix-blend-multiply" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-copter-red/5 rounded-full blur-3xl mix-blend-multiply" />
        </div>

        <div className="max-w-[60rem] mx-auto px-6 relative z-10 text-center flex flex-col items-center">

          {/* Pill Badge */}
          <div className="inline-flex items-center justify-center px-5 py-2 border border-gray-300 rounded-full mb-8 bg-white/50 backdrop-blur-sm">
            <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-[#0a1e35]">
              STRATEGIC GROWTH
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-[5rem] font-bold tracking-tight text-[#0a1e35] leading-[1.05] mb-8">
            Partnerships &<br className="hidden md:block" />
            <span className="text-copter-blue"> Joint Ventures.</span>
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed mb-10">
            Building the future of aviation through trust, collaboration, and shared ambition.
          </p>

          {/* Button */}
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-copter-blue text-white rounded-full font-bold tracking-wide hover:bg-blue-800 transition-all duration-300 shadow-[0_8px_20px_rgba(22,72,120,0.3)] hover:-translate-y-0.5 hover:shadow-[0_12px_25px_rgba(22,72,120,0.4)]"
          >
            Become a Partner
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* INTRO — The Philosophy                                    */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="bg-white pt-20 pb-24 lg:pt-28 lg:pb-32 px-6 lg:px-12">
        <div
          ref={introRef}
          className={`max-w-[72rem] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-start transition-all duration-1000 ${introInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          {/* Left accent + label */}
          <div className="lg:w-4/12 shrink-0">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[2px] bg-copter-red" />
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-copter-red">Our Belief</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-[#0a1e35]">
              The Cornerstone of <span className="text-copter-red">Sustainable Growth</span>
            </h2>
          </div>

          {/* Right copy */}
          <div className="lg:w-8/12 space-y-6">
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              At <strong className="text-copter-blue font-semibold">CopterJet International Group</strong>, we believe that strategic partnerships are the cornerstone of sustainable growth and aviation excellence. Through carefully structured partnerships and joint ventures, we collaborate with airlines, aircraft owners, energy, oil & gas, investors, governments, aviation service providers, and infrastructure developers to create innovative and mutually beneficial opportunities across the aviation value chain.
            </p>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Our partnership model is built on trust, expertise, shared vision, and operational excellence. We leverage our industry knowledge, global network, and technical capabilities to develop solutions that enhance operational efficiency, expand market access, optimize asset utilization, and unlock new revenue streams.
            </p>
          </div>
        </div>

        {/* Feature Image */}
        <div className={`max-w-[72rem] mx-auto mt-16 md:mt-24 w-full h-[400px] lg:h-[550px] rounded-[2rem] overflow-hidden relative shadow-2xl transition-all duration-1000 delay-300 ${introInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <Image
            src="/images/businesses/leasing.jpg"
            alt="Partnerships and Collaboration"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1e35]/60 via-transparent to-transparent mix-blend-multiply" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* PILLARS — Four foundation values in a horizontal strip    */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="bg-slate-50 border-y border-gray-100 py-20 lg:py-24 px-6 lg:px-12 overflow-hidden">
        <div
          ref={pillarsRef}
          className={`max-w-[80rem] mx-auto transition-all duration-1000 ${pillarsInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-copter-red mb-3 block">Our Foundation</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a1e35]">What Our Model is Built On</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {PILLARS.map((p, i) => (
              <div
                key={p.word}
                className="relative group"
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="bg-white rounded-2xl p-8 h-full border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1 overflow-hidden relative">
                  {/* Large background number */}
                  <span className="absolute -top-4 -right-2 text-[7rem] font-black text-copter-red/[0.04] leading-none select-none pointer-events-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <h3 className="text-2xl font-bold text-copter-blue mb-3 relative z-10">{p.word}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed relative z-10">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* PARTNER TYPES — Horizontal scrolling pill badges          */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 lg:py-24 px-6 lg:px-12">
        <div
          ref={partnersRef}
          className={`max-w-[80rem] mx-auto transition-all duration-1000 ${partnersInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div className="text-center mb-14">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-copter-red mb-3 block">Who We Partner With</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a1e35]">Our Collaborative Network</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
            {PARTNER_TYPES.map((p) => (
              <div
                key={p.label}
                className="flex items-center gap-3 bg-slate-50 border border-gray-100 rounded-full px-6 py-4 hover:bg-copter-blue hover:text-white hover:border-copter-blue transition-all duration-300 group cursor-default"
              >
                <div className="w-10 h-10 rounded-full bg-copter-red/10 group-hover:bg-white/20 flex items-center justify-center text-copter-red group-hover:text-white transition-colors duration-300 shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={p.icon} />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-[#0a1e35] group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                  {p.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* AREAS OF COLLABORATION — Offset cards on dark background  */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="relative bg-copter-blue py-24 lg:py-32 px-6 lg:px-12 overflow-hidden">
        {/* Subtle texture */}
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-[0.04]" />
        {/* Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-copter-red/10 blur-[140px] rounded-full translate-x-1/3 -translate-y-1/3" />

        <div className="max-w-[80rem] mx-auto relative z-10">
          <div
            ref={areasRef}
            className={`transition-all duration-1000 ${areasInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">
              {/* Left headline */}
              <div className="lg:w-5/12 shrink-0 text-white lg:sticky lg:top-40 self-start">
                <span className="text-xs font-bold tracking-[0.25em] uppercase text-copter-red mb-4 block">Where We Collaborate</span>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                  Areas of Collaboration
                </h2>
                <p className="text-white/80 text-xl lg:text-2xl leading-relaxed">
                  Whether supporting airline development, aircraft operations, MRO services, aviation infrastructure projects, charter services, or aerospace investments, CopterJet provides the strategic leadership and operational expertise required to transform opportunities into lasting success.
                </p>
              </div>

              {/* Right cards */}
              <div className="lg:w-7/12 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {COLLAB_AREAS.map((area, idx) => (
                  <div
                    key={area.title}
                    className="bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-2xl p-7 hover:bg-white/[0.12] transition-all duration-300 group"
                    style={{ transitionDelay: `${idx * 80}ms` }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-copter-red/10 flex items-center justify-center text-copter-red mb-5 group-hover:bg-copter-red group-hover:text-white transition-all duration-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={area.icon} />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3">{area.title}</h4>
                    <p className="text-base text-white/70 leading-relaxed">{area.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* CLOSING STATEMENT — Bold centered text                    */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="bg-white py-24 lg:py-32 px-6 lg:px-12 text-center">
        <div
          ref={closingRef}
          className={`max-w-4xl mx-auto transition-all duration-1000 ${closingInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div className="inline-flex items-center gap-3 bg-copter-red/5 rounded-full px-5 py-2.5 mb-10">
            <span className="w-2 h-2 rounded-full bg-copter-red animate-pulse" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-copter-red">Shaping the Future</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight text-[#0a1e35] mb-8">
            Together with our partners, we are shaping the future of aviation
          </h2>
          <p className="text-xl text-gray-500 font-light leading-relaxed mb-12">
            — creating value, driving innovation, and delivering sustainable growth across regional and international markets.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-copter-blue text-white px-8 py-4 rounded-full font-bold tracking-wide hover:bg-copter-red transition-all duration-300 hover:-translate-y-0.5 shadow-[0_8px_24px_rgba(22,72,120,0.25)]"
          >
            <span>BECOME A PARTNER</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* CTA                                                       */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <HomeCTA />
    </div>
  );
}
