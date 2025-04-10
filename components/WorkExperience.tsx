"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Button from "./Button";
import { WorkExperienceProps } from "@/constants/types";
import WorkExperiences from "./WorkExperiences";
import { ScrollTrigger } from "gsap/all";

export default function WorkExperience() {
  const [isLoaded, setIsLoaded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoaded) {
      // ScrollTrigger for animating on scroll
      ScrollTrigger.create({
        trigger: contentRef.current,
        start: "top 80%", // Trigger when 80% of section comes into view
        onEnter: () => {
          // Run animation when the section enters the viewport
          const tl = gsap.timeline({
            defaults: { ease: "power2.out" },
          });

          tl.from(
            [
              subheadingRef.current,
              headingRef.current,
              descriptionRef.current,
              buttonContainerRef.current,
            ],
            {
              y: -50,
              opacity: 0,
              duration: 0.6,
              stagger: 0.1,
            }
          );

          setIsLoaded(true); // Ensure animation runs only once
        },
      });
    }
  }, [isLoaded]);
  return (
    <div className="work-experience-section relative flex lg:flex-row flex-col items-center justify-between lg:h-screen h-full pt-[5rem] pb-[7rem] lg:pt-0 lg:pb-0 gap-[2rem] max-w-[97rem] mx-auto transition-all">
      <div ref={contentRef} className="max-w-[48rem] transition-all">
        <p ref={subheadingRef} className="subheading mb-[2rem]">
          Work Experience
        </p>
        <h2 ref={headingRef} className="mb-[1.3rem] font-bold">
          Driving innovation, leading teams, and delivering impactful web
          solutions.
        </h2>
        <p ref={descriptionRef} className="text-[1.125rem]">
          With a strong background in web development, Shopify customization,
          and full-stack solutions, I have worked across various roles, from
          developer to manager. My expertise spans building custom e-commerce
          features, optimizing website performance, and leading teams to deliver
          high-quality digital experiences.
        </p>
        <div
          ref={buttonContainerRef}
          className="flex items-center gap-[1rem] mt-[3.125rem]"
        >
          <Button
            text="Let's Build Something Cool"
            href="https://calendly.com/ericjohnariate-dev/work-with-me"
            variant="primary"
          />
        </div>
      </div>

      <div
        ref={sliderRef}
        className={`w-full max-w-[40rem] h-full max-h-[50vh] transition-all `}
      >
        <WorkExperiences />
      </div>
    </div>
  );
}
