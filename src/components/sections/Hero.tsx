"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      const heroTitle = textRef.current?.querySelector(".hero-title");
      const heroSubtitle = textRef.current?.querySelector(".hero-subtitle");
      const heroBtns = buttonsRef.current?.querySelectorAll(".hero-btn");

      if (heroTitle && heroSubtitle && heroBtns) {
        tl.fromTo(
          heroTitle,
          { y: 80, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 1.2, delay: 0.5 }
        )
          .fromTo(
            heroSubtitle,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 1 },
            "-=0.6"
          )
          .fromTo(
            heroBtns,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.2 },
            "-=0.4"
          );
      }

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          if (videoRef.current) {
            videoRef.current.style.transform = `scale(${1 + self.progress * 0.15})`;
            videoRef.current.style.filter = `brightness(${1 - self.progress * 0.3})`;
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
    >
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-poster.jpg"
          className="w-full h-full object-cover scale-110"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A0A0A]" />
      </div>

      <nav className="relative z-20 flex items-center justify-between px-6 md:px-12 lg:px-24 py-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#C0C0C0]" />
          <span
            className="font-heading text-xl tracking-wider"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            PRIME STORY
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/70">
          <a href="#sobre" className="hover:text-white transition-colors">Sobre</a>
          <a href="#servicos" className="hover:text-white transition-colors">Serviços</a>
          <a href="#portfolio" className="hover:text-white transition-colors">Portfólio</a>
          <a href="#contato" className="hover:text-white transition-colors">Contato</a>
        </div>
        <Button
          variant="outline"
          className="hero-btn border-white/20 text-white hover:bg-white hover:text-[#0A0A0A] rounded-full"
        >
          Solicitar Projeto
        </Button>
      </nav>

      <div className="relative z-20 h-full flex flex-col items-center justify-center px-6 -mt-20">
        <div ref={textRef} className="text-center max-w-5xl">
          <div className="inline-block mb-6">
            <span className="text-xs tracking-[0.3em] uppercase text-white/50 font-sans">
              Premium Storymaker & Filmmaker
            </span>
          </div>
          <h1
            className="hero-title font-heading text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-tight text-balance mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Sua hist\u00f3ria<br />
            <span className="text-gradient">merece destaque.</span>
          </h1>
          <p className="hero-subtitle text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            Transformamos empresas em marcas memor\u00e1veis atrav\u00e9s de
            experi\u00eancias audiovisuais que geram conex\u00e3o, autoridade e
            resultados.
          </p>
        </div>

        <div
          ref={buttonsRef}
          className="hero-btn flex flex-col sm:flex-row gap-4 mt-12"
        >
          <Button
            size="lg"
            className="bg-[#C0C0C0] hover:bg-white text-[#0A0A0A] rounded-full px-8 group"
          >
            Solicitar Projeto
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 rounded-full px-8"
          >
            <Play className="mr-2 w-4 h-4" />
            Ver Portf\u00f3lio
          </Button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent" />

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-white/60" />
        </div>
      </div>
    </section>
  );
}
