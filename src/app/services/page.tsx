'use client';

import { useState, useEffect } from 'react';
import HomeCTA from '@/components/sections/HomeCTA';

// ... (skipping unchanged code block manually wouldn't work with exact replacement, so I will replace from export default to the return)

const SERVICES_DATA = [
  {
    id: 'aerospace-supply',
    number: '01',
    title: 'Aerospace Supply Chain,\n Logistics & Technical',
    description: '',
    items: [
      {
        id: 'spares-engines',
        name: 'Aircraft Spares, Components & Engines Sales',
        text: 'We provide trusted access to certified aircraft spares, components, engines, and technical inventory solutions that keep fleets mission-ready, operationally efficient, and globally compliant.',
        icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
      },
      {
        id: 'ground-equipment',
        name: 'Ground Equipment Procurement & Sales',
        text: 'From airport support systems to critical operational equipment, we deliver dependable ground handling and aviation support solutions tailored to industry demands.',
        icon: 'M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12'
      },
      {
        id: 'aircraft-sales',
        name: 'Aircraft Acquisition & Sales',
        text: 'Copterjet facilitates strategic aircraft acquisitions and sales with precision, transparency, and technical expertise, supporting commercial, corporate, and specialized aviation operations.',
        icon: 'M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
      },
      {
        id: 'leasing',
        name: 'Aircraft & Equipment Leasing Solutions',
        text: 'Our flexible leasing solutions enable operators to scale efficiently, optimize capital deployment, and maintain operational continuity without compromising performance.',
        icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
      },
      {
        id: 'appraisal',
        name: 'Aircraft Appraisal & Valuation',
        text: 'We provide independent aircraft appraisal and valuation services backed by market intelligence, technical analysis, and industry insight for financing, insurance, acquisitions, and asset management.',
        icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z'
      },
      {
        id: 'procurement',
        name: 'Focused Aviation Procurements & Ancillary Solutions',
        text: 'We specialize in delivering mission-critical aviation procurement support and ancillary solutions designed to simplify sourcing, strengthen supply continuity, and enhance operational reliability.',
        icon: 'M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z'
      },
      {
        id: 'logistics',
        name: 'Express Air Freight & Logistics',
        text: 'Through responsive logistics coordination and time-sensitive air freight solutions, we ensure the seamless movement of aviation assets, technical materials, and critical cargo across global networks.',
        icon: 'M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z'
      }
    ]
  },
  {
    id: 'aircraft-management',
    number: '02',
    title: 'Aircraft Management\n& Operations',
    description: 'We provide end-to-end aircraft management and operational support for fixed-wing and rotary-wing aircraft, ensuring safety, regulatory compliance, operational efficiency, and maximum asset value. Our services cover flight operations, maintenance oversight, crew management, and technical support in the following areas:',
    items: [
      {
        id: 'airline-jvo',
        name: 'Airline Joint Venture Operations',
        text: 'We facilitate & undertake strategic airline partnerships and joint venture operations that drive growth, expand market reach, optimize resources, and enhance commercial performance across regional and international aviation markets.',
        icon: 'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z'
      },
      {
        id: 'charter',
        name: 'Jets & Helicopters Charter',
        text: 'Our premium charter solutions provide safe, reliable, and flexible private jet and helicopter services for corporate travel, VIP transportation, offshore operations, medical missions, and specialized aviation requirements worldwide.',
        icon: 'M11.412 15.655L9.75 21.75l3.745-4.012M9.257 13.5H3.75l2.659-2.849m2.048-2.194L14.25 2.25 12 10.5h8.25l-4.707 5.043M8.457 8.457L3 3m5.457 5.457l7.086 7.086m0 0L21 21'
      },
      {
        id: 'aircraft-mng',
        name: 'Aircraft Management',
        text: 'We deliver comprehensive aircraft ownership solutions, including maintenance coordination, operational control, crew administration, compliance management, and cost optimisation, allowing owners to maximise aircraft availability and investment returns.',
        icon: 'M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75'
      }
    ]
  },
  {
    id: 'aviation-specialist',
    number: '03',
    title: 'Aviation Specialist\nServices',
    description: '',
    items: [
      {
        id: 'consultancy',
        name: 'Consultancy & Advisory',
        text: 'We provide high-level aviation consultancy and strategic advisory services that empower clients with informed decision-making, operational insight, and sustainable growth strategies.',
        icon: 'M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.82 1.508-2.316a7.5 7.5 0 10-7.516 0c.85.496 1.508 1.333 1.508 2.316V18'
      },
      {
        id: 'infrastructure',
        name: 'Infrastructure Development',
        text: 'Copterjet supports the planning, development, and operational oversight of aviation infrastructure projects designed to strengthen connectivity, efficiency, and long-term sector growth across Africa.',
        icon: 'M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z'
      },
      {
        id: 'intelligence',
        name: 'Business Intelligence Solutions',
        text: 'Our business intelligence solutions transform industry data into actionable insight, helping clients navigate market dynamics, mitigate risk, and unlock strategic opportunities.',
        icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z'
      },
      {
        id: 'risk',
        name: 'Aviation Credit Risk Management & Financial Gatekeeping',
        text: 'We deliver structured financial oversight, transaction assurance, and aviation credit risk management solutions that promote transparency, accountability, and commercial security.',
        icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z'
      },
      {
        id: 'audit',
        name: 'Independent Audit Programmes',
        text: 'Our independent audit programmes are designed to assess operational integrity, regulatory compliance, safety performance, and organizational efficiency across aviation operations and systems.',
        icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
      }
    ]
  }
];

export default function ServicesPage() {
  const [activeTabId, setActiveTabId] = useState(SERVICES_DATA[0].id);

  useEffect(() => {
    let currentHash = '';
    
    const checkHash = () => {
      const newHash = window.location.hash.replace('#', '');
      if (newHash && newHash !== currentHash) {
        currentHash = newHash;
        for (const category of SERVICES_DATA) {
          if (category.items.some(item => item.id === newHash)) {
            setActiveTabId(category.id);
            setTimeout(() => {
              const element = document.getElementById(newHash);
              if (element) {
                const y = element.getBoundingClientRect().top + window.scrollY - 150;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }
            }, 100);
            break;
          }
        }
      }
    };

    // Run on initial load
    checkHash();

    // Next.js Link component often does not fire the native hashchange event
    // when navigating to a hash on the same page. Using an interval ensures we catch it.
    const interval = setInterval(checkHash, 100);
    return () => clearInterval(interval);
  }, []);

  const activeCategory = SERVICES_DATA.find(c => c.id === activeTabId) || SERVICES_DATA[0];

  return (
    <div className="bg-slate-50 min-h-screen text-[#0a1e35] overflow-hidden selection:bg-copter-red selection:text-white">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>
      
      {/* ───────────────────────────────────────────────────────────── */}
      {/* HERO SECTION */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 px-6 lg:px-12 bg-white overflow-hidden z-20 shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
        {/* Subtle Decorative Background Element */}
        <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-copter-red/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

        <div className="max-w-[90rem] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center relative z-10">
          {/* Left Text Content */}
          <div className="lg:w-7/12 shrink-0">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-[3px] bg-copter-red" />
              <span className="text-copter-blue font-bold tracking-[0.2em] uppercase text-[12px] md:text-sm">Capabilities</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.05] mb-8 text-copter-blue">
              OUR<br />
              <span className="text-copter-red">SERVICES</span>
            </h1>
            <p className="text-[#4a5568] text-[16px] md:text-lg leading-[1.8] max-w-3xl text-justify relative z-10 font-medium">
              <strong className="text-copter-blue font-bold tracking-wide">Copterjet International Group</strong> operates through a fully integrated service structure designed to deliver end-to-end aviation, logistics, technical, and infrastructure solutions across the aerospace value chain. Our operations are strategically organized into specialized business divisions to ensure seamless collaboration, operational efficiency, technical reliability, and regulatory compliance.
            </p>
          </div>

          {/* Right Turbine Blade Content */}
          <div className="lg:w-5/12 flex justify-center items-center lg:justify-end">
            <div className="relative w-full max-w-[450px] aspect-square flex justify-center items-center drop-shadow-2xl">
              <img 
                src="/images/turbine-blade.png.png" 
                alt="Turbine Blade" 
                className="w-full h-full object-contain animate-[spin_20s_linear_infinite]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* INTERACTIVE TABBED INTERFACE */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-32 px-6 lg:px-12 relative z-10">
        <div className="max-w-[90rem] mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            
            {/* Left Sidebar: Tabs */}
            <div className="lg:w-4/12 shrink-0 flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 lg:mx-0 lg:px-0">
              {SERVICES_DATA.map((category) => {
                const isActive = activeTabId === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveTabId(category.id)}
                    className={`text-left p-6 md:p-8 rounded-2xl transition-all duration-300 flex flex-col lg:flex-row items-start lg:items-center justify-between group cursor-pointer lg:border-t-0 lg:border-l-4 border-t-4 min-w-[280px] lg:min-w-0 snap-center shrink-0 ${
                      isActive 
                        ? 'bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] border-copter-red text-copter-blue transform lg:scale-[1.02]' 
                        : 'bg-white/50 border-gray-200 text-gray-500 hover:bg-white/80 hover:text-gray-900 hover:border-copter-red/50 hover:shadow-sm'
                    }`}
                  >
                    <div>
                      <span className={`block text-sm font-bold tracking-widest mb-2 transition-colors duration-300 ${isActive ? 'text-copter-red' : 'text-gray-400 group-hover:text-copter-red/70'}`}>
                        {category.number}
                      </span>
                      <span className="text-xl md:text-2xl font-bold whitespace-pre-line leading-tight">
                        {category.title}
                      </span>
                    </div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 lg:ml-4 mt-6 lg:mt-0 transition-all duration-300 ${
                      isActive 
                        ? 'bg-copter-red text-white shadow-md' 
                        : 'bg-gray-200/50 text-gray-400 group-hover:bg-copter-red/10 group-hover:text-copter-red'
                    }`}>
                      <svg className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'translate-x-0' : '-translate-x-0.5 group-hover:translate-x-0.5'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Content: Active Category Bento Grid */}
            <div className="lg:w-8/12">
              <div 
                key={activeCategory.id} // Forces re-mount to trigger CSS animation
                className="animate-fade-in-up"
              >
                <div className="bg-white rounded-[2rem] p-8 md:p-14 shadow-[0_8px_40px_rgba(0,0,0,0.03)] border border-gray-100">
                  <div className="mb-12">
                    <span className="text-copter-red font-black text-6xl md:text-8xl opacity-5 block mb-4 leading-none">
                      {activeCategory.number}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-copter-blue whitespace-pre-line leading-tight">
                      {activeCategory.title}
                    </h2>
                    {activeCategory.description && (
                      <p className="text-gray-500 leading-relaxed mt-6 text-lg max-w-3xl">
                        {activeCategory.description}
                      </p>
                    )}
                    <div className="w-full h-px bg-gray-100 mt-10" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                    {activeCategory.items.map((item, idx) => (
                      <div key={idx} id={item.id} className="group flex flex-col gap-5 scroll-mt-32">
                        <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-gray-100 flex items-center justify-center text-copter-red group-hover:bg-copter-red group-hover:text-white transition-all duration-300 group-hover:shadow-[0_8px_20px_rgba(196,14,20,0.2)]">
                          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-[#0a1e35] mb-3 leading-snug group-hover:text-copter-red transition-colors duration-300">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-500 leading-relaxed">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    ))}
                    {activeCategory.id === 'aircraft-management' && (
                      <div className="flex items-center justify-center sm:justify-start w-full h-full min-h-[150px]">
                        <a
                          href="https://www.copterjet.com.ng/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative inline-flex items-center justify-center bg-gradient-to-r from-copter-red to-[#9e0b11] text-white text-[13px] font-bold tracking-[0.2em] px-8 py-4 rounded-full shadow-[0_4px_15px_rgba(196,14,20,0.3)] hover:shadow-[0_8px_25px_rgba(196,14,20,0.4)] hover:-translate-y-1 transition-all duration-300 uppercase overflow-hidden group/btn"
                        >
                          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]"></span>
                          <span className="relative z-10 flex items-center gap-3">
                            CHARTER PORTAL
                            <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                          </span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* CTA SECTION */}
      {/* ───────────────────────────────────────────────────────────── */}
      <HomeCTA />
    </div>
  );
}
