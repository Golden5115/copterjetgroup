import Link from "next/link";
import Image from "next/image";

export default function WhoWeAre() {
  const pillars = [
    { label: "Aviation Advisory", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
    { label: "Asset Management", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { label: "Logistics Solutions", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  ];

  return (
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
          <div className="relative order-2 lg:order-1">
            {/* Main image */}
            <div className="relative h-[400px] lg:h-[520px] w-full overflow-hidden">
              <Image
                src="/images/who-we-are4.jpg"
                alt="CopterJet International — Aviation Specialists"
                fill
                className="object-cover object-center"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-copter-blue/10" />
            </div>

            {/* Brand swoosh overlay in corner */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 overflow-hidden pointer-events-none hidden lg:block">
              <div className="w-full h-full bg-copter-red opacity-90" style={{clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }} />
              <div className="absolute inset-0 flex items-end justify-end p-3">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                </svg>
              </div>
            </div>

            {/* Floating stat card */}
            <div className="absolute -left-4 bottom-14 bg-copter-blue text-white px-6 py-5 shadow-2xl hidden lg:block">
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
                hover:bg-copter-blue-dark transition-colors"
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
  );
}
