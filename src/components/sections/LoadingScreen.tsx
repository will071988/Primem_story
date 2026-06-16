"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];
    const count = 60;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(192, 192, 192, ${p.alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    const tl = gsap.timeline({
      onComplete: () => {
        cancelAnimationFrame(animId);
        onComplete();
      },
    });

    tl.to(overlayRef.current, { opacity: 0, duration: 0.8, delay: 2 })
      .to(containerRef.current, { opacity: 0, duration: 0.6, display: "none" }, "-=0.4");

    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] overflow-hidden bg-[#050505]"
    >
      <div className="absolute inset-0 bg-radial-electric" />
      <div className="grain absolute inset-0" />
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div
        ref={overlayRef}
        className="absolute inset-0 z-10 flex items-center justify-center bg-[#050505]"
      >
        <div className="text-center px-6">
          <p className="font-display text-[clamp(2rem,7vw,5.5rem)] font-semibold tracking-tight text-white">
            Are you ready?
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.38em] text-zinc-500">
            Carregando experi\u00eancia
          </p>
        </div>
      </div>
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-radial-electric" />
    </div>
  );
}
