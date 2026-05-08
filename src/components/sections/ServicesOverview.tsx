import Link from "next/link";

export default function ServicesOverview() {
  const services = [
    { title: "Aviation Management Consulting Services" },
    { title: "Aviation Business Intelligence Services" },
    { title: "Aircraft Brokerage & Appraisal Service" },
    { title: "Logistics & Ancillary Service" }
  ];

  return (
    <section className="py-24 bg-copter-light">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center">
        
        {/* Section Header */}
        <h2 className="text-sm font-bold text-copter-blue tracking-widest uppercase mb-8 text-center">
          Our Services
        </h2>
        
        <p className="text-xl md:text-2xl text-copter-blue font-semibold text-center max-w-4xl mx-auto mb-20 leading-relaxed">
          We are an entity that reserves a dedicated and combined team of aviation specialist who are able to deliver on complex mission anchored on highest international and state industry standards.
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full mb-16">
          {services.map((service, index) => (
            <div key={index} className="flex items-center gap-4 group cursor-pointer">
              <div className="flex-shrink-0 w-12 h-12 rounded-full border border-copter-blue flex items-center justify-center group-hover:bg-copter-blue transition-colors">
                 {/* Airplane Icon */}
                <svg className="w-5 h-5 text-copter-blue group-hover:text-white transition-colors transform -rotate-45" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </div>
              <h4 className="text-sm font-bold text-copter-blue leading-tight group-hover:text-copter-red transition-colors">
                {service.title}
              </h4>
            </div>
          ))}
        </div>

        {/* Learn More Button */}
        <Link 
          href="/services" 
          className="inline-block border border-copter-red text-copter-red px-8 py-3 font-bold rounded-full hover:bg-copter-red hover:text-white transition-all text-sm tracking-widest uppercase"
        >
          LEARN MORE
        </Link>

      </div>
    </section>
  );
}