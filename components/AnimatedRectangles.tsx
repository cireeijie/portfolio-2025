"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function AnimatedRectangles() {
  const rectRef = useRef<SVGRectElement | null>(null); // Create a reference for the rect element

  useEffect(() => {
    if (rectRef.current) {
      // Sequence of animations using GSAP
      gsap
        .timeline({ repeat: -1, yoyo: true }) // Infinite loop with yoyo effect (play forward and backward)
        .to(rectRef.current, {
          duration: 1, // First phase duration (rounded corners)
          rx: 100, // Radius to full (max value for smooth round corners)
          ease: "power2.inOut", // Slightly fast easing
        })
        .to(rectRef.current, {
          duration: 1, // Aspect ratio adjustment duration
          rx: 10,
          y: 80, // Move down a little bit
          width: 200, // Aspect ratio to 1 (width and height should be same)
          height: 200, // Set height equal to width
          ease: "power2.inOut", // Slightly fast easing
        })
        .to(rectRef.current, {
          duration: 1, // Rotation duration
          rotation: 360, // Rotate the rectangle by 360 degrees
          ease: "power2.inOut", // Slightly fast easing
          transformOrigin: "50% 50%", // Rotate around the center
        })
        .to(rectRef.current, {
          duration: 2, // Floating effect (move up and down)
          y: "+=20", // Move up and down by 20px
          //   repeat: -1, // Infinite floating effect
          yoyo: true, // Ensure the rectangle moves back down
          ease: "power1.inOut", // Ease for floating
        });
    }
  }, []); // Run once after component mounts

  return (
    <div className="flex h-full items-center justify-center p-10">
      <svg
        width="436"
        height="486"
        viewBox="0 0 436 486"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full"
      >
        <rect
          x="124"
          y="60"
          width="312"
          height="426"
          rx="10" // Initial corner radius
          fill="url(#paint0_linear_62_64)"
          className="rect-gradient"
        />
        {/* Apply the ref to the rect element */}
        <rect
          width="312"
          height="426"
          rx="10" // Initial corner radius
          fill="white"
          ref={rectRef} // This attaches the ref to the rect element
        />
        <defs>
          <linearGradient
            id="paint0_linear_62_64"
            x1="171"
            y1="80"
            x2="480.5"
            y2="547.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#6A11CB" />
            <stop offset="1" stopColor="#C471ED" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
