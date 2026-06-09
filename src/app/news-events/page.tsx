import Image from 'next/image';
import Link from 'next/link';

const ARTICLES = [
  {
    title: 'Copterjet Launches Brand, Calls for Collaboration to Turn Nigeria into Aviation Powerhouse',
    source: 'Nigerian Flight Deck',
    url: 'https://nigerianflightdeck.com/copterjet-launches-brand-calls-for-collaboration-to-turn-nigeria-into-aviation-powerhouse/',
    image: '/images/news-1-v2.png',
    date: 'Recent',
    tag: 'Brand Launch'
  },
  {
    title: 'Aviation as an economic enabler is less harnessed in Nigeria - CEO Copterjet',
    source: 'Business Day',
    url: 'https://businessday.ng/interview/article/aviation-as-an-economic-enabler-is-less-harnessed-in-nigeria-ceo-copterjet/',
    image: '/images/news-2-v2.png',
    date: 'Insight',
    tag: 'Economy'
  },
  {
    title: 'Nigeria Needs Huge Investment in Tourism to Benefit from SAATM',
    source: 'Nigerian Flight Deck',
    url: 'https://nigerianflightdeck.com/nigeria-needs-huge-investment-in-tourism-to-benefit-from-saatm/',
    image: '/images/news-3-v2.png',
    date: 'Analysis',
    tag: 'Tourism'
  },
  {
    title: 'Aircraft Leasing: Better days await Nigerian airlines as Copterjet debuts',
    source: 'Tribune Online NG',
    url: 'https://tribuneonlineng.com/aircraft-leasing-better-days-await-nigerian-airlines-as-copterjet-debuts/',
    image: '/images/news-4-v2.png',
    date: 'Market Update',
    tag: 'Leasing'
  },
  {
    title: 'Copterjet is set to assist airlines to acquire, manage their assets — CEO',
    source: 'Vanguard NGR',
    url: 'https://www.vanguardngr.com/2021/10/copterjet-is-set-to-assist-airlines-to-acquire-manage-their-assets-ceo/',
    image: '/images/news-5-v2.png',
    date: 'Oct 2021',
    tag: 'Asset Management'
  },
  {
    title: 'Copterjet Intl Advocates Access to Sustainable Financing for Aviation to Thrive',
    source: 'Nigerian Flight Deck',
    url: 'https://nigerianflightdeck.com/copterjet-intl-advocates-access-to-sustainable-financing-for-aviation-to-thrive/',
    image: '/images/news-6-v2.png',
    date: 'Advocacy',
    tag: 'Finance'
  }
];

export default function NewsEventsPage() {
  return (
    <main className="min-h-screen bg-slate-50 selection:bg-copter-red selection:text-white pb-20">
       <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 lg:px-12 bg-[#0a1220] overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-copter-red/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="max-w-[90rem] mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-3 mb-6 justify-center">
            <div className="w-12 h-[3px] bg-copter-red" />
            <span className="text-white font-bold tracking-[0.2em] uppercase text-[12px] md:text-sm shadow-sm">Stay Updated</span>
            <div className="w-12 h-[3px] bg-copter-red" />
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
            News & <span className="text-copter-red">Events</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-medium">
            Stay up to date with our latest announcements, market insights, and thought leadership across the African aviation ecosystem.
          </p>
        </div>
      </section>

      <section className="max-w-[90rem] mx-auto px-6 lg:px-12 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ARTICLES.map((article, idx) => (
            <Link 
              key={idx} 
              href={article.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(22,72,120,0.08)] transition-all duration-500 hover:-translate-y-2 border border-gray-100"
            >
              {/* Image Container */}
              <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                <Image 
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-copter-blue tracking-widest uppercase shadow-sm">
                  {article.tag}
                </div>
              </div>

              {/* Content Container */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <span className="text-copter-red">{article.source}</span>
                  <span>•</span>
                  <span>{article.date}</span>
                </div>
                
                <h3 className="text-xl font-bold text-copter-blue leading-snug mb-6 group-hover:text-copter-red transition-colors duration-300 line-clamp-3">
                  {article.title}
                </h3>
                
                <div className="mt-auto flex items-center text-sm font-bold text-copter-blue group-hover:text-copter-red transition-colors duration-300">
                  READ ARTICLE 
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
