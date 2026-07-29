'use client';

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ServicesOverview() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // ── Intersection Observer for Scroll Animations ──
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold: 0.15 } // Triggers when 15% of the section is visible
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // ── Enhanced Service Data with Descriptions ──
  const services = [
    { 
      title: "Aircraft Spares, Components, Engines Sales & Logistics",
      description: "Delivering trusted aircraft parts, engines, and AOG support through a global supply network. We combine speed, reliability, and seamless logistics to keep fleets flying.",
      icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    },
    { 
      title: "Aircraft Management & Operations (Jets & Helicopters)",
      description: "Comprehensive aircraft management solutions that optimise safety, compliance, efficiency, and asset value for private jets and helicopters.",
      icon: "M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
    },
    { 
      title: "Aircraft Acquisition, Sales, Appraisal & Valuation",
      description: "Providing expert support for aircraft acquisitions, sales, valuations, and transactions—helping clients make informed decisions with confidence.",
      icon: "M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
    },
    { 
      title: "Airline Joint Venture",
      description: "Creating strategic airline partnerships that unlock growth, expand market reach, and deliver sustainable commercial value.",
      icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
    },
    { 
      title: "Aerospace Specialist Services, Consultancy & Project Management",
      description: "Delivering strategic aerospace consulting and project management solutions that transform complex aviation challenges into successful outcomes.",
      icon: "M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.829 1.508-2.316a7.5 7.5 0 10-7.516 0c.85.487 1.508 1.333 1.508 2.316V18"
    }
  ];

  return (
    <>
      <style>{`
        /* Custom Animation Keyframes */
        @keyframes fadeUpStagger {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          opacity: 0; /* Hidden by default */
        }
        .is-visible .animate-fade-up {
          animation: fadeUpStagger 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <section ref={sectionRef} className={`py-16 lg:py-32 bg-[#f8fafc] relative overflow-hidden transition-opacity duration-1000 ${isVisible ? 'is-visible' : ''}`}>
        
        {/* Subtle Background Elements */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        <div className="absolute -top-[20rem] -right-[20rem] w-[40rem] h-[40rem] rounded-full bg-copter-blue/5 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center relative z-10">
          
          {/* Section Header with Staggered Entrance */}
          <div className="animate-fade-up flex flex-col items-center" style={{ animationDelay: '0ms' }}>
            <div className="label-pill mb-6">Our Capabilities</div>
            <h2 className="text-3xl md:text-4xl text-copter-blue font-bold text-center mb-6">
              Aviation Excellence, <span className="text-copter-red">Delivered.</span>
            </h2>
            <p className="text-[15px] md:text-base text-copter-grey text-center max-w-4xl mx-auto mb-16 leading-[1.8] font-medium">
              Copterjet International combines aviation expertise, strategic partnerships, and innovative service delivery to provide end-to-end solutions across the aerospace value chain. From supply chain management and flight operations to asset management, infrastructure development, and advisory services, we deliver sustainable, efficient, and value-driven solutions that advance aviation across Africa and beyond.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full mb-16 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <Link 
                href="/services" 
                key={index} 
                className="animate-fade-up group block relative bg-white border border-gray-100 rounded-2xl p-8 hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(22,72,120,0.08)] overflow-hidden"
                style={{ animationDelay: `${(index + 1) * 150}ms` }}
              >
                {/* Decorative Hover Swoosh */}
                <div className="absolute -right-12 -top-12 w-32 h-32 bg-gray-50 rounded-full group-hover:bg-copter-blue/5 group-hover:scale-[2.5] transition-transform duration-700 ease-out pointer-events-none" />

                {/* Animated Icon Container */}
                <div className="relative w-14 h-14 rounded-xl bg-copter-light border border-copter-blue/10 flex items-center justify-center mb-6 group-hover:bg-copter-red group-hover:border-copter-red transition-colors duration-500 shadow-sm group-hover:shadow-md">
                  <svg 
                    className="w-6 h-6 text-copter-blue group-hover:text-white transition-colors duration-500" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={service.icon} />
                  </svg>
                </div>

                {/* Content */}
                <h4 className="text-lg font-bold text-copter-blue leading-snug mb-3 group-hover:text-copter-red transition-colors duration-300">
                  {service.title}
                </h4>
                <p className="text-[13px] text-copter-grey leading-relaxed font-medium mb-8">
                  {service.description}
                </p>

                {/* Animated 'Explore' Link */}
                <div className="absolute bottom-8 left-8 flex items-center gap-2 text-[11px] font-bold text-copter-blue tracking-widest uppercase overflow-hidden">
                  <span className="transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                    Explore
                  </span>
                  <svg className="w-3.5 h-3.5 transform -translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 delay-75 text-copter-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            ))}

            {/* 6th Slot - Image */}
            <div 
              className="animate-fade-up relative rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgba(22,72,120,0.12)] transition-all duration-500 h-full min-h-[300px] group"
              style={{ animationDelay: `${(services.length + 1) * 150}ms` }}
            >
              <Image 
                src="/images/services-custom.jpg" 
                alt="Aviation Services" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-[2.5s] ease-out" 
              />
              {/* Optional subtle overlay */}
              <div className="absolute inset-0 bg-copter-blue/10 mix-blend-multiply group-hover:bg-transparent transition-colors duration-700" />
            </div>
          </div>

          {/* Master Call to Action */}
          <div className="animate-fade-up" style={{ animationDelay: '800ms' }}>
            <Link 
              href="/services" 
              className="inline-flex items-center gap-3 border-[1.5px] border-copter-blue text-copter-blue px-8 py-3.5 font-bold rounded-sm hover:bg-copter-blue hover:text-white transition-all text-[11.5px] tracking-[0.15em] uppercase shadow-sm hover:shadow-md hover:-translate-y-1"
            >
              VIEW ALL OUR SERVICES
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}