"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const categories = ["Todos", "Empresas", "Cl\u00ednicas", "Restaurantes", "Lojas"];

const portfolioItems = [
  {
    title: "Brand Filme - Tech Corp",
    category: "Empresas",
    thumbnail: "/images/portfolio-1.jpg",
    videoUrl: "/videos/portfolio-1.mp4",
    description: "Filme institucional com linguagem cinematogr\u00e1fica.",
  },
  {
    title: "Cl\u00ednica Sorridentes",
    category: "Cl\u00ednicas",
    thumbnail: "/images/portfolio-2.jpg",
    videoUrl: "/videos/portfolio-2.mp4",
    description: "Produ\u00e7\u00e3o premium para cl\u00ednica odontol\u00f3gica.",
  },
  {
    title: "Restaurante Sabor & Arte",
    category: "Restaurantes",
    thumbnail: "/images/portfolio-3.jpg",
    videoUrl: "/videos/portfolio-3.mp4",
    description: "Filmagem gastron\u00f4mica com qualidade premium.",
  },
  {
    title: "Loja Fashion Studio",
    category: "Lojas",
    thumbnail: "/images/portfolio-4.jpg",
    videoUrl: "/videos/portfolio-4.mp4",
    description: "Campanha de moda com dire\u00e7\u00e3o criativa exclusiva.",
  },
  {
    title: "Construtora Horizonte",
    category: "Empresas",
    thumbnail: "/images/portfolio-5.jpg",
    videoUrl: "/videos/portfolio-5.mp4",
    description: "V\u00eddeo corporativo para construtora de alto padr\u00e3o.",
  },
  {
    title: "Cl\u00ednica Bem-Estar",
    category: "Cl\u00ednicas",
    thumbnail: "/images/portfolio-6.jpg",
    videoUrl: "/videos/portfolio-6.mp4",
    description: "Conte\u00fado para cl\u00ednica de est\u00e9tica avan\u00e7ada.",
  },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeCategory === "Todos"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const portfolioTitle = sectionRef.current?.querySelector(".portfolio-title");
      if (portfolioTitle) {
        gsap.fromTo(
          portfolioTitle,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (selectedVideo !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedVideo]);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative section-padding bg-[#0A0A0A]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.3em] uppercase text-[#C0C0C0] mb-4 block">
            Portf\u00f3lio
          </span>
          <h2
            className="portfolio-title font-heading text-4xl md:text-6xl text-balance"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Trabalhos que<br />
            <span className="text-gradient">falam por si</span>
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#C0C0C0] text-[#0A0A0A]"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedVideo(index)}
              className="group relative aspect-video rounded-2xl overflow-hidden cursor-pointer bg-[#1C1C1C]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#C0C0C0] transition-all duration-300 group-hover:scale-110">
                  <Play className="w-6 h-6 text-white group-hover:text-[#0A0A0A] ml-0.5" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
                <span className="text-xs text-[#C0C0C0] tracking-wider uppercase">
                  {item.category}
                </span>
                <h3 className="font-heading text-lg mt-1">{item.title}</h3>
                <p className="text-white/50 text-sm mt-1">{item.description}</p>
              </div>
              <div className="absolute inset-0 bg-[#1C1C1C] flex items-center justify-center">
                <span className="text-white/10 font-heading text-6xl">PS</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-[#C0C0C0]/0 via-transparent to-transparent group-hover:from-[#C0C0C0]/10 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>

      {selectedVideo !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl">
          <button
            onClick={() => setSelectedVideo(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <div className="relative w-full max-w-5xl aspect-video mx-6">
            <div className="w-full h-full rounded-2xl bg-[#1C1C1C] flex items-center justify-center">
              <div className="text-center">
                <Play className="w-16 h-16 text-[#C0C0C0] mx-auto mb-4" />
                <p className="text-white/40">
                  {filtered[selectedVideo]?.title}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
