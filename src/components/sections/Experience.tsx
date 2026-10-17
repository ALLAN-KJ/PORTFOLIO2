'use client';

import React, { useEffect, useRef, useState } from 'react';
import { RESUME_DATA } from '@/src/data/resumeData';
import { Building2, Calendar, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Timeline node progress tracker
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const totalDist = rect.height + windowHeight;
      const currentPos = windowHeight - rect.top;
      const progress = Math.max(0, Math.min(1, currentPos / totalDist));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP ScrollTrigger for staggered card entrance
  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Staggered card entrance as Experience rises up (with immediateRender: false)
      gsap.fromTo(
        '.experience-card',
        { y: 50, opacity: 0.4, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.12,
          ease: 'power2.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            end: 'top 45%',
            scrub: 0.6,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto z-10"
    >
      {/* Section Header */}
      <div
        id="experience-header"
        className="relative flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14 border-b border-white/10 pb-6"
      >
        <div
          data-flow-anchor="exp-header-left"
          className="absolute left-0 bottom-0 -mb-0.5 w-2 h-2 pointer-events-none"
        />
        <div
          data-flow-anchor="exp-header-right"
          className="absolute right-0 bottom-0 -mb-0.5 w-2 h-2 pointer-events-none"
        />
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#D19A4C] mb-2">
            <span className="w-2 h-2 rounded-full bg-[#D19A4C]" />
            <span>CAREER TRACK RECORD</span>
          </div>
          <h2 className="font-anton text-5xl sm:text-6xl md:text-7xl text-[#F4F4EE] uppercase tracking-tight">
            WORK EXPERIENCE
          </h2>
        </div>

        <p className="font-mono text-xs text-[#8A8F9E] max-w-md uppercase tracking-wider">
          Enterprise IT Security Operations &bull; Rapid AI Build Sprints &bull; Full-Stack Engineering
        </p>
      </div>

      {/* Connected Timeline Progress Line (Desktop & Tablet) */}
      <div className="hidden md:block relative mb-10 px-8">
        {/* Base Background Track */}
        <div className="h-0.5 w-full bg-white/10 relative">
          {/* Animated Gold Progress Line */}
          <div
            className="absolute top-0 left-0 h-full bg-[#D19A4C] shadow-[0_0_12px_#D19A4C] transition-all duration-150 ease-out"
            style={{ width: `${Math.min(100, Math.max(15, scrollProgress * 125))}%` }}
          />

          {/* 3 Node Indicators */}
          <div className="absolute -top-1.5 left-0 w-3.5 h-3.5 rounded-full border-2 border-[#D19A4C] bg-[#0A0C10] shadow-[0_0_10px_#D19A4C]" />
          <div
            className={`absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 transition-colors duration-300 ${
              scrollProgress > 0.4
                ? 'border-[#D19A4C] bg-[#0A0C10] shadow-[0_0_10px_#D19A4C]'
                : 'border-white/20 bg-[#0A0C10]'
            }`}
          />
          <div
            className={`absolute -top-1.5 right-0 w-3.5 h-3.5 rounded-full border-2 transition-colors duration-300 ${
              scrollProgress > 0.7
                ? 'border-[#D19A4C] bg-[#0A0C10] shadow-[0_0_10px_#D19A4C]'
                : 'border-white/20 bg-[#0A0C10]'
            }`}
          />
        </div>
      </div>

      {/* 3 Normalized Architectural Cards with Staggered Entrance */}
      <div id="experience-cards" className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {RESUME_DATA.experience.map((item) => {
          return (
            <div
              key={item.id}
              className="experience-card group relative z-10 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-[#0E1117]/95 border border-white/10 backdrop-blur-md hover:border-[#D19A4C] hover:shadow-[0_0_35px_rgba(209,154,76,0.18)] transition-all duration-300 will-change-transform"
            >
              {/* Card Top: Numbering & Company */}
              <div>
                <div className="flex items-center justify-end font-mono text-xs text-[#8A8F9E] mb-6">
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <Calendar className="w-3 h-3 text-[#D19A4C]" />
                    <span>{item.period}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="w-4 h-4 text-[#D19A4C] shrink-0" />
                  <h3 className="font-anton text-2xl sm:text-3xl text-[#F4F4EE] tracking-wide uppercase group-hover:text-[#D19A4C] transition-colors">
                    {item.company}
                  </h3>
                </div>

                <div className="inline-block px-2.5 py-1 rounded bg-[#0A0C10] border border-white/10 font-mono text-xs text-[#D19A4C] font-medium tracking-wide uppercase mb-6">
                  {item.role}
                </div>

                {/* Clean 1-Liner */}
                <p className="text-sm sm:text-base text-[#F4F4EE]/90 leading-relaxed font-normal mb-8">
                  {item.description}
                </p>
              </div>

              {/* Card Bottom: Location Only */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-end">
                <div className="flex items-center gap-1 font-mono text-[11px] text-[#8A8F9E]">
                  <MapPin className="w-3 h-3 text-[#D19A4C]" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Experience to Projects Transition Cue */}
      <div
        id="experience-bottom"
        className="relative mt-14 pt-6 border-t border-white/5 flex items-center justify-between"
      >
        <div
          data-flow-anchor="exp-bottom"
          className="absolute left-1/2 -translate-x-1/2 bottom-0 w-2 h-2 pointer-events-none"
        />
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#D19A4C]">
          <span className="w-2 h-2 rounded-full bg-[#D19A4C] animate-pulse" />
          <span>APPROACHING HORIZONTAL GLIDE TRACK &bull; SELECTED BUILDS</span>
        </div>
      </div>
    </section>
  );
}
