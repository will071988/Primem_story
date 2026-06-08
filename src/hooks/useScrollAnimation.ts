"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimation = (
  animation: (element: HTMLElement) => gsap.core.Timeline | gsap.core.Tween
) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      animation(element);
    }, element);

    return () => ctx.revert();
  }, [animation]);

  return ref;
};

export const fadeInUp = (element: HTMLElement) => {
  return gsap.from(element, {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });
};

export const staggerCards = (cards: HTMLElement[]) => {
  return gsap.from(cards, {
    y: 80,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: cards[0],
      start: "top 75%",
    },
  });
};
