"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Building2,
  ShoppingBag,
  Camera,
  Clapperboard,
  CalendarCheck,
  Stethoscope,
  UtensilsCrossed,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Building2,
    title: "V\u00eddeos Institucionais",
    description:
      "Apresente sua empresa com produ\u00e7\u00e3o cinematogr\u00e1fica que transmite profissionalismo e visibilidade.",
  },
  {
    icon: ShoppingBag,
    title: "Produ\u00e7\u00e3o Comercial",
    description:
      "Campanhas publicit\u00e1rias em v\u00eddeo com roteiro, dire\u00e7\u00e3o e p\u00f3s-produ\u00e7\u00e3o premium.",
  },
  {
    icon: Camera,
    title: "Conte\u00fado para Redes Sociais",
    description:
      "Conte\u00fado otimizado para Instagram, TikTok e YouTube com alto potencial de engajamento.",
  },
  {
    icon: Clapperboard,
    title: "Reels Profissionais",
    description:
      "Reels de alto impacto com edi\u00e7\u00e3o din\u00e2mica, motion graphics e trilha sonora exclusiva.",
  },
  {
    icon: CalendarCheck,
    title: "Cobertura de Eventos",
    description:
      "Registre seus eventos com qualidade cinematogr\u00e1fica e edi\u00e7\u00e3o profissional.",
  },
  {
    icon: Stethoscope,
    title: "Produ\u00e7\u00e3o para Cl\u00ednicas",
    description:
      "Conte\u00fado premium para cl\u00ednicas e profissionais de sa\u00fade que gera autoridade e confian\u00e7a.",
  },
  {
    icon: UtensilsCrossed,
    title: "Produ\u00e7\u00e3o para Restaurantes",
    description:
      "Valorize seu card\u00e1pio e ambiente com produ\u00e7\u00f5es gastron\u00f4micas que despertam o desejo.",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      const title = sectionRef.current?.querySelector(".services-title");
      if (title) {
        tl.fromTo(
          title,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        );
      }

      const items = sectionRef.current?.querySelectorAll(".service-item");
      if (items) {
        const grid = sectionRef.current?.querySelector(".services-grid");
        gsap.fromTo(
          items,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: grid,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="servicos"
      ref={sectionRef}
      className="relative section-padding bg-[#1C1C1C]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-xs tracking-[0.3em] uppercase text-[#C0C0C0] mb-4 block">
            Nossos Servi\u00e7os
          </span>
          <h2
            className="services-title font-heading text-4xl md:text-6xl text-balance"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Solu\u00e7\u00f5es completas<br />
            <span className="text-gradient">para sua marca</span>
          </h2>
        </div>

        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-item group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-8 hover:bg-white/[0.06] transition-all duration-500"
            >
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-5 group-hover:bg-[#C0C0C0]/20 transition-colors">
                  <service.icon className="w-5 h-5 text-[#C0C0C0] group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="font-heading text-lg mb-3 group-hover:text-[#C0C0C0] transition-colors">
                  {service.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/60 transition-colors">
                  {service.description}
                </p>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#C0C0C0]/5 rounded-full blur-3xl group-hover:bg-[#C0C0C0]/10 transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
