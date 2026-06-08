"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import Process from "@/components/sections/Process";
import Results from "@/components/sections/Results";
import Brands from "@/components/sections/Brands";
import Testimonials from "@/components/sections/Testimonials";
import ChatFlow from "@/components/sections/ChatFlow";
import Footer from "@/components/sections/Footer";

export default function Home() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
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

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative bg-[#0A0A0A]">
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Process />
      <Results />
      <Brands />
      <Testimonials />
      <Footer />
      <ChatFlow />
    </main>
  );
}
