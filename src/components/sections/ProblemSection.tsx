"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProblemSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const label = textRef.current?.querySelector(".problem-label");
      const title = textRef.current?.querySelector(".problem-title");

      if (label && title) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 40%",
            scrub: 1,
          },
        });

        tl.fromTo(label, { opacity: 0, y: 20 }, { opacity: 1, y: 0 })
          .fromTo(title, { opacity: 0, filter: "blur(12px)", y: 40 }, { opacity: 1, filter: "blur(0px)", y: 0 });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="problem"
      ref={sectionRef}
      className="relative h-[200vh] bg-[#050505]"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center px-4 py-20 sm:px-6 md:px-10 md:py-24">
        <div className="absolute inset-0 bg-radial-electric opacity-20" />
        <div className="grain absolute inset-0 opacity-30" />
        <div className="absolute left-1/2 top-1/2 h-[min(720px,120vw)] w-[min(720px,120vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(192,192,192,0.08),rgba(0,212,255,0.06)_38%,transparent_70%)] blur-3xl" />

        <div ref={textRef} className="relative z-10 mx-auto max-w-6xl text-center">
          <p className="problem-label text-[10px] uppercase tracking-[0.32em] text-electric/80 sm:text-xs sm:tracking-[0.42em]">
            O Problema
          </p>
          <h2 className="problem-title font-display text-[clamp(2.1rem,12vw,7rem)] font-bold leading-[0.95] text-white mt-5">
            Voc\u00ea est\u00e1 vendendo<br />
            <span className="text-gradient-electric">palavras, n\u00e3o emo\u00e7\u00f5es.</span>
          </h2>
          <p className="mt-6 text-zinc-400 text-sm max-w-xl mx-auto">
            Seu p\u00fablico n\u00e3o lembra de textos gen\u00e9ricos. Ele lembra de
            experi\u00eancias visuais que despertam sentimentos.
          </p>
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-[-20%] w-1/2 rotate-12 bg-[linear-gradient(90deg,transparent,rgba(192,192,192,0.2),rgba(0,212,255,0.18),transparent)] blur-3xl" />
      </div>
    </section>
  );
}
