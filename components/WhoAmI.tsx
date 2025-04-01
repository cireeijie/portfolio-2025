import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Button from "./Button";
import { Swiper, SwiperSlide } from "swiper/react";

// Default Swiper styles
import "swiper/css";
import { Autoplay } from "swiper/modules";
import WebFrameworksIcons from "./WebFrameworksIcons";
import AnimatedRectangles from "./AnimatedRectangles";
import AnimatedStoreSvg from "./AnimatedStoreSvg";

export default function WhoAmI() {
  const [isLoaded, setIsLoaded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const animatedTextRef = useRef<HTMLSpanElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<any>(null); // Reference to Swiper

  // Animated text options based on the active slide
  const textArray = [
    "fast, user-friendly sites 🌐",
    "fluid animations 🎨",
    "custom E-Commerce 🛒",
  ];

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
  }, []);

  useEffect(() => {
    const swiper = swiperRef.current.swiper;
    // Change the animated text based on the active slide
    const updateAnimatedText = () => {
      const activeIndex = swiper.activeIndex;
      gsap.to(animatedTextRef.current, {
        duration: 1.5,
        text: textArray[activeIndex], // Change text based on the active slide
        ease: "power2.out",
      });
    };

    // Update text when the slide changes
    swiper.on("slideChange", updateAnimatedText);

    // Set the initial text when the component mounts
    updateAnimatedText();

    return () => {
      swiper.off("slideChange", updateAnimatedText); // Clean up event listener
    };
  }, [swiperRef]);

  return (
    <div className="relative flex items-center justify-between h-screen max-w-[97rem] mx-auto transition-all">
      {/* First column (fixed vertically) */}
      <div ref={contentRef} className="max-w-[48rem] transition-all">
        <p ref={subheadingRef} className="subheading mb-[2rem]">
          Who Am I?
        </p>
        <h2 ref={headingRef} className="mb-[1.3rem] font-bold">
          A developer + designer obsessed with creating
          <br />
          <span ref={animatedTextRef} className="text-primary"></span>
        </h2>
        <p ref={descriptionRef} className="text-[1.125rem]">
          Designed for optimal performance, my websites load quickly and run
          smoothly, providing users with a seamless and enjoyable browsing
          experience across all devices. Every line of code is optimized to
          ensure speed, responsiveness, and reliability.
        </p>
        <div
          ref={buttonContainerRef}
          className="flex items-center gap-[1rem] mt-[3.125rem]"
        >
          <Button text="Let's Build Something Cool" href="" variant="primary" />
        </div>
      </div>

      {/* Second column (swiper with horizontal sliding) */}
      <div
        ref={sliderRef}
        className={`w-full max-w-[40rem] h-full max-h-[50vh] transition-all `}
      >
        <Swiper
          ref={swiperRef}
          spaceBetween={10}
          slidesPerView={1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="h-full"
        >
          <SwiperSlide>
            <WebFrameworksIcons />
          </SwiperSlide>
          <SwiperSlide>
            <AnimatedRectangles />
          </SwiperSlide>
          <SwiperSlide>
            <AnimatedStoreSvg />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
