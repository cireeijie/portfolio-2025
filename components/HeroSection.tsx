"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { TextPlugin, ScrollTrigger } from "gsap/all";
import { HeroSectionProps } from "../constants/types";
import Button from "./Button";
import ProjectSlider from "./ProjectSlider";

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
  const tiltRef = useRef<HTMLDivElement>(null);
  const maxTilt = 15;

  useEffect(() => {
    const textArray = [
      "Eric John 👋",
      "a Full Stack Developer 💻",
      "a Shopify Expert 🛒",
      "a Web Designer 🎨",
      "a Problem Solver 🧠",
    ];
    let textArrayIndex = 0;

    const typewriter = () => {
      gsap.to(animatedTextRef.current, {
        duration: 3,
        text: textArray[textArrayIndex],
        ease: "power2.out",
        onComplete: () => {
          textArrayIndex = (textArrayIndex + 1) % textArray.length;
          setTimeout(typewriter, 1000);
        },
      });
    };

    typewriter();
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
    });

    if (!isLoaded) {
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

      setIsLoaded(true);
    }

    if (isActive) {
      tl.to(
        [
          subheadingRef.current,
          headingRef.current,
          descriptionRef.current,
          buttonContainerRef.current,
        ],
        {
          y: -20,
          opacity: 0,
          duration: 0.3,
          stagger: 0.05,
        }
      )
        .to(contentRef.current, { opacity: 0, duration: 0.2 })
        .set(contentRef.current, { display: "none" })
        .to(sliderRef.current, {
          width: "100%",
          maxWidth: "100%",
          duration: 0.4,
        });
    } else {
      tl.to(sliderRef.current, {
        width: "40rem",
        maxWidth: "40rem",
        duration: 0.4,
      })
        .set(contentRef.current, { display: "block" })
        .to(contentRef.current, { opacity: 1, duration: 0.2 })
        .to(
          [
            subheadingRef.current,
            headingRef.current,
            descriptionRef.current,
            buttonContainerRef.current,
          ],
          {
            y: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.05,
          }
        );
    }
  }, [isActive]);

  useEffect(() => {
    const tiltElement = tiltRef.current;

    const updateTilt = (event: any) => {
      const { innerWidth: width, innerHeight: height } = window;
      const { clientX: x, clientY: y } = event;

      // Calculate tilt angles
      const tiltX = ((x / width) * 2 - 1) * maxTilt;
      const tiltY = ((y / height) * 2 - 1) * maxTilt;

      // Apply tilt using GSAP
      gsap.to(tiltElement, {
        rotationX: -tiltY,
        rotationY: tiltX,
        transformPerspective: 2000,
        transformOrigin: "center",
        ease: "power1.out",
        duration: 0.3,
      });
    };

    const resetTilt = () => {
      console.log("resetting");
      gsap.to(tiltElement, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    if (!isActive) {
      window.addEventListener("mousemove", updateTilt);
      window.addEventListener("mouseleave", resetTilt); // Reset when mouse leaves
    } else {
      resetTilt(); // Immediately reset tilt when disabled
    }

    return () => {
      window.removeEventListener("mousemove", updateTilt);
      window.removeEventListener("mouseleave", resetTilt);
    };
  }, [isActive]); // Runs when isActive changes

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-between h-screen max-w-[97rem] mx-auto transition-all"
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
          className="flex items-center gap-[1rem] mt-[3.125rem]"
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
        className={`w-full absolute right-0 transition-all ${
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
