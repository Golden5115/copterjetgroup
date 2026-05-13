'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const slides = [
  {
    id: 1,
    image: '/images/hero-bg-01.jpg',
    tag: 'Global Procurement & Supply Chain',
    headlinePart1: 'Redefining Africa\'s',
    headlineAccent: 'Aviation & Aerospace',
    headlinePart2: 'Ecosystem.',
    body: 'Global procurement and supply chain solutions for aircraft parts, components, engines, and ground support equipment — delivered with precision and speed.',
    cta: { label: 'Our Solutions', href: '/services' },
  },
  {
    id: 2,
    image: '/images/hero-bg-2.4.jpg',
    tag: 'Operational & Technical Excellence',
    headlinePart1: 'Delivering',
    headlineAccent: 'Audacious & Dynamic',
    headlinePart2: 'Solutions.',
    body: 'Operational and technical expertise that keeps fleets airworthy, ground crews equipped, and aviation businesses performing at their peak.',
    cta: { label: 'Our Services', href: '/services' },
  },
  {
    id: 3,
    image: '/images/hero-bg-3.jpg',
    tag: 'Innovation & Excellence',
    headlinePart1: 'Specialised',
    headlineAccent: 'End-to-End Services',
    headlinePart2: 'Built to Last.',
    body: 'A single trusted partner across procurement, logistics, maintenance, leasing, and flight operations — all backed by a commitment to innovation and excellence.',
    cta: { label: 'Partner With Us', href: '/partnership' },
  },
];

const SLIDE_DURATION = 7000;

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [progress, setProgress] = useState(0);

  const goTo = useCallback((idx: number) => {
    if (idx === current || animating) return;
    setAnimating(true);
    setProgress(0);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 500);
  }, [current, animating]);

  // Auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setProgress(0);
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % slides.length);
        setAnimating(false);
      }, 500);
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, []);

  // Progress bar
  useEffect(() => {
    setProgress(0);
    const tick = 50;
    const steps = SLIDE_DURATION / tick;
    let count = 0;
    const timer = setInterval(() => {
      count++;
      setProgress((count / steps) * 100);
      if (count >= steps) clearInterval(timer);
    }, tick);
    return () => clearInterval(timer);
  }, [current]);

  const slide = slides[current];

  return (
    // 1. Flex Layout applied here.
    // 2. h-[calc(100svh-120px)] strictly calculates viewport minus navbar.
    // 3. min-h-[580px] ensures it fits on 13-inch laptops without overflowing.
    <section className="relative w-full h-[calc(100svh-120px)] min-h-[580px] overflow-hidden bg-[#060e1a] flex flex-col justify-between">

      {/* ── Background Images ── */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image
            src={s.image}
            alt={s.headlinePart1}
            fill
            className="object-cover object-center transform scale-105"
            priority={i === 0}
          />
          {/* Multi-layer darkening */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#030912]/90 via-[#030912]/65 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030912]/80 via-transparent to-[#030912]/30" />
        </div>
      ))}

      {/* ── Brand Diagonal Element ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
        <svg
          viewBox="0 0 1440 900"
          fill="none"
          className="absolute bottom-0 right-0 w-full h-full opacity-[0.07]"
          preserveAspectRatio="xMaxYMax slice"
        >
          <path d="M1440 900 L1440 0 L950 0 Q1250 450 1440 900Z" fill="#C40E14" />
          <path d="M1440 900 L1440 180 L1150 0 Q1350 450 1440 900Z" fill="#164878" />
        </svg>
      </div>

      {/* ── Large Background Slide Number ── */}
      <div
        className="absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 z-[2] pointer-events-none select-none"
        style={{
          fontSize: 'clamp(140px, 22vw, 320px)',
          fontWeight: 800,
          lineHeight: 1,
          color: 'rgba(255,255,255,0.025)',
          letterSpacing: '-0.05em',
          transition: 'opacity 0.5s',
          opacity: animating ? 0 : 1,
        }}
      >
        {String(current + 1).padStart(2, '0')}
      </div>

      {/* ── Vertical Right Panel ── */}
      <div className="absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className="relative flex items-center justify-center"
          >
            <span
              className="block rounded-full transition-all duration-500"
              style={{
                width: i === current ? '3px' : '3px',
                height: i === current ? '32px' : '12px',
                background: i === current ? '#C40E14' : 'rgba(255,255,255,0.3)',
              }}
            />
          </button>
        ))}
        <span className="text-[10px] font-bold text-white/30 tracking-widest mt-2 writing-mode-vertical"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>
      </div>

      {/* ── Main Content (Flex-grow pushes bottom bar down) ── */}
      <div className="relative z-10 flex-grow flex flex-col justify-center w-full">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div
            className="max-w-3xl transition-all duration-500"
            style={{ opacity: animating ? 0 : 1, transform: animating ? 'translateY(16px)' : 'translateY(0)' }}
          >
            {/* Tag pill */}
            <div className="flex items-center gap-3 mb-5 md:mb-7">
              <span className="h-[2px] w-10 bg-copter-red block flex-shrink-0" />
              <span
                className="text-[9px] md:text-[10px] font-bold tracking-[0.22em] uppercase"
                style={{ color: 'rgba(255,255,255,0.55)' }}
              >
                {slide.tag}
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-bold leading-[1.07] mb-5 md:mb-6 text-white"
              style={{ fontSize: 'clamp(2rem, 5.5vw, 4.25rem)' }}
            >
              {slide.headlinePart1}{' '}
              <span className="text-white">{slide.headlineAccent}</span>
              {' '}{slide.headlinePart2}
            </h1>

            {/* Thin divider */}
            <div className="flex items-center gap-4 mb-5 md:mb-6">
              <span className="h-[1px] w-12 bg-copter-red/60 block" />
              <span className="h-[1px] flex-1 max-w-[180px]" style={{ background: 'rgba(255,255,255,0.1)' }} />
            </div>

            {/* Body */}
            <p
              className="text-sm md:text-[15.5px] leading-relaxed mb-8 md:mb-10 max-w-xl font-medium"
              style={{ color: 'rgba(255,255,255,0.65)' }}
            >
              {slide.body}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link
                href={slide.cta.href}
                className="inline-flex items-center gap-2.5 bg-copter-red text-white px-6 md:px-8 py-3 md:py-3.5 text-[10px] md:text-[11.5px] font-bold tracking-[0.15em] uppercase hover:bg-red-800 transition-colors"
              >
                {slide.cta.label}
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 text-white px-6 md:px-8 py-3 md:py-3.5 text-[10px] md:text-[11.5px] font-bold tracking-[0.15em] uppercase transition-colors"
                style={{ border: '1px solid rgba(255,255,255,0.25)' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                GET IN TOUCH
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM STACK: Progress Bar + Action Dock (No absolute positioning!) ── */}
      <div className="relative z-30 w-full flex flex-col gap-5 md:gap-8 pb-6 md:pb-8 pt-4">
        
        {/* Progress Bar (Now naturally sits above the dock) */}
        <div className="w-full px-6 lg:px-12 pointer-events-none">
          <div className="max-w-7xl mx-auto">
            <div className="h-[1px] w-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <div
                className="h-full bg-copter-red transition-none"
                style={{ width: `${progress}%`, transition: 'width 0.05s linear' }}
              />
            </div>
          </div>
        </div>

        {/* Action Dock */}
        <div className="w-full px-4 sm:px-6 lg:px-12">
          <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 p-2 rounded-2xl md:rounded-full flex flex-col md:flex-row shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            
            <Link href="/rfp" className="flex-1 px-4 sm:px-6 py-4 flex items-center justify-center gap-4 rounded-[1rem] md:rounded-full hover:bg-white/10 transition-colors group">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:border-copter-red group-hover:text-copter-red transition-colors flex-shrink-0">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <div className="text-left">
                <h3 className="text-white font-bold tracking-widest text-[11px] md:text-xs uppercase whitespace-nowrap">Submit RFP</h3>
                <p className="text-gray-400 text-[8px] md:text-[9px] tracking-widest uppercase mt-0.5 hidden sm:block">Request for Proposal</p>
              </div>
            </Link>
            
            <div className="hidden md:block w-px bg-white/20 my-3"></div>
            <div className="md:hidden h-px bg-white/10 mx-6"></div>
            
            <Link href="/rfq" className="flex-1 px-4 sm:px-6 py-4 flex items-center justify-center gap-4 rounded-[1rem] md:rounded-full hover:bg-white/10 transition-colors group">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:border-copter-red group-hover:text-copter-red transition-colors flex-shrink-0">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              </div>
              <div className="text-left">
                <h3 className="text-white font-bold tracking-widest text-[11px] md:text-xs uppercase whitespace-nowrap">Submit RFQ</h3>
                <p className="text-gray-400 text-[8px] md:text-[9px] tracking-widest uppercase mt-0.5 hidden sm:block">Request for Quotation</p>
              </div>
            </Link>

            <div className="hidden md:block w-px bg-white/20 my-3"></div>
            <div className="md:hidden h-px bg-white/10 mx-6"></div>
            
            <Link href="/partnership" className="flex-1 px-4 sm:px-6 py-4 flex items-center justify-center gap-4 rounded-[1rem] md:rounded-full hover:bg-white/10 transition-colors group">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:border-copter-red group-hover:text-copter-red transition-colors flex-shrink-0">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
              <div className="text-left">
                <h3 className="text-white font-bold tracking-widest text-[11px] md:text-xs uppercase whitespace-nowrap">Partnership</h3>
                <p className="text-gray-400 text-[8px] md:text-[9px] tracking-widest uppercase mt-0.5 hidden sm:block">Joint Ventures & Alliances</p>
              </div>
            </Link>

          </div>
        </div>

      </div>

    </section>
  );
}