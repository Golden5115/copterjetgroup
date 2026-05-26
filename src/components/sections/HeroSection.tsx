'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────
type Phase = 'initial' | 'entering' | 'idle' | 'exiting';
type VehicleType = 'plane' | 'helicopter';
type VehicleDir = 'ltr' | 'rtl';

// ─────────────────────────────────────────────────────────────
// Deterministic particles — avoids hydration mismatch
// ─────────────────────────────────────────────────────────────
const PARTICLES = Array.from({ length: 22 }, (_, i) => {
  const s = i + 1;
  return {
    id: i,
    left:     ((s * 47 + 11) % 96) + 2,
    top:      ((s * 31 + 19) % 85) + 5,
    size:     i % 4 === 0 ? 2.5 : i % 3 === 0 ? 1.5 : 1,
    duration: 10 + (s * 7) % 16,
    delay:    -((s * 5) % 14),
    opacity:  0.10 + (s % 5) * 0.035,
  };
});

// ─────────────────────────────────────────────────────────────
// Per-slide HUD data (African aviation hubs)
// ─────────────────────────────────────────────────────────────
const SLIDE_HUD = [
  { city: 'LAGOS, NG',   lat: '06.5244°N', lng: '03.3792°E', hdg: '090' },
  { city: 'NAIROBI, KE', lat: '01.2921°S', lng: '36.8219°E', hdg: '185' },
  { city: 'ACCRA, GH',   lat: '05.6037°N', lng: '00.1870°W', hdg: '270' },
];

// ─────────────────────────────────────────────────────────────
// Feature data — each icon gets a semantically meaningful color
//
//  SAFE OPERATIONS       → emerald green  (green = safe / go / clear)
//  SUSTAINABLE SOLUTIONS → lime green     (plant / nature / ecology)
//  CONNECTED ECOSYSTEM   → sky blue       (sky / digital / network)
//  OPERATIONAL EXCELLENCE→ amber / gold   (premium / excellence)
//  PARTNERSHIPS          → violet         (people / trust / collaboration)
// ─────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon:  'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z',
    title: 'SAFE\nOPERATIONS',
    color: '#a3e635',   // emerald-400
  },
  {
    icon:  'M11 20A7 7 0 019.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z M2 22l10-10',
    title: 'SUSTAINABLE\nSOLUTIONS',
    color: '#4ade80',   // lime-400
  },
  {
    icon:  'M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418',
    title: 'CONNECTED\nECOSYSTEM',
    color: '#38bdf8',   // sky-400
  },
  {
    icon:  'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z',
    title: 'OPERATIONAL\nEXCELLENCE',
    color: '#fbbf24',   // amber-400
  },
  {
    icon:  'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z',
    title: 'PARTNERSHIPS\nTHAT DELIVER',
    color: '#a78bfa',   // violet-400
  },
];

// ─────────────────────────────────────────────────────────────
// FeatureBadge — isolated hover state so dynamic colors work
// ─────────────────────────────────────────────────────────────
function FeatureBadge({
  feature,
  animDelay,
}: {
  feature: typeof FEATURES[0];
  animDelay: string;
}) {
  const [hovered, setHovered] = useState(false);
  const c = feature.color;

  return (
    <div
      className="hs-badge flex flex-col items-center cursor-default"
      style={{ animationDelay: animDelay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Icon box */}
      <div
        className="w-12 h-12 md:w-14 md:h-14 rounded-[12px] flex items-center justify-center mb-2 md:mb-3 backdrop-blur-sm transition-all duration-300"
        style={{
          border:     `1.5px solid ${c}${hovered ? 'bb' : '55'}`,
          background: `${c}${hovered ? '22' : '0e'}`,
          boxShadow:  hovered
            ? `0 4px 22px ${c}44, 0 0 0 1px ${c}22`
            : `0 4px 15px rgba(0,0,0,0.5)`,
        }}
      >
        <svg
          fill="none"
          stroke={c}
          viewBox="0 0 24 24"
          className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300"
          style={{
            transform:  hovered ? 'scale(1.15)' : 'scale(1)',
            filter:     `drop-shadow(0 2px 6px ${c}${hovered ? '99' : '55'})`,
          }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d={feature.icon} />
        </svg>
      </div>

      {/* Label */}
      <span
        className="text-[9px] md:text-[10px] font-bold tracking-[0.1em] uppercase text-center leading-tight whitespace-pre-line transition-colors duration-300"
        style={{
          color:      hovered ? c : 'rgba(255,255,255,0.85)',
          textShadow: '0 2px 10px rgba(0,0,0,1)',
        }}
      >
        {feature.title}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Plane SVG
// ─────────────────────────────────────────────────────────────
function PlaneIcon() {
  return (
    <svg
      width="240" height="80" viewBox="0 0 200 60"
      fill="white" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.6))' }}
    >
      <path d="M170,26 C185,26 196,28 200,30 C196,32 185,34 170,34 L16,34 C7,34 2,32 2,30 C2,28 7,26 16,26 Z" />
      <path d="M166,26 L200,30 L166,34 Z" />
      <path d="M80,30 L114,30 L135,56 L58,56 Z" />
      <ellipse cx="112" cy="56" rx="11" ry="3.5" />
      <ellipse cx="82"  cy="56" rx="8.5" ry="3" />
      <path d="M10,30 L30,30 L36,44 L4,44 Z" />
      <path d="M14,17 L26,17 L26,27 L14,27 Z" />
      <path d="M155,27 L174,27 L174,33 L155,33 Z" fill="rgba(180,220,255,0.85)" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Helicopter SVG
// ─────────────────────────────────────────────────────────────
function HelicopterIcon() {
  return (
    <svg
      width="220" height="90" viewBox="0 0 190 80"
      fill="white" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.6))' }}
    >
      <g transform="translate(90, 16)"
        style={{ animation: 'rotorSpin 0.15s linear infinite', transformOrigin: '0px 0px' }}>
        <line x1="-72" y1="0" x2="72" y2="0" stroke="white" strokeWidth="4.5" strokeLinecap="round" />
        <line x1="0" y1="-72" x2="0" y2="72" stroke="white" strokeWidth="4.5" strokeLinecap="round" />
      </g>
      <circle cx="90" cy="16" r="6" />
      <path d="M38,20 C38,14 48,10 62,10 L108,10 C124,10 134,17 134,26 C134,35 124,42 108,42 L62,42 C48,42 38,38 38,32 Z" />
      <path d="M100,10 C118,10 134,17 134,26 C134,35 118,42 100,42 Z" fill="rgba(160,210,255,0.85)" />
      <path d="M38,30 L6,36 L6,34 L38,26 Z" />
      <path d="M6,26 L14,26 L14,36 L6,36 Z" />
      <line x1="10" y1="20" x2="10" y2="44" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="60" y1="42" x2="56" y2="56" stroke="white" strokeWidth="2.5" />
      <line x1="100" y1="42" x2="104" y2="56" stroke="white" strokeWidth="2.5" />
      <line x1="48" y1="56" x2="112" y2="56" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// HUD Panel
// ─────────────────────────────────────────────────────────────
function HudPanel({ slideIndex, total }: { slideIndex: number; total: number }) {
  const hud = SLIDE_HUD[slideIndex] ?? SLIDE_HUD[0];
  const num = String(slideIndex + 1).padStart(2, '0');
  const tot = String(total).padStart(2, '0');

  return (
    <div className="hud-panel" aria-hidden="true">
      <div className="hud-signal">
        {[1,2,3,4,5].map(b => (
          <div key={b} className="hud-bar" style={{ height: `${b * 3 + 2}px`, animationDelay: `${b * 0.15}s` }} />
        ))}
        <span className="hud-label-sm ml-1.5">SIG</span>
      </div>
      <div className="hud-row">
        <span className="hud-label-sm">HDG</span>
        <span className="hud-value" key={`hdg-${slideIndex}`}>{hud.hdg}°</span>
      </div>
      <div className="hud-divider" />
      <div className="hud-city" key={`city-${slideIndex}`}>{hud.city}</div>
      <div className="hud-coords" key={`coords-${slideIndex}`}>{hud.lat} &nbsp;·&nbsp; {hud.lng}</div>
      <div className="hud-divider" />
      <div className="hud-counter">
        <div className="hud-flip" style={{ perspective: '120px' }}>
          <span className="hud-flip-num" key={`num-${slideIndex}`}>{num}</span>
        </div>
        <span className="hud-label-sm mx-1">/</span>
        <span className="hud-label-sm">{tot}</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────
export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide]   = useState<number | null>(null);
  const [phase, setPhase]           = useState<Phase>('initial');
  const [vehicleActive, setVehicleActive] = useState(false);
  const [vehicleType, setVehicleType]     = useState<VehicleType>('plane');
  const [vehicleDir, setVehicleDir]       = useState<VehicleDir>('ltr');
  const [glowKey, setGlowKey]       = useState(0);

  const phaseRef    = useRef<Phase>('initial');
  const currentRef  = useRef(0);
  const transCount  = useRef(0);
  const timers      = useRef<ReturnType<typeof setTimeout>[]>([]);
  const heroRef     = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => { phaseRef.current   = phase;        }, [phase]);
  useEffect(() => { currentRef.current = currentSlide; }, [currentSlide]);

  const flush = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  const later = (fn: () => void, ms: number) => { timers.current.push(setTimeout(fn, ms)); };

  // Initial entrance
  useEffect(() => {
    later(() => setPhase('entering'), 120);
    later(() => setPhase('idle'), 1700);
    return flush;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mouse parallax — RAF lerp, zero React re-renders
  useEffect(() => {
    const hero     = heroRef.current;
    const parallax = parallaxRef.current;
    if (!hero || !parallax) return;
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    const onMove = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width  - 0.5) * -22;
      ty = ((e.clientY - r.top)  / r.height - 0.5) * -12;
    };
    const tick = () => {
      cx += (tx - cx) * 0.04;
      cy += (ty - cy) * 0.04;
      parallax.style.transform = `translate(${cx}px, ${cy}px)`;
      raf = requestAnimationFrame(tick);
    };
    hero.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(tick);
    return () => { hero.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);

  // Slide transition
  const goToSlide = (next: number) => {
    if (phaseRef.current !== 'idle') return;
    flush();
    transCount.current += 1;
    const n = transCount.current;
    const type: VehicleType = n % 2 === 0 ? 'helicopter' : 'plane';
    const dir: VehicleDir   = n % 3 === 0 ? 'rtl' : 'ltr';
    setVehicleType(type); setVehicleDir(dir);
    setPrevSlide(currentRef.current);
    setPhase('exiting'); phaseRef.current = 'exiting';
    later(() => setVehicleActive(true), 300);
    later(() => { setCurrentSlide(next); setGlowKey(g => g + 1); }, 750);
    later(() => { setPhase('entering'); phaseRef.current = 'entering'; }, 860);
    later(() => setPrevSlide(null), 2500);
    later(() => setVehicleActive(false), 2400);
    later(() => { setPhase('idle'); phaseRef.current = 'idle'; }, 2600);
  };

  // Auto-advance
  useEffect(() => {
    const auto = setInterval(() => {
      if (phaseRef.current === 'idle') goToSlide((currentRef.current + 1) % slides.length);
    }, 8000);
    return () => clearInterval(auto);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const slides = [
    { id: 1, image: '/images/hero-bg-9.jpg', headline: ["Bridging Africa's", "Aerospace Supply", "Chain & Operations", "Ecosystem..."], subtext: 'Building a connected, efficient & resilient ecosystem for sustainable growth.', kenFrom: 'scale(1.12) translate(-2%, 0%)', kenTo: 'scale(1.04) translate(1%, -1%)' },
    { id: 2, image: '/images/hero-bg-2.7.jpg',      headline: ["With Confidence Across", "Aviation, Oilfield Operations,", "Humanitarian & Critical Industries..."],              subtext: 'Optimising operational assets, technical & logistics reliability.', kenFrom: 'scale(1.14) translate(0%, -2%)', kenTo: 'scale(1.04) translate(0%, 1%)' },
    { id: 3, image: '/images/hero-bg-4.jpg',      headline: ["Built on Innovations", "& Excellence..."],                                     subtext: 'All operations are backed by specialised services built on a foundation of rigorous innovation and industry excellence.', kenFrom: 'scale(1.12) translate(2%, 0%)', kenTo: 'scale(1.04) translate(-1%, -1%)' },
  ];

  const textClass =
    phase === 'initial' ? 'hs-hidden' :
    phase === 'exiting' ? 'hs-exiting' :
    'hs-entering';

  const BADGE_DELAYS = ['1200ms', '1360ms', '1520ms', '1680ms', '1840ms'];

  return (
    <>
      <style>{`
        @keyframes rotorSpin { to { transform: rotate(360deg); } }
        @keyframes kenBurns  { from { transform: var(--kb-from); } to { transform: var(--kb-to); } }
        .hs-kb { animation: kenBurns var(--kb-dur, 15s) ease-out forwards; will-change: transform; }

        .hs-scrim {
          background:
            linear-gradient(to right,  rgba(4,10,22,0.82) 0%, transparent 65%),
            linear-gradient(to top,    rgba(4,10,22,0.88) 0%, transparent 48%),
            linear-gradient(to bottom, rgba(4,10,22,0.48) 0%, transparent 28%);
        }

        /* Particles */
        @keyframes particleDrift {
          0%   { transform: translateY(0)     scale(1);   opacity: 0; }
          15%  { opacity: var(--p-opacity); }
          80%  { opacity: var(--p-opacity); }
          100% { transform: translateY(-90px) scale(0.6); opacity: 0; }
        }
        .hs-particle {
          position: absolute; border-radius: 50%;
          background: rgba(255,255,255,0.9);
          animation: particleDrift var(--p-dur) ease-in-out var(--p-delay) infinite;
          pointer-events: none;
        }

        /* Ambient glow */
        @keyframes glowPulse {
          0%   { opacity: 0; transform: scale(0.85); }
          30%  { opacity: 1; }
          70%  { opacity: 0.75; }
          100% { opacity: 0; transform: scale(1.05); }
        }
        .hs-glow {
          position: absolute; left: -8%; top: 8%; width: 55%; height: 65%;
          border-radius: 50%;
          background: radial-gradient(ellipse at 40% 50%,
            rgba(30,90,180,0.28) 0%, rgba(10,30,80,0.14) 40%, transparent 70%);
          pointer-events: none;
          animation: glowPulse 4s cubic-bezier(0.4,0,0.2,1) forwards;
          will-change: opacity, transform;
        }

        /* Text states */
        .hs-hidden .hs-line-inner, .hs-hidden .hs-divider,
        .hs-hidden .hs-subtext,   .hs-hidden .hs-cta, .hs-hidden .hs-dots { opacity: 0; }

        .hs-line { display: block; overflow: hidden; }
        .hs-line-inner {
          display: block;
          transition: transform 850ms cubic-bezier(0.16,1,0.3,1), opacity 550ms ease;
          will-change: transform, opacity;
        }
        .hs-entering .hs-line-inner { transform: translateY(0%) !important; opacity: 1 !important; }
        .hs-entering .hs-line:nth-child(1) .hs-line-inner { transition-delay: 160ms; }
        .hs-entering .hs-line:nth-child(2) .hs-line-inner { transition-delay: 280ms; }
        .hs-entering .hs-line:nth-child(3) .hs-line-inner { transition-delay: 400ms; }
        .hs-entering .hs-line:nth-child(4) .hs-line-inner { transition-delay: 520ms; }
        .hs-hidden .hs-line-inner, .hs-exiting .hs-line-inner { transform: translateY(110%); opacity: 0; }
        .hs-exiting .hs-line:nth-child(1) .hs-line-inner { transition-delay:80ms;  transition-duration:400ms; }
        .hs-exiting .hs-line:nth-child(2) .hs-line-inner { transition-delay:40ms;  transition-duration:400ms; }
        .hs-exiting .hs-line:nth-child(3) .hs-line-inner { transition-delay:0ms;   transition-duration:400ms; }
        .hs-exiting .hs-line:nth-child(4) .hs-line-inner { transition-delay:0ms;   transition-duration:350ms; }

        .hs-divider { transform-origin: left center; transition: opacity 600ms ease, transform 750ms cubic-bezier(0.16,1,0.3,1); will-change: transform, opacity; }
        .hs-hidden  .hs-divider { opacity: 0; transform: scaleX(0); }
        .hs-exiting .hs-divider { opacity: 0; transform: scaleX(0); transform-origin: right center; transition-delay:0ms; transition-duration:350ms; }
        .hs-entering .hs-divider { opacity: 1; transform: scaleX(1); transition-delay: 540ms; }

        .hs-subtext { transition: opacity 700ms ease, filter 700ms ease, transform 700ms cubic-bezier(0.16,1,0.3,1); will-change: transform,opacity; }
        .hs-hidden  .hs-subtext { opacity:0; filter:blur(8px); transform:translateY(14px); }
        .hs-exiting .hs-subtext { opacity:0; filter:blur(5px); transform:translateY(-10px); transition-delay:0ms; transition-duration:300ms; }
        .hs-entering .hs-subtext { opacity:1; filter:blur(0); transform:translateY(0); transition-delay:680ms; }

        .hs-cta { transition: opacity 600ms ease, transform 600ms cubic-bezier(0.16,1,0.3,1); }
        .hs-hidden  .hs-cta { opacity:0; transform:translateY(12px); }
        .hs-exiting .hs-cta { opacity:0; transform:translateY(-8px); transition-delay:0ms; transition-duration:250ms; }
        .hs-entering .hs-cta { opacity:1; transform:translateY(0); transition-delay:850ms; }

        .hs-dots { transition: opacity 500ms ease; }
        .hs-hidden .hs-dots, .hs-exiting .hs-dots { opacity:0; }
        .hs-entering .hs-dots { opacity:1; transition-delay:1050ms; }

        /* Vehicle */
        @keyframes flyLTR {
          0%   { transform: translate(-300px,40px) scale(0.8); opacity:0; }
          10%  { opacity:1; }
          50%  { transform: translate(calc(50vw),-10px) scale(1.1); opacity:1; }
          90%  { opacity:1; }
          100% { transform: translate(calc(100vw + 300px),-40px) scale(0.9); opacity:0; }
        }
        @keyframes flyRTL {
          0%   { transform: translate(calc(100vw + 300px),-20px) scaleX(-1) scaleY(0.8); opacity:0; }
          10%  { opacity:1; }
          50%  { transform: translate(calc(50vw),20px) scaleX(-1) scaleY(1.1); opacity:1; }
          90%  { opacity:1; }
          100% { transform: translate(-300px,-20px) scaleX(-1) scaleY(0.9); opacity:0; }
        }
        .hs-vehicle-ltr { animation: flyLTR 2400ms cubic-bezier(0.4,0,0.2,1) forwards; will-change: transform,opacity; }
        .hs-vehicle-rtl { animation: flyRTL 2400ms cubic-bezier(0.4,0,0.2,1) forwards; will-change: transform,opacity; }

        @keyframes contrailLTR { 0%{clip-path:inset(0 100% 0 0);opacity:0;} 10%{opacity:0.6;} 60%{clip-path:inset(0 0% 0 0);} 80%{opacity:0.5;} 100%{opacity:0;} }
        @keyframes contrailRTL { 0%{clip-path:inset(0 0 0 100%);opacity:0;} 10%{opacity:0.6;} 60%{clip-path:inset(0 0 0 0%);} 80%{opacity:0.5;} 100%{opacity:0;} }
        .hs-contrail-ltr { animation: contrailLTR 2400ms cubic-bezier(0.4,0,0.2,1) forwards; }
        .hs-contrail-rtl { animation: contrailRTL 2400ms cubic-bezier(0.4,0,0.2,1) forwards; }

        /* HUD */
        @keyframes hudIn { from{opacity:0;transform:translateY(-10px);} to{opacity:1;transform:translateY(0);} }
        .hud-panel { display:flex; flex-direction:column; gap:5px; font-family:'SF Mono','Fira Code','Courier New',monospace; animation:hudIn 900ms cubic-bezier(0.16,1,0.3,1) 1400ms both; }
        .hud-label-sm { font-size:8px; letter-spacing:0.14em; color:rgba(255,255,255,0.45); text-transform:uppercase; }
        .hud-value { font-size:10px; letter-spacing:0.12em; color:rgba(255,255,255,0.85); animation:hudIn 400ms ease both; }
        .hud-row { display:flex; align-items:baseline; gap:6px; }
        .hud-divider { width:100%; height:1px; background:rgba(255,255,255,0.12); margin:2px 0; }
        .hud-city { font-size:9px; letter-spacing:0.18em; color:rgba(255,255,255,0.7); text-transform:uppercase; animation:hudIn 350ms ease both; }
        .hud-coords { font-size:8px; letter-spacing:0.08em; color:rgba(255,255,255,0.38); animation:hudIn 350ms ease 60ms both; }
        .hud-counter { display:flex; align-items:center; margin-top:2px; }
        .hud-flip { overflow:hidden; line-height:1; }
        @keyframes flipIn { 0%{transform:rotateX(90deg) translateY(6px);opacity:0;} 100%{transform:rotateX(0deg) translateY(0);opacity:1;} }
        .hud-flip-num { display:block; font-size:22px; font-weight:700; letter-spacing:0.05em; color:rgba(255,255,255,0.9); animation:flipIn 450ms cubic-bezier(0.16,1,0.3,1) both; transform-origin:50% 100%; }
        .hud-signal { display:flex; align-items:flex-end; gap:2px; }
        @keyframes barPulse { 0%,100%{opacity:0.3;} 50%{opacity:1;} }
        .hud-bar { width:3px; background:rgba(255,255,255,0.7); border-radius:1px; animation:barPulse 2s ease-in-out infinite; }

        /* Badges */
        @keyframes badgeUp { from{opacity:0;transform:translateY(18px);} to{opacity:1;transform:translateY(0);} }
        .hs-badge { animation: badgeUp 600ms ease both; }

        /* Scroll hint */
        @keyframes chevronBounce { 0%,100%{transform:translateY(0);opacity:0.5;} 50%{transform:translateY(6px);opacity:1;} }
        .hs-scroll-hint { animation: chevronBounce 2.2s ease-in-out infinite; }
        .hs-scroll-hint-wrap { animation: hudIn 600ms ease 2200ms both; }

        /* Slogan */
        @keyframes sloganUp { from{transform:translateY(100%);opacity:0;} to{transform:translateY(0);opacity:1;} }
        .hs-slogan { animation: sloganUp 800ms cubic-bezier(0.16,1,0.3,1) 1300ms both; }
      `}</style>

      <section ref={heroRef} className="relative w-full h-[calc(100svh-115px)] min-h-[750px] overflow-hidden bg-[#060e1a] flex flex-col">

        {/* Background + parallax */}
        <div className="absolute z-0 bg-black" style={{ inset: '-3%' }}>
          <div ref={parallaxRef} className="absolute inset-0">
            {slides.map((slide, index) => {
              const isActive = index === currentSlide;
              const wasPrev  = index === prevSlide;
              return (
                <div key={`bg-${slide.id}`} className="absolute inset-0 pointer-events-none"
                  style={{ zIndex: isActive ? 2 : wasPrev ? 1 : 0, opacity: isActive ? 1 : 0, filter: isActive ? 'blur(0px) brightness(1)' : 'blur(12px) brightness(0.5)', transition: 'opacity 1600ms cubic-bezier(0.4,0,0.2,1), filter 1600ms cubic-bezier(0.4,0,0.2,1)', willChange: 'opacity, filter' }}>
                  <div className={`absolute inset-0 ${isActive ? 'hs-kb' : ''}`} style={{ '--kb-from': slide.kenFrom, '--kb-to': slide.kenTo, '--kb-dur': '15s' } as React.CSSProperties}>
                    <Image src={slide.image} alt="" fill quality={100} sizes="110vw" className="object-cover object-center" priority={index === 0} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="absolute inset-0 z-10 hs-scrim" />
        </div>

        {/* Particles */}
        <div className="absolute inset-0 z-[15] pointer-events-none" aria-hidden="true">
          {PARTICLES.map(p => (
            <div key={p.id} className="hs-particle"
              style={{ left: `${p.left}%`, top: `${p.top}%`, width: `${p.size}px`, height: `${p.size}px`, '--p-opacity': p.opacity, '--p-dur': `${p.duration}s`, '--p-delay': `${p.delay}s` } as React.CSSProperties} />
          ))}
        </div>

        {/* Ambient glow */}
        <div className="absolute inset-0 z-[16] pointer-events-none" aria-hidden="true">
          <div className="hs-glow" key={glowKey} />
        </div>

        {/* Vehicle */}
        {vehicleActive && (
          <div className="absolute z-40 pointer-events-none" style={{ top: '25%', left: 0, right: 0 }}>
            <div className={`absolute w-full ${vehicleDir === 'ltr' ? 'hs-contrail-ltr' : 'hs-contrail-rtl'}`} style={{ top: vehicleType === 'plane' ? '30px' : '15px' }}>
              <div style={{ height: '2px', background: 'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.7) 20%, rgba(255,255,255,0.7) 80%, transparent 100%)', filter: 'blur(1px)' }} />
              <div style={{ height: '2px', marginTop: '10px', background: 'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.5) 20%, rgba(255,255,255,0.5) 80%, transparent 100%)', filter: 'blur(1px)' }} />
            </div>
            <div className={vehicleDir === 'ltr' ? 'hs-vehicle-ltr' : 'hs-vehicle-rtl'} style={{ position: 'absolute', top: 0, left: 0 }}>
              {vehicleType === 'plane' ? <PlaneIcon /> : <HelicopterIcon />}
            </div>
          </div>
        )}

        {/* HUD */}
        <div className="absolute top-6 right-6 lg:top-8 lg:right-10 pointer-events-none" style={{ zIndex: 25 }} aria-hidden="true">
          <HudPanel slideIndex={currentSlide} total={slides.length} />
        </div>

        {/* Text content */}
        <div className={`relative z-20 flex-grow max-w-[90rem] mx-auto w-full px-6 lg:px-12 flex flex-col pt-10 lg:pt-14 pb-[180px] md:pb-[200px] ${textClass}`}>
          <div className="w-full max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] text-white font-bold leading-[1.12] tracking-tight" style={{ textShadow: '0 4px 24px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.8)' }}>
              {slides[currentSlide].headline.map((line, i) => (
                <span key={i} className="hs-line"><span className="hs-line-inner">{line}</span></span>
              ))}
            </h1>
            <div className="hs-divider flex items-center w-full max-w-xl my-4 md:my-5">
              <div className="h-[2px] bg-white flex-grow shadow-[0_0_10px_rgba(0,0,0,0.9)]" />
              <svg className="w-6 h-6 text-white ml-2 rotate-90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
              </svg>
            </div>
            <p className="hs-subtext text-base md:text-lg lg:text-xl text-white/95 max-w-xl leading-relaxed font-medium" style={{ textShadow: '0 3px 12px rgba(0,0,0,1)' }}>
              {slides[currentSlide].subtext}
            </p>
          </div>

          <div className="flex flex-col items-start gap-5 mt-6 md:mt-8">
            <div className="hs-cta">
              <Link href="/partnership" className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-6 py-3.5 rounded-sm font-bold tracking-widest text-[10px] uppercase hover:bg-white hover:text-[#0a1e3d] transition-colors shadow-[0_4px_15px_rgba(0,0,0,0.6)]">
                Partnership & Joint Ventures
              </Link>
            </div>
            <div className="hs-dots flex items-center gap-2 mt-2">
              {slides.map((_, dotIndex) => (
                <button key={`dot-${dotIndex}`} onClick={() => goToSlide(dotIndex)}
                  className={`h-1.5 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.8)] transition-all duration-500 ${dotIndex === currentSlide ? 'w-10 bg-copter-red' : 'w-2.5 bg-white/50 hover:bg-white'}`}
                  aria-label={`Go to slide ${dotIndex + 1}`} />
              ))}
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="hs-scroll-hint-wrap absolute bottom-[68px] md:bottom-[84px] left-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center gap-0.5" style={{ zIndex: 25 }} aria-hidden="true">
          <svg className="hs-scroll-hint w-4 h-4 text-white/35" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" /></svg>
          <svg className="hs-scroll-hint w-4 h-4 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ animationDelay: '0.15s' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" /></svg>
        </div>

        {/* ── Feature badges ── */}
        <div className="absolute bottom-[60px] md:bottom-[76px] left-0 right-0 w-full z-20 pointer-events-none">
          <div className="max-w-[90rem] mx-auto px-6 lg:px-12 pointer-events-auto">
            <div className="flex flex-wrap items-start gap-4 md:gap-8 max-w-5xl">
              {FEATURES.map((feature, idx) => (
                <FeatureBadge key={idx} feature={feature} animDelay={BADGE_DELAYS[idx]} />
              ))}
            </div>
          </div>
        </div>

        {/* Slogan bar */}
        <div className="hs-slogan absolute bottom-0 left-0 right-0 z-30 w-full bg-[#030912]/80 backdrop-blur-xl border-t border-white/10 py-3 md:py-4 flex justify-center">
          <p className="text-white/80 font-bold tracking-[0.3em] text-[8px] md:text-[10px] lg:text-[11px] uppercase flex items-center flex-wrap justify-center gap-3 md:gap-8 px-4 text-center drop-shadow-md">
            <span>CONNECTING AFRICA</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/30 hidden md:block" />
            <span className="md:hidden text-white/30">•</span>
            <span>POWERING OPERATIONS</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/30 hidden md:block" />
            <span className="md:hidden text-white/30">•</span>
            <span>ELEVATING EXCELLENCE</span>
          </p>
        </div>

      </section>
    </>
  );
}