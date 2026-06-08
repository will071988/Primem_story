"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const brands = [
  "TechCorp", "MedLife", "Sabor & Arte", "FashionLab",
  "Construtora ABC", "Cl\u00ednica Vita", "Bistr\u00f4 Cheff", "SmartStore",
  "AlphaTech", "Sa\u00fade Prime", "Del\u00edcias do Chef", "UltraModa",
];

export default function Brands() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const duration = 30;
      const items = track.children;
      const totalWidth = Array.from(items).reduce(
        (acc, item) => acc + (item as HTMLElement).offsetWidth + 48,
        0
      );

      gsap.to(track, {
        x: -totalWidth / 2,
        duration,
        ease: "none",
        repeat: -1,
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-[#1C1C1C] overflow-hidden"
    >
      <div className="text-center mb-16 px-6">
        <span className="text-xs tracking-[0.3em] uppercase text-[#C0C0C0] mb-4 block">
          Marcas Atendidas
        </span>
        <h2
          className="font-heading text-4xl md:text-6xl text-balance"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Confiam na<br />
          <span className="text-gradient">Prime Story</span>
        </h2>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#1C1C1C] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#1C1C1C] to-transparent z-10" />

        <div ref={trackRef} className="flex gap-12 items-center">
          {[...brands, ...brands].map((brand, index) => (
            <div
              key={index}
              className="flex-shrink-0 h-16 px-8 rounded-xl border border-white/5 bg-white/[0.02] flex items-center justify-center"
            >
              <span className="font-heading text-lg text-white/30 whitespace-nowrap">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
