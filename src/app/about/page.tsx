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
  const [ceoBioExpanded, setCeoBioExpanded] = useState(false);
  const [cooBioExpanded, setCooBioExpanded] = useState(false);
  const [cfoBioExpanded, setCfoBioExpanded] = useState(false);
  const [govAffairsBioExpanded, setGovAffairsBioExpanded] = useState(false);
  const [hbdBioExpanded, setHbdBioExpanded] = useState(false);

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
  const ceo = useInView({ threshold: 0.05 });
  const coo = useInView({ threshold: 0.05 });
  const cfo = useInView({ threshold: 0.05 });
  const govAffairs = useInView({ threshold: 0.05 });
  const hbd = useInView({ threshold: 0.05 });
  const management = useInView({ threshold: 0.05 });
  const board = useInView({ threshold: 0.05 });
  const governance = useInView({ threshold: 0.15 });

  // Data
  const managementTeam = [
    { name: "Pending Name", role: "Chief Operating Officer", image: "" },
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
    { value: 200, suffix: '+', label: 'Successful Deliverables' },
  ];
  
  const coreValues = [
    {
      title: 'Commitment',
      desc: 'We are focused and proactive in styles….',
      icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z',
      color: 'red'
    },
    {
      title: 'Safety',
      desc: 'We are firm on compliance to safety standards, therefore, we maintain strong commitments to safety initiatives at all times.',
      icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
      color: 'blue'
    },
    {
      title: 'Quality',
      desc: 'We pride our brand in its efficient delivery of quality services through a clever blend of our unique business processes.',
      icon: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z',
      color: 'blue'
    },
    {
      title: 'Excellence',
      desc: 'Always doing what we say we will, and striving for excellence in everything we do.',
      icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
      color: 'red'
    },
    {
      title: 'Honesty',
      desc: 'At all times we act with full integrity in providing quality services, being reliable and responsible in all our dealings.',
      icon: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z',
      color: 'blue'
    },
    {
      title: 'Team Spirit',
      desc: 'We continually provide supports to one another within the group, working cooperatively, respecting one another’s views and making our work environment fun, enjoyable and inspiring.',
      icon: 'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z',
      color: 'red'
    }
  ];

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
        
        {/* ── Background Image & Overlays ── */}
        <div className="absolute inset-0 z-0">
          <Image src="/images/hero-bg-2.1.jpg" alt="Aviation Backdrop" fill className="object-cover scale-105" priority />
          {/* Heavy cinematic darkening */}
          <div className="absolute inset-0 bg-[#030912]/80" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030912] via-[#030912]/40 to-[#030912]" />
          {/* Technical grid overlay */}
          <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
        </div>
        {/* ── Motion Graphics (Planes & Copters) ── */}
        <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden"><div className="anim-plane"><PlaneIcon /></div></div>
        <div className="absolute inset-0 z-[3] pointer-events-none overflow-hidden"><div className="anim-copter"><HelicopterIcon /></div></div>
        
        {/* Decorative Floating Geometry */}
        <div className="absolute inset-0 z-[4] pointer-events-none" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="absolute bg-white/20 blur-[1px]" style={{ left: `${5 + (i * 8)}%`, top: `${10 + (i * 23) % 80}%`, width: i % 3 === 0 ? '6px' : '2px', height: i % 3 === 0 ? '6px' : '20px', animation: `floatGeo ${8 + i}s ease-in-out ${i * 0.5}s infinite` }} />
          ))}
        </div>
        {/* ── Main Typography Content ── */}
        <div className="relative z-[10] w-full max-w-[90rem] mx-auto px-6 lg:px-12 flex flex-col items-center text-center mt-12">
          
          {/* Top Label */}
          <div className={`inline-flex items-center gap-3 mb-8 px-6 py-2.5 border border-white/10 bg-white/5 backdrop-blur-md rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-700 delay-300 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="w-2 h-2 rounded-full bg-copter-red animate-pulse" />
            <span className="text-white font-bold tracking-[0.25em] text-[10px] uppercase pt-px">Discover Our Identity</span>
          </div>
          {/* Headline */}
          <h1 className="mb-6 relative">
            <span className={`block text-4xl md:text-6xl lg:text-[5.5rem] font-bold leading-[1.05] tracking-tight text-white mb-2 ${heroVisible ? 'smooth-up-visible' : 'smooth-up-hidden'}`} style={{ animationDelay: '500ms' }}>
              Shaping the Future
            </span>
            <span className={`block text-4xl md:text-6xl lg:text-[5.5rem] font-bold leading-[1.05] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#ff4d4d] to-[#990b0f] italic pr-4 ${heroVisible ? 'smooth-up-visible' : 'smooth-up-hidden'}`} style={{ animationDelay: '700ms' }}>
              of African Aviation & Aerospace.
            </span>
          </h1>
          {/* Description */}
          <p className={`text-white/60 text-base md:text-lg max-w-2xl leading-[1.8] font-medium transition-all duration-1000 delay-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            A fully integrated aviation specialist services firm committed to advancing Africa&apos;s aerospace supply chain and operational ecosystem.
          </p>
          {/* Glowing Line Separator */}
          <div className={`mt-16 w-px h-24 bg-gradient-to-b from-copter-red via-copter-red/50 to-transparent transition-all duration-1000 delay-[1200ms] ${heroVisible ? 'scale-y-100' : 'scale-y-0'} origin-top`} />
        </div>
        {/* ── Bottom Gradient Fade ── */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#030912] to-transparent z-[5]" />
      </section>

    {/* ════════════════════════════════════════════════════════
          2. WHO WE ARE — Floating Cinematic Glass
      ════════════════════════════════════════════════════════ */}
      <section id="who-we-are" ref={whoWeAre.ref} className="relative py-16 lg:py-24 bg-[#030912] overflow-hidden group">
        
        {/* ── Background Image Layer ── */}
        <div className={`absolute right-0 top-0 w-full lg:w-[85%] h-full transition-all duration-[2s] cubic-bezier(0.22, 1, 0.36, 1) ${whoWeAre.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
          <div className="relative w-full h-full overflow-hidden">
            <Image 
              src="/images/hero-bg-2.1.jpg" 
              alt="CopterJet Operations" 
              fill 
              sizes="100vw"
              className="object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-[4s] ease-out" 
            />
            {/* Blend gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#030912] via-[#030912]/80 to-transparent lg:via-[#030912]/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030912] via-transparent to-[#030912]" />
            <div className="absolute inset-0 bg-copter-blue/20 mix-blend-multiply" />
            
            {/* Animated High-Tech Grid */}
            <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '120px 120px' }} />
          </div>
        </div>
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 relative z-10">
          
          {/* ── Frosted Glass Text Panel ── */}
          <div 
            className={`relative max-w-xl bg-[white]/85 backdrop-blur-xl border border-white/5 p-6 md:p-10 lg:p-12 shadow-[0_30px_80px_rgba(0,0,0,0.6)] transition-all duration-[1.5s] cubic-bezier(0.22, 1, 0.36, 1) ${
              whoWeAre.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'
            }`}
          >
            {/* Premium Decorative Corners */}
            <div className="absolute -top-[1px] -left-[1px] w-12 h-12 border-t-[3px] border-l-[3px] border-copter-red" />
            <div className="absolute -bottom-[1px] -right-[1px] w-12 h-12 border-b-[3px] border-r-[3px] border-white/20 group-hover:border-copter-blue transition-colors duration-700" />
            
            {/* Label */}
            <div className={`flex items-center gap-4 mb-8 ${whoWeAre.isVisible ? 'smooth-up-visible' : 'smooth-up-hidden'}`} style={{ animationDelay: '300ms' }}>
              <div className="w-10 h-[2px] bg-copter-red" />
              <span className="text-copter-red font-bold tracking-[0.25em] text-[10px] uppercase">Who We Are</span>
            </div>
            {/* Headline */}
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-copter-blue leading-[1.1] mb-8 tracking-tight ${whoWeAre.isVisible ? 'smooth-up-visible' : 'smooth-up-hidden'}`} style={{ animationDelay: '450ms' }}>
              Integrated Aviation & Aerospace<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-copter-red to-[#ff4d4d] italic pr-2">Specialist.</span>
            </h2>
            
            {/* Body Text */}
            <div className={`space-y-6 mb-12 ${whoWeAre.isVisible ? 'smooth-up-visible' : 'smooth-up-hidden'}`} style={{ animationDelay: '600ms' }}>
              <p className="text-copter-blue text-[15px] md:text-base leading-[1.85] font-medium text-justify">
                Copterjet International is a fully integrated aviation specialist services firm committed to advancing Africa&apos;s aerospace supply chain and operational ecosystem. With expertise spanning aviation supply chain, logistics, aircraft management & operations, maintenance coordination, aircraft acquisition &amp; sales, consultancy, infrastructure development, project management, and asset management, we deliver innovative and reliable solutions.
              </p>
              <p className="text-copter-blue text-[15px] md:text-base leading-[1.85] text-justify">
                Through excellence, strategic partnerships, and adaptive operational frameworks, we are shaping the future of aviation across Africa.
              </p>
            </div>
            {/* Metrics Footer */}
            <div className={`flex items-center justify-between pt-8 border-t border-white/10 ${whoWeAre.isVisible ? 'smooth-up-visible' : 'smooth-up-hidden'}`} style={{ animationDelay: '750ms' }}>
              <div className="flex gap-8 md:gap-12">
                <div>
                  <div className="text-2xl font-bold text-copter-blue">15<span className="text-copter-red">+</span></div>
                  <div className="text-[9px] text-copter-blue font-bold tracking-[0.2em] uppercase mt-1">Years</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-copter-blue">200<span className="text-copter-red">+</span></div>
                  <div className="text-[9px] text-copter-blue font-bold tracking-[0.2em] uppercase mt-1">Operations</div>
                </div>
              </div>
              
              <div className="hidden md:flex items-center gap-3 opacity-50">
                <div className="w-1.5 h-1.5 bg-copter-blue rounded-full animate-pulse" />
                <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-copter-blue">Global Reach</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          3. STATS BAR
      ════════════════════════════════════════════════════════ */}
      <section ref={stats.ref} className="relative py-10 lg:py-12 bg-[#030912] z-20">
        <div className="max-w-[80rem] mx-auto px-6 lg:px-12">
          
          <div className={`relative bg-gradient-to-r from-[#0a1220] via-[#0c1628] to-[#0a1220] border border-white/5 p-6 lg:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] ${stats.isVisible ? 'smooth-scale-visible' : 'smooth-scale-hidden'}`}>
            
            {/* Premium Corner Accents */}
            <div className="absolute -top-[1px] -left-[1px] w-12 h-12 border-t-[3px] border-l-[3px] border-copter-red" />
            <div className="absolute -bottom-[1px] -right-[1px] w-12 h-12 border-b-[3px] border-r-[3px] border-white/20" />
            
            {/* Subtle glow behind the card */}
            <div className="absolute inset-0 bg-copter-blue/5 blur-[50px] -z-10" />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 divide-x-0 lg:divide-x divide-white/10">
              {statItems.map((stat, idx) => (
                <div key={idx} className="text-center group relative">
                  {/* Glowing Counter */}
                  <div className="counter-glow inline-block mb-3">
                    <span className="text-3xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 tracking-tight leading-none drop-shadow-md">
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    </span>
                  </div>
                  
                  {/* Label */}
                  <p className="text-[10px] text-white/50 font-bold tracking-[0.25em] uppercase">
                    {stat.label}
                  </p>
                  
                  {/* Expanding Hover Line */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-6 h-[2px] bg-copter-red/40 group-hover:bg-copter-red group-hover:w-16 transition-all duration-700 ease-out" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          4. OUR HISTORY (Sticky Layout + Flight Path)
      ════════════════════════════════════════════════════════ */}
      <section id="history" ref={history.ref} className="relative py-20 lg:py-28 bg-[#030912] overflow-hidden">
        <div className={`absolute inset-0 transition-opacity duration-[2000ms] ${history.isVisible ? 'opacity-25' : 'opacity-0'}`}>
          <Image src="/images/hero-bg-2.7.jpg" alt="" fill className="object-cover object-center grayscale" />
          <div className="absolute inset-0 bg-[#030912]/85" />
        </div>
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-copter-red to-transparent" />
        
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 min-[900px]:grid-cols-12 gap-16 min-[900px]:gap-24">
            
            {/* Left: Sticky Title */}
            <div className="min-[900px]:col-span-5">
              <div className="sticky top-32">
                <div className={`mb-6 ${history.isVisible ? 'smooth-right-visible' : 'smooth-right-hidden'}`}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-[2px] bg-copter-red" />
                    <span className="text-copter-red font-bold tracking-[0.2em] text-[10px] uppercase">Our History</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight mb-8">
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
            <div className="min-[900px]:col-span-7 relative pt-8 min-[900px]:pt-0">
              {/* Animated Flight Path Line */}
              <div className={`absolute left-4 md:left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-copter-red via-copter-red/20 to-transparent origin-top ${history.isVisible ? 'history-line-draw' : 'opacity-0'}`} />

              <div className="space-y-16 pl-10 md:pl-16">
                <div className={`relative ${history.isVisible ? 'smooth-up-visible' : 'smooth-up-hidden'}`} style={{ animationDelay: '300ms' }}>
                  <div className="absolute -left-[30px] md:-left-[38px] top-2 w-3.5 h-3.5 rounded-full bg-[#030912] border-[2px] border-copter-red shadow-[0_0_15px_rgba(196,14,20,0.8)]" />
                  <p className="text-xl lg:text-2xl text-white/90 leading-[1.7] font-medium italic">
                    &ldquo;Copterjet&apos;s foundation is rooted in divine purpose and a shared vision for transforming Africa&apos;s aviation landscape with God as the centre of our existence and everything we do.&rdquo;
                  </p>
                </div>

                <div className={`relative ${history.isVisible ? 'smooth-up-visible' : 'smooth-up-hidden'}`} style={{ animationDelay: '500ms' }}>
                  <div className="absolute -left-[30px] md:-left-[38px] top-2 w-3.5 h-3.5 rounded-full bg-[#030912] border-[2px] border-white/40" />
                  <p className="text-[16px] text-white/60 leading-[1.9] text-justify">
                    We believe that coming together marked the beginning, staying together has strengthened our progress, and working together continues to drive our success. Founded to bridge operational and infrastructure gaps within the aviation industry, Copterjet International has evolved into a trusted aviation services and solutions provider.
                  </p>
                </div>

                <div className={`relative ${history.isVisible ? 'smooth-up-visible' : 'smooth-up-hidden'}`} style={{ animationDelay: '700ms' }}>
                   <div className="absolute -left-[30px] md:-left-[38px] top-2 w-3.5 h-3.5 rounded-full bg-[#030912] border-[2px] border-white/40" />
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
      <section id="people" ref={people.ref} className="pt-20 lg:pt-24 pb-16 lg:pb-24 bg-[#f8fafc] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #164878 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 relative z-10">
          <div className={`text-center max-w-3xl mx-auto mb-16 ${people.isVisible ? 'smooth-up-visible' : 'smooth-up-hidden'}`}>
            <div className="wing-divider mb-6 max-w-[220px] mx-auto">
              <span className="text-copter-red font-bold tracking-[0.2em] text-[9px] uppercase whitespace-nowrap px-2">Our People</span>
            </div>
            <h2 className="text-3xl lg:text-4xl text-copter-blue font-bold leading-[1.15] mb-8 tracking-tight">
              The strength behind<br />our operations.
            </h2>
            <p className="text-[15px] text-copter-grey leading-[1.9] font-medium">
              Our strength lies in our people — a multidisciplinary team of aviation professionals, technical specialists, operational experts, legal, and strategic advisors with deep industry knowledge and global experience. United by a shared commitment to excellence, innovation, integrity, and service delivery, our people drive the operational efficiency and client-focused solutions that define Copterjet&apos;s success.
            </p>
          </div>

          {/* Group Picture Integration */}
          <div className={`relative w-full aspect-[4/3] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(22,72,120,0.15)] ${people.isVisible ? 'smooth-scale-visible' : 'smooth-scale-hidden'}`} style={{ animationDelay: '500ms' }}>
            <Image 
              src="/images/who_we_are2.jpg" 
              alt="CopterJet International Group Team" 
              fill 
              className="object-cover object-[center_10%]"
            />
            {/* Cinematic overlay for premium feel */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#164878]/40 via-transparent to-transparent mix-blend-multiply" />
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-copter-red" />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          7. MANAGEMENT TEAM
      ════════════════════════════════════════════════════════ */}
      <section id="management" ref={management.ref} className="py-12 lg:py-16 bg-[#f8fafc]">
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
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-3xl">
            {managementTeam.map((member, idx) => (
              <TeamCard key={idx} member={member} index={idx} isVisible={management.isVisible} />
            ))}
          </div> */}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          6.5. FOUNDER & CEO
      ════════════════════════════════════════════════════════ */}
      <section id="ceo" ref={ceo.ref} className="py-16 lg:py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-copter-blue/[0.02] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col min-[900px]:flex-row gap-16 min-[900px]:gap-20">
            {/* Left Column: Image & Sticky Title */}
            <div className="min-[900px]:w-4/12">
              <div className="sticky top-32">
                <div className={`relative w-full pt-[100%] max-w-[340px] mx-auto rounded-xl overflow-hidden shadow-2xl mb-8 ${ceo.isVisible ? 'smooth-scale-visible' : 'smooth-scale-hidden'}`}>
                  <Image 
                    src="/images/ceo.jpg" 
                    alt="Capt. Toluwa V. Olorunyomi" 
                    fill 
                    className="object-cover object-[center_top]"
                  />
                  {/* Subtle brand overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#164878]/60 via-transparent to-transparent mix-blend-multiply" />
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-copter-red" />
                </div>
                
                <div className={`${ceo.isVisible ? 'smooth-right-visible' : 'smooth-right-hidden'} max-w-[340px] mx-auto`} style={{ animationDelay: '300ms' }}>
                  <h3 className="text-3xl lg:text-4xl font-bold text-copter-blue tracking-tight leading-[1.1] mb-2">
                    Capt. Toluwa V.<br />Olorunyomi
                  </h3>
                  <p className="text-copter-red font-bold uppercase tracking-[0.2em] text-[11px] mb-8">
                    Founder & Group Chief Executive
                  </p>

                  <div className="bg-[#f8fafc] border-l-[3px] border-copter-red p-6 lg:p-8 rounded-r-xl shadow-sm relative">
                    <svg className="absolute top-4 left-4 w-8 h-8 text-copter-blue/10 transform -scale-x-100" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                    <p className="text-copter-blue/90 italic font-semibold leading-[1.8] text-[15px] relative z-10 pl-4">
                      "Knowledge acquisition through continuous personal development is non-negotiable."
                    </p>
                    <p className="text-[9px] text-copter-red font-bold uppercase tracking-[0.15em] mt-4 pl-4">
                      — Personal Mantra
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Bio Details */}
            <div className="min-[900px]:w-8/12 min-[900px]:pt-4">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-[2px] bg-copter-red" />
                <h3 className="text-[11px] font-bold text-copter-blue tracking-[0.25em] uppercase">Leadership Profile</h3>
              </div>
              
              <div className={`space-y-6 text-[15px] md:text-[16px] text-[#4a5568] leading-[1.85] font-medium text-justify ${ceo.isVisible ? 'smooth-up-visible' : 'smooth-up-hidden'}`} style={{ animationDelay: '500ms' }}>
                <p>
                  <strong className="text-copter-blue">Capt. Toluwa V. Olorunyomi</strong> is the Founder and Group Chief Executive Officer of Copterjet International Group, a diversified aviation and specialist services organisation focused on advancing Africa&apos;s aerospace, aviation, supply chain & logistics, and infrastructure ecosystem. He is an accomplished aviation professional, entrepreneur, strategist, and transformational leader with extensive experience spanning airline operations, aviation business development, infrastructure initiatives, aircraft asset management, and corporate leadership.
                </p>
                <p>
                  Widely regarded as a visionary entrepreneur, Capt. Olorunyomi has distinguished himself through the development of innovative business models and strategic initiatives that promote transparency, efficiency, and sustainability across the aviation sector. Through his leadership at Copterjet International Group, he has been instrumental in driving solutions across aviation leasing, aircraft acquisitions and sales, airline and helicopter joint venture operations, public-private partnerships, aviation and aerospace infrastructure development, project financing, and specialist aviation advisory services.
                </p>
                <div className={`grid transition-[grid-template-rows] duration-700 ease-in-out ${ceoBioExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <div className="space-y-6 pt-6">
                      <p>
                        A professionally trained commercial pilot and Airline Transport Pilot, Capt. Olorunyomi obtained his commercial pilot licence and completed his aviation education at the prestigious 43 Air School, Port Alfred, and advanced flight training from globally recognised institutions in Louisiana, New Iberia, United States; the United Arab Emirates and the United Kingdom. His aviation career progressed through successive operational leadership positions, culminating in his appointment as a Captain and Line Training Captain. In these capacities, he was responsible not only for flight operations but also for pilot development, operational standards, safety compliance, and mission execution across diverse operational environments within West Africa and beyond.
                      </p>
                      <p>
                        Beyond his flying career, Capt. Olorunyomi has devoted significant effort to researching, developing, and advancing transformative ideas aimed at strengthening the business of aviation in Africa. His passion for industry development has led to continuous engagement in aviation strategy, policy formulation, infrastructure development, investment frameworks, and sustainable growth initiatives designed to enhance the continent&apos;s aviation competitiveness.
                      </p>
                      <p>
                        His executive education and professional development portfolio encompasses aviation management, professional services leadership, operations management, performance management, project and risk management, bid and tender consultancy, leadership development, and organisational transformation. He has participated in executive programmes and leadership masterclasses at internationally respected institutions, including Harvard Business School, Wharton School of Business, London Graduate School, and London Bridge Business School, among others.
                      </p>
                      <p>
                        Throughout his career, Capt. Olorunyomi has played a significant role in driving strategic transformation across multiple organisations through the deployment of innovative business concepts, growth strategies, and operational excellence frameworks. His contributions to leadership, organisational development, and strategic innovation have earned him distinguished professional recognitions, honorary doctoral distinctions in Strategic Leadership and Public Administration, and several prestigious fellowships.
                      </p>
                      <p>
                        He is affiliated with numerous international professional organisations and institutes across aviation, management consulting, corporate governance, valuation, public administration, project management, information management, and credit administration. He is a Certified Management Consultant (CMC), Fellow of the Institute of Management Consultants, Fellow of the Institute of Management Specialists, Fellow of the National Institute of Credit Administration, and a member of several respected aviation and leadership associations, including the Harvard Business School Alumni Network, the Flight Crew Association of Nigeria, the Aircraft Owners and Pilots Association, and the Chartered Institute of Directors.
                      </p>
                      <p>
                        Capt. Olorunyomi remains a passionate advocate for aviation development, local capacity building, infrastructure growth, employment generation, and economic advancement. His work is driven by a commitment to creating innovative pathways for aircraft acquisition, asset optimization, operational efficiency, and sustainable aviation development while promoting safety, comfort, and cost-effectiveness in line with global best practices.
                      </p>
                      <p>
                        A passionate business enthusiast, change manager, strategist, and advocate of good corporate governance, he is recognised for his attention to detail, relentless pursuit of excellence, and unwavering commitment to leadership development and service to humanity.
                      </p>
                      <p className="pb-4 border-b border-gray-100">
                        A devoted father and man of faith, Capt. Olorunyomi is guided by strong values and an enduring commitment to personal growth and lifelong learning.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <button 
                    onClick={() => setCeoBioExpanded(!ceoBioExpanded)}
                    className="group inline-flex items-center gap-2 text-[12px] font-bold text-copter-red uppercase tracking-[0.15em] hover:text-copter-blue transition-colors duration-300"
                  >
                    <span>{ceoBioExpanded ? 'See Less' : 'See More'}</span>
                    <svg className={`w-4 h-4 transition-transform duration-300 ${ceoBioExpanded ? 'rotate-180' : 'group-hover:translate-y-1'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          6.6. GROUP CHIEF OPERATING OFFICER
      ════════════════════════════════════════════════════════ */}
      <section id="coo" ref={coo.ref} className="py-16 lg:py-24 bg-[#f8fafc] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-copter-red/[0.02] rounded-full blur-3xl -translate-y-1/2 -translate-x-1/3 pointer-events-none" />
        
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col min-[900px]:flex-row-reverse gap-16 min-[900px]:gap-20">
            {/* Right Column (Visuals): Image & Sticky Title */}
            <div className="min-[900px]:w-4/12">
              <div className="sticky top-32">
                <div className={`relative w-full pt-[100%] max-w-[340px] mx-auto rounded-xl overflow-hidden shadow-2xl mb-8 ${coo.isVisible ? 'smooth-scale-visible' : 'smooth-scale-hidden'}`}>
                  <Image 
                    src="/images/coo.jpg" 
                    alt="Capt. Oludolapo Ogundele" 
                    fill 
                    className="object-cover object-[center_top]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#164878]/60 via-transparent to-transparent mix-blend-multiply" />
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-copter-red" />
                </div>
                
                <div className={`${coo.isVisible ? 'smooth-left-visible' : 'smooth-left-hidden'} max-w-[340px] mx-auto`} style={{ animationDelay: '300ms' }}>
                  <h3 className="text-3xl lg:text-4xl font-bold text-copter-blue tracking-tight leading-[1.1] mb-2">
                    Capt. Oludolapo<br />Ogundele
                  </h3>
                  <p className="text-copter-red font-bold uppercase tracking-[0.2em] text-[11px]">
                    Group Chief Operating Officer & Director of Operations
                  </p>
                </div>
              </div>
            </div>

            {/* Left Column (Content): Bio Details */}
            <div className="min-[900px]:w-8/12 min-[900px]:pt-4">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-[2px] bg-copter-red" />
                <h3 className="text-[11px] font-bold text-copter-blue tracking-[0.25em] uppercase">Leadership Profile</h3>
              </div>
              
              <div className={`space-y-6 text-[15px] md:text-[16px] text-[#4a5568] leading-[1.85] font-medium text-justify ${coo.isVisible ? 'smooth-up-visible' : 'smooth-up-hidden'}`} style={{ animationDelay: '500ms' }}>
                <p>
                  <strong className="text-copter-blue">Captain Oludolapo Ogundele</strong> is a seasoned aviation executive, operations strategist, and business leader with a distinguished career spanning aviation, engineering, energy trading, logistics, project finance, and infrastructure development. With over fourteen years of progressive leadership experience across multiple sectors, he has built a reputation for driving operational excellence, optimising business performance, and delivering innovative solutions to complex commercial and logistical challenges.
                </p>
                <p>
                  As Group Chief Operating Officer and Director of Operations, Captain Ogundele provides strategic leadership for organisational operations, aviation management, and business growth. His multidisciplinary expertise enables him to effectively align operational efficiency with commercial objectives, ensuring sustainable growth, regulatory compliance, and exceptional service delivery across diverse business environments.
                </p>
                <div className={`grid transition-[grid-template-rows] duration-700 ease-in-out ${cooBioExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <div className="space-y-6 pt-6">
                      <p>
                        A trained Mechanical Engineer and accomplished aviation professional, Captain Ogundele advanced his career within the aviation industry through the Bristow Group, one of the world's leading providers of aviation services. During his distinguished nine-year tenure, he served as a Commercial Pilot and rose through the ranks to become a Captain, accumulating extensive experience in flight operations, aviation safety management, crew resource management, regulatory compliance, and operational leadership. His aviation career equipped him with a deep understanding of risk management, precision execution, decision-making under pressure, and the highest standards of safety and operational integrity.
                      </p>
                      <p>
                        Beyond aviation, Captain Ogundele has successfully led operations within the energy and logistics sectors. As Director of Operations at Reinking Energy Trading, he spearheaded the implementation of strategic operational frameworks that enhanced organisational efficiency, strengthened stakeholder engagement, and improved collaboration across business units. His leadership contributed significantly to the optimisation of trading, logistics, and supply chain operations while supporting sustainable business growth.
                      </p>
                      <p>
                        Recognised for his strategic insight into Nigeria's transportation and logistics ecosystem, he was appointed Executive Director of Structured Trade and Investment Company (STIC), the concessionaire responsible for the landmark NPA/Lagos State Government Trailer Park Project. In this role, he played a critical part in developing and implementing technology-driven logistics solutions designed to address one of Nigeria's most significant transportation challenges—traffic congestion caused by port-bound truck movements. His contributions supported improved traffic management, operational coordination, and infrastructure utilisation within the nation's commercial capital.
                      </p>
                      <p>
                        Captain Ogundele's leadership philosophy is anchored on operational excellence, corporate accountability, innovation, safety culture, and continuous process improvement. His unique ability to bridge technical expertise, aviation discipline, commercial strategy, and infrastructure management positions him as a highly effective executive capable of leading complex organisations through growth, transformation, and operational optimisation.
                      </p>
                      <p>
                        With extensive experience working across aviation, energy, logistics, and infrastructure sectors, he brings to every assignment a rare combination of strategic vision, execution capability, and stakeholder management expertise. His commitment to excellence, organisational resilience, and sustainable value creation continues to make him a respected leader within Nigeria's aviation and business communities.
                      </p>
                      <p className="pb-4 border-b border-gray-100">
                        Captain Oludolapo Ogundele holds a Bachelor of Science (Honours) degree in Mechanical Engineering from the University of Lagos, Nigeria.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <button 
                    onClick={() => setCooBioExpanded(!cooBioExpanded)}
                    className="group inline-flex items-center gap-2 text-[12px] font-bold text-copter-red uppercase tracking-[0.15em] hover:text-copter-blue transition-colors duration-300"
                  >
                    <span>{cooBioExpanded ? 'See Less' : 'See More'}</span>
                    <svg className={`w-4 h-4 transition-transform duration-300 ${cooBioExpanded ? 'rotate-180' : 'group-hover:translate-y-1'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          6.7. GROUP HEAD, FINANCE & STRATEGY
      ════════════════════════════════════════════════════════ */}
      <section id="cfo" ref={cfo.ref} className="py-16 lg:py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-copter-blue/[0.02] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col min-[900px]:flex-row gap-16 min-[900px]:gap-20">
            {/* Left Column (Visuals): Image & Sticky Title */}
            <div className="min-[900px]:w-4/12">
              <div className="sticky top-32">
                <div className={`relative w-full pt-[100%] max-w-[340px] mx-auto rounded-xl overflow-hidden shadow-2xl mb-8 ${cfo.isVisible ? 'smooth-scale-visible' : 'smooth-scale-hidden'}`}>
                  <Image 
                    src="/images/michael-uzor.jpg" 
                    alt="Michael A. Uzor" 
                    fill 
                    className="object-cover object-[center_top]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#164878]/60 via-transparent to-transparent mix-blend-multiply" />
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-copter-red" />
                </div>
                
                <div className={`${cfo.isVisible ? 'smooth-right-visible' : 'smooth-right-hidden'} max-w-[340px] mx-auto`} style={{ animationDelay: '300ms' }}>
                  <h3 className="text-3xl lg:text-4xl font-bold text-copter-blue tracking-tight leading-[1.1] mb-2">
                    Michael A.<br />Uzor
                  </h3>
                  <p className="text-copter-red font-bold uppercase tracking-[0.2em] text-[11px]">
                    Group Head, Finance & Strategy
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column (Content): Bio Details */}
            <div className="min-[900px]:w-8/12 min-[900px]:pt-4">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-[2px] bg-copter-red" />
                <h3 className="text-[11px] font-bold text-copter-blue tracking-[0.25em] uppercase">Leadership Profile</h3>
              </div>
              
              <div className={`space-y-6 text-[15px] md:text-[16px] text-[#4a5568] leading-[1.85] font-medium text-justify ${cfo.isVisible ? 'smooth-up-visible' : 'smooth-up-hidden'}`} style={{ animationDelay: '500ms' }}>
                <p>
                  <strong className="text-copter-blue">Michael A. Uzor</strong> is a highly accomplished financial strategist, corporate finance expert, and business consultant with over three decades of multidisciplinary experience spanning banking, capital markets, financial media, investment management, economic intelligence, and strategic business development.
                </p>
                <p>
                  Throughout his distinguished career, he has been a key member of executive leadership teams responsible for formulating and implementing corporate strategies that drive enterprise value, sustainable growth, and long-term profitability. His expertise lies in corporate finance, business restructuring, strategic planning, financial management, investment analysis, capital market operations, and organisational transformation.
                </p>
                <div className={`grid transition-[grid-template-rows] duration-700 ease-in-out ${cfoBioExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <div className="space-y-6 pt-6">
                      <p>
                        Renowned for his ability to design innovative business models and develop sustainable growth frameworks, Mr. Uzor has consistently helped organisations strengthen their competitive positioning, optimize financial performance, improve operational efficiency, and create enduring shareholder value. His strategic philosophy centers on identifying and maximizing core business strengths while deploying financial and operational structures that support long-term success.
                      </p>
                      <p>
                        Mr. Uzor's professional journey spans leadership roles across some of Nigeria's most respected institutions within the banking, investment, consulting, media, and marketing communications sectors. His contributions have included corporate restructuring, product innovation, economic intelligence reporting, investment banking development, portfolio management enhancement, shareholder engagement strategies, and capital raising initiatives. He has also played significant roles in developing industry position papers on monetary, fiscal, and regulatory policies through strategic engagements within the financial services sector.
                      </p>
                      <p>
                        A graduate of Finance from the University of Nigeria, he holds a Master of Business Administration (MBA) and has undertaken advanced executive and strategic management programmes at internationally recognized institutions, including Cranfield School of Management and several leadership development centres across Europe and Africa. His continuous pursuit of professional excellence has reinforced his reputation as a respected authority in corporate finance, business strategy, and investment management.
                      </p>
                      <p>
                        As a registered Capital Market Practitioner with the Securities and Exchange Commission (SEC), Mr. Uzor maintains active affiliations with several professional bodies, including the Chartered Institute of Bankers of Nigeria and other leading industry associations. His extensive experience in financial analysis, strategic planning, corporate governance, and business intelligence continues to provide organisations with valuable insights for informed decision-making and sustainable growth.
                      </p>
                      <p>
                        At Copterjet International Group, Mr. Uzor provides strategic financial leadership, guiding the Group's financial management framework, investment strategy, capital structure optimisation and risk management initiatives. His wealth of experience, analytical depth, and commitment to excellence remain invaluable to the Group's vision of building a world-class aviation and infrastructure enterprise.
                      </p>
                      <p className="pb-4 border-b border-gray-200">
                        A respected strategist, mentor, and business leader, Michael A. Uzor is recognized for his disciplined approach to leadership, passion for innovation, and unwavering commitment to creating value for stakeholders.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <button 
                    onClick={() => setCfoBioExpanded(!cfoBioExpanded)}
                    className="group inline-flex items-center gap-2 text-[12px] font-bold text-copter-red uppercase tracking-[0.15em] hover:text-copter-blue transition-colors duration-300"
                  >
                    <span>{cfoBioExpanded ? 'See Less' : 'See More'}</span>
                    <svg className={`w-4 h-4 transition-transform duration-300 ${cfoBioExpanded ? 'rotate-180' : 'group-hover:translate-y-1'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          6.8. GROUP HEAD, BUSINESS DEVELOPMENT & CORPORATE COMMUNICATIONS
      ════════════════════════════════════════════════════════ */}
      <section id="hbd" ref={hbd.ref} className="py-16 lg:py-24 bg-[#f8fafc] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-copter-red/[0.02] rounded-full blur-3xl -translate-y-1/2 -translate-x-1/3 pointer-events-none" />
        
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col min-[900px]:flex-row-reverse gap-16 min-[900px]:gap-20">
            {/* Right Column (Visuals): Image & Sticky Title */}
            <div className="min-[900px]:w-4/12">
              <div className="sticky top-32">
                <div className={`relative w-full pt-[100%] max-w-[340px] mx-auto rounded-xl overflow-hidden shadow-2xl mb-8 ${hbd.isVisible ? 'smooth-scale-visible' : 'smooth-scale-hidden'}`}>
                  <Image 
                    src="/images/HBD.jpg" 
                    alt="Engr. Ruth Okoh" 
                    fill 
                    className="object-cover object-[center_top]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#164878]/60 via-transparent to-transparent mix-blend-multiply" />
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-copter-red" />
                </div>
                
                <div className={`${hbd.isVisible ? 'smooth-left-visible' : 'smooth-left-hidden'} max-w-[340px] mx-auto`} style={{ animationDelay: '300ms' }}>
                  <h3 className="text-3xl lg:text-4xl font-bold text-copter-blue tracking-tight leading-[1.1] mb-2">
                    Engr. Ruth<br />Okoh
                  </h3>
                  <p className="text-copter-red font-bold uppercase tracking-[0.2em] text-[11px]">
                    Group Head, Business Development & Corporate Communications
                  </p>
                </div>
              </div>
            </div>

            {/* Left Column (Content): Bio Details */}
            <div className="min-[900px]:w-8/12 min-[900px]:pt-4">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-[2px] bg-copter-red" />
                <h3 className="text-[11px] font-bold text-copter-blue tracking-[0.25em] uppercase">Leadership Profile</h3>
              </div>
              
              <div className={`space-y-6 text-[15px] md:text-[16px] text-[#4a5568] leading-[1.85] font-medium text-justify ${hbd.isVisible ? 'smooth-up-visible' : 'smooth-up-hidden'}`} style={{ animationDelay: '500ms' }}>
                <p>
                  <strong className="text-copter-blue">Ruth Okoh</strong> is an accomplished Aerospace Engineer, technology executive, and multidisciplinary innovator with extensive experience spanning aerospace engineering, space and satellite technology, aviation operations, research and development, strategic partnerships, and enterprise leadership. Recognised for her ability to bridge technical excellence with business innovation, she has built a distinguished career advancing technological solutions, fostering strategic collaborations, and driving impactful initiatives across the aerospace and technology sectors.
                </p>
                <p>
                  With a strong foundation in aircraft and aerospace systems design, Ruth possesses deep expertise in aircraft engineering, propulsion systems, aerospace research, aviation operations, and advanced engineering simulations. Her professional journey includes critical contributions to aircraft maintenance operations, aerospace design projects, satellite technology initiatives, and research-driven innovations that support the growth of Africa's aerospace ecosystem.
                </p>
                <div className={`grid transition-[grid-template-rows] duration-700 ease-in-out ${hbdBioExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <div className="space-y-6 pt-6">
                      <p>
                        As an Aerospace Engineer, she plays a key role in advancing initiatives across space and satellite technology, private aviation, aerospace education, and research and development. Her work focuses on developing innovative solutions, expanding technical knowledge, business development and contributing to the advancement of indigenous aerospace capabilities. Ruth has served as Chief Technology Officer at Sigicomms Limited, where she provided strategic leadership in technology development, portfolio management, business growth, and the cultivation of strategic partnerships within the technology and communications sectors.
                      </p>
                      <p>
                        Ruth's engineering expertise was shaped through her work with the National Space Research and Development Agency (NASRDA), where she participated in advanced aerospace projects involving mission analysis, propulsion systems, robotic systems design, unmanned aerial vehicle development, and engineering simulations. Her contributions to spacecraft and aviation-related projects demonstrate a strong command of systems engineering, design optimisation, materials analysis, and innovation management.
                      </p>
                      <p>
                        Earlier in her career, she gained valuable industry experience in aircraft maintenance engineering with leading aviation organisations, supporting rotary and fixed-wing aircraft operations, maintenance procedures, overhaul programmes, inventory management, and aviation safety standards. These experiences provided her with a comprehensive understanding of both the technical and operational dimensions of the aviation industry.
                      </p>
                      <p>
                        Beyond engineering, Ruth is a dynamic professional, researcher, and business strategist with interests spanning technology commercialisation, wellness innovation, and creative enterprise development. She has successfully led ventures focused on retail innovation, indigenous phytotherapy research, product development, and business management. Her professional journey reflects a passion for creating sustainable solutions, nurturing innovation, and transforming ideas into impactful ventures.
                      </p>
                      <p>
                        A strong advocate for knowledge development and industry advancement, Ruth combines analytical thinking, technical expertise, strategic communication, and leadership capability to deliver results in highly specialised and multidisciplinary environments. Her ability to integrate engineering principles with business strategy enables her to identify opportunities, build partnerships, and drive transformational growth across diverse sectors.
                      </p>
                      <p>
                        Educated in Aerospace Engineering at the National Aerospace University, Kharkov, Ukraine, she developed advanced competencies in aircraft design, aerospace systems, propulsion engineering, aviation materials science, simulation technologies, and aircraft construction. Her academic achievements, combined with extensive practical experience, position her as a respected professional within the aerospace and technology communities.
                      </p>
                      <p className="pb-4 border-b border-gray-100">
                        Driven by a commitment to innovation, excellence, and sustainable development, Ruth Okoh continues to champion initiatives that advance aerospace technology, strengthen indigenous technical capacity, and inspire the next generation of innovators, engineers, and industry leaders across Africa and beyond.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <button 
                    onClick={() => setHbdBioExpanded(!hbdBioExpanded)}
                    className="group inline-flex items-center gap-2 text-[12px] font-bold text-copter-red uppercase tracking-[0.15em] hover:text-copter-blue transition-colors duration-300"
                  >
                    <span>{hbdBioExpanded ? 'See Less' : 'See More'}</span>
                    <svg className={`w-4 h-4 transition-transform duration-300 ${hbdBioExpanded ? 'rotate-180' : 'group-hover:translate-y-1'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          6.7. GROUP HEAD, GOVERNMENT & PUBLIC AFFAIRS
      ════════════════════════════════════════════════════════ */}
      <section id="gov-affairs" ref={govAffairs.ref} className="py-16 lg:py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-copter-blue/[0.02] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col min-[900px]:flex-row gap-16 min-[900px]:gap-20">
            {/* Left Column (Visuals): Image & Sticky Title */}
            <div className="min-[900px]:w-4/12">
              <div className="sticky top-32">
                <div className={`relative w-full pt-[100%] max-w-[340px] mx-auto rounded-xl overflow-hidden shadow-2xl mb-8 ${govAffairs.isVisible ? 'smooth-scale-visible' : 'smooth-scale-hidden'}`}>
                  {/* Using PortraitPlaceholder since we don't have an image yet */}
                  <Image 
                    src="/images/babajide-Oluwafemi.jpg" 
                    alt="Babajide O. Jinadu" 
                    fill 
                    className="object-cover object-[center_top]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#164878]/60 via-transparent to-transparent mix-blend-multiply" />
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-copter-red" />
                </div>
                
                <div className={`${govAffairs.isVisible ? 'smooth-right-visible' : 'smooth-right-hidden'} max-w-[340px] mx-auto`} style={{ animationDelay: '300ms' }}>
                  <h3 className="text-3xl lg:text-4xl font-bold text-copter-blue tracking-tight leading-[1.1] mb-2">
                    Babajide O.<br />Jinadu
                  </h3>
                  <p className="text-copter-red font-bold uppercase tracking-[0.2em] text-[11px]">
                    Group Head, Government & Public Affairs
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column (Content): Bio Details */}
            <div className="min-[900px]:w-8/12 min-[900px]:pt-4">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-[2px] bg-copter-red" />
                <h3 className="text-[11px] font-bold text-copter-blue tracking-[0.25em] uppercase">Leadership Profile</h3>
              </div>
              
              <div className={`space-y-6 text-[15px] md:text-[16px] text-[#4a5568] leading-[1.85] font-medium text-justify ${govAffairs.isVisible ? 'smooth-up-visible' : 'smooth-up-hidden'}`} style={{ animationDelay: '500ms' }}>
                <p>
                  <strong className="text-copter-blue">Jinadu Babajide Oluwafemi</strong> is a seasoned government and institutional relations and strategic communications professional with over fifteen years of experience driving high-impact initiatives across the public, private, faith-based, and non-profit sectors. He possesses a unique blend of expertise in stakeholder engagement, public affairs, sports administration, enterprise development, and strategic planning, enabling him to successfully navigate complex environments and deliver sustainable results.
                </p>
                <p>
                  Throughout his career, Babajide has established himself as a trusted adviser and relationship builder, recognised for his ability to cultivate strategic partnerships, facilitate high-level engagements, and coordinate large-scale operations involving government institutions, community leaders, development partners, and private-sector stakeholders. His experience spans public affairs management, governance engagement, strategic communications, protocol administration, and multi-stakeholder project execution.
                </p>
                <div className={`grid transition-[grid-template-rows] duration-700 ease-in-out ${govAffairsBioExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <div className="space-y-6 pt-6">
                      <p>
                        He has led and coordinated numerous nationwide initiatives focused on youth engagement, civic participation, leadership development, and community mobilisation, successfully managing operations across multiple states and working closely with senior government officials, policymakers, development institutions, and influential stakeholders. His expertise in stakeholder management, strategic messaging, and relationship-building has consistently contributed to the successful execution of complex programmes and national engagements.
                      </p>
                      <p>
                        As a business executive, he has managed successful ventures in construction, logistics, facilities management, sports retail, property management, and production services. Through these enterprises, he has demonstrated exceptional capabilities in business development, project management, operational leadership, stakeholder relations, and organizational growth while contributing to job creation and economic empowerment initiatives.
                      </p>
                      <p>
                        His leadership style is characterised by diplomacy, innovation, strategic thinking, and a strong commitment to excellence.
                      </p>
                      <p>
                        A participant in international leadership and diplomatic exchange programmes, including a government-nominated delegation to the People's Republic of China under the Belt and Road Initiative, he brings a global outlook to governance, development, and cross-sector collaboration. His academic and professional background in engineering, business administration, theology, media communications, and leadership development further reinforces his multidisciplinary approach to solving complex challenges.
                      </p>
                      <p className="pb-4 border-b border-gray-100">
                        Driven by a passion for transformational leadership, youth empowerment, institutional development, and nation-building, Jinadu Babajide Oluwafemi continues to leverage his extensive experience, strategic network, and leadership capacity to create meaningful impact across sectors while advancing initiatives that promote sustainable growth and societal progress.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <button 
                    onClick={() => setGovAffairsBioExpanded(!govAffairsBioExpanded)}
                    className="group inline-flex items-center gap-2 text-[12px] font-bold text-copter-red uppercase tracking-[0.15em] hover:text-copter-blue transition-colors duration-300"
                  >
                    <span>{govAffairsBioExpanded ? 'See Less' : 'See More'}</span>
                    <svg className={`w-4 h-4 transition-transform duration-300 ${govAffairsBioExpanded ? 'rotate-180' : 'group-hover:translate-y-1'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          8. BOARD OF DIRECTORS
      ════════════════════════════════════════════════════════ */}
      <section id="board" ref={board.ref} className="py-12 pb-20 lg:py-16 lg:pb-24 bg-[#f8fafc]">
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
          5. OUR VALUES (Core Value Triangle)
      ════════════════════════════════════════════════════════ */}
      <section ref={values.ref} className="relative py-20 lg:py-24 bg-[#060e1a] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 relative z-10">
          <div className={`text-center mb-20 ${values.isVisible ? 'smooth-up-visible' : 'smooth-up-hidden'}`}>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 tracking-tight">Copterjet Core Value <span className="text-transparent bg-clip-text bg-gradient-to-r from-copter-red to-[#ff4d4d]">Triangle</span></h2>
            <p className="text-white/50 text-[16px] max-w-2xl mx-auto leading-relaxed font-medium">
              Our values form the foundation upon which we build lasting partnerships and deliver operational excellence.
            </p>
          </div>

          {(() => {
            const renderCard = (val: typeof coreValues[0], idx: number) => (
              <div 
                key={idx} 
                className={`w-full group relative bg-[#0a1220] border border-white/5 p-8 overflow-hidden transition-colors duration-700 ${values.isVisible ? 'smooth-scale-visible' : 'smooth-scale-hidden'} ${val.color === 'red' ? 'hover:border-copter-red/40' : 'hover:border-copter-blue/40'}`} 
                style={{ animationDelay: `${100 + (idx * 150)}ms` }}
              >
                <div className="absolute -right-6 -top-6 opacity-[0.02] group-hover:opacity-[0.06] group-hover:scale-110 group-hover:-rotate-12 transition-all duration-1000">
                  <svg className="w-64 h-64 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d={val.icon} /></svg>
                </div>
                <div className="relative z-10 h-full flex flex-col">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-auto pb-4 ${val.color === 'red' ? 'bg-copter-red/10 border border-copter-red/20' : 'bg-copter-blue/10 border border-copter-blue/20'}`}>
                    <svg className={`w-7 h-7 ${val.color === 'red' ? 'text-copter-red' : 'text-copter-blue'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={val.icon} /></svg>
                  </div>
                  <div className="mt-12">
                    <h3 className="text-2xl font-bold text-white mb-3 uppercase tracking-wider">{val.title}</h3>
                    <p className="text-white/50 text-[15px] leading-relaxed">{val.desc}</p>
                  </div>
                </div>
              </div>
            );

            return (
              <div className="flex flex-col items-center gap-6 max-w-6xl mx-auto">
                <div className="flex justify-center w-full lg:w-1/3">
                  {renderCard(coreValues[0], 0)}
                </div>
                <div className="flex flex-col lg:flex-row justify-center gap-6 w-full lg:w-2/3">
                  {coreValues.slice(1, 3).map((val, i) => renderCard(val, i + 1))}
                </div>
                <div className="flex flex-col lg:flex-row justify-center gap-6 w-full">
                  {coreValues.slice(3, 6).map((val, i) => renderCard(val, i + 3))}
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          9. CORPORATE GOVERNANCE
      ════════════════════════════════════════════════════════ */}
      <section id="governance" ref={governance.ref} className="py-16 lg:py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-copter-blue/[0.02] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 relative z-10">
          <div className={`relative overflow-hidden rounded-sm ${governance.isVisible ? 'smooth-scale-visible' : 'smooth-scale-hidden'}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-copter-blue via-[#1a5080] to-[#0c2d4d]" />
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

            <div className="relative z-10 p-8 lg:p-14 flex flex-col md:flex-row items-center gap-12 lg:gap-20">
              <div className={`flex-shrink-0 ${governance.isVisible ? 'smooth-up-visible' : 'smooth-up-hidden'}`} style={{ animationDelay: '200ms' }}>
                <div className="relative">
                  <div className="w-28 h-28 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center border border-white/10 shadow-[0_0_20px_rgba(196,14,20,0.2)]">
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                      <svg className="w-10 h-10 text-copter-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${governance.isVisible ? 'smooth-up-visible' : 'smooth-up-hidden'}`} style={{ animationDelay: '400ms' }}>
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6 tracking-tight">Corporate Governance<br />Framework</h2>
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