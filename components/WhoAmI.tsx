import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Button from "./Button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import WebFrameworksIcons from "./WebFrameworksIcons";
import AnimatedRectangles from "./AnimatedRectangles";
import AnimatedStoreSvg from "./AnimatedStoreSvg";
import { ScrollTrigger } from "gsap/all"; // Ensure ScrollTrigger is registered

gsap.registerPlugin(ScrollTrigger); // Register ScrollTrigger globally

export default function WhoAmI() {
  const [isLoaded, setIsLoaded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const animatedTextRef = useRef<HTMLSpanElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<any>(null);

  const textArray = [
    "fast, user-friendly sites 🌐",
    "fluid animations 🎨",
    "custom E-Commerce 🛒",
  ];

  // Trigger animation on scroll for the entire section
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

  // Swiper text animation based on active slide change
  useEffect(() => {
    const swiper = swiperRef.current?.swiper;

    const updateAnimatedText = () => {
      const activeIndex = swiper.activeIndex;
      gsap.to(animatedTextRef.current, {
        duration: 1.5,
        text: textArray[activeIndex],
        ease: "power2.out",
      });
    };

    swiper?.on("slideChange", updateAnimatedText);
    updateAnimatedText();

    return () => {
      swiper?.off("slideChange", updateAnimatedText);
    };
  }, [swiperRef, textArray]);

  return (
    <div
      ref={contentRef}
      className="about-me-section relative flex sm:flex-row flex-col items-center justify-between sm:h-screen h-auto py-[5rem] gap-[3rem] sm:py-0 max-w-[97rem] mx-auto transition-all"
    >
      {/* First column (fixed vertically) */}
      <div className="max-w-[48rem] transition-all">
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
          <Button
            text="Let's Build Something Cool"
            href="https://calendly.com/ericjohnariate/work-with-me"
            variant="primary"
          />
        </div>
      </div>

      {/* Second column (swiper with horizontal sliding) */}
      <div
        className={`w-full max-w-[40rem] h-full sm:max-h-[50vh] max-h-auto transition-all`}
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
