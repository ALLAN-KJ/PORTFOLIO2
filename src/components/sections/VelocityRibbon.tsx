'use client';

import React, { useEffect, useRef } from 'react';
import { useLenis } from 'lenis/react';

interface VelocityRibbonProps {
  text?: string;
  direction?: 'left' | 'right';
  angle?: string;
  className?: string;
}

export default function VelocityRibbon({
  text = 'CYBERSECURITY • FULL-STACK DEVELOPMENT • ZF GROUP IT SECURITY • RED HAT LINUX • CISCO IOT • CONESTA FORGE #33 • SMART INDIA HACKATHON 2026 • THREE.JS & GSAP • GROQ AI & ELEVENLABS • DOCKER',
  direction = 'left',
  angle = '-rotate-2',
  className = '',
}: VelocityRibbonProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const positionRef = useRef(0);
  const lenis = useLenis();

  useEffect(() => {
    let rafId: number;
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      // Base speed plus velocity booster
      const velocity = lenis?.velocity ?? 0;
      const speedMultiplier = 1 + Math.min(Math.abs(velocity) * 0.25, 4.0);
      const baseSpeed = 75; // pixels per second
      const move = baseSpeed * speedMultiplier * delta;

      if (direction === 'left') {
        positionRef.current -= move;
      } else {
        positionRef.current += move;
      }

      // Loop when half width is passed
      const loopWidth = 1400;
      if (Math.abs(positionRef.current) >= loopWidth) {
        positionRef.current = 0;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [lenis, direction]);

  return (
    <div
      className={`relative w-[110%] -left-[5%] overflow-hidden py-3 bg-[#D19A4C] text-[#0A0C10] shadow-[0_10px_35px_rgba(209,154,76,0.25)] select-none my-10 ${angle} ${className} z-20`}
    >
      <div
        ref={trackRef}
        className="flex whitespace-nowrap will-change-transform font-anton text-2xl sm:text-3xl md:text-4xl tracking-wide uppercase"
      >
        <span className="px-4">{text}</span>
        <span className="px-4" aria-hidden="true">{text}</span>
        <span className="px-4" aria-hidden="true">{text}</span>
        <span className="px-4" aria-hidden="true">{text}</span>
      </div>
    </div>
  );
}
