'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { RESUME_DATA } from '@/src/data/resumeData';
import { MapPin, ShieldCheck, Terminal, Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Hero() {
  const containerRef = useRef<HTMLElement | null>(null);
  const heroContentRef = useRef<HTMLDivElement | null>(null);

  // Mouse tilt & parallax physics state
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [parallaxX, setParallaxX] = useState(0);

  // Hero exit scrub: As user scrolls out, compress depth & fade
  useGSAP(
    () => {
      if (!containerRef.current || !heroContentRef.current) return;

      gsap.to(heroContentRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom 20%',
          scrub: 0.8,
        },
        scale: 0.93,
        opacity: 0.25,
        yPercent: -8,
        ease: 'power1.out',
      });
    },
    { scope: containerRef }
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const xNorm = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const yNorm = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1

      // 3D Tilt angles (max 9 degrees)
      setTilt({
        x: -yNorm * 8,
        y: xNorm * 10,
      });

      // Subtle parallax movement
      setParallaxX(-xNorm * 22);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full pt-28 pb-24 flex flex-col justify-between items-center overflow-hidden select-none"
    >
      {/* Ambient Top Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#D19A4C]/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Main Scalable Hero Content Container */}
      <div
        ref={heroContentRef}
        className="w-full flex-1 flex flex-col justify-between items-center will-change-transform origin-top"
      >
        {/* Top Meta Tag Strip */}
        <div className="w-full max-w-7xl px-4 sm:px-6 md:px-10 pt-2 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-widest text-[#8A8F9E] z-10 shrink-0">
          <div className="flex items-center gap-2 text-[#D19A4C]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D19A4C]" />
            <span>{RESUME_DATA.personal.subtitle}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#D19A4C]" />
            <span>{RESUME_DATA.personal.location}</span>
          </div>
        </div>

        {/* =========================================================================
            3-PART HORIZONTAL COMPOSITION: "ALLAN" (Left) - PORTRAIT (Center) - "K. J" (Right)
            ========================================================================= */}
        <div className="relative w-full max-w-7xl mx-auto flex-1 flex flex-col justify-center items-center my-auto px-4 sm:px-6 z-20">
          <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center justify-items-center gap-3 sm:gap-6 md:gap-8 lg:gap-12">
            {/* Left Side: ALLAN */}
            <div
              className="w-full flex justify-center md:justify-end items-center pointer-events-none select-none overflow-hidden"
              style={{
                transform: `translate3d(${-parallaxX * 0.9}px, 0, 0)`,
                transition: 'transform 0.15s ease-out',
              }}
            >
              <h1 className="font-anton text-[16vw] sm:text-[13vw] md:text-[10vw] lg:text-[11vw] leading-none tracking-tight text-[#F4F4EE] uppercase select-none text-center md:text-right drop-shadow-2xl">
                ALLAN
              </h1>
            </div>

            {/* Center: My Portrait Frame + Overlapping Subtitle */}
            <div id="hero-portrait" className="relative flex flex-col items-center shrink-0">
              <div
                className="relative z-20 w-[220px] sm:w-[260px] md:w-[290px] lg:w-[330px] aspect-[4/5] rounded-2xl overflow-hidden will-change-transform shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_50px_rgba(209,154,76,0.18)] border border-[#D19A4C]/50 ring-1 ring-[#D19A4C]/30"
                style={{
                  perspective: '1200px',
                  transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  transition: 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)',
                }}
              >
                {/* Portrait Image Container */}
                <div className="relative w-full h-full bg-[#11141B]">
                  <Image
                    src="/allancoat_bw.png"
                    alt="Allan K. J"
                    fill
                    priority
                    unoptimized
                    className="object-cover object-top filter grayscale contrast-115 hover:contrast-125 transition-all duration-500"
                    sizes="(max-width: 640px) 220px, (max-width: 768px) 260px, 330px"
                  />

                  {/* Subtle Gold Rim Lighting Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-[#D19A4C]/15 pointer-events-none" />

                  {/* Bottom Vignette Gradients Blending into Obsidian #0A0C10 */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0A0C10] via-[#0A0C10]/80 to-transparent pointer-events-none z-20" />
                </div>
              </div>

              {/* Overlapping Foreground Subtitle (z-30) */}
              <div className="relative -mt-6 sm:-mt-8 md:-mt-9 z-30 px-2 text-center pointer-events-none whitespace-nowrap">
                <div
                  className="font-anton text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[0.88] uppercase tracking-tight select-none"
                  style={{
                    WebkitTextStroke: '1.5px #D19A4C',
                    color: 'transparent',
                    textShadow: '0 0 25px rgba(209, 154, 76, 0.35)',
                  }}
                >
                  SECURITY & FULL-STACK
                </div>
              </div>
            </div>

            {/* Right Side: K. J */}
            <div
              className="w-full flex justify-center md:justify-start items-center pointer-events-none select-none overflow-hidden"
              style={{
                transform: `translate3d(${parallaxX * 0.9}px, 0, 0)`,
                transition: 'transform 0.15s ease-out',
              }}
            >
              <h1 className="font-anton text-[16vw] sm:text-[13vw] md:text-[10vw] lg:text-[11vw] leading-none tracking-tight text-[#F4F4EE] uppercase select-none text-center md:text-left drop-shadow-2xl">
                K. J
              </h1>
            </div>
          </div>
        </div>

        {/* 1-Line Persona Bio & Architectural Spec Grid (Fits comfortably within 100vh) */}
        <div className="w-full max-w-7xl px-4 sm:px-6 md:px-10 z-20 pb-3 shrink-0">
          {/* Intro 1-Liner */}
          <div className="max-w-3xl mx-auto text-center mb-5 sm:mb-6">
            <p className="text-sm sm:text-base md:text-lg text-[#F4F4EE]/90 font-normal leading-relaxed">
              {RESUME_DATA.personal.intro}
            </p>
          </div>

          {/* 4-Column Architectural Spec Strip */}
          <div
            id="hero-spec-bar"
            className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 p-3 sm:p-4 rounded-xl bg-[#11141B]/95 border border-white/[0.08] backdrop-blur-md relative z-10"
          >
            {/* Bottom-Center Flow Anchor */}
            <div
              data-flow-anchor="hero-bottom"
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 pointer-events-none"
            />
            <div className="flex flex-col gap-1 p-2 border-r border-white/5 last:border-none">
              <div className="flex items-center gap-1.5 text-[#D19A4C] font-mono text-[10px] tracking-widest uppercase">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>SPECIALIZATION</span>
              </div>
              <span className="font-semibold text-xs sm:text-sm text-[#F4F4EE]">
                CSE (Cybersecurity)
              </span>
              <span className="font-mono text-[10px] text-[#8A8F9E]">
                Karunya University &bull; 2029
              </span>
            </div>

            <div className="flex flex-col gap-1 p-2 border-r border-white/5 last:border-none">
              <div className="flex items-center gap-1.5 text-[#D19A4C] font-mono text-[10px] tracking-widest uppercase">
                <Terminal className="w-3.5 h-3.5" />
                <span>ENTERPRISE EXPERIENCE</span>
              </div>
              <span className="font-semibold text-xs sm:text-sm text-[#F4F4EE]">
                ZF Group AG
              </span>
              <span className="font-mono text-[10px] text-[#8A8F9E]">
                IT Security & Operations
              </span>
            </div>

            <div className="flex flex-col gap-1 p-2 border-r border-white/5 last:border-none">
              <div className="flex items-center gap-1.5 text-[#D19A4C] font-mono text-[10px] tracking-widest uppercase">
                <Award className="w-3.5 h-3.5" />
                <span>SPRINT BENCHMARK</span>
              </div>
              <span className="font-semibold text-xs sm:text-sm text-[#F4F4EE]">
                Rank #33 Leaderboard
              </span>
              <span className="font-mono text-[10px] text-[#8A8F9E]">
                Conesta Forge AI Sprint
              </span>
            </div>

            <div className="flex flex-col gap-1 p-2">
              <div className="flex items-center gap-1.5 text-[#D19A4C] font-mono text-[10px] tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D19A4C]" />
                <span>CURRENT STATUS</span>
              </div>
              <span className="font-semibold text-xs sm:text-sm text-[#F4F4EE]">
                Cybersecurity & Full-Stack Ready
              </span>
              <span className="font-mono text-[10px] text-[#8A8F9E]">
                Coimbatore &bull; Remote
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
