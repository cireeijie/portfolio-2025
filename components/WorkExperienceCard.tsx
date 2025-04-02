"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { WorkExperienceProps } from "@/constants/types";
import Image from "next/image";

export default function WorkExperienceCard(props: WorkExperienceProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;

    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5; // Normalize to -0.5 to 0.5
      const y = (e.clientY - top) / height - 0.5;

      // Tilt the card with a max tilt of 15 and no scaling
      gsap.to(card, {
        rotationY: x * 15, // Horizontal tilt (max tilt set to 15)
        rotationX: y * -15, // Vertical tilt (max tilt set to 15)
        ease: "linear", // Linear easing for consistent tilt transition
        duration: 0.1, // Faster transition duration
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        ease: "linear", // Linear reset transition
        duration: 0.2, // Slightly slower reset for smoothness
      });
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative flex flex-col gap-4 rounded-[10px] overflow-hidden p-[20px] sm:p-[40px] backdrop-blur-[10px] group transition-transform w-full m-w-[300px]"
    >
      {/* Default Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[rgba(20,20,20,0.9)] to-[rgba(10,10,10,0.9)]"></div>

      {/* Hover Gradient */}
      <div className="gradient-overlay absolute inset-0 bg-gradient-to-br from-[#6A11CB] to-[#C471ED] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-[14px] rounded-full bg-gradient-to-br from-[#6A11CB] to-[#C471ED] transition-opacity duration-500 w-fit px-3 py-1 font-bold">
          {props.companyName}
        </h3>
        <Image
          src={props.logoUrl || ""}
          alt={props.companyName || ""}
          width={250}
          height={250}
          className="w-fit h-[50px] my-6"
        />
        <h3 className="text-2xl font-black mb-2">{props.jobTitle}</h3>
        <p className="text-[14px]">{props.desc}</p>
      </div>
    </div>
  );
}
