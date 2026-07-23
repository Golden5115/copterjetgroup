import Link from "next/link";
import Image from "next/image"; // ADD THIS LINE

export default function IndustryInsights() {
  const featuredInsight = {
    category: "Expert Opinion",
    date: "October 12, 2023",
    title: "Charting the Course: The Future of Aviation Leasing in the African Market.",
    description: "Aircraft leasing has become the dominant financing model in global aviation. Bridging the gap in Africa's market requires a fundamental transformation in how aircraft are financed and managed.",
    image: "/images/insight-featured.jpg",
    link: "/insights/future-of-aviation-leasing"
  };

  const sideInsights = [
    {
      category: "Company News",
      date: "January 4, 2026",
      title: "Copterjet Announces Strategic Partnership to Strengthen Aviation Supply Chain.",
      link: "/insights/strategic-partnership"
    },
    {
      category: "Company News",
      date: "December 11, 2025",
      title: "Copterjet Completes Recapitalization Ahead of NCAA Regulatory Deadline.",
      link: "/insights/recapitalization"
    },
    {
      category: "Expert Opinion",
      date: "August 15, 2023",
      title: "Navigating Corporate Governance in Regional Airline Operations.",
      link: "/insights/corporate-governance"
    },
    {
      category: "Expert Opinion",
      date: "July 02, 2023",
      title: "Optimizing Supply Chain for Sustainable Flight Operations.",
      link: "/insights/sustainable-supply-chain"
    }
  ];

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-sm font-bold text-copter-red tracking-widest uppercase mb-3 border-accent">
              Industry Insights
            </h2>
            <h3 className="text-3xl md:text-4xl text-copter-blue font-bold">
              Latest News & Intelligence.
            </h3>
          </div>
          <Link href="/insights" className="hidden md:inline-block border-b-2 border-copter-blue text-copter-blue font-bold pb-1 hover:border-copter-red hover:text-copter-red transition-all">
            VIEW ALL INSIGHTS
          </Link>
        </div>

        {/* Magazine Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
        {/* Left: Featured Article (Takes up 7 columns on desktop) */}
          <div className="lg:col-span-7 group cursor-pointer">
            
            {/* UPDATED IMAGE CONTAINER */}
            <div className="w-full h-[400px] mb-6 relative overflow-hidden rounded-sm bg-copter-blue">
              <Image
                src={featuredInsight.image}
                alt={featuredInsight.title}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Premium overlay: starts light, darkens on hover so text pops */}
              <div className="absolute inset-0 bg-[#164878]/10 group-hover:bg-[#164878]/40 transition-colors duration-500 mix-blend-multiply"></div>
            </div>
            {/* END UPDATED IMAGE CONTAINER */}
            
            <div className="flex items-center gap-4 text-xs font-bold text-copter-grey mb-4 uppercase tracking-wider">
              <span className="text-copter-red">{featuredInsight.category}</span>
              <span>•</span>
              <span>{featuredInsight.date}</span>
            </div>
            
            <h4 className="text-2xl md:text-3xl font-bold text-copter-blue mb-4 group-hover:text-copter-red transition-colors leading-tight">
              {featuredInsight.title}
            </h4>
            <p className="text-copter-grey text-lg mb-6 leading-relaxed">
              {featuredInsight.description}
            </p>
            
            <Link href={featuredInsight.link} className="text-sm font-bold text-copter-blue tracking-widest group-hover:text-copter-red flex items-center transition-colors">
              READ FULL ARTICLE
              <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Right: Side Articles Stack (Takes up 5 columns on desktop) */}
          <div className="lg:col-span-5 flex flex-col gap-8 lg:pl-8 lg:border-l border-gray-200">
            {sideInsights.map((item, index) => (
              <div key={index} className="group cursor-pointer border-b border-gray-100 pb-8 last:border-0 last:pb-0">
                <div className="flex items-center gap-4 text-xs font-bold text-copter-grey mb-2 uppercase tracking-wider">
                  <span className="text-copter-red">{item.category}</span>
                </div>
                <h4 className="text-xl font-bold text-copter-blue mb-3 group-hover:text-copter-red transition-colors leading-snug">
                  {item.title}
                </h4>
                <Link href={item.link} className="text-xs font-bold text-copter-grey tracking-widest group-hover:text-copter-blue transition-colors">
                  {item.date}
                </Link>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}