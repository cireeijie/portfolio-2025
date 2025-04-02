// animations.js
import gsap from "gsap";
import { RefObject } from "react";

export const typewriterEffect = (
  animatedTextRef: RefObject<HTMLElement | null>
) => {
  const textArray = [
    "Eric John 👋",
    "a Full Stack Developer 💻",
    "a Shopify Expert 🛒",
    "a Web Designer 🎨",
    "a Problem Solver 🧠",
  ];
  let textArrayIndex = 0;

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  const typewriter = () => {
    if (!animatedTextRef.current) return;

    gsap.to(animatedTextRef.current, {
      duration: isMobile ? 1.5 : 3, // Faster duration for mobile
      text: textArray[textArrayIndex],
      ease: "power2.out",
      onComplete: () => {
        textArrayIndex = (textArrayIndex + 1) % textArray.length;
        setTimeout(typewriter, isMobile ? 700 : 1000); // Reduce delay on mobile
      },
    });
  };

  typewriter(); // Start animation

  // Listen for screen size changes dynamically
  const mediaQuery = window.matchMedia("(max-width: 768px)");
  mediaQuery.addEventListener("change", (e) => {
    if (!animatedTextRef.current) return;

    textArrayIndex = 0; // Reset text index
    if (e.matches) {
      // Mobile mode: Adjust speed and restart animation
      gsap.killTweensOf(animatedTextRef.current);
      typewriter();
    } else {
      // Desktop mode: Restart with original timing
      gsap.killTweensOf(animatedTextRef.current);
      typewriter();
    }
  });
};

export const animateElementsOnLoad = (
  isLoaded: boolean, // Boolean indicating if the elements are loaded
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>, // State setter for `isLoaded`
  isActive: boolean, // Boolean indicating whether the tilt effect or animation is active
  subheadingRef: React.RefObject<HTMLElement | null>, // Ref for subheading
  headingRef: React.RefObject<HTMLElement | null>, // Ref for heading
  descriptionRef: React.RefObject<HTMLElement | null>, // Ref for description
  buttonContainerRef: React.RefObject<HTMLElement | null>, // Ref for button container
  contentRef: React.RefObject<HTMLElement | null>, // Ref for content section
  sliderRef: React.RefObject<HTMLElement | null>
) => {
  const tl = gsap.timeline({
    defaults: { ease: "power2.out" },
  });

  const mm = gsap.matchMedia();

  mm.add("(max-width: 768px)", () => {
    // Optimized fade-up effect for mobile
    if (!isLoaded) {
      gsap.from(
        [
          subheadingRef.current,
          headingRef.current,
          descriptionRef.current,
          buttonContainerRef.current,
        ],
        {
          y: 30,
          opacity: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power1.out",
        }
      );
      setIsLoaded(true);
    }

    if (isActive) {
      gsap.to(
        [
          subheadingRef.current,
          headingRef.current,
          descriptionRef.current,
          buttonContainerRef.current,
        ],
        {
          y: 10,
          opacity: 0,
          duration: 0.2,
          stagger: 0.05,
        }
      );
      gsap.to(contentRef.current, { opacity: 0, duration: 0.2 });
      gsap.set(contentRef.current, { display: "none" });
    } else {
      gsap.to(sliderRef.current, {
        width: "100%",
        maxWidth: "100%",
        duration: 0.3,
      });
      gsap.set(contentRef.current, { display: "block" });
      gsap.to(contentRef.current, { opacity: 1, duration: 0.2 });
      gsap.to(
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
  });

  mm.add("(min-width: 769px)", () => {
    // Desktop animations remain unchanged
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
  });
};

export const applyTiltEffect = (
  tiltRef: RefObject<HTMLElement | null>,
  isActive: boolean,
  maxTilt: number
) => {
  const tiltElement = tiltRef.current;
  if (!tiltElement) return;

  // Detect if the device is mobile
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  // Disable tilt effect on mobile for performance
  if (isMobile) {
    return () => {}; // Early return to disable tilt effect on mobile
  }

  const updateTilt = (event: MouseEvent) => {
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

  if (!isActive) {
    window.addEventListener("mousemove", updateTilt);
    window.addEventListener("mouseleave", resetTilt);
  } else {
    resetTilt();
  }

  return () => {
    window.removeEventListener("mousemove", updateTilt);
    window.removeEventListener("mouseleave", resetTilt);
  };
};

// Function to position icons randomly with mobile optimization
export const positionIcons = (icons: any, container: any) => {
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;

  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const iconHeight = isMobile ? 40 : 70; // Fixed height for mobile
  const iconMargin = isMobile ? 15 : 15; // More spacing for mobile (35px)

  const usedPositions: { x: number; y: number }[] = [];

  icons.forEach((icon: any) => {
    let randomX: any, randomY: any;
    let positionIsValid = false;
    let attempts = 0;
    const maxAttempts = 150; // Allow more attempts for better spacing

    // Get original width and height of the icon
    const originalWidth = icon.getBBox().width;
    const originalHeight = icon.getBBox().height;

    // For mobile, force the height to be 40px and scale the width proportionally
    let iconWidth = originalWidth;
    if (isMobile) {
      // Scale the width based on the 40px height while preserving aspect ratio
      iconWidth = (originalWidth * iconHeight) / originalHeight;
    }

    // Ensure that the height is exactly 40px on mobile
    icon.style.height = `${iconHeight}px`;

    // Try to find a valid position for the icon
    while (!positionIsValid && attempts < maxAttempts) {
      randomX =
        Math.random() * (containerWidth - iconWidth - iconMargin * 2) +
        iconMargin;
      randomY =
        Math.random() * (containerHeight - iconHeight - iconMargin * 2) +
        iconMargin;

      // Check if the position is valid (no overlap with other icons)
      positionIsValid = !usedPositions.some(
        (pos) =>
          Math.abs(pos.x - randomX) < iconWidth + iconMargin &&
          Math.abs(pos.y - randomY) < iconHeight + iconMargin
      );

      // Increment attempts to avoid infinite loops
      attempts++;
    }

    if (positionIsValid) {
      usedPositions.push({ x: randomX, y: randomY });

      // Apply position and size to the icon using requestAnimationFrame for smoother rendering
      requestAnimationFrame(() => {
        icon.style.position = "absolute";
        icon.style.left = `${randomX}px`;
        icon.style.top = `${randomY}px`;
        icon.style.width = `${iconWidth}px`; // Set proportional width
        icon.style.willChange = "transform";
      });
    }
  });
};

// Function to animate icons with GSAP
export const animateIcons = (icons: any) => {
  icons.forEach((icon: any) => {
    gsap.to(icon, {
      y: "random(-10, 10)",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      immediateRender: false,
    });
  });
};

// Function to handle hover effect with mobile optimization
export const addHoverEffect = (icons: any) => {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  if (isMobile) {
    return; // Skip hover effect on mobile devices for performance reasons
  }

  icons.forEach((icon: any) => {
    const hoverEffect = () => {
      gsap.to(icon, { scale: 1.5, duration: 0.3, ease: "power2.out" });
    };

    const resetScale = () => {
      gsap.to(icon, { scale: 1, duration: 0.3, ease: "power2.out" });
    };

    icon.addEventListener("mouseenter", hoverEffect);
    icon.addEventListener("mouseleave", resetScale);
  });
};
