'use client';

import Link from 'next/link';

export default function VacanciesPage() {
  return (
    <div className="bg-[#f8fafc] min-h-screen pt-32 pb-24">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 flex flex-col items-center text-center">
        
        {/* Back Link */}
        <Link
          href="/careers"
          className="inline-flex items-center gap-2 text-sm font-bold text-copter-blue hover:text-copter-red transition-colors mb-12 uppercase tracking-widest self-start lg:self-center"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Careers
        </Link>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-copter-blue mb-8 tracking-tight">
          Vacancies & Opportunities
        </h1>
        
        <div className="bg-white p-10 md:p-16 rounded-3xl shadow-[0_8px_30px_rgba(10,30,53,0.06)] w-full max-w-4xl flex flex-col items-center">
          
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-gray-300">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          <p className="text-xl md:text-2xl text-copter-blue font-bold mb-12">
            There are currently no vacancies, please check back later.
          </p>

          <div className="w-full h-px bg-gray-100 mb-12" />

          {/* Social Links */}
          <p className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-widest mb-6 max-w-sm leading-relaxed">
            Follow Us on our social channels to keep track of vacancies and opportunities:
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-16">
            {[
              { label: 'Instagram', href: 'https://www.instagram.com/copterjetintl.ltd?utm_source=qr&igsh=MTNpcTBvNmU2bHZ1cg==', brandBg: '#e1306c', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
              { label: 'Facebook', href: 'https://www.facebook.com/share/1BZU7rnkLo/', brandBg: '#3b5998', path: 'M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z' },
              { label: 'YouTube', href: 'https://youtube.com/@copterjetinternational5060?si=qn7LOmo1kPw8WvoX', brandBg: '#FF0000', path: 'M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z' },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/company/copterjet-international-ltd/', brandBg: '#0077b5', path: 'M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z' },
              { label: 'X', href: 'https://x.com/copterjetintltd', brandBg: '#000000', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' }
            ].map((social) => (
              <a 
                key={social.label} 
                href={social.href} 
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg text-white"
                style={{ backgroundColor: social.brandBg }}
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>

          {/* Newsletter Subscription */}
          <div className="w-full max-w-lg bg-gray-50 p-8 rounded-2xl border border-gray-100">
            <p className="text-sm font-bold text-copter-blue uppercase tracking-widest mb-6">
              To subscribe to our newsletter enter email address
            </p>
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter email address" 
                className="flex-1 px-5 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-copter-red/20 focus:border-copter-red transition-colors text-copter-blue font-medium placeholder-gray-400"
                required
              />
              <button 
                type="submit"
                className="px-8 py-4 bg-copter-red text-white font-bold tracking-widest uppercase text-sm rounded-xl hover:bg-red-700 transition-colors shadow-md hover:shadow-lg active:transform active:scale-95"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
