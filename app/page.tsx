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
      const elements = document.querySelectorAll("main > *"); // Select direct children of <main>

      elements.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1, // Smooth movement duration
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%", // Start animation when element is 85% visible
              end: "bottom 10%", // Animation completes before it leaves the screen
              toggleActions: "play none none none", // Ensures animation runs every time
              scrub: 1, // Smooth animation on scroll
            },
            onStart: () => gsap.to(el, { opacity: 1, duration: 0.3 }), // Faster opacity transition
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
      {/* <WhoAmI /> */}
    </main>
  );
}
