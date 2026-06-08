"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Film, Camera, PenTool, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    icon: Film,
    title: "Storymaking",
    description:
      "Criamos narrativas visuais que conectam sua marca ao p\u00fablico de forma emocional e estrat\u00e9gica.",
  },
  {
    icon: Camera,
    title: "Filmmaking",
    description:
      "Produ\u00e7\u00e3o audiovisual premium com qualidade cinematogr\u00e1fica e dire\u00e7\u00e3o criativa exclusiva.",
  },
  {
    icon: PenTool,
    title: "Conte\u00fado Estrat\u00e9gico",
    description:
      "Planejamento de conte\u00fado alinhado aos objetivos do seu neg\u00f3cio para m\u00e1ximo impacto.",
  },
  {
    icon: Sparkles,
    title: "Produ\u00e7\u00e3o Premium",
    description:
      "Equipamentos de ponta e equipe especializada para entregar resultados que superam expectativas.",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      const aboutTitle = sectionRef.current?.querySelector(".about-title");
      const aboutText = sectionRef.current?.querySelector(".about-text");
      if (aboutTitle && aboutText) {
        tl.fromTo(
          aboutTitle,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        ).fromTo(
          aboutText,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        );
      }

      if (cardsRef.current) {
        const items = cardsRef.current.querySelectorAll(".about-card");
        gsap.fromTo(
          items,
          { y: 80, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
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
      id="sobre"
      ref={sectionRef}
      className="relative section-padding bg-[#0A0A0A]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-xs tracking-[0.3em] uppercase text-[#C0C0C0] mb-4 block">
            Quem Somos
          </span>
          <h2
            className="about-title font-heading text-4xl md:text-6xl text-balance mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Transformamos vis\u00f5es em<br />
            <span className="text-gradient">experi\u00eancias visuais</span>
          </h2>
          <p className="about-text text-lg text-white/60 max-w-3xl mx-auto leading-relaxed">
            Somos uma ag\u00eancia especializada em contar hist\u00f3rias que
            vendem. Combinamos t\u00e9cnica cinematogr\u00e1fica com
            estrat\u00e9gia de marketing para criar conte\u00fados que
            transformam marcas.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className="about-card group relative glass-card rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 cursor-default"
            >
              <div className="w-14 h-14 rounded-xl bg-[#C0C0C0]/10 flex items-center justify-center mb-6 group-hover:bg-[#C0C0C0]/20 transition-colors">
                <card.icon className="w-6 h-6 text-[#C0C0C0]" />
              </div>
              <h3 className="font-heading text-xl mb-3">{card.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {card.description}
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C0C0C0] to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
