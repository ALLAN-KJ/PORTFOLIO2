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

  // Initialize Lenis hooked into GSAP's single animation loop
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
      autoRaf: false, // Critical: single RAF loop synchronized with GSAP ticker
    });
    lenisRef.current = lenis;
    setLenisReady(lenis);

    const onScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on('scroll', onScroll);

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCb);
      lenis.off('scroll', onScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <div className="relative min-h-[100dvh] w-full bg-[#0B0B0D] text-[#F4F4F6] overflow-x-clip selection:bg-[#F4F4F6] selection:text-[#0B0B0D]">
      {/* 1. Top Minimal Navbar */}
      <Navbar />

      {/* 2. Main Flow */}
      <main className="relative z-10 w-full flex flex-col">
        {/* Section 01: Hero (Vertical 100vh, 2-column with scoped 3D Canvas) */}
        <HeroSection />

        {/* Section 02: Experience (Vertical, 3 clean cards) */}
        <ExperienceSection />

        {/* Section 03: Projects (Pinned horizontal track on desktop >= 768px) */}
        <Section04ProjectsPinned lenis={lenisReady} />

        {/* Section 04: Skills (Vertical, 3 categorized rows) */}
        <SkillsSection />

        {/* Section 05: Certifications & Competitions (Vertical, 2 columns) */}
        <CredentialsSection />

        {/* Section 06: Contact (Vertical, direct email copy + links) */}
        <ContactSection />
      </main>

      {/* Minimal Footer */}
      <footer className="w-full py-8 px-6 border-t border-[#232329] bg-[#0B0B0D]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#9A9AA4]">
          <p>© 2026 Allan K. J. All rights reserved.</p>
          <p>Karunya Institute of Technology & Sciences</p>
        </div>
      </footer>
    </div>
  );
}
