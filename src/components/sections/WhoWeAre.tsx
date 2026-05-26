import Link from "next/link";
import Image from "next/image";

export default function WhoWeAre() {
  const pillars = [
    { label: "Aviation Advisory", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
    { label: "Asset Management", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { label: "Logistics Solutions", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  ];

  return (
    <>
      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes rotorSpinFast {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
        {/* Background decorative element */}
        <div className="absolute top-0 right-0 w-[45%] h-full pointer-events-none opacity-[0.03] hidden lg:block">
          <svg viewBox="0 0 500 600" fill="none" className="w-full h-full">
            <path d="M500 0 L500 600 L0 400 Z" fill="#164878"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* ── Left: Image ── */}
            <div className="relative order-2 lg:order-1 mt-8 lg:mt-0">
              
              {/* Main image */}
              <div className="relative h-[400px] lg:h-[520px] w-full overflow-hidden shadow-sm">
                <Image
                  src="/images/who-we-are4.jpg"
                  alt="CopterJet International — Aviation Specialists"
                  fill
                  className="object-cover object-center"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-copter-blue/10" />
              </div>

              {/* ── NEW: Floating Animated Helicopter Badge (Top Right) ── */}
              <div 
                className="absolute -top-8 -right-6 lg:-top-10 lg:-right-10 w-24 h-24 lg:w-28 lg:h-28 rounded-full bg-copter-blue/90 backdrop-blur-md border-4 border-white shadow-[0_12px_32px_rgba(22,72,120,0.25)] flex items-center justify-center z-20 pointer-events-none"
                style={{ animation: 'floatSlow 4s ease-in-out infinite' }}
              >
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 190 80"
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2 mt-2 lg:ml-3 lg:mt-3 lg:w-[75px] lg:h-[75px]"
                  style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }}
                >
                  {/* Rotor blades — animated spin */}
                  <g transform="translate(90, 16)" style={{ animation: 'rotorSpinFast 0.15s linear infinite', transformOrigin: '0px 0px' }}>
                    <line x1="-72" y1="0" x2="72" y2="0" stroke="white" strokeWidth="4.5" strokeLinecap="round" />
                    <line x1="0" y1="-72" x2="0" y2="72" stroke="white" strokeWidth="4.5" strokeLinecap="round" />
                  </g>
                  {/* Rotor hub */}
                  <circle cx="90" cy="16" r="6" />
                  {/* Main body */}
                  <path d="M38,20 C38,14 48,10 62,10 L108,10 C124,10 134,17 134,26 C134,35 124,42 108,42 L62,42 C48,42 38,38 38,32 Z" />
                  {/* Cockpit bubble */}
                  <path d="M100,10 C118,10 134,17 134,26 C134,35 118,42 100,42 Z" fill="rgba(160,210,255,0.4)" />
                  {/* Tail boom & fin */}
                  <path d="M38,30 L6,36 L6,34 L38,26 Z" />
                  <path d="M6,26 L14,26 L14,36 L6,36 Z" />
                  <line x1="10" y1="20" x2="10" y2="44" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
                  {/* Skid struts & rails */}
                  <line x1="60" y1="42" x2="56" y2="56" stroke="white" strokeWidth="2.5" />
                  <line x1="100" y1="42" x2="104" y2="56" stroke="white" strokeWidth="2.5" />
                  <line x1="48" y1="56" x2="112" y2="56" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
                </svg>
              </div>

              {/* ── UPDATED: Airplane Swoosh (Bottom Right) ── */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 overflow-hidden pointer-events-none hidden lg:block">
                <div className="w-full h-full bg-copter-red opacity-90" style={{clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }} />
                <div className="absolute inset-0 flex items-end justify-end p-6">
                  {/* Airplane Icon */}
                  <svg className="w-9 h-9 text-white mb-1 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                  </svg>
                </div>
              </div>

              {/* Floating stat card (Bottom Left) */}
              <div className="absolute -left-4 bottom-14 bg-copter-blue text-white px-6 py-5 shadow-[0_12px_24px_rgba(22,72,120,0.3)] hidden lg:block">
                <p className="text-4xl font-bold leading-none">10+</p>
                <p className="text-[10px] font-bold tracking-widest uppercase text-white/70 mt-1">Years of Excellence</p>
              </div>
            </div>

            {/* ── Right: Text ── */}
            <div className="order-1 lg:order-2">
              {/* Section label */}
              <div className="label-pill mb-6">Who We Are</div>

              <h2 className="text-3xl md:text-4xl lg:text-[2.6rem] text-copter-blue font-bold leading-[1.15] mb-6">
                A Cross-Border Aviation Service & Consulting Entity.
              </h2>

              <p className="text-[15.5px] text-copter-grey leading-relaxed mb-6 font-medium">
                We are a fully integrated specialist service structure built around aviation advisory, aviation asset management, and industry-focused logistics solutions — all designed around a broad delivery mission.
              </p>

              <p className="text-[14.5px] text-copter-grey/80 leading-relaxed mb-10">
                Our solutions bridge the structural and financial gaps in the regional and global aviation industry, delivered by a dedicated team of aviation specialists committed to the highest international standards.
              </p>

              {/* Pillars */}
              <div className="flex flex-col gap-4 mb-10">
                {pillars.map((p, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-9 h-9 flex-shrink-0 border border-copter-blue/20 flex items-center justify-center group-hover:bg-copter-blue group-hover:border-copter-blue transition-colors">
                      <svg className="w-4 h-4 text-copter-blue group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={p.icon}/>
                      </svg>
                    </div>
                    <span className="text-[13px] font-bold text-copter-blue tracking-wide">{p.label}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/about/who-we-are"
                className="inline-flex items-center gap-3 bg-copter-blue text-white px-8 py-3.5 text-[11.5px] font-bold tracking-[0.14em] uppercase
                  hover:bg-copter-blue-dark transition-colors shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                LEARN MORE ABOUT US
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}