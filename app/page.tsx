"use client";

import HeroSection from "@/components/HeroSection";
import data from "@/constants/data";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger, CSSRulePlugin } from "gsap/all";
import WhoAmI from "@/components/WhoAmI";

export default function Home() {
  const { heroSection } = data;

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger, CSSRulePlugin);

      const beforeRule = CSSRulePlugin.getRule("body::before");

      gsap.to(beforeRule, {
        backgroundPosition: "50% 100%",
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
    }
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (typeof window !== "undefined") {
      const elements = document.querySelectorAll("main > *");

      elements.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "bottom 10%",
              toggleActions: "play none none none",
              scrub: 1,
            },
            onStart: () => {
              gsap.set(el, { opacity: 1, duration: 0.3 });
            },
          }
        );
      });
    }

    // Cleanup ScrollTriggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="z-10 relative">
      <HeroSection {...heroSection} />
      <WhoAmI />
    </main>
  );
}
