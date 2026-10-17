'use client';

import React, { useEffect, useRef } from 'react';

export default function TopographicBg() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Target and lerped mouse position
    const mouse = {
      x: width * 0.5,
      y: height * 0.5,
      targetX: width * 0.5,
      targetY: height * 0.5,
      speed: 0,
      active: false,
    };

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
        mouse.active = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    let time = 0;
    const lineCount = 38;
    const warpRadius = 220;
    const warpForce = 85;

    const render = () => {
      time += 0.004;

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      const spacing = height / (lineCount - 2);

      for (let i = 0; i < lineCount; i++) {
        const baseY = i * spacing - spacing * 0.5;
        const isIndexContour = i % 5 === 0;

        ctx.beginPath();

        // High quality stroke color: Ochre Gold with varying opacity
        if (isIndexContour) {
          ctx.strokeStyle = 'rgba(209, 154, 76, 0.22)';
          ctx.lineWidth = 1.25;
        } else {
          ctx.strokeStyle = 'rgba(209, 154, 76, 0.10)';
          ctx.lineWidth = 0.8;
        }

        const stepX = 22;
        let started = false;

        for (let x = 0; x <= width + stepX; x += stepX) {
          // Flowing sinusoidal topographic baseline
          const wave1 = Math.sin(x * 0.003 + time + i * 0.25) * 28;
          const wave2 = Math.cos(x * 0.007 - time * 0.7 + i * 0.18) * 14;
          const wave3 = Math.sin((x + baseY) * 0.0015 + time * 0.5) * 18;

          let y = baseY + wave1 + wave2 + wave3;

          // Mouse warp repulsion physics
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < warpRadius && mouse.active) {
            const factor = Math.cos((dist / warpRadius) * (Math.PI / 2));
            const push = factor * factor * warpForce;
            // Push away along normal
            const angle = Math.atan2(dy, dx);
            y += Math.sin(angle) * push;
          }

          if (!started) {
            ctx.moveTo(x, y);
            started = true;
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
