'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [cursorText, setCursorText] = useState<string>('');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isInverted, setIsInverted] = useState<boolean>(false);

  useEffect(() => {
    // Only render on desktop / fine pointers
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Inspect target element for custom cursor triggers
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Invert cursor color if inside gold sections (like Footer / Connect)
      const isOverGold = !!(
        target.closest('[data-cursor-invert="true"]') ||
        target.closest('#contact') ||
        target.closest('#connect')
      );
      setIsInverted(isOverGold);

      const cursorAttr = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      const isInteractive = target.closest('a, button, [role="button"], .interactive-hover');

      if (cursorAttr) {
        setCursorText(cursorAttr);
        setIsHovered(true);
      } else if (isInteractive) {
        setCursorText('VIEW');
        setIsHovered(true);
      } else {
        setCursorText('');
        setIsHovered(false);
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    const tick = () => {
      const ease = 0.2;
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;

      if (cursor) {
        cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 will-change-transform transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {isHovered ? (
        <div
          className={`flex items-center justify-center px-4 py-1.5 rounded-full font-mono font-bold text-[11px] tracking-wider uppercase transform -translate-x-1/2 -translate-y-1/2 transition-colors duration-200 ${
            isInverted
              ? 'bg-[#0A0C10] text-[#F4F4EE] shadow-[0_0_25px_rgba(0,0,0,0.7)] border border-white/20'
              : 'bg-[#D19A4C] text-[#0A0C10] shadow-[0_0_25px_rgba(209,154,76,0.5)]'
          }`}
        >
          {cursorText || 'VIEW'}
        </div>
      ) : (
        <div className="relative transform -translate-x-1/2 -translate-y-1/2">
          {/* Central dot */}
          <div
            className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
              isInverted
                ? 'bg-[#0A0C10] shadow-[0_0_12px_rgba(10,12,16,0.9)] ring-1 ring-white/30'
                : 'bg-[#D19A4C] shadow-[0_0_12px_#D19A4C]'
            }`}
          />
          {/* Subtle outer magnetic ring */}
          <div
            className={`absolute -inset-1 rounded-full animate-ping opacity-30 transition-colors duration-200 ${
              isInverted ? 'border border-[#0A0C10]' : 'border border-[#D19A4C]/30'
            }`}
          />
        </div>
      )}
    </div>
  );
}
