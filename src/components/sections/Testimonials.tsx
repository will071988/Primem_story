"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Quote } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Carlos Silva",
    company: "TechCorp",
    text: "A Prime Story transformou nossa comunica\u00e7\u00e3o visual. O v\u00eddeo institucional superou todas as expectativas e gerou um aumento significativo no engajamento.",
    rating: 5,
  },
  {
    name: "Ana Oliveira",
    company: "Cl\u00ednica Vita",
    text: "Profissionalismo e qualidade impressionantes. Recomendo para qualquer empresa que busca se destacar com conte\u00fado audiovisual premium.",
    rating: 5,
  },
  {
    name: "Ricardo Mendes",
    company: "Sabor & Arte",
    text: "As produ\u00e7\u00f5es gastron\u00f4micas da Prime Story elevaram o n\u00edvel do nosso marketing digital. Resultados excepcionais!",
    rating: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const title = sectionRef.current?.querySelector(".testimonials-title");
      if (title) {
        gsap.fromTo(
          title,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      const cards = sectionRef.current?.querySelectorAll(".testimonial-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cards[0],
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
      id="depoimentos"
      ref={sectionRef}
      className="relative section-padding bg-[#0A0A0A]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.3em] uppercase text-[#C0C0C0] mb-4 block">
            Depoimentos
          </span>
          <h2
            className="testimonials-title font-heading text-4xl md:text-6xl text-balance"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            O que nossos<br />
            <span className="text-gradient">clientes dizem</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card glass-card rounded-2xl p-8 relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-white/5" />
              <div className="flex items-center gap-2 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[#C0C0C0] text-[#C0C0C0]"
                  />
                ))}
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-8">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-white/10 text-white text-xs">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-heading text-sm">{testimonial.name}</p>
                  <p className="text-white/40 text-xs">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
