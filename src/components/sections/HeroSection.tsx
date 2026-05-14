'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // The 3 sliders with your custom typography
  const slides = [
    {
      id: 1,
      image: "/images/hero-bg-network2.jpg", 
      headline: <>Bridging Africa's<br />Aerospace Supply <br />Chain & Operations <br />Ecosystem</>,
      subtext: "Building a Connected, efficient & resilient ecosystem for sustainable growth.",
    },
    {
      id: 2,
      image: "/images/hero-bg-2.7.jpg", 
      headline: <>Audacious &<br />Dynamic Operational &<br /> Technical Solutions.</>,
      subtext: "Delivering unmatched technical frameworks and operational infrastructure designed specifically for the modern aviation industry.",
    },
    {
      id: 3,
      image: "/images/hero-bg-3.1.jpg", 
      headline: <>Built on Innovations <br />& Excellence.</>,
      subtext: "All operations are backed by specialized services built on a foundation of rigorous innovation and industry excellence.",
    }
  ];

  const features = [
    {
      icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
      title: "SAFE\nOPERATIONS"
    },
    {
      icon: "M11 20A7 7 0 019.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z M2 22l10-10",
      title: "SUSTAINABLE\nSOLUTIONS"
    },
    {
      icon: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418",
      title: "CONNECTED\nECOSYSTEM"
    },
    {
      icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z",
      title: "OPERATIONAL\nEXCELLENCE"
    },
    {
      icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
      title: "PARTNERSHIPS\nTHAT DELIVER"
    }
  ];

  // Auto-advance sliders every 15 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 15000); 
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative w-full h-[calc(100svh-115px)] min-h-[750px] overflow-hidden bg-[#060e1a] flex flex-col">

      {/* ── Background Images (ZERO Gradient Overlays) ── */}
      <div className="absolute inset-0 z-0 bg-black">
        {slides.map((slide, index) => (
          <Image
            key={`bg-${slide.id}`}
            src={slide.image}
            alt="CopterJet Background"
            fill
            className={`object-cover object-center transform transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-100"
            }`}
            priority={index === 0}
          />
        ))}
      </div>

      {/* ── Main Content Area ── */}
      {/* ADDED MASSIVE BOTTOM PADDING (pb-[180px] md:pb-[200px]) TO PREVENT OVERLAP */}
      <div className="relative z-10 flex-grow max-w-[90rem] mx-auto w-full px-6 lg:px-12 flex flex-col pt-10 lg:pt-14 pb-[180px] md:pb-[200px]">
        
        {/* CSS GRID: Stacks the text so they crossfade without breaking the layout */}
        <div className="grid grid-cols-1 grid-rows-1 w-full max-w-3xl">
          {slides.map((slide, index) => (
            <div
              key={`text-${slide.id}`}
              className={`col-start-1 row-start-1 transition-all duration-1000 ease-in-out transform ${
                index === currentSlide ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-6 pointer-events-none"
              }`}
            >
              {/* Headline */}
              <h1 
                className="text-4xl sm:text-5xl lg:text-[3.5rem] text-white font-bold leading-[1.12] tracking-tight"
                style={{ textShadow: '0 4px 24px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.8)' }}
              >
                {slide.headline}
              </h1>

              {/* Extended Airplane Divider */}
              <div className="flex items-center w-full max-w-xl my-4 md:my-5">
                <div className="h-[2px] bg-white flex-grow shadow-[0_0_10px_rgba(0,0,0,0.9)]"></div>
                <svg className="w-6 h-6 text-white ml-2 transform rotate-90 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                </svg>
              </div>

              {/* Subheadline */}
              <p 
                className="text-base md:text-lg lg:text-xl text-white/95 max-w-xl leading-relaxed font-medium"
                style={{ textShadow: '0 3px 12px rgba(0,0,0,1)' }}
              >
                {slide.subtext}
              </p>
            </div>
          ))}
        </div>

        {/* ── Persistent Action Bar & Dots ── */}
        <div className="flex flex-col items-start gap-5 mt-6 md:mt-8">
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/partnership" className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-6 py-3.5 rounded-sm font-bold tracking-widest text-[10px] uppercase hover:bg-white hover:text-copter-blue transition-colors shadow-[0_4px_15px_rgba(0,0,0,0.6)]">
              Partnership & Joint Ventures
            </Link>
          </div>

          {/* Slider Navigation Dots */}
          <div className="flex items-center gap-2">
            {slides.map((_, dotIndex) => (
              <button
                key={`dot-${dotIndex}`}
                onClick={() => setCurrentSlide(dotIndex)}
                className={`h-1.5 rounded-full transition-all duration-300 shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${
                  dotIndex === currentSlide ? "w-8 bg-copter-red" : "w-2 bg-white/50 hover:bg-white"
                }`}
                aria-label={`Go to slide ${dotIndex + 1}`}
              />
            ))}
          </div>
        </div>

      </div>

      {/* ── 5 Feature Badges (Absolutely Positioned) ── */}
      <div className="absolute bottom-[60px] md:bottom-[76px] left-0 right-0 w-full z-20 pointer-events-none">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 pointer-events-auto">
          <div className="flex flex-wrap items-start gap-4 md:gap-8 max-w-5xl">
            {features.map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center group">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-[12px] border-[1.5px] border-white/50 flex items-center justify-center mb-2 md:mb-3 group-hover:border-copter-red group-hover:bg-copter-red/20 transition-all duration-300 backdrop-blur-sm shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:scale-110 transition-transform duration-300 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d={feature.icon} />
                  </svg>
                </div>
                <span 
                  className="text-[9px] md:text-[10px] text-white font-bold tracking-[0.1em] uppercase text-center leading-tight whitespace-pre-line"
                  style={{ textShadow: '0 2px 10px rgba(0,0,0,1)' }}
                >
                  {feature.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom Slogan Bar ── */}
      <div className="absolute bottom-0 left-0 right-0 z-30 w-full bg-[#030912]/80 backdrop-blur-xl border-t border-white/10 py-3 md:py-4 flex justify-center">
        <p className="text-white/80 font-bold tracking-[0.3em] text-[8px] md:text-[10px] lg:text-[11px] uppercase flex items-center flex-wrap justify-center gap-3 md:gap-8 px-4 text-center drop-shadow-md">
          <span>CONNECTING AFRICA</span>
          <span className="w-1.5 h-1.5 rounded-full bg-white/30 hidden md:block"></span>
          <span className="md:hidden text-white/30">•</span>
          <span>POWERING OPERATIONS</span>
          <span className="w-1.5 h-1.5 rounded-full bg-white/30 hidden md:block"></span>
          <span className="md:hidden text-white/30">•</span>
          <span>ELEVATING EXCELLENCE</span>
        </p>
      </div>

    </section>
  );
}