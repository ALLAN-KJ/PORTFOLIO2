'use client';

import React, { useState, useRef, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from '@/src/components/layout/Navbar';
import HeroSection from '@/src/components/sections/HeroSection';
import ExperienceSection from '@/src/components/sections/ExperienceSection';
import Section04ProjectsPinned from '@/src/components/sections/Section04ProjectsPinned';
import SkillsSection from '@/src/components/sections/SkillsSection';
import CredentialsSection from '@/src/components/sections/CredentialsSection';
import ContactSection from '@/src/components/sections/ContactSection';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [lenisReady, setLenisReady] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // ── Lenis + GSAP single RAF loop ─────────────────────────────────────────
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
      autoRaf: false,
    });
    lenisRef.current = lenis;
    setLenisReady(lenis);

    const onScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onScroll);

    const tickerCb = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCb);
      lenis.off('scroll', onScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // ── Section entrance animations (GSAP ScrollTrigger) ─────────────────────
  useEffect(() => {
    // Respect prefers-reduced-motion
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      // Section headings — slide up
      gsap.utils.toArray<Element>('.reveal-heading').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Cards — staggered fade-up
      gsap.utils.toArray<Element>('.reveal-card').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Sections — subtle fade
      gsap.utils.toArray<Element>('.reveal-section').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.5,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 92%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-[100dvh] w-full bg-[#0B0B0D] text-[#F4F4F6] overflow-x-clip selection:bg-[#F4F4F6] selection:text-[#0B0B0D]">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="relative z-10 w-full flex flex-col">
        <HeroSection />
        <ExperienceSection />
        <Section04ProjectsPinned lenis={lenisReady} />
        <SkillsSection />
        <CredentialsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <footer className="w-full py-8 px-6 border-t border-[#232329] bg-[#0B0B0D]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#9A9AA4]">
          <p>© 2026 Allan K. J. All rights reserved.</p>
          <p>Karunya Institute of Technology &amp; Sciences</p>
        </div>
      </footer>
    </div>
  );
}
