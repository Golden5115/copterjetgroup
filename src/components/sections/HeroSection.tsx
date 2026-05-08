'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: "/images/hero-bg-1.jpg", 
      headline: "We Are Charting The Course For Unprecedented Industry Growth.",
      subtext: "Delivering complex aviation missions anchored on the highest international and state industry standards.",
      ctaText: "LEARN MORE",
      ctaLink: "/about"
    },
    {
      id: 2,
      image: "/images/hero-bg-2.jpg", 
      headline: "A Fully Integrated Aviation Specialist Firm.",
      subtext: "Bridging structural and financial gaps in the industry through expert advisory, aircraft brokerage, and seamless logistics solutions.",
      ctaText: "OUR SERVICES",
      ctaLink: "/services"
    },
    {
      id: 3,
      image: "/images/hero-bg-3.jpg", 
      headline: "Where Innovation Meets Excellence.",
      subtext: "Redefining the future of regional and global aviation through strategic partnerships, business intelligence, and uncompromising safety.",
      ctaText: "PARTNER WITH US",
      ctaLink: "/partnership"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative w-full h-[100svh] min-h-[600px] md:h-[90vh] md:min-h-[700px] flex flex-col justify-center overflow-hidden">
      
      {/* Background Images & Overlays */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-copter-blue">
            <Image
              src={slide.image}
              alt={slide.headline}
              fill
              className="object-cover object-center"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/60 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-[#164878]/40"></div>
          </div>
        </div>
      ))}

      {/* Main Hero Content - Responsive Typography */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full mt-[-80px] md:mt-[-60px]">
        {slides.map((slide, index) => (
          <div
            key={`content-${slide.id}`}
            className={`transition-all duration-1000 transform ${
              index === currentSlide
                ? "opacity-100 translate-y-0 relative"
                : "opacity-0 translate-y-8 absolute pointer-events-none"
            }`}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight max-w-3xl mb-4 md:mb-6 drop-shadow-2xl">
              {slide.headline}
            </h1>
            <p className="text-base md:text-lg text-gray-200 max-w-xl mb-8 md:mb-10 drop-shadow-lg">
              {slide.subtext}
            </p>
            <Link
              href={slide.ctaLink}
              className="inline-block bg-copter-red text-white px-8 md:px-10 py-3.5 md:py-4 text-sm md:text-base font-bold tracking-wide hover:bg-red-800 transition-colors shadow-lg uppercase"
            >
              {slide.ctaText}
            </Link>
          </div>
        ))}
      </div>

      {/* Slider Navigation Dots - Dynamic responsive spacing */}
      <div className="absolute bottom-60 md:bottom-32 z-20 w-full flex justify-center gap-3">
        {slides.map((_, index) => (
          <button
            key={`dot-${index}`}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-copter-red w-8 md:w-10" : "bg-white/50 w-1.5 md:w-2 hover:bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* COMPACT MOBILE-OPTIMIZED ACTION BAR */}
      <div className="absolute bottom-0 w-full z-20 bg-[#0a1e35]/70 backdrop-blur-md border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3">
          
          {/* Action 1: RFP */}
          <Link href="/rfp" className="group relative p-4 md:p-6 flex items-center border-b md:border-b-0 md:border-r border-white/10 hover:bg-white/10 transition-colors duration-300 cursor-pointer overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full h-1 bg-copter-red origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
            <svg className="w-6 h-6 md:w-8 md:h-8 text-white/80 mr-4 group-hover:text-white group-hover:-translate-y-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <div>
              <h3 className="text-sm md:text-base font-bold text-white tracking-wider mb-0.5">SUBMIT RFP</h3>
              <p className="hidden sm:block text-[9px] md:text-[10px] font-bold text-white/60 tracking-widest uppercase">Request for Proposal</p>
            </div>
          </Link>

          {/* Action 2: RFQ */}
          <Link href="/rfq" className="group relative p-4 md:p-6 flex items-center border-b md:border-b-0 md:border-r border-white/10 hover:bg-white/10 transition-colors duration-300 cursor-pointer overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full h-1 bg-copter-red origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
            <svg className="w-6 h-6 md:w-8 md:h-8 text-white/80 mr-4 group-hover:text-white group-hover:-translate-y-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <div>
              <h3 className="text-sm md:text-base font-bold text-white tracking-wider mb-0.5">SUBMIT RFQ</h3>
              <p className="hidden sm:block text-[9px] md:text-[10px] font-bold text-white/60 tracking-widest uppercase">Request for Quotation</p>
            </div>
          </Link>

          {/* Action 3: Partnership */}
          <Link href="/partnership" className="group relative p-4 md:p-6 flex items-center hover:bg-white/10 transition-colors duration-300 cursor-pointer overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full h-1 bg-copter-red origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
            <svg className="w-6 h-6 md:w-8 md:h-8 text-white/80 mr-4 group-hover:text-white group-hover:-translate-y-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <div>
              <h3 className="text-sm md:text-base font-bold text-white tracking-wider mb-0.5">PARTNERSHIP</h3>
              <p className="hidden sm:block text-[9px] md:text-[10px] font-bold text-white/60 tracking-widest uppercase">Joint Ventures & Alliances</p>
            </div>
          </Link>

        </div>
      </div>

    </section>
  );
}