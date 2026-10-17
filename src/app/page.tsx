'use client';

import React from 'react';
import SmoothScrollProvider from '@/src/components/providers/SmoothScrollProvider';
import TopographicBg from '@/src/components/canvas/TopographicBg';
import GuidingFlowLine from '@/src/components/visuals/GuidingFlowLine';
import CustomCursor from '@/src/components/visuals/CustomCursor';
import Navbar from '@/src/components/layout/Navbar';
import Hero from '@/src/components/sections/Hero';
import VelocityRibbon from '@/src/components/sections/VelocityRibbon';
import Experience from '@/src/components/sections/Experience';
import Projects from '@/src/components/sections/Projects';
import Skills from '@/src/components/sections/Skills';
import Credentials from '@/src/components/sections/Credentials';
import Education from '@/src/components/sections/Education';
import Footer from '@/src/components/sections/Footer';

export default function Home() {
  return (
    <SmoothScrollProvider>
      <main className="relative min-h-[100dvh] w-full overflow-x-clip bg-[#0A0C10] text-[#F4F4EE]">
        {/* Animated Topographic Contour Canvas */}
        <TopographicBg />

        {/* Continuous S-Curved Water Flow Guiding Stream */}
        <GuidingFlowLine />

        {/* Custom Magnetic Cursor */}
        <CustomCursor />

        {/* Top Architectural Navigation */}
        <Navbar />

        {/* 1. Signature Lando 3-Layer Sandwich Hero with Depth Scale Exit Scrub */}
        <Hero />

        {/* 2. Velocity-Reactive Gold Marquee Ribbon inside dedicated structural wrapper */}
        <div className="relative w-full py-12 my-8 overflow-hidden">
          <VelocityRibbon
            angle="-rotate-2"
            text="CYBERSECURITY • FULL-STACK ENGINEERING • ZF GROUP IT SECURITY • CONESTA FORGE #33 • SMART INDIA HACKATHON 2026 • RED HAT LINUX • CISCO IOT • GROQ AI • THREE.JS & GSAP"
          />
        </div>

        {/* 3. Experience: Overlapping Hero with Top Overlap & Bottom-Right Bezier Connector */}
        <Experience />

        {/* 4. Selected Projects: Long Horizontal Glide Track with 3-Layer Parallax & Bottom-Right Exit Morph */}
        <Projects />

        {/* 5. Technical Skills Arsenal Matrix: Direct Spatial Handoff from Projects */}
        <Skills />

        {/* 6. Secondary Velocity Ribbon */}
        <VelocityRibbon
          angle="rotate-1"
          direction="right"
          text="ENTERPRISE LINUX • DOCKER CONTAINERIZATION • API INTEGRATIONS • SYSTEM DESIGN • DEFENSIVE SECURITY • RAPID PROTOTYPING"
          className="my-16"
        />

        {/* 7. Certifications & Hackathons Credentials Matrix: Staggered Scrub Along Z/Y */}
        <Credentials />

        {/* 8. Education Strip */}
        <Education />

        {/* 9. Full-Bleed Lando Gold Footer: Rising Curved Curtain Reveal */}
        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}
