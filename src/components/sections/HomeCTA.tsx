import Link from "next/link";

export default function HomeCTA() {
  return (
    <section className="relative py-16 lg:py-20 overflow-hidden bg-[#030912]">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        {/* Deep blue base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-copter-blue/90 to-[#030912] z-0" />
        
        {/* Glowing Orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-copter-red/20 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-copter-blue/40 blur-[120px] rounded-full -translate-x-1/3 translate-y-1/3" />
        
        {/* Subtle Grid overlay */}
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-10" />
      </div>

      <div className="max-w-[60rem] mx-auto px-6 lg:px-12 relative z-10">
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 text-center shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden group">
          
          {/* Animated top border line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-copter-red to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-[1.1] tracking-tight">
            Ready to Optimise <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">Your Operations?</span>
          </h2>
          
          <p className="text-base md:text-lg text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed font-light">
            Contact us today for reliable support across your global supply chain needs — spares, components & engines, logistics, asset management, and more....
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link 
              href="/contact" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-copter-red text-white px-8 py-3.5 rounded-full font-bold tracking-wide hover:bg-red-700 transition-all duration-300 shadow-[0_0_20px_rgba(196,14,20,0.4)] hover:shadow-[0_0_30px_rgba(196,14,20,0.6)] hover:-translate-y-1"
            >
              <span>CONTACT US TODAY</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            
            <Link 
              href="/rfq" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white/5 backdrop-blur-sm border border-white/20 text-white px-8 py-3.5 rounded-full font-bold tracking-wide hover:bg-white hover:text-copter-blue transition-all duration-300 hover:-translate-y-1"
            >
              <span>REQUEST A QUOTE</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}