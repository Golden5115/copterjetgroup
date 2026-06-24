import Link from "next/link";

export default function ESGOverview() {
  const frameworks = [
    {
      title: "Environmental, Social & Governance Goal",
      content: "Advancing a safer, more sustainable, and inclusive aviation ecosystem across Africa by integrating environmental stewardship, social impact, and responsible governance.",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Our ESG Commitment",
      content: "Building a more sustainable, inclusive, and resilient aviation future for Africa through responsible business practices and investment in people and communities.",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      )
    },
    {
      title: "ESG Goal 2030",
      content: "To become Africa's most trusted aerospace solutions platform by championing sustainable aviation practices and upholding world-class standards of governance.",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 bg-copter-blue relative overflow-hidden">
      
      {/* Premium Aviation Grid Background */}
      <div className="absolute inset-0 z-0 opacity-10" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-copter-blue/80 to-copter-blue"></div>

      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="wing-divider mb-6 mx-auto w-fit">
            <span className="text-copter-red font-bold tracking-[0.2em] text-[9px] uppercase whitespace-nowrap px-4">Our ESG Framework</span>
          </div>
          <h3 className="text-3xl md:text-4xl text-white font-bold tracking-tight mb-4">
            Sustainable Aviation for Africa.
          </h3>
          <p className="text-[15px] text-gray-300 leading-[1.9] font-medium">
            Advancing a safer, more sustainable, and more inclusive aviation ecosystem by integrating environmental stewardship, social impact, and responsible governance.
          </p>
        </div>

        {/* ESG Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {frameworks.map((item, index) => (
            <div 
              key={index} 
              className="bg-[#0a1e35]/80 backdrop-blur-md p-10 shadow-2xl rounded-xl border border-white/5 relative group hover:-translate-y-2 transition-all duration-500 hover:border-white/10 flex flex-col"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border border-white/10 group-hover:border-copter-red/40 group-hover:bg-copter-red/10 text-copter-red">
                {item.icon}
              </div>

              <h4 className="text-xl font-bold text-white tracking-tight leading-snug mb-4">{item.title}</h4>
              <p className="text-gray-300 text-[14px] leading-relaxed font-medium mb-6 flex-1">
                {item.content}
              </p>
              
              <div className="absolute bottom-0 left-0 w-full h-1 bg-copter-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-xl"></div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="text-center">
          <Link href="/about#esg" className="inline-flex items-center justify-center h-14 px-8 text-[11px] font-bold tracking-[0.2em] uppercase text-white bg-copter-red hover:bg-white hover:text-copter-blue transition-colors duration-300">
            Read Full ESG Framework
          </Link>
        </div>

      </div>
    </section>
  );
}
