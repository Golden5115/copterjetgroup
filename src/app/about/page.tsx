'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';

// ══════════════════════════════════════════════════════════════
// HOOKS
// ══════════════════════════════════════════════════════════════

function useInView(options: { threshold?: number } = { threshold: 0.15 }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
    }, { threshold: options.threshold });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { ref, isVisible };
}

function useTilt() {
  const ref = useRef<HTMLDivElement>(null);
  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale(1.02)`;
  }, []);
  const handleLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = 'perspective(800px) rotateY(0) rotateX(0) scale(1)';
  }, []);
  return { ref, handleMove, handleLeave };
}

// ══════════════════════════════════════════════════════════════
// SVG ASSETS (Plane & Helicopter)
// ══════════════════════════════════════════════════════════════

function PlaneIcon() {
  return (
    <div className="relative">
      <div className="absolute right-[90%] top-[45%] w-[600px] h-[3px] bg-gradient-to-r from-transparent via-white/30 to-white/80 blur-[1px]" />
      <div className="absolute right-[90%] top-[55%] w-[600px] h-[2px] bg-gradient-to-r from-transparent via-white/20 to-white/60 blur-[1px]" />
      <svg width="240" height="80" viewBox="0 0 200 60" fill="white" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.8))' }}>
        <path d="M170,26 C185,26 196,28 200,30 C196,32 185,34 170,34 L16,34 C7,34 2,32 2,30 C2,28 7,26 16,26 Z" />
        <path d="M166,26 L200,30 L166,34 Z" />
        <path d="M80,30 L114,30 L135,56 L58,56 Z" />
        <ellipse cx="112" cy="56" rx="11" ry="3.5" />
        <ellipse cx="82" cy="56" rx="8.5" ry="3" />
        <path d="M10,30 L30,30 L36,44 L4,44 Z" />
        <path d="M14,17 L26,17 L26,27 L14,27 Z" />
        <path d="M155,27 L174,27 L174,33 L155,33 Z" fill="#C40E14" />
      </svg>
    </div>
  );
}

function HelicopterIcon() {
  return (
    <div className="relative">
      <svg width="220" height="90" viewBox="0 0 190 80" fill="white" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.8))' }}>
        <g transform="translate(90, 16)" style={{ animation: 'rotorSpin 0.1s linear infinite', transformOrigin: '0px 0px' }}>
          <line x1="-72" y1="0" x2="72" y2="0" stroke="white" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="0" y1="-72" x2="0" y2="72" stroke="white" strokeWidth="4.5" strokeLinecap="round" />
        </g>
        <circle cx="90" cy="16" r="6" />
        <path d="M38,20 C38,14 48,10 62,10 L108,10 C124,10 134,17 134,26 C134,35 124,42 108,42 L62,42 C48,42 38,38 38,32 Z" />
        <path d="M100,10 C118,10 134,17 134,26 C134,35 118,42 100,42 Z" fill="#164878" />
        <path d="M38,30 L6,36 L6,34 L38,26 Z" />
        <path d="M6,26 L14,26 L14,36 L6,36 Z" />
        <line x1="10" y1="20" x2="10" y2="44" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="60" y1="42" x2="56" y2="56" stroke="white" strokeWidth="2.5" />
        <line x1="100" y1="42" x2="104" y2="56" stroke="white" strokeWidth="2.5" />
        <line x1="48" y1="56" x2="112" y2="56" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// SUB-COMPONENTS
// ══════════════════════════════════════════════════════════════

const PortraitPlaceholder = () => (
  <div className="w-full h-full bg-gradient-to-br from-[#0c2d4d] via-[#164878] to-[#1a558c] flex items-center justify-center relative overflow-hidden">
    <div className="absolute -top-8 -right-8 w-32 h-32 bg-copter-red/10 rounded-full blur-2xl portrait-orb-1" />
    <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-white/5 rounded-full blur-2xl portrait-orb-2" />
    <svg className="w-20 h-20 text-white/15 relative z-10" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  </div>
);

function AnimatedCounter({ target, suffix = '', duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) { setStarted(true); observer.disconnect(); }
    }, { threshold: 0.5 });
    if (el) observer.observe(el);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (!started) return;
    const startTime = Date.now();
    const timer = setInterval(() => {
      const progress = Math.min((Date.now() - startTime) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - progress, 4)) * target));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function TeamCard({ member, index, isVisible }: { member: { name: string; role: string; image: string }; index: number; isVisible: boolean }) {
  const tilt = useTilt();
  return (
    <div
      ref={tilt.ref}
      onMouseMove={tilt.handleMove}
      onMouseLeave={tilt.handleLeave}
      className={`team-card group relative bg-white overflow-hidden shadow-[0_8px_40px_rgba(22,72,120,0.06)] border border-gray-100/80 ${isVisible ? 'smooth-scale-visible' : 'smooth-scale-hidden'}`}
      style={{ animationDelay: `${(index * 150) + 100}ms`, transition: 'transform 0.4s cubic-bezier(0.03,0.98,0.52,0.99)' }}
    >
      <div className="relative w-full pt-[130%] overflow-hidden">
        {member.image ? (
          <Image src={member.image} alt={member.name} fill className="object-cover group-hover:scale-110 transition-transform duration-[1.2s] ease-out" />
        ) : (
          <div className="absolute inset-0 group-hover:scale-110 transition-transform duration-[1.2s] ease-out"><PortraitPlaceholder /></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-copter-blue/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-copter-red transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-700 ease-out z-20" />
      </div>
      <div className="p-5 text-center relative">
        <h4 className="text-[15px] font-bold text-copter-blue mb-1 mt-2 tracking-tight">{member.name}</h4>
        <p className="text-[9px] text-copter-red font-bold uppercase tracking-[0.2em]">{member.role}</p>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════════

export default function AboutPage() {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 150);
    return () => clearTimeout(t);
  }, []);

  // Scroll triggers
  const whoWeAre = useInView({ threshold: 0.1 });
  const stats = useInView({ threshold: 0.3 });
  const history = useInView({ threshold: 0.2 });
  const values = useInView({ threshold: 0.15 });
  const people = useInView({ threshold: 0.1 });
  const management = useInView({ threshold: 0.05 });
  const board = useInView({ threshold: 0.05 });
  const governance = useInView({ threshold: 0.15 });

  // Data
  const managementTeam = [
    { name: "Pending Name", role: "Chief Executive Officer", image: "" },
    { name: "Pending Name", role: "Chief Operating Officer", image: "" },
    { name: "Pending Name", role: "Chief Financial Officer", image: "" },
    { name: "Pending Name", role: "Director of Aviation", image: "" },
  ];
  const boardMembers = [
    { name: "Pending Name", role: "Chairman of the Board", image: "" },
    { name: "Pending Name", role: "Board Member", image: "" },
    { name: "Pending Name", role: "Board Member", image: "" },
  ];
  const statItems = [
    { value: 15, suffix: '+', label: 'Years of Expertise' },
    { value: 30, suffix: '+', label: 'Strategic Partners' },
    { value: 12, suffix: '+', label: 'African Nations Served' },
    { value: 200, suffix: '+', label: 'Successful Operations' },
  ];
  
  const valuesData = {
    integrity: { icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z', title: 'Integrity', desc: 'Our operations are anchored in transparency, ethical conduct, and unwavering trust across every engagement.' },
    innovation: { icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z', title: 'Innovation', desc: 'We continuously pursue advanced solutions that redefine operational efficiency and industry standards.' },
    excellence: { icon: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z', title: 'Excellence', desc: 'Every service, solution, and partnership is delivered with the highest standards of quality and precision.' },
    partnership: { icon: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z', title: 'Partnership', desc: 'We build enduring alliances that multiply value across Africa\'s aviation ecosystem and beyond.' }
  };

  const heroLines = ['Shaping the Future', 'of African Aviation.'];

  return (
    <main className="min-h-screen bg-white overflow-hidden pb-0">

      <style>{`
        /* ═══════════════════════════════════════
           UNIVERSAL SMOOTH ANIMATIONS
        ═══════════════════════════════════════ */
        
        /* Upgraded Cinematic Ease-In-Out Float */
        @keyframes smoothFloatUp {
          0% { opacity: 0; transform: translateY(80px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .smooth-up-hidden { opacity: 0; }
        .smooth-up-visible { animation: smoothFloatUp 1.6s cubic-bezier(0.22, 1, 0.36, 1) forwards; }

        @keyframes smoothFloatRight {
          0% { opacity: 0; transform: translateX(-80px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .smooth-right-hidden { opacity: 0; }
        .smooth-right-visible { animation: smoothFloatRight 1.6s cubic-bezier(0.22, 1, 0.36, 1) forwards; }

        @keyframes smoothScaleIn {
          0% { opacity: 0; transform: scale(0.92) translateY(40px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .smooth-scale-hidden { opacity: 0; }
        .smooth-scale-visible { animation: smoothScaleIn 1.6s cubic-bezier(0.22, 1, 0.36, 1) forwards; }

        /* ═══════════════════════════════════════
           HERO MOTION GRAPHICS & ANIMATIONS
        ═══════════════════════════════════════ */

        .outline-text {
          -webkit-text-stroke: 2px rgba(255, 255, 255, 0.08);
          color: transparent; font-size: 18vw; line-height: 1; user-select: none;
        }

        @keyframes flyPlane {
          0%   { transform: translate(-30vw, 50vh) rotate(-15deg) scale(0.6); opacity: 0; }
          10%  { opacity: 1; }
          45%  { transform: translate(35vw, 15vh) rotate(-5deg) scale(1); }
          90%  { opacity: 1; }
          100% { transform: translate(120vw, -20vh) rotate(5deg) scale(0.8); opacity: 0; }
        }
        .anim-plane { position: absolute; animation: flyPlane 14s cubic-bezier(0.35, 0, 0.65, 1) infinite; will-change: transform; }

        @keyframes flyCopter {
          0%   { transform: translate(120vw, 10vh) rotate(10deg) scaleX(-1) scaleY(0.7); opacity: 0; }
          10%  { opacity: 1; }
          60%  { transform: translate(40vw, 40vh) rotate(0deg) scaleX(-1) scaleY(0.9); }
          90%  { opacity: 1; }
          100% { transform: translate(-30vw, 20vh) rotate(-5deg) scaleX(-1) scaleY(0.7); opacity: 0; }
        }
        .anim-copter { position: absolute; animation: flyCopter 18s cubic-bezier(0.4, 0, 0.6, 1) 4s infinite; will-change: transform; }

        @keyframes rotorSpin { to { transform: rotate(360deg); } }

        @keyframes floatGeo {
          0%,100% { transform: translateY(0px) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-20px) rotate(45deg); opacity: 0.5; }
        }

        @keyframes heroLineIn {
          from { opacity: 0; transform: translateY(50px) skewY(2deg); filter: blur(8px); }
          to   { opacity: 1; transform: translateY(0) skewY(0deg); filter: blur(0); }
        }
        .hero-line-hidden { opacity: 0; }
        .hero-line-visible { animation: heroLineIn 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards; }

        @keyframes revealRight {
          0% { clip-path: inset(0 100% 0 0); }
          100% { clip-path: inset(0 0 0 0); }
        }
        .reveal-right { animation: revealRight 1.6s cubic-bezier(0.65,0,0.35,1) forwards; }

        @keyframes counterGlow {
          0%,100% { text-shadow: 0 0 20px rgba(196,14,20,0); }
          50% { text-shadow: 0 0 40px rgba(196,14,20,0.3); }
        }
        .counter-glow { animation: counterGlow 3s ease-in-out infinite; }

        @keyframes scrollBounce {
          0%,100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(8px); opacity: 1; }
        }
        .scroll-indicator { animation: scrollBounce 2.2s ease-in-out infinite; }

        /* Path Tracing for History Line */
        @keyframes drawPath {
          from { max-height: 0; opacity: 0; }
          to { max-height: 100%; opacity: 1; }
        }
        .history-line-draw { animation: drawPath 2.5s cubic-bezier(0.22, 1, 0.36, 1) forwards; overflow: hidden; }

        .wing-divider { position: relative; display: flex; align-items: center; justify-content: center; gap: 12px; }
        .wing-divider::before, .wing-divider::after { content: ''; flex: 1; height: 1px; background: linear-gradient(to var(--dir), transparent, rgba(196,14,20,0.3)); }
        .wing-divider::before { --dir: right; }
        .wing-divider::after  { --dir: left; }
      `}</style>


      {/* ════════════════════════════════════════════════════════
          1. HERO — INTERTWINED MOTION GRAPHICS
      ════════════════════════════════════════════════════════ */}
      <section className="relative w-full h-[85svh] min-h-[650px] flex items-center justify-center overflow-hidden bg-[#030912]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="absolute inset-0 bg-gradient-to-br from-[#164878]/10 via-transparent to-[#C40E14]/10" />
        </div>
        <div className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none overflow-hidden">
          <h1 className={`outline-text font-bold tracking-tighter transition-all duration-1000 delay-300 ${heroVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>COPTERJET</h1>
        </div>
        <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden"><div className="anim-plane"><PlaneIcon /></div></div>
        <div className="absolute inset-0 z-[3] pointer-events-none overflow-hidden"><div className="anim-copter"><HelicopterIcon /></div></div>
        <div className="absolute inset-0 z-[4] pointer-events-none" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="absolute bg-white/10" style={{ left: `${10 + (i * 12)}%`, top: `${20 + (i * 15) % 60}%`, width: i % 2 === 0 ? '4px' : '2px', height: i % 2 === 0 ? '4px' : '15px', animation: `floatGeo ${6 + i}s ease-in-out ${i}s infinite` }} />
          ))}
        </div>
        <div className="relative z-[10] w-full max-w-[90rem] mx-auto px-6 lg:px-12 flex flex-col items-center text-center mt-10">
          <div className={`flex items-center gap-4 mb-8 transition-all duration-700 delay-500 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="w-12 h-[2px] bg-copter-red" />
            <span className="text-white font-bold tracking-[0.3em] text-[11px] uppercase drop-shadow-md">Discover Our Identity</span>
            <div className="w-12 h-[2px] bg-copter-red" />
          </div>
          <h1 className="mb-8" style={{ perspective: '1000px' }}>
            {heroLines.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-2">
                <span className={`block text-4xl md:text-6xl lg:text-[5.5rem] font-bold leading-[1.1] tracking-tight drop-shadow-xl ${heroVisible ? 'hero-line-visible' : 'hero-line-hidden'}`} style={{ animationDelay: `${700 + i * 200}ms`, color: i === 1 ? '#C40E14' : 'white' }}>
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <p className={`text-white/80 text-base md:text-lg max-w-2xl leading-relaxed font-medium drop-shadow-md transition-all duration-1000 delay-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            A fully integrated aviation specialist services firm committed to advancing Africa&apos;s aerospace supply chain and operational ecosystem.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-[5]" />
        <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-[15] flex flex-col items-center gap-1.5 transition-all duration-700 delay-[2000ms] ${heroVisible ? 'opacity-100' : 'opacity-0'}`}>
          <span className="text-copter-blue font-bold tracking-[0.3em] uppercase text-[8px]">Scroll</span>
          <div className="scroll-indicator text-copter-red"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          2. WHO WE ARE
      ════════════════════════════════════════════════════════ */}
      <section ref={whoWeAre.ref} className="py-24 lg:py-36 max-w-[90rem] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          <div className="lg:col-span-5">
            <div className={`${whoWeAre.isVisible ? 'smooth-up-visible' : 'smooth-up-hidden'}`} style={{ animationDelay: '100ms' }}>
              <div className="wing-divider mb-8 max-w-[200px]">
                <span className="text-copter-red font-bold tracking-[0.2em] text-[9px] uppercase whitespace-nowrap px-2">Who We Are</span>
              </div>
              <h2 className="text-3xl lg:text-[2.8rem] text-copter-blue font-bold leading-[1.15] mb-8 tracking-tight">
                A fully integrated aviation specialist services firm.
              </h2>
            </div>
            <div className={`${whoWeAre.isVisible ? 'smooth-up-visible' : 'smooth-up-hidden'}`} style={{ animationDelay: '300ms' }}>
              <p className="text-[15px] text-copter-grey leading-[1.8] mb-6 font-medium text-justify">
                Copterjet International is a fully integrated aviation specialist services firm committed to advancing Africa&apos;s aerospace supply chain and operational ecosystem. With expertise spanning aviation supply chain, aviation logistics, aircraft operations, maintenance coordination, aircraft acquisition &amp; sales, consultancy, infrastructure development, project management, and asset management, we deliver innovative and reliable solutions.
              </p>
              <p className="text-[15px] text-copter-grey leading-[1.8] text-justify">
                Through excellence, strategic partnerships, and adaptive operational frameworks, we are shaping the future of aviation across Africa.
              </p>
            </div>
            <div className={`mt-10 flex items-center gap-6 ${whoWeAre.isVisible ? 'smooth-up-visible' : 'smooth-up-hidden'}`} style={{ animationDelay: '500ms' }}>
              <div className="w-[3px] h-16 bg-copter-red rounded-full" />
              <div>
                <span className="text-3xl font-bold text-copter-blue">15+</span>
                <p className="text-[11px] text-copter-grey font-medium tracking-wide uppercase mt-1">Years of Aviation Excellence</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 relative">
            <div className="relative h-[500px] lg:h-[650px] w-full">
              {whoWeAre.isVisible && (
                <div className="absolute inset-0 reveal-right overflow-hidden shadow-2xl">
                  <Image src="/images/who-we-are4.jpg" alt="CopterJet Operations" fill quality={90} className="object-cover object-center transform transition-transform duration-[12s] hover:scale-105" />
                  <div className="absolute inset-0 bg-copter-blue/10 mix-blend-multiply" />
                </div>
              )}
              <div className={`absolute -top-4 -right-4 w-full h-full border-2 border-copter-red/15 transition-all duration-1000 delay-700 ${whoWeAre.isVisible ? 'opacity-100' : 'opacity-0'}`} />
              <div className={`absolute -bottom-6 -left-6 w-28 h-28 bg-copter-red z-10 transition-all duration-1000 delay-700 ${whoWeAre.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} style={{ clipPath: 'polygon(0 0, 100% 100%, 0 100%)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          3. STATS BAR
      ════════════════════════════════════════════════════════ */}
      <section ref={stats.ref} className="relative py-20 bg-copter-blue overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {statItems.map((stat, idx) => (
              <div key={idx} className={`text-center relative group ${stats.isVisible ? 'smooth-up-visible' : 'smooth-up-hidden'}`} style={{ animationDelay: `${idx * 150}ms` }}>
                {idx > 0 && <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-12 bg-white/10" />}
                <div className="counter-glow">
                  <span className="text-4xl lg:text-5xl font-bold text-white tracking-tight"><AnimatedCounter target={stat.value} suffix={stat.suffix} /></span>
                </div>
                <p className="text-[10px] text-white/50 font-bold tracking-[0.2em] uppercase mt-3">{stat.label}</p>
                <div className="w-6 h-[2px] bg-copter-red mx-auto mt-4 group-hover:w-12 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          4. OUR HISTORY (Sticky Layout + Flight Path)
      ════════════════════════════════════════════════════════ */}
      <section ref={history.ref} className="relative py-32 lg:py-44 bg-[#030912] overflow-hidden">
        <div className={`absolute inset-0 transition-opacity duration-[2000ms] ${history.isVisible ? 'opacity-25' : 'opacity-0'}`}>
          <Image src="/images/hero-bg-2.7.jpg" alt="" fill className="object-cover object-center grayscale" />
          <div className="absolute inset-0 bg-[#030912]/85" />
        </div>
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-copter-red to-transparent" />
        
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Left: Sticky Title */}
            <div className="lg:col-span-5">
              <div className="sticky top-32">
                <div className={`mb-6 ${history.isVisible ? 'smooth-right-visible' : 'smooth-right-hidden'}`}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-[2px] bg-copter-red" />
                    <span className="text-copter-red font-bold tracking-[0.2em] text-[10px] uppercase">Our History</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-8">
                    Rooted in <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-copter-red to-[#ff4d4d]">Purpose.</span>
                  </h2>
                  <p className="text-white/50 text-[15px] leading-relaxed font-medium max-w-sm">
                    Tracing the flight path of our growth, from a shared vision to a leading force in African aviation infrastructure and operations.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Scrolling Narrative */}
            <div className="lg:col-span-7 relative pt-8 lg:pt-0">
              {/* Animated Flight Path Line */}
              <div className={`absolute left-4 md:left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-copter-red via-copter-red/20 to-transparent origin-top ${history.isVisible ? 'history-line-draw' : 'opacity-0'}`} />

              <div className="space-y-24 pl-14 md:pl-24">
                <div className={`relative ${history.isVisible ? 'smooth-up-visible' : 'smooth-up-hidden'}`} style={{ animationDelay: '300ms' }}>
                  <div className="absolute -left-[45px] md:-left-[69px] top-2 w-3.5 h-3.5 rounded-full bg-[#030912] border-[2px] border-copter-red shadow-[0_0_15px_rgba(196,14,20,0.8)]" />
                  <p className="text-xl lg:text-2xl text-white/90 leading-[1.7] font-medium italic">
                    &ldquo;Copterjet&apos;s foundation is rooted in divine purpose and a shared vision for transforming Africa&apos;s aviation landscape with God as the centre of our existence and everything we do.&rdquo;
                  </p>
                </div>

                <div className={`relative ${history.isVisible ? 'smooth-up-visible' : 'smooth-up-hidden'}`} style={{ animationDelay: '500ms' }}>
                  <div className="absolute -left-[45px] md:-left-[69px] top-2 w-3.5 h-3.5 rounded-full bg-[#030912] border-[2px] border-white/40" />
                  <p className="text-[16px] text-white/60 leading-[1.9] text-justify">
                    We believe that coming together marked the beginning, staying together has strengthened our progress, and working together continues to drive our success. Founded to bridge operational and infrastructure gaps within the aviation industry, Copterjet International has evolved into a trusted aviation services and solutions provider.
                  </p>
                </div>

                <div className={`relative ${history.isVisible ? 'smooth-up-visible' : 'smooth-up-hidden'}`} style={{ animationDelay: '700ms' }}>
                   <div className="absolute -left-[45px] md:-left-[69px] top-2 w-3.5 h-3.5 rounded-full bg-[#030912] border-[2px] border-white/40" />
                  <p className="text-[16px] text-white/60 leading-[1.9] text-justify">
                    Through strategic partnerships, industry expertise, and an unwavering commitment to innovation and sustainable growth, we continue to expand our global footprint across aviation supply chain management, flight operations, technical services, and infrastructure development across Africa and beyond.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    

      {/* ════════════════════════════════════════════════════════
          6. OUR PEOPLE INTRO
      ════════════════════════════════════════════════════════ */}
      <section ref={people.ref} className="pt-28 lg:pt-36 pb-12 bg-[#f8fafc] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #164878 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center relative z-10">
          <div className={`${people.isVisible ? 'smooth-up-visible' : 'smooth-up-hidden'}`}>
            <div className="wing-divider mb-6 max-w-[220px] mx-auto">
              <span className="text-copter-red font-bold tracking-[0.2em] text-[9px] uppercase whitespace-nowrap px-2">Our People</span>
            </div>
            <h2 className="text-3xl lg:text-[2.8rem] text-copter-blue font-bold leading-[1.15] mb-8 tracking-tight">
              The strength behind<br />our operations.
            </h2>
            <p className="text-[15px] text-copter-grey leading-[1.9] font-medium max-w-2xl mx-auto">
              Our strength lies in our people — a multidisciplinary team of aviation professionals, technical specialists, operational experts, legal, and strategic advisors with deep industry knowledge and global experience. United by a shared commitment to excellence, innovation, integrity, and service delivery, our people drive the operational efficiency and client-focused solutions that define Copterjet&apos;s success.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          7. MANAGEMENT TEAM
      ════════════════════════════════════════════════════════ */}
      <section ref={management.ref} className="py-20 bg-[#f8fafc]">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className={`${management.isVisible ? 'smooth-up-visible' : 'smooth-up-hidden'} mb-16 max-w-3xl`}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-[2px] bg-copter-red" />
              <h3 className="text-2xl font-bold text-copter-blue tracking-tight">Management Team</h3>
            </div>
            <p className="text-[14px] text-copter-grey leading-[1.8] font-medium pl-14">
              Copterjet&apos;s Management Team comprises experienced aviation and business professionals dedicated to operational excellence, strategic growth, and organizational leadership.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {managementTeam.map((member, idx) => (
              <TeamCard key={idx} member={member} index={idx} isVisible={management.isVisible} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          8. BOARD OF DIRECTORS
      ════════════════════════════════════════════════════════ */}
      <section ref={board.ref} className="py-20 pb-28 bg-[#f8fafc]">
        <div className="absolute left-6 right-6 lg:left-12 lg:right-12 h-[1px] bg-gradient-to-r from-transparent via-copter-blue/10 to-transparent" />
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className={`${board.isVisible ? 'smooth-up-visible' : 'smooth-up-hidden'} mb-16 max-w-3xl`}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-[2px] bg-copter-red" />
              <h3 className="text-2xl font-bold text-copter-blue tracking-tight">Board of Directors</h3>
            </div>
            <p className="text-[14px] text-copter-grey leading-[1.8] font-medium pl-14">
              Our Board of Directors provides strategic oversight, governance, and leadership guidance that supports Copterjet&apos;s long-term vision and sustainable growth objectives.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl">
            {boardMembers.map((member, idx) => (
              <TeamCard key={idx} member={member} index={idx} isVisible={board.isVisible} />
            ))}
          </div>
        </div>
      </section>

        {/* ════════════════════════════════════════════════════════
          5. OUR VALUES (Bento Grid)
      ════════════════════════════════════════════════════════ */}
      <section ref={values.ref} className="relative py-32 bg-[#060e1a] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 relative z-10">
          <div className={`text-center mb-20 ${values.isVisible ? 'smooth-up-visible' : 'smooth-up-hidden'}`}>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">The Principles That <span className="text-transparent bg-clip-text bg-gradient-to-r from-copter-red to-[#ff4d4d]">Drive Us</span></h2>
            <p className="text-white/50 text-[16px] max-w-2xl mx-auto leading-relaxed font-medium">
              Our values form the foundation upon which we build lasting partnerships and deliver operational excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Integrity (Span 2) */}
            <div className={`md:col-span-2 group relative bg-[#0a1220] border border-white/5 p-10 lg:p-14 overflow-hidden hover:border-copter-red/40 transition-colors duration-700 ${values.isVisible ? 'smooth-scale-visible' : 'smooth-scale-hidden'}`} style={{ animationDelay: '100ms' }}>
              <div className="absolute -right-10 -bottom-10 opacity-[0.02] group-hover:opacity-[0.06] group-hover:scale-110 group-hover:rotate-12 transition-all duration-1000">
                <svg className="w-96 h-96 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d={valuesData.integrity.icon} /></svg>
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-xl bg-copter-red/10 border border-copter-red/20 flex items-center justify-center mb-8">
                  <svg className="w-8 h-8 text-copter-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={valuesData.integrity.icon} /></svg>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">{valuesData.integrity.title}</h3>
                <p className="text-white/50 text-lg leading-relaxed max-w-lg">{valuesData.integrity.desc}</p>
              </div>
            </div>

            {/* Innovation (Span 1) */}
            <div className={`md:col-span-1 group relative bg-[#0a1220] border border-white/5 p-10 overflow-hidden hover:border-copter-blue/40 transition-colors duration-700 ${values.isVisible ? 'smooth-scale-visible' : 'smooth-scale-hidden'}`} style={{ animationDelay: '250ms' }}>
              <div className="absolute -right-6 -top-6 opacity-[0.02] group-hover:opacity-[0.06] group-hover:scale-110 group-hover:-rotate-12 transition-all duration-1000">
                <svg className="w-64 h-64 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d={valuesData.innovation.icon} /></svg>
              </div>
              <div className="relative z-10 h-full flex flex-col">
                <div className="w-14 h-14 rounded-xl bg-copter-blue/10 border border-copter-blue/20 flex items-center justify-center mb-auto pb-4">
                  <svg className="w-7 h-7 text-copter-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={valuesData.innovation.icon} /></svg>
                </div>
                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-white mb-3">{valuesData.innovation.title}</h3>
                  <p className="text-white/50 text-[15px] leading-relaxed">{valuesData.innovation.desc}</p>
                </div>
              </div>
            </div>

            {/* Excellence (Span 1) */}
            <div className={`md:col-span-1 group relative bg-[#0a1220] border border-white/5 p-10 overflow-hidden hover:border-copter-blue/40 transition-colors duration-700 ${values.isVisible ? 'smooth-scale-visible' : 'smooth-scale-hidden'}`} style={{ animationDelay: '400ms' }}>
              <div className="absolute -left-6 -bottom-6 opacity-[0.02] group-hover:opacity-[0.06] group-hover:scale-110 group-hover:rotate-12 transition-all duration-1000">
                <svg className="w-64 h-64 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d={valuesData.excellence.icon} /></svg>
              </div>
              <div className="relative z-10 h-full flex flex-col">
                <div className="w-14 h-14 rounded-xl bg-copter-blue/10 border border-copter-blue/20 flex items-center justify-center mb-auto pb-4">
                  <svg className="w-7 h-7 text-copter-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={valuesData.excellence.icon} /></svg>
                </div>
                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-white mb-3">{valuesData.excellence.title}</h3>
                  <p className="text-white/50 text-[15px] leading-relaxed">{valuesData.excellence.desc}</p>
                </div>
              </div>
            </div>

            {/* Partnership (Span 2) */}
            <div className={`md:col-span-2 group relative bg-[#0a1220] border border-white/5 p-10 lg:p-12 overflow-hidden hover:border-copter-red/40 transition-colors duration-700 ${values.isVisible ? 'smooth-scale-visible' : 'smooth-scale-hidden'}`} style={{ animationDelay: '550ms' }}>
               <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.02] group-hover:opacity-[0.06] group-hover:scale-110 transition-all duration-1000">
                <svg className="w-80 h-80 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d={valuesData.partnership.icon} /></svg>
              </div>
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                <div className="w-20 h-20 shrink-0 rounded-xl bg-copter-red/10 border border-copter-red/20 flex items-center justify-center">
                   <svg className="w-10 h-10 text-copter-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={valuesData.partnership.icon} /></svg>
                </div>
                <div className="md:pt-2">
                  <h3 className="text-3xl font-bold text-white mb-4">{valuesData.partnership.title}</h3>
                  <p className="text-white/50 text-lg leading-relaxed">{valuesData.partnership.desc}</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          9. CORPORATE GOVERNANCE
      ════════════════════════════════════════════════════════ */}
      <section ref={governance.ref} className="py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-copter-blue/[0.02] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 relative z-10">
          <div className={`relative overflow-hidden rounded-sm ${governance.isVisible ? 'smooth-scale-visible' : 'smooth-scale-hidden'}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-copter-blue via-[#1a5080] to-[#0c2d4d]" />
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

            <div className="relative z-10 p-10 lg:p-20 flex flex-col md:flex-row items-center gap-12 lg:gap-20">
              <div className={`flex-shrink-0 ${governance.isVisible ? 'smooth-up-visible' : 'smooth-up-hidden'}`} style={{ animationDelay: '200ms' }}>
                <div className="relative">
                  <div className="w-36 h-36 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center border border-white/10 shadow-[0_0_20px_rgba(196,14,20,0.2)]">
                    <div className="w-28 h-28 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                      <svg className="w-12 h-12 text-copter-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${governance.isVisible ? 'smooth-up-visible' : 'smooth-up-hidden'}`} style={{ animationDelay: '400ms' }}>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 tracking-tight">Corporate Governance<br />Framework</h2>
                <p className="text-white/60 text-[15px] leading-[1.9] text-justify">
                  At Copterjet, strong corporate governance forms the foundation of our operations and stakeholder relationships. Our governance framework is built on transparency, accountability, regulatory compliance, ethical business practices, and risk management. Through disciplined oversight and operational integrity, we maintain the highest standards of professionalism while fostering sustainable growth and long-term value creation.
                </p>
                <div className="flex flex-wrap gap-3 mt-8">
                  {['Transparency', 'Accountability', 'Compliance', 'Ethics', 'Risk Management'].map((item, i) => (
                    <span key={i} className="text-[9px] font-bold tracking-[0.15em] uppercase text-white/70 bg-white/5 border border-white/10 px-4 py-2 rounded-sm cursor-default">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}