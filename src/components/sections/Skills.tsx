'use client';

import React, { useRef } from 'react';
import { RESUME_DATA } from '@/src/data/resumeData';
import { Code2, Wrench, ShieldAlert } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Scrubbed entrance Along Z/Y axis (immediateRender: false)
      gsap.fromTo(
        '.skill-column',
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
      id="skills"
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto z-10 will-change-transform"
    >
      {/* Section Header */}
      <div
        id="skills-header"
        className="relative flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14 border-b border-white/10 pb-6"
      >
        <div
          data-flow-anchor="skills-line-left"
          className="absolute left-0 bottom-0 -mb-0.5 w-2 h-2 pointer-events-none"
        />
        <div
          data-flow-anchor="skills-line-right"
          className="absolute right-0 bottom-0 -mb-0.5 w-2 h-2 pointer-events-none"
        />
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#D19A4C] mb-2">
            <span className="w-2 h-2 rounded-full bg-[#D19A4C]" />
            <span>ARSENAL & CAPABILITIES</span>
          </div>
          <h2 className="font-anton text-5xl sm:text-6xl md:text-7xl text-[#F4F4EE] uppercase tracking-tight">
            TECHNICAL SKILLS
          </h2>
        </div>

        <p className="font-mono text-xs text-[#8A8F9E] max-w-md uppercase tracking-wider">
          Languages &bull; APIs & Developer Tooling &bull; Security & Infrastructure Domains
        </p>
      </div>

      {/* 3 Dedicated Architectural Columns with Scrubbed Z/Y Glide */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Languages */}
        <div className="skill-column relative z-10 p-6 sm:p-8 rounded-2xl bg-[#0E1117]/95 border border-white/10 backdrop-blur-md hover:border-[#D19A4C]/50 transition-all flex flex-col justify-between will-change-transform">
          <div>
            <div className="flex items-center gap-2 text-[#D19A4C] font-mono text-xs uppercase tracking-wider font-semibold mb-6">
              <Code2 className="w-4 h-4" />
              <span>LANGUAGES</span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {RESUME_DATA.skills.languages.map((lang) => (
                <span
                  key={lang}
                  className="px-3.5 py-1.5 rounded-lg font-mono text-xs sm:text-sm font-medium border border-white/15 bg-white/[0.03] text-[#F4F4EE] hover:border-[#D19A4C] hover:text-[#D19A4C] hover:bg-[#D19A4C]/10 transition-all duration-200 cursor-default"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* APIs & Tools */}
        <div className="skill-column relative z-10 p-6 sm:p-8 rounded-2xl bg-[#0E1117]/95 border border-white/10 backdrop-blur-md hover:border-[#D19A4C]/50 transition-all flex flex-col justify-between will-change-transform">
          <div>
            <div className="flex items-center gap-2 text-[#D19A4C] font-mono text-xs uppercase tracking-wider font-semibold mb-6">
              <Wrench className="w-4 h-4" />
              <span>APIS & TOOLS</span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {RESUME_DATA.skills.tools.map((tool) => (
                <span
                  key={tool}
                  className="px-3.5 py-1.5 rounded-lg font-mono text-xs sm:text-sm font-medium border border-white/15 bg-white/[0.03] text-[#F4F4EE] hover:border-[#D19A4C] hover:text-[#D19A4C] hover:bg-[#D19A4C]/10 transition-all duration-200 cursor-default"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Domains */}
        <div className="skill-column relative z-10 p-6 sm:p-8 rounded-2xl bg-[#0E1117]/95 border border-white/10 backdrop-blur-md hover:border-[#D19A4C]/50 transition-all flex flex-col justify-between will-change-transform">
          <div>
            <div className="flex items-center gap-2 text-[#D19A4C] font-mono text-xs uppercase tracking-wider font-semibold mb-6">
              <ShieldAlert className="w-4 h-4" />
              <span>DOMAINS</span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {RESUME_DATA.skills.domains.map((dom) => (
                <span
                  key={dom}
                  className="px-3.5 py-1.5 rounded-lg font-mono text-xs sm:text-sm font-medium border border-white/15 bg-white/[0.03] text-[#F4F4EE] hover:border-[#D19A4C] hover:text-[#D19A4C] hover:bg-[#D19A4C]/10 transition-all duration-200 cursor-default"
                >
                  {dom}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
