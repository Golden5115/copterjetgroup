'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// ══════════════════════════════════════════════════════════════
// HOOKS
// ══════════════════════════════════════════════════════════════
function useInView(options: { threshold?: number } = { threshold: 0.15 }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { 
        setIsVisible(true); 
        observer.disconnect(); 
      }
    }, { threshold: options.threshold });
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options.threshold]);
  
  return { ref, isVisible };
}

// ══════════════════════════════════════════════════════════════
// DATA
// ══════════════════════════════════════════════════════════════
const contactDetails = [
  {
    icon: 'M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z',
    title: 'Corporate Head Office      (Administrative Wing) ',
    
    desc: 'Suite 202, 2nd Floor, Right Wing, Airport Business Hub, Murtala Muhammed Int\'l Airport Business District, Int\'l Airport Rd, Ikeja Lagos, Nigeria.',
    action: null
  },
  {
    icon: 'M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75',
    title: 'Enquiries',
    desc: 'info@copterjetgroup.com\ninfo@copterjet.com.ng',
    action: 'mailto:info@copterjetgroup.com'
  },
  {
    icon: 'M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.864-1.068l-4.214-.842a2.25 2.25 0 00-2.244.905l-1.409 1.715A16.42 16.42 0 015.42 12.35l1.715-1.409a2.25 2.25 0 00.905-2.244l-.842-4.214a2.25 2.25 0 00-1.068-.864H4.5A2.25 2.25 0 002.25 6.75z',
    title: 'Telephone',
    desc: '+234 913 934 47441\n+234 913 934 47442',
    action: 'tel:+23491393447441'
  }
];

const socials = [
  { label: 'Facebook', href: 'https://www.facebook.com/share/1BZU7rnkLo/', brandBg: '#1877F2', path: 'M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z' },
  { label: 'Instagram', href: 'https://www.instagram.com/copterjetintl.ltd?utm_source=qr&igsh=MTNpcTBvNmU2bHZ1cg==', brandBg: '#E4405F', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/copterjet-international-ltd/', brandBg: '#0A66C2', path: 'M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z' },
  { label: 'X', href: 'https://x.com/copterjetintltd', brandBg: '#000000', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
  { label: 'YouTube', href: 'https://youtube.com/@copterjetinternational5060?si=qn7LOmo1kPw8WvoX', brandBg: '#FF0000', path: 'M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z' }
];

// ══════════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════════
export default function ContactPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 150);
    return () => clearTimeout(t);
  }, []);

  const formSection = useInView({ threshold: 0.1 });
  const mapSection = useInView({ threshold: 0.1 });

  return (
    <main className="min-h-screen bg-[#f8fafc] selection:bg-copter-red selection:text-white pb-0">

      <style>{`
        @keyframes smoothFloatUp {
          0% { opacity: 0; transform: translateY(60px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes smoothFloatLeft {
          0% { opacity: 0; transform: translateX(60px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        
        .smooth-up-hidden { opacity: 0; }
        .smooth-up-visible { animation: smoothFloatUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        
        .smooth-left-hidden { opacity: 0; }
        .smooth-left-visible { animation: smoothFloatLeft 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        .input-field {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>

      {/* ════════════════════════════════════════════════════════
          CONTACT GRID SECTION
      ════════════════════════════════════════════════════════ */}
      <section ref={formSection.ref} className="pt-32 pb-20 lg:pt-48 lg:pb-32 relative z-20">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          
          {/* Integrated Header with Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
            <div className={`max-w-2xl ${formSection.isVisible ? 'smooth-up-visible' : 'smooth-up-hidden'}`} style={{ animationDelay: '100ms' }}>
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-10 h-[2px] bg-copter-red" />
                <span className="text-copter-red font-bold tracking-[0.2em] uppercase text-[12px] md:text-sm">Get in Touch</span>
              </div>
              
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-copter-blue mb-6 leading-[1.15] tracking-tight">
                Connect with our <span className="text-copter-red">Experts</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-copter-grey leading-relaxed font-medium">
                Whether you are looking for strategic advisory, asset management, or supply chain solutions, our team is ready to elevate your operations.
              </p>
            </div>

            {/* Support Agent Image */}
            <div className={`relative h-[300px] lg:h-[400px] w-full rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(22,72,120,0.15)] ${formSection.isVisible ? 'smooth-left-visible' : 'smooth-left-hidden'}`} style={{ animationDelay: '200ms' }}>
              <Image 
                src="/images/contact-support.jpg" 
                alt="CopterJet Customer Support" 
                fill 
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#164878]/30 via-transparent to-transparent mix-blend-multiply" />
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-copter-red" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Column: Form */}
            <div className={`lg:col-span-7 bg-white p-8 lg:p-14 rounded-2xl shadow-[0_20px_50px_rgba(22,72,120,0.08)] border border-gray-100 ${formSection.isVisible ? 'smooth-up-visible' : 'smooth-up-hidden'}`} style={{ animationDelay: '200ms' }}>
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-copter-blue mb-2">Send us a Message</h3>
                <p className="text-gray-500 text-sm">Fill out the form below and we will get back to you promptly.</p>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div className="relative group">
                    <label className={`absolute left-4 transition-all duration-300 pointer-events-none text-sm ${focusedField === 'firstName' ? '-top-2.5 bg-white px-2 text-copter-red font-bold text-[11px]' : 'top-4 text-gray-400 font-medium'}`}>
                      First Name *
                    </label>
                    <input 
                      type="text"
                      required
                      onFocus={() => setFocusedField('firstName')}
                      onBlur={(e) => setFocusedField(e.target.value ? 'firstName' : null)}
                      className={`w-full bg-transparent border-2 rounded-xl px-4 py-4 outline-none text-copter-blue font-medium input-field ${focusedField === 'firstName' ? 'border-copter-red' : 'border-gray-200 hover:border-copter-blue/30'}`}
                    />
                  </div>

                  {/* Last Name */}
                  <div className="relative group">
                    <label className={`absolute left-4 transition-all duration-300 pointer-events-none text-sm ${focusedField === 'lastName' ? '-top-2.5 bg-white px-2 text-copter-red font-bold text-[11px]' : 'top-4 text-gray-400 font-medium'}`}>
                      Last Name *
                    </label>
                    <input 
                      type="text" 
                      required
                      onFocus={() => setFocusedField('lastName')}
                      onBlur={(e) => setFocusedField(e.target.value ? 'lastName' : null)}
                      className={`w-full bg-transparent border-2 rounded-xl px-4 py-4 outline-none text-copter-blue font-medium input-field ${focusedField === 'lastName' ? 'border-copter-red' : 'border-gray-200 hover:border-copter-blue/30'}`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="relative group">
                    <label className={`absolute left-4 transition-all duration-300 pointer-events-none text-sm ${focusedField === 'email' ? '-top-2.5 bg-white px-2 text-copter-red font-bold text-[11px]' : 'top-4 text-gray-400 font-medium'}`}>
                      Email Address *
                    </label>
                    <input 
                      type="email" 
                      required
                      onFocus={() => setFocusedField('email')}
                      onBlur={(e) => setFocusedField(e.target.value ? 'email' : null)}
                      className={`w-full bg-transparent border-2 rounded-xl px-4 py-4 outline-none text-copter-blue font-medium input-field ${focusedField === 'email' ? 'border-copter-red' : 'border-gray-200 hover:border-copter-blue/30'}`}
                    />
                  </div>

                  {/* Phone */}
                  <div className="relative group">
                    <label className={`absolute left-4 transition-all duration-300 pointer-events-none text-sm ${focusedField === 'phone' ? '-top-2.5 bg-white px-2 text-copter-red font-bold text-[11px]' : 'top-4 text-gray-400 font-medium'}`}>
                      Phone Number *
                    </label>
                    <input 
                      type="tel" 
                      required
                      onFocus={() => setFocusedField('phone')}
                      onBlur={(e) => setFocusedField(e.target.value ? 'phone' : null)}
                      className={`w-full bg-transparent border-2 rounded-xl px-4 py-4 outline-none text-copter-blue font-medium input-field ${focusedField === 'phone' ? 'border-copter-red' : 'border-gray-200 hover:border-copter-blue/30'}`}
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="relative group">
                  <label className={`absolute left-4 transition-all duration-300 pointer-events-none text-sm ${focusedField === 'subject' ? '-top-2.5 bg-white px-2 text-copter-red font-bold text-[11px]' : 'top-4 text-gray-400 font-medium'}`}>
                    Subject *
                  </label>
                  <input 
                    type="text" 
                    required
                    onFocus={() => setFocusedField('subject')}
                    onBlur={(e) => setFocusedField(e.target.value ? 'subject' : null)}
                    className={`w-full bg-transparent border-2 rounded-xl px-4 py-4 outline-none text-copter-blue font-medium input-field ${focusedField === 'subject' ? 'border-copter-red' : 'border-gray-200 hover:border-copter-blue/30'}`}
                  />
                </div>

                {/* Message */}
                <div className="relative group">
                  <label className={`absolute left-4 transition-all duration-300 pointer-events-none text-sm ${focusedField === 'message' ? '-top-2.5 bg-white px-2 text-copter-red font-bold text-[11px]' : 'top-4 text-gray-400 font-medium'}`}>
                    Your Message *
                  </label>
                  <textarea 
                    rows={5}
                    required
                    onFocus={() => setFocusedField('message')}
                    onBlur={(e) => setFocusedField(e.target.value ? 'message' : null)}
                    className={`w-full bg-transparent border-2 rounded-xl px-4 py-4 outline-none text-copter-blue font-medium resize-none input-field ${focusedField === 'message' ? 'border-copter-red' : 'border-gray-200 hover:border-copter-blue/30'}`}
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-copter-red text-white py-5 rounded-xl font-bold tracking-[0.2em] uppercase text-sm hover:bg-red-700 transition-all shadow-[0_10px_20px_rgba(196,14,20,0.2)] hover:shadow-[0_15px_30px_rgba(196,14,20,0.3)] hover:-translate-y-1 flex items-center justify-center gap-3"
                >
                  Send Message
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>
              </form>
            </div>

            {/* Right Column: Contact Info Cards */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {contactDetails.map((detail, idx) => (
                <div 
                  key={idx} 
                  className={`bg-white p-8 rounded-2xl shadow-[0_10px_30px_rgba(22,72,120,0.04)] border border-gray-100 flex items-start gap-6 group hover:-translate-y-1 transition-all duration-300 ${formSection.isVisible ? 'smooth-left-visible' : 'smooth-left-hidden'}`}
                  style={{ animationDelay: `${300 + (idx * 150)}ms` }}
                >
                  <div className="w-14 h-14 rounded-full bg-[#f0f4f8] flex items-center justify-center flex-shrink-0 group-hover:bg-copter-blue transition-colors duration-300">
                    <svg className="w-6 h-6 text-copter-blue group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={detail.icon} />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-copter-blue uppercase tracking-widest mb-3">{detail.title}</h4>
                    {detail.desc.split('\n').map((line, lIdx) => (
                      <p key={lIdx} className="text-[#4a5568] text-[15px] leading-relaxed font-medium">
                        {detail.action ? (
                          <a href={detail.action} className="hover:text-copter-red transition-colors block">{line}</a>
                        ) : (
                          line
                        )}
                      </p>
                    ))}
                  </div>
                </div>
              ))}

              {/* Social Follow */}
              <div 
                className={`bg-copter-blue p-8 rounded-2xl shadow-[0_10px_30px_rgba(22,72,120,0.2)] flex flex-col gap-6 group relative overflow-hidden ${formSection.isVisible ? 'smooth-left-visible' : 'smooth-left-hidden'}`}
                style={{ animationDelay: '800ms' }}
              >
                <div className="absolute right-0 top-0 w-32 h-32 bg-copter-red/10 rounded-full blur-3xl" />
                <h4 className="text-[13px] font-bold text-white uppercase tracking-widest relative z-10">Follow Our Journey</h4>
                <div className="flex gap-4 relative z-10">
                  {socials.map((s) => (
                    <a 
                      key={s.label} 
                      href={s.href}
                      target={s.href !== '#' ? "_blank" : undefined}
                      rel={s.href !== '#' ? "noopener noreferrer" : undefined}
                      aria-label={s.label}
                      className="w-11 h-11 flex items-center justify-center rounded-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg shadow-sm"
                      style={{ backgroundColor: s.brandBg }}
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d={s.path} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          3. MAP / LOCATION SECTION
      ════════════════════════════════════════════════════════ */}
      <section ref={mapSection.ref} className={`pb-20 lg:pb-32 px-6 lg:px-12 ${mapSection.isVisible ? 'smooth-up-visible' : 'smooth-up-hidden'}`} style={{ animationDelay: '200ms' }}>
        <div className="max-w-[90rem] mx-auto">
          <div className="w-full h-[400px] lg:h-[500px] rounded-3xl overflow-hidden relative shadow-[0_20px_50px_rgba(22,72,120,0.1)] bg-[#e5e7eb] group border-[4px] border-white">
            
            {/* Embedded Google Map */}
            <iframe 
              src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Airport%20Business%20Hub,%20Ikeja,%20Lagos,%20Nigeria+(CopterJet%20International)&t=&z=15&ie=UTF8&iwloc=B&output=embed"
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'grayscale(100%) contrast(1.1) opacity(0.8)' }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 group-hover:filter-none transition-all duration-1000"
            />
            
            {/* Overlay Map Badge */}
            <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/50 max-w-xs pointer-events-none">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full bg-copter-red animate-pulse" />
                <h4 className="font-bold text-copter-blue tracking-widest text-xs uppercase">Global Headquarters</h4>
              </div>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">
                Operating from the heart of Nigeria's aviation hub to serve the continent and beyond.
              </p>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
