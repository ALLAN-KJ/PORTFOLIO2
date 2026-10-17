'use client';

import React, { useRef } from 'react';
import { RESUME_DATA } from '@/src/data/resumeData';
import { BadgeCheck, Trophy, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Credentials() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Staggered scrub Along Z/Y axis (immediateRender: false)
      gsap.fromTo(
        '.credential-card',
        { y: 40, opacity: 0.4, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.06,
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
      id="credentials"
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto z-10 will-change-transform"
    >
      {/* Section Header */}
      <div
        id="credentials-header"
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14 border-b border-white/10 pb-6"
      >
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#D19A4C] mb-2">
            <span className="w-2 h-2 rounded-full bg-[#D19A4C]" />
            <span>ACCREDITATION & ARENAS</span>
          </div>
          <h2 className="font-anton text-5xl sm:text-6xl md:text-7xl text-[#F4F4EE] uppercase tracking-tight">
            CERTIFICATIONS & ACHIEVEMENTS
          </h2>
        </div>

        <p className="font-mono text-xs text-[#8A8F9E] max-w-md uppercase tracking-wider">
          5 Verified Industry Certifications &bull; 5 Hackathon & Competitive Engineering Arenas
        </p>
      </div>

      {/* Dual Architectural Columns */}
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Top Center T-Junction Anchor */}
        <div
          data-flow-anchor="cred-top"
          className="absolute left-1/2 -translate-x-1/2 top-7 w-2 h-2 pointer-events-none"
        />
        {/* Bottom Center Anchor */}
        <div
          data-flow-anchor="cred-bottom"
          className="absolute left-1/2 -translate-x-1/2 bottom-0 w-2 h-2 pointer-events-none"
        />

        {/* Column 1: Certifications */}
        <div>
          <div className="relative flex items-center justify-between pb-3 mb-6 border-b border-white/10">
            {/* Horizontal divider extension into cred-top T-junction */}
            <div className="hidden lg:block absolute -right-10 bottom-0 w-10 h-px bg-white/10 pointer-events-none" />
            <div className="flex items-center gap-2 text-[#D19A4C] font-mono text-xs uppercase tracking-wider font-semibold">
              <BadgeCheck className="w-4 h-4" />
              <span>VERIFIED CERTIFICATIONS</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {RESUME_DATA.credentials.map((cert, i) => {
              return (
                <div
                  key={cert.id}
                  className="credential-card group relative z-10 p-5 rounded-xl bg-[#0E1117]/95 border border-white/10 backdrop-blur-md hover:border-[#D19A4C] hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(209,154,76,0.12)] transition-all duration-300 overflow-hidden will-change-transform"
                >
                  {/* Gold Sweep Bar on Hover */}
                  <div className="absolute inset-y-0 left-0 w-1 bg-[#D19A4C] opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="flex items-start gap-3">
                    <span className="font-mono text-xs text-[#D19A4C] font-bold pt-0.5">
                      0{i + 1}
                    </span>
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base text-[#F4F4EE] group-hover:text-[#D19A4C] transition-colors">
                        {cert.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1.5 font-mono text-xs text-[#8A8F9E]">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#D19A4C]" />
                        <span>{cert.issuer}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 2: Hackathons & Competitions */}
        <div>
          <div className="relative flex items-center justify-between pb-3 mb-6 border-b border-white/10">
            {/* Horizontal divider extension into cred-top T-junction */}
            <div className="hidden lg:block absolute -left-10 bottom-0 w-10 h-px bg-white/10 pointer-events-none" />
            <div className="flex items-center gap-2 text-[#D19A4C] font-mono text-xs uppercase tracking-wider font-semibold">
              <Trophy className="w-4 h-4" />
              <span>HACKATHONS & ARENAS</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {RESUME_DATA.arenas.map((arena, i) => {
              return (
                <div
                  key={arena.id}
                  className="credential-card group relative z-10 p-5 rounded-xl bg-[#0E1117]/95 border border-white/10 backdrop-blur-md hover:border-[#D19A4C] hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(209,154,76,0.12)] transition-all duration-300 overflow-hidden will-change-transform"
                >
                  {/* Gold Sweep Bar on Hover */}
                  <div className="absolute inset-y-0 left-0 w-1 bg-[#D19A4C] opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="flex items-start gap-3">
                    <span className="font-mono text-xs text-[#D19A4C] font-bold pt-0.5">
                      0{i + 1}
                    </span>
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base text-[#F4F4EE] group-hover:text-[#D19A4C] transition-colors">
                        {arena.name}
                      </h4>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
