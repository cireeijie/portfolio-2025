"use client";
import React, { useEffect } from "react";
import { gsap } from "gsap"; // Make sure to import gsap
import LogoAnimatedLoading from "./LogoAnimatedLoading";

export default function Preloader() {
  const [isLoading, setIsLoading] = React.useState(true);
  useEffect(() => {
    // Set a delay of 2 seconds before starting the slide-up animation
    const timer = setTimeout(() => {
      gsap.to(".preloader", {
        y: "-100%", // Slide up out of the viewport
        duration: 1, // Duration of the slide-up animation
        ease: "power2.out", // Easing for smooth transition
      });

      setIsLoading(false);
    }, 2000); // Delay before the animation starts

    // Cleanup the timer in case the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`w-full h-screen flex absolute bg-[#040308] z-100 items-center justify-center preloader ${
        !isLoading && "preloader-loaded"
      }`}
    >
      <LogoAnimatedLoading />
    </div>
  );
}
