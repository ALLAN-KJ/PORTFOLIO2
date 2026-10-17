'use client';

import React, { useRef } from 'react';
import { RESUME_DATA } from '@/src/data/resumeData';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const watermarkRef = useRef<HTMLDivElement | null>(null);
  const telemetryPathRef = useRef<SVGPathElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const exitPortalRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const scene = sceneRef.current;
      const track = trackRef.current;
      const watermark = watermarkRef.current;
      const exitPortal = exitPortalRef.current;

      if (!section || !scene || !track) return;

      // Calculate exact horizontal glide distance
      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        return -(trackWidth - window.innerWidth + 120);
      };

      // QuickTo velocity responders for physical card skew and breath scale
      const setCardSkew = gsap.quickTo('.project-card', 'skewX', {
        duration: 0.4,
        ease: 'power3.out',
      });
      const setCardScale = gsap.quickTo('.project-card', 'scale', {
        duration: 0.4,
        ease: 'power3.out',
      });

      // Master Timeline across extended luxurious scroll distance
      const masterTL = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${Math.max(3000, track.scrollWidth * 1.6)}`,
          pin: true,
          scrub: 1.2,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Update bottom horizontal progress bar
            if (progressBarRef.current) {
              progressBarRef.current.style.transform = `scaleX(${self.progress})`;
            }

            // Velocity-based physical skew (clamped to ±6deg) & breath scale (0.97 -> 1)
            const vel = self.getVelocity();
            const clampedSkew = Math.max(-6, Math.min(6, vel / 280));
            const breathScale = Math.max(0.97, Math.min(1, 1 - Math.abs(vel) / 25000));
            setCardSkew(clampedSkew);
            setCardScale(breathScale);
          },
          onScrubComplete: () => {
            setCardSkew(0);
            setCardScale(1);
          },
        },
      });

      // =========================================================================
      // PHASE A (0.00 to 0.82): Long Horizontal Glide & 3-Layer Parallax
      // =========================================================================
      masterTL
        // Layer 3: Move cards track horizontally
        .to(
          track,
          {
            x: getScrollAmount,
            ease: 'none',
            duration: 0.82,
          },
          0
        )
        // Layer 1: Background giant hollow watermark translates at 0.35x speed
        .to(
          watermark,
          {
            x: () => getScrollAmount() * 0.35,
            ease: 'none',
            duration: 0.82,
          },
          0
        );

      // Layer 2: Telemetry SVG path progressive draw
      if (telemetryPathRef.current) {
        const pathLength = telemetryPathRef.current.getTotalLength() || 3500;
        gsap.set(telemetryPathRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        masterTL.to(
          telemetryPathRef.current,
          {
            strokeDashoffset: 0,
            ease: 'none',
            duration: 0.82,
          },
          0
        );
      }

      // =========================================================================
      // PHASE B (0.82 to 1.00): The Bottom-Right Exit Morph & Spatial Handoff
      // =========================================================================
      masterTL
        // 1. Shift & scale horizontal scene toward top-left
        .to(
          scene,
          {
            scale: 0.92,
            opacity: 0.35,
            yPercent: -12,
            ease: 'power2.inOut',
            duration: 0.18,
          },
          0.82
        )
        // 2. Glowing gold portal/connector drops from bottom-right corner
        .to(
          exitPortal,
          {
            opacity: 1,
            scaleY: 1,
            ease: 'power3.out',
            duration: 0.18,
          },
          0.82
        );

      // 3. Seamless spatial handoff: Pull next section (#skills) up from bottom-right
      const skillsElement = document.getElementById('skills');
      if (skillsElement) {
        masterTL.fromTo(
          skillsElement,
          {
            xPercent: 8,
            yPercent: 18,
            scale: 0.95,
            opacity: 0.4,
            immediateRender: false,
          },
          {
            xPercent: 0,
            yPercent: 0,
            scale: 1,
            opacity: 1,
            ease: 'power2.out',
            duration: 0.18,
          },
          0.82
        );
      }

      return () => {
        masterTL.scrollTrigger?.kill();
        masterTL.kill();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden flex flex-col justify-between py-8 md:py-12 bg-transparent z-10"
    >
      {/* =========================================================================
          LAYER 1 (PARALLAX WATERMARK): Massive Hollow Gold Stroke Background Text
          0.35x translation speed behind all cards
          ========================================================================= */}
      <div
        ref={watermarkRef}
        className="absolute top-1/2 -translate-y-1/2 left-0 font-anton text-[22vw] leading-none select-none pointer-events-none whitespace-nowrap z-0 will-change-transform opacity-30"
        style={{
          WebkitTextStroke: '1.5px rgba(209, 154, 76, 0.18)',
          color: 'transparent',
          textShadow: '0 0 60px rgba(209, 154, 76, 0.08)',
        }}
        aria-hidden="true"
      >
        FEATURED BUILDS — SELECTED WORKS — LIVE PLATFORMS — FEATURED BUILDS — SELECTED WORKS
      </div>

      {/* Main Scalable Viewport Scene (Transforms on Phase B Exit) */}
      <div
        ref={sceneRef}
        className="relative w-full h-full flex flex-col justify-between z-10 will-change-transform"
      >
        {/* Top Header */}
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-5 shrink-0">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#D19A4C] mb-2">
              <span className="w-2 h-2 rounded-full bg-[#D19A4C]" />
              <span>SELECTED WORKS</span>
            </div>
            <h2 className="font-anton text-4xl sm:text-5xl md:text-6xl text-[#F4F4EE] uppercase tracking-tight">
              FEATURED BUILDS
            </h2>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-[#8A8F9E] uppercase tracking-wider">
            <span className="hidden sm:inline">HORIZONTAL GLIDE TRACK</span>
            <span className="px-2.5 py-1 rounded bg-[#11141B] border border-white/10 text-[#D19A4C] font-bold">
              04 PRODUCTION BUILDS
            </span>
          </div>
        </div>

        {/* =========================================================================
            LAYER 2 & 3: Connected Telemetry Line & Velocity-Skewed Cards Track
            ========================================================================= */}
        <div id="projects-track-entry" className="relative w-full overflow-visible my-auto py-2">
          {/* Track Entry Flow Anchor */}
          <div
            data-flow-anchor="proj-entry"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 pointer-events-none"
          />

          {/* Layer 2: Center Connected Gold Telemetry Path behind cards */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-24 pointer-events-none z-0 overflow-visible">
            <svg
              className="w-[3600px] h-full overflow-visible"
              viewBox="0 0 3600 100"
              fill="none"
            >
              {/* Base Track: solid rgba(209, 154, 76, 0.2), strokeWidth 2 */}
              <path
                d="M 0 50 L 3100 50 Q 3250 50 3250 160"
                stroke="rgba(209, 154, 76, 0.2)"
                strokeWidth="2"
              />
              {/* Active Animated Gold Draw Path: solid #D19A4C, strokeWidth 3, glowing */}
              <path
                ref={telemetryPathRef}
                d="M 0 50 L 3100 50 Q 3250 50 3250 160"
                stroke="#D19A4C"
                strokeWidth="3"
                strokeLinecap="round"
                filter="drop-shadow(0px 0px 8px rgba(209, 154, 76, 0.6))"
              />
            </svg>
          </div>

          {/* Layer 3: Physical Velocity-Skewed Cards Track */}
          <div
            ref={trackRef}
            className="flex items-center gap-8 px-6 md:px-16 w-max will-change-transform select-none relative z-10"
          >
            {/* The 4 Project Cards */}
            {RESUME_DATA.projects.map((proj, idx) => {
              return (
                <div
                  key={proj.id}
                  className="project-card group relative z-10 w-[85vw] md:w-[520px] shrink-0 p-8 sm:p-10 rounded-2xl bg-[#0E1117]/95 backdrop-blur-xl border border-white/10 hover:border-[#D19A4C] hover:shadow-[0_25px_60px_rgba(209,154,76,0.18)] transition-colors duration-300 flex flex-col justify-between min-h-[380px] sm:min-h-[420px] will-change-transform"
                >
                  {/* Card Header: Index & Category Badge */}
                  <div>
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                      <span className="font-anton text-4xl sm:text-5xl text-[#D19A4C]/50 group-hover:text-[#D19A4C] transition-colors">
                        0{idx + 1}
                      </span>
                      <span className="font-mono text-xs uppercase px-3 py-1 rounded-full bg-[#0A0C10] border border-white/10 text-[#8A8F9E] group-hover:text-[#F4F4EE] group-hover:border-[#D19A4C]/40 transition-colors">
                        {proj.categoryTag}
                      </span>
                    </div>

                    <h3 className="font-anton text-3xl sm:text-4xl text-[#F4F4EE] group-hover:text-[#D19A4C] transition-colors uppercase tracking-wide mb-4">
                      {proj.title}
                    </h3>

                    {/* Clean 1-Liner Description */}
                    <p className="text-sm sm:text-base text-[#8A8F9E] group-hover:text-[#F4F4EE]/90 transition-colors leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  {/* Card Footer: Real Action Button */}
                  <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                    {proj.badge && (
                      <span className="text-[11px] font-mono uppercase text-[#8A8F9E]">
                        {proj.badge}
                      </span>
                    )}

                    {proj.liveUrl ? (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="LIVE"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D19A4C] text-[#0A0C10] font-mono text-xs uppercase font-bold tracking-wider hover:bg-[#E5B369] transition-all shadow-[0_0_18px_rgba(209,154,76,0.3)] group/btn"
                        aria-label={`Open live link for ${proj.title}`}
                      >
                        <span>LAUNCH APP</span>
                        <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </a>
                    ) : (
                      <span className="font-mono text-xs uppercase text-[#8A8F9E]/60 italic">
                        DEMO READY
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Horizontal Progress Indicator */}
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 shrink-0">
          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full bg-[#D19A4C] origin-left shadow-[0_0_12px_#D19A4C] will-change-transform"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
        </div>
      </div>

      {/* =========================================================================
          PHASE B EXIT CONNECTOR: Bottom-Right Spatial Handoff Portal
          ========================================================================= */}
      <div
        id="projects-exit-portal"
        ref={exitPortalRef}
        className="absolute bottom-6 right-8 md:right-16 flex flex-col items-end pointer-events-none z-30 opacity-0 origin-top will-change-transform"
        style={{ transform: 'scaleY(0)' }}
      >
        <div
          data-flow-anchor="proj-exit"
          className="absolute right-0 bottom-0 w-2 h-2 pointer-events-none"
        />
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A0C10] border border-[#D19A4C] text-[#D19A4C] font-mono text-[10px] uppercase font-bold tracking-widest shadow-[0_0_20px_rgba(209,154,76,0.3)] mb-2">
          <span>HANDOFF TO ARSENAL</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D19A4C] animate-ping" />
        </div>
        <div className="w-0.5 h-24 bg-gradient-to-b from-[#D19A4C] via-[#D19A4C] to-transparent shadow-[0_0_12px_#D19A4C]" />
      </div>
    </section>
  );
}
