"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

export default function AnimatedStoreSvg() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const tiltElement = svgRef.current;
    const maxTilt = 10;

    const updateTilt = (event: any) => {
      const { innerWidth: width, innerHeight: height } = window;
      const { clientX: x, clientY: y } = event;

      const tiltX = ((x / width) * 2 - 1) * maxTilt;
      const tiltY = ((y / height) * 2 - 1) * maxTilt;

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
      gsap.to(tiltElement, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", updateTilt);
    window.addEventListener("mouseleave", resetTilt);

    gsap.to(tiltElement, {
      y: 10,
      repeat: -1,
      yoyo: true,
      duration: 2,
      ease: "power1.inOut",
    });

    return () => {
      // Clean up event listeners
      window.removeEventListener("mousemove", updateTilt);
      window.removeEventListener("mouseleave", resetTilt);
    };
  }, []);

  return (
    <div className="flex h-full items-center justify-center p-10">
      <svg
        ref={svgRef}
        width="435"
        height="454"
        viewBox="0 0 435 454"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full overflow-visible w-full"
      >
        <rect
          x="72"
          y="28"
          width="363"
          height="426"
          rx="10"
          fill="url(#paint0_linear_66_65)"
        />
        <rect width="371" height="395" rx="10" fill="white" />
        <rect
          x="197.5"
          y="38.5"
          width="139"
          height="38"
          rx="9.5"
          fill="#F4F4FF"
          stroke="#5858EA"
          strokeDasharray="2 2"
        />
        <rect
          x="197.5"
          y="82.5"
          width="139"
          height="76"
          rx="9.5"
          fill="#F4F4FF"
          stroke="#5858EA"
          strokeDasharray="2 2"
        />
        <rect
          x="38.5"
          y="180.5"
          width="298"
          height="76"
          rx="9.5"
          fill="#F4F4FF"
          stroke="#5858EA"
          strokeDasharray="2 2"
        />
        <rect
          x="36.5"
          y="278.5"
          width="298"
          height="76"
          rx="9.5"
          fill="#F4F4FF"
          stroke="#5858EA"
          strokeDasharray="2 2"
        />
        <rect
          x="36"
          y="36.2712"
          width="142"
          height="122.729"
          rx="10"
          fill="#F4F4FF"
        />
        <g clipPath="url(#clip0_66_65)">
          <path
            d="M126.538 118.329L123.068 79.2226C123.005 78.4487 122.356 77.8621 121.57 77.8621H114.255C114.243 71.359 108.951 66.0667 102.448 66.0667C95.9445 66.0667 90.6521 71.359 90.6397 77.8621H83.3252C82.5514 77.8621 81.9023 78.4487 81.8274 79.2226L78.3574 118.329C78.3574 118.378 78.3574 118.416 78.3574 118.466C78.3574 122.822 82.3641 126.367 87.282 126.367H117.613C122.531 126.367 126.538 122.822 126.538 118.466C126.538 118.416 126.538 118.378 126.538 118.329ZM102.448 69.0623C107.303 69.0623 111.247 73.0066 111.26 77.8621H93.6353C93.6478 73.0066 97.5921 69.0623 102.448 69.0623ZM117.613 123.359H87.282C84.0367 123.359 81.3905 121.199 81.3531 118.516L84.6982 80.8578H90.6397V86.1127C90.6397 86.9365 91.3137 87.6105 92.1375 87.6105C92.9613 87.6105 93.6353 86.9365 93.6353 86.1127V80.8578H111.26V86.1127C111.26 86.9365 111.934 87.6105 112.758 87.6105C113.581 87.6105 114.255 86.9365 114.255 86.1127V80.8578H120.197L123.542 118.528C123.505 121.199 120.858 123.359 117.613 123.359Z"
            fill="black"
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear_66_65"
            x1="138.5"
            y1="28"
            x2="456.5"
            y2="475"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#6A11CB" />
            <stop offset="1" stopColor="#C471ED" />
          </linearGradient>
          <clipPath id="clip0_66_65">
            <rect
              width="60.3003"
              height="60.3003"
              fill="white"
              transform="translate(72.2974 66.0667)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
