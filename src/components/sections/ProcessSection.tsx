"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { number: "01", title: "Briefing", desc: "Book a call with us" },
  { number: "02", title: "Planejamento", desc: "Share your ideas" },
  { number: "03", title: "Produ\u00e7\u00e3o", desc: "Leave it to us" },
  { number: "04", title: "Edi\u00e7\u00e3o", desc: "We got this" },
  { number: "05", title: "Entrega", desc: "Within weeks!" },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const title = sectionRef.current?.querySelector(".process-header");
      const cards = sectionRef.current?.querySelectorAll(".process-card");

      if (title) {
        gsap.fromTo(
          title,
          { opacity: 0, filter: "blur(10px)", y: 34 },
          {
            opacity: 1, filter: "blur(0px)", y: 0, duration: 0.8,
            scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none reverse" },
          }
        );
      }

      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1,
            scrollTrigger: { trigger: cards[0], start: "top 75%", toggleActions: "play none none reverse" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="processo" ref={sectionRef} className="relative section-padding bg-[#050505]">
      <div className="absolute inset-0 bg-radial-electric opacity-10" />
      <div className="grain absolute inset-0 opacity-30" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="process-header text-center mb-16">
          <p className="text-xs uppercase tracking-[0.42em] text-electric/80">Processo</p>
          <h2 className="font-display text-[clamp(2.25rem,6vw,5.6rem)] font-bold leading-[0.98] text-white mt-4">
            Seu tempo \u00e9 valioso.<br />
            <span className="text-gradient-electric">O nosso tamb\u00e9m.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="process-card relative min-h-[5.4rem] overflow-hidden rounded-2xl border border-white/10 bg-black/25 px-3 py-4 backdrop-blur-xl sm:min-h-24 sm:rounded-3xl sm:px-4 sm:py-5"
            >
              <div className="space-y-1">
                <span className="font-display text-3xl sm:text-4xl font-bold text-white/15">
                  {step.number}
                </span>
                <p className="font-display text-lg text-white">{step.title}</p>
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
