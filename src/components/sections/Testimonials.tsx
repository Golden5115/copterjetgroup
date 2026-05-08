export default function Testimonials() {
  const testimonials = [
    {
      quote: "CopterJet transformed our fleet acquisition strategy. Their deep understanding of African aviation finance saved us millions in leasing overheads.",
      name: "Client Name", // Replace with actual name
      title: "Chief Operating Officer, Regional Airlines" // Replace with actual title
    },
    {
      quote: "Their logistics support team is unmatched. From ground handling to cargo management, they deliver seamless operations with absolute precision.",
      name: "Client Name",
      title: "Director of Operations, Cargo Express"
    },
    {
      quote: "A true partner in corporate governance. CopterJet's advisory board helped us restructure our business model to meet international compliance standards.",
      name: "Client Name",
      title: "CEO, Private Charter Group"
    }
  ];

  return (
    <section className="py-24 bg-copter-blue relative overflow-hidden">
      
      {/* NEW: Premium Aviation Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      {/* NEW: Soft Radial Glow to focus the center and fade the grid edges */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-copter-blue/80 to-copter-blue"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-gray-300 tracking-widest uppercase mb-3">
            Client Testimonials
          </h2>
          <h3 className="text-3xl md:text-4xl text-white font-bold">
            Trusted by Aviation Leaders.
          </h3>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-[#0a1e35]/80 backdrop-blur-md p-10 shadow-2xl rounded-sm border border-white/5 relative group hover:-translate-y-2 transition-all duration-500"
            >
              
              {/* Decorative Quote Icon - Subtle White */}
              <svg className="w-16 h-16 text-white/5 absolute top-6 right-6 group-hover:text-white/10 transition-colors duration-500 transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              {/* Quote Text */}
              <p className="text-gray-300 font-medium leading-relaxed mb-10 relative z-10 italic">
                "{testimonial.quote}"
              </p>
              
              {/* Author Details */}
              <div className="border-t border-white/10 pt-6 mt-auto">
                <h4 className="text-lg font-bold text-white tracking-wide">{testimonial.name}</h4>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1.5">{testimonial.title}</p>
              </div>

              {/* Hover Accent Line - Kept CopterRed just for the tiny branding accent */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-copter-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}