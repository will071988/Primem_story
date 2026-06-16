"use client";

import { useState, useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import LoadingScreen from "@/components/sections/LoadingScreen";
import ParticleBackground from "@/components/sections/ParticleBackground";
import Hero from "@/components/sections/Hero";
import ProblemSection from "@/components/sections/ProblemSection";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import ProcessSection from "@/components/sections/ProcessSection";
import Results from "@/components/sections/Results";
import Brands from "@/components/sections/Brands";
import Testimonials from "@/components/sections/Testimonials";
import InteractiveCube from "@/components/sections/InteractiveCube";
import CTASection from "@/components/sections/CTASection";
import ChatFlow from "@/components/sections/ChatFlow";
import Footer from "@/components/sections/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, [loading]);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      <div style={{ opacity: loading ? 0 : 1, transition: "opacity 0.6s" }}>
        <ParticleBackground />
        <main className="relative z-10 bg-[#050505]">
          <Hero />
          <ProblemSection />
          <About />
          <Services />
          <Portfolio />
          <ProcessSection />
          <Results />
          <Brands />
          <Testimonials />

          <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20 sm:px-6 md:px-10 md:py-24">
            <div className="pointer-events-none absolute left-1/2 top-[62%] h-[620px] w-[min(92vw,920px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.12),rgba(108,43,255,0.08)_34%,transparent_70%)] blur-3xl" />
            <div className="absolute inset-0 bg-radial-electric opacity-10" />
            <div className="grain absolute inset-0" />
            <div className="mx-auto flex w-full max-w-6xl flex-col items-center relative z-10">
              <h2 className="font-display text-[clamp(2.15rem,11vw,7rem)] font-bold leading-[0.95] text-white text-center">
                Um cubo para brincar.<br />
                <span className="text-gradient-electric">Por que n\u00e3o?</span>
              </h2>
              <div className="relative mt-8 h-[44vh] min-h-[260px] w-full max-w-xl overflow-visible sm:min-h-[320px] md:mt-10 md:h-[60vh]">
                <div className="pointer-events-none absolute -inset-20 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.12),rgba(108,43,255,0.06)_42%,transparent_74%)] blur-3xl" />
                <div className="relative h-full w-full overflow-hidden rounded-[50%] bg-[#050505]/20 shadow-[0_0_120px_-50px_rgba(0,212,255,0.5)] [mask-image:radial-gradient(ellipse_at_center,black_44%,rgba(0,0,0,0.72)_62%,rgba(0,0,0,0.2)_78%,transparent_92%)]">
                  <InteractiveCube />
                </div>
              </div>
            </div>
          </section>

          <CTASection />
          <Footer />
        </main>
        <ChatFlow />
      </div>
    </>
  );
}
