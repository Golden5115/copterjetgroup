'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// Sub-component to handle the counting animation individually
const AnimatedNumber = ({ target, prefix = "" }: { target: number, prefix?: string }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  // Detect when the component scrolls into view
  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold: 0.5 } // Trigger when 50% visible
    );

    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.disconnect();
    };
  }, []);

  // Handle the counting logic
  useEffect(() => {
    if (!isVisible) return;
    
    let start = 0;
    const duration = 2000; // 2 seconds animation
    const increment = target / (duration / 16); // Calculate step for 60fps

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, target]);

  return <span ref={ref}>{prefix}{count}</span>;
};

export default function StatsBar() {
  const stats = [
    { target: 35, prefix: "+", label: "YEARS OF INDUSTRY TEAM'S EXPERIENCE" },
    { target: 16.8, prefix: "+", label: "BILLION GLOBAL INVENTORY NETWORK" },
    { target: 10, prefix: "+", label: "Years of Excellence" },
    { target: 270, prefix: "+", label: "SUPPLY CHAIN & OEM NETWORK" },
  ];

  return (
    <section className="relative py-20 border-t-4 border-copter-red overflow-hidden">
      
      {/* Background Image Setup */}
      <div className="absolute inset-0 z-0 bg-copter-blue">
        <Image 
          src="/images/stats-bg.jpg" // You will need to add this image!
          alt="CopterJet Global Reach"
          fill
          className="object-cover object-center"
        />
        {/* Deep blue overlay to ensure the white text pops and stays brand-aligned */}
        <div className="absolute inset-0 bg-[#0a1e35]/80 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-copter-blue/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 divide-x-0 md:divide-x divide-white/20">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center px-4 group">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tighter group-hover:scale-110 transition-transform duration-500">
                <AnimatedNumber target={stat.target} prefix={stat.prefix} />
              </div>
              <span className="text-sm text-gray-300 font-bold tracking-widest uppercase group-hover:text-copter-red transition-colors duration-300">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}