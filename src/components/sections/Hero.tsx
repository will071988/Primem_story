"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        titleRef.current,
        { opacity: 0, filter: "blur(10px)", y: 34 },
        { opacity: 1, filter: "blur(0px)", y: 0, duration: 1.2, delay: 0.3 }
      ).fromTo(
        subtitleRef.current,
        { opacity: 0, filter: "blur(8px)", y: 20 },
        { opacity: 1, filter: "blur(0px)", y: 0, duration: 1 },
        "-=0.6"
      ).fromTo(
        buttonsRef.current && Array.from(buttonsRef.current.children),
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15 },
        "-=0.4"
      );

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          if (glowRef.current) {
            glowRef.current.style.opacity = String(1 - self.progress * 2);
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute inset-0 bg-radial-electric" />
      <div className="grain absolute inset-0" />
      <div className="absolute inset-0 bg-black/45" />

      <div
        ref={glowRef}
        className="absolute left-1/2 top-1/2 h-[min(620px,90vw)] w-[min(620px,90vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(192,192,192,0.12),rgba(0,212,255,0.08)_34%,transparent_70%)] blur-[90px] md:blur-[120px]"
      />

      <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-12 lg:px-24 py-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C0C0C0] to-[#00D4FF]" />
          <span className="font-display text-xl tracking-wider">PRIME STORY</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/50">
          <a href="#problem" className="hover:text-white transition-colors">O Problema</a>
          <a href="#processo" className="hover:text-white transition-colors">Processo</a>
          <a href="#contato" className="hover:text-white transition-colors">Contato</a>
        </div>
        <Button variant="outline" className="border-white/20 text-white hover:bg-white hover:text-[#050505] rounded-full">
          Come\u00e7ar Projeto
        </Button>
      </nav>

      <div className="relative z-10 mx-auto max-w-6xl text-center px-6 -mt-16">
        <p className="text-xs uppercase tracking-[0.5em] text-zinc-500 mb-6">
          Premium Storymaker & Filmmaker
        </p>
        <h1
          ref={titleRef}
          className="font-display text-[clamp(2.5rem,10vw,7rem)] font-bold leading-[0.95] tracking-tight text-white"
        >
          Sua hist\u00f3ria<br />
          <span className="text-gradient-electric">merece destaque.</span>
        </h1>
        <p
          ref={subtitleRef}
          className="mt-6 text-base md:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed"
        >
          Transformamos empresas em marcas memor\u00e1veis atrav\u00e9s de
          experi\u00eancias audiovisuais que geram conex\u00e3o, autoridade e
          resultados.
        </p>

        <div ref={buttonsRef} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contato"
            className="btn-gradient group"
          >
            <span className="btn-gradient::before" />
            <span className="btn-gradient::after" />
            <span className="btn-inner flex items-center gap-2 text-white">
              Solicitar Projeto
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 rounded-full px-8"
          >
            Ver Portf\u00f3lio
          </Button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent z-10" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className="floating-particle"
            style={{
              left: `${(i * 5.2) % 100}%`,
              top: `${(i * 3.7 + 10) % 100}%`,
              animation: `float-slow ${7 + (i % 5)}s ease-in-out infinite`,
              animationDelay: `${i * 0.17}s`,
              opacity: 0.3 + (i % 3) * 0.2,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) translateX(0); }
          33% { transform: translateY(-10px) translateX(5px); }
          66% { transform: translateY(5px) translateX(-5px); }
        }
        .btn-gradient::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: linear-gradient(135deg, #C0C0C0, #00D4FF, #6C2BFF);
        }
        .btn-gradient::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          opacity: 0;
          filter: blur(20px);
          transition: opacity 0.5s;
          background: linear-gradient(135deg, #C0C0C0, #00D4FF, #6C2BFF);
        }
        .btn-gradient:hover::after {
          opacity: 0.8;
        }
        .btn-inner {
          position: relative;
          z-index: 10;
          padding: 0.75rem 2rem;
          border-radius: 9999px;
          background: #050505;
          margin: 1px;
          transition: opacity 0.3s;
        }
        .btn-gradient:hover .btn-inner {
          opacity: 0;
        }
      `}</style>
    </section>
  );
}
