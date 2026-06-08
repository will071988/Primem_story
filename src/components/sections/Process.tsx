"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ClipboardList, Map, Clapperboard, Scissors, Rocket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: ClipboardList,
    title: "Briefing",
    description:
      "Entendemos sua marca, objetivos e p\u00fablico-alvo para criar uma estrat\u00e9gia personalizada.",
  },
  {
    icon: Map,
    title: "Planejamento",
    description:
      "Desenvolvemos o roteiro, storyboard e cronograma detalhado do projeto.",
  },
  {
    icon: Clapperboard,
    title: "Produ\u00e7\u00e3o",
    description:
      "Grava\u00e7\u00e3o com equipamentos de ponta e equipe t\u00e9cnica especializada.",
  },
  {
    icon: Scissors,
    title: "Edi\u00e7\u00e3o",
    description:
      "P\u00f3s-produ\u00e7\u00e3o com color grading, motion graphics e design de som.",
  },
  {
    icon: Rocket,
    title: "Entrega",
    description:
      "Entregamos o projeto finalizado e otimizado para todas as plataformas.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { height: "0%" },
        {
          height: "100%",
          duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 40%",
            scrub: 1,
          },
        }
      );

      const items = sectionRef.current?.querySelectorAll(".process-step");
      if (items) {
        items.forEach((item, i) => {
          gsap.fromTo(
            item,
            { x: i % 2 === 0 ? -50 : 50, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 75%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="processo"
      ref={sectionRef}
      className="relative section-padding bg-[#1C1C1C]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-xs tracking-[0.3em] uppercase text-[#C0C0C0] mb-4 block">
            Nosso Processo
          </span>
          <h2
            className="font-heading text-4xl md:text-6xl text-balance"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Como<br />
            <span className="text-gradient">trabalhamos</span>
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2">
            <div
              ref={lineRef}
              className="w-full bg-gradient-to-b from-[#C0C0C0] to-transparent"
            />
          </div>

          <div className="space-y-16 md:space-y-24">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`process-step relative flex flex-col ${
                  index % 2 === 0
                    ? "md:flex-row"
                    : "md:flex-row-reverse"
                } items-center gap-8 md:gap-16`}
              >
                <div className="flex-1">
                  <div
                    className={`glass-card rounded-2xl p-8 ${
                      index % 2 === 0 ? "md:text-right" : "md:text-left"
                    }`}
                  >
                    <span className="text-[#C0C0C0] text-sm font-mono">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-heading text-2xl mt-2 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-white/50 leading-relaxed text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 w-16 h-16 rounded-full bg-[#0A0A0A] border-2 border-[#C0C0C0]/30 flex items-center justify-center shrink-0">
                  <step.icon className="w-6 h-6 text-[#C0C0C0]" />
                </div>

                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
