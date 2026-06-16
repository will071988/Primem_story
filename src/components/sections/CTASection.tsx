"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = sectionRef.current?.querySelectorAll(".cta-anim");
      if (els && els.length > 0) {
        gsap.fromTo(
          els,
          { opacity: 0, filter: "blur(12px)", y: 40 },
          {
            opacity: 1, filter: "blur(0px)", y: 0, duration: 0.8, stagger: 0.15,
            scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none reverse" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contato"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20 sm:px-6 md:px-10 md:py-28"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[min(720px,120vw)] w-[min(720px,120vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(192,192,192,0.1),rgba(0,212,255,0.08)_38%,transparent_70%)] blur-3xl" />
      <div className="grain absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <h2 className="cta-anim font-display text-[clamp(2.35rem,12vw,8rem)] font-bold leading-[0.95] text-white">
          <span className="block">N\u00e3o \u00e9 para todos.</span>
          <span className="relative mt-3 block overflow-hidden text-gradient-electric">
            S\u00f3 para marcas prontas para se destacar.
          </span>
        </h2>

        <p className="cta-anim mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:mt-8 md:text-lg md:leading-8">
          Se voc\u00ea quer um site b\u00e1sico, n\u00e3o somos o est\u00fadio certo.
          Se voc\u00ea quer que lembrem da sua marca, vamos conversar.
        </p>

        <div className="cta-anim mt-10 inline-flex">
          <a
            href="#"
            className="btn-gradient group"
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              borderRadius: "9999px",
            }}
          >
            <span style={{
              position: "absolute", inset: 0, borderRadius: "9999px",
              background: "linear-gradient(135deg, #C0C0C0, #00D4FF, #6C2BFF)",
            }} />
            <span style={{
              position: "absolute", inset: 0, borderRadius: "9999px", opacity: 0,
              filter: "blur(20px)", transition: "opacity 0.5s",
              background: "linear-gradient(135deg, #C0C0C0, #00D4FF, #6C2BFF)",
            }} className="group-hover:opacity-80" />
            <span style={{
              position: "relative", zIndex: 10, padding: "0.75rem 2rem",
              borderRadius: "9999px", background: "#050505", margin: "1px",
              transition: "opacity 0.3s", display: "flex", alignItems: "center", gap: "0.5rem",
              color: "white", fontWeight: 500,
            }} className="group-hover:opacity-0">
              Come\u00e7ar Projeto
              <ArrowRight className="w-4 h-4" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
