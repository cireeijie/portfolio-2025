"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { TextPlugin, ScrollTrigger } from "gsap/all";
import { HeroSectionProps } from "../constants/types";
import Button from "./Button";
import ProjectSlider from "./ProjectSlider";
import {
  typewriterEffect,
  animateElementsOnLoad,
  applyTiltEffect,
} from "@/utils/animations"; // Adjust path as needed

gsap.registerPlugin(TextPlugin);
gsap.registerPlugin(ScrollTrigger);

export default function HeroSection(props: HeroSectionProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const animatedTextRef = useRef<HTMLSpanElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement | null>(null);
  const maxTilt = 15;

  useEffect(() => {
    if (animatedTextRef.current) {
      ScrollTrigger.create({
        trigger: animatedTextRef.current,
        start: "top bottom", // Trigger when the top of the element hits the bottom of the viewport
        end: "bottom top", // End when the bottom of the element leaves the top of the viewport
        onEnter: () => typewriterEffect(animatedTextRef), // Trigger the typewriter effect on enter
      });
    }
  }, []);

  // Call animation on load
  useEffect(() => {
    animateElementsOnLoad(
      isLoaded,
      setIsLoaded,
      isActive,
      subheadingRef,
      headingRef,
      descriptionRef,
      buttonContainerRef,
      contentRef,
      sliderRef
    );
  }, [isActive, isLoaded]);

  // Apply tilt effect
  useEffect(() => {
    const cleanupTiltEffect = applyTiltEffect(tiltRef, isActive, 15);
    return cleanupTiltEffect;
  }, [isActive]);

  return (
    <div
      ref={containerRef}
      className="hero-section relative flex lg:flex-row flex-col pt-[13rem] lg:pt-0 lg:pb-0 pb-[4rem] items-center justify-between h-auto lg:h-screen max-w-[97rem] mx-auto transition-all"
    >
      {/* Hero Content */}
      <div ref={contentRef} className="max-w-[48rem] transition-all">
        {props.subHeading && (
          <p ref={subheadingRef} className="subheading mb-[2rem]">
            {props.subHeading}{" "}
            <span id="text-animated" ref={animatedTextRef}></span>
          </p>
        )}
        {props.heading && (
          <h1 ref={headingRef} className="mb-[1.3rem] font-bold">
            {props.heading}
          </h1>
        )}
        {props.description && (
          <p ref={descriptionRef} className="text-[1.125rem]">
            {props.description}
          </p>
        )}
        {/* Button Container */}
        <div
          ref={buttonContainerRef}
          className="flex items-center lg:flex-row flex-col gap-[1rem] mt-[3.125rem]"
        >
          <Button
            text={props.primaryBtnText ?? ""}
            href={props.primaryBtnLink}
            variant="primary"
            onClick={() => {
              setIsActive(true);
            }}
          />
          <Button
            text={props.secondaryBtnText ?? ""}
            href={props.secondaryBtnLink}
            variant="secondary"
          />
        </div>
      </div>

      {/* Project Slider */}
      <div
        ref={sliderRef}
        className={`w-full relative lg:absolute right-0 transition-all ${
          isActive ? "max-w-[100%]" : "max-w-[40rem]"
        }`}
      >
        <div ref={tiltRef}>
          <ProjectSlider
            isActive={isActive}
            key={isActive ? "active" : "inactive"}
            hideProjects={() => setIsActive(false)}
          />
        </div>
      </div>
    </div>
  );
}
