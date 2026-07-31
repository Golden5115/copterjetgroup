'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function CareersPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <main className="min-h-screen bg-white selection:bg-copter-blue selection:text-white pb-0">
      {/* ════════════════════════════════════════════════════════
          1. HERO SECTION
      ════════════════════════════════════════════════════════ */}
      <section className="relative h-[65vh] min-h-[500px] max-h-[700px] w-full flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full bg-[#164878]">
          <Image
            src="/images/careers-hero2.jpg"
            alt="CopterJet Careers"
            fill
            className="object-cover object-[center_40%] opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-copter-blue/95 via-copter-blue/70 to-transparent mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1220]/80 via-transparent to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-[90rem] mx-auto px-6 lg:px-12 pt-20">
          <div className={`max-w-3xl transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-[3px] bg-copter-red" />
              <span className="text-white font-bold tracking-[0.2em] uppercase text-[12px] md:text-sm shadow-sm">Join Our Team</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight drop-shadow-lg">
              Careers at <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">CopterJet</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-200 leading-relaxed font-medium max-w-2xl border-l-[3px] border-copter-red pl-6">
              We are building more than an aviation company—we are shaping the future of aerospace, aviation services, and operational excellence.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          2. INTRO & CULTURE SECTION
      ════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-32 bg-white relative">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            {/* Left Content */}
            <div className="lg:w-5/12">
              <div className="sticky top-32">
                <h2 className="text-3xl lg:text-4xl font-bold text-copter-blue mb-8 leading-tight tracking-tight">
                  Empowering exceptional talent to drive innovation and service.
                </h2>
                <div className="w-24 h-1.5 bg-copter-red mb-10" />
                <p className="text-[16px] md:text-lg text-[#4a5568] leading-[1.8] font-medium text-justify">
                  At <strong className="text-copter-blue">CopterJet International Group</strong>, we believe our greatest asset is our people. We are committed to attracting, developing, and empowering exceptional talent who share our passion for innovation, safety, integrity, and quality service.
                </p>
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:w-7/12 space-y-10 text-[#4a5568] leading-[1.85] text-[15px] md:text-[16px] font-medium text-justify lg:pt-4">
              <p>
                Whether you are an experienced aviation professional, engineer, pilot, operations specialist, business executive, or an emerging talent seeking to build a rewarding career, CopterJet offers a dynamic environment where expertise is valued, growth is encouraged, and excellence is rewarded.
              </p>

              <div className="p-8 md:p-10 bg-[#f8fafc] border-l-[4px] border-copter-red rounded-r-2xl shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow duration-500">
                <div className="absolute top-0 right-0 w-32 h-32 bg-copter-red/[0.03] rounded-full blur-2xl group-hover:bg-copter-red/[0.08] transition-colors duration-500" />
                <svg className="absolute -top-4 -left-4 w-24 h-24 text-copter-blue/5 transform -scale-x-100" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                <p className="relative z-10 text-copter-blue/90 italic text-lg leading-relaxed">
                  "Our culture is founded on collaboration, continuous learning, professionalism, and a commitment to delivering world-class solutions to our clients and partners."
                </p>
              </div>

              <p>
                Join us and become part of a virtuoso team dedicated to advancing aviation and aerospace, creating opportunities, and making a lasting impact in the industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          3. OPPORTUNITIES GRID
      ════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-32 bg-[#0a1220] relative overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16 lg:mb-24 max-w-3xl mx-auto">
            <h3 className="text-3xl lg:text-5xl font-bold text-white mb-6 tracking-tight">Impactful Projects Across Our Domains</h3>
            <p className="text-gray-400 text-lg">We provide opportunities to work on exciting initiatives spanning the entire aviation and aerospace ecosystem.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              "Aerospace Supply Chain & Logistics",
              "Aircraft Management & Operations",
              "Maintenance & Support",
              "Aviation Consulting",
              "Aviation Asset Management",
              "Charter Services",
              "Infrastructure Development",
              "Emerging Aerospace Initiatives"
            ].map((domain, i) => (
              <div key={i} className="group p-8 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-copter-red hover:border-copter-red transition-all duration-300 hover:shadow-[0_0_40px_rgba(227,27,35,0.2)] hover:-translate-y-1">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-white font-bold text-lg leading-snug">{domain}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          4. CTA SECTION
      ════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-copter-red relative overflow-hidden flex flex-col items-center justify-center text-center">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 opacity-20 pointer-events-none">
          <svg width="604" height="604" fill="none" viewBox="0 0 404 404" aria-hidden="true">
            <defs>
              <pattern id="dot-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="404" height="404" fill="url(#dot-pattern)" />
          </svg>
        </div>

        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 relative z-10 w-full flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-12 tracking-tight drop-shadow-md leading-[1.1]">
            Explore opportunities.<br />Build your future.<br /><span className="text-[#0a1220]">Rise higher with CopterJet.</span>
          </h2>

          <a href="/careers/vacancies" className="inline-flex items-center justify-center px-10 py-5 bg-[#0a1220] text-white font-bold text-lg tracking-[0.15em] uppercase rounded-full shadow-2xl hover:bg-white hover:text-copter-red transition-all duration-500 group overflow-hidden relative">
            <span className="relative z-10 flex items-center">
              Vacancies & Opportunities
              <svg className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </a>
        </div>
      </section>
    </main>
  );
}
