import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Button from "./Button";
import { Swiper, SwiperSlide } from "swiper/react";
import { ScrollTrigger } from "gsap/all";

// Default Swiper styles
import "swiper/css";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import Link from "next/link";

import data from "@/constants/data";

export default function CTA() {
  const [isLoaded, setIsLoaded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const projects = data.projects;

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
    <div className="cta-section relative flex lg:flex-row flex-col items-center justify-between lg:h-screen h-auto max-w-[97rem] py-[5rem] lg:py-0 gap-[3rem] mx-auto transition-all">
      {/* First column (fixed vertically) */}
      <div ref={contentRef} className="max-w-[48rem] transition-all">
        <p ref={subheadingRef} className="subheading mb-[2rem]">
          Work With Me
        </p>
        <h2 ref={headingRef} className="mb-[1.3rem] font-bold">
          Let's Collaborate to Create Outstanding Digital Experiences
        </h2>
        <p ref={descriptionRef} className="text-[1.125rem]">
          With expertise in custom Shopify sections, full-stack web development,
          and user-centric design, I specialize in creating high-converting
          websites that help businesses build a strong digital presence.
          Leveraging years of experience, I craft seamless, scalable solutions
          tailored to your business needs.
        </p>
        <div
          ref={buttonContainerRef}
          className="flex items-center gap-[1rem] mt-[3.125rem]"
        >
          <Button
            text="Let's get started"
            href="https://calendly.com/ericjohnariate/work-with-me"
            variant="primary"
          />
        </div>
      </div>

      {/* Second column (swiper with horizontal sliding) */}
      <div
        ref={sliderRef}
        className={`cta-project-slider w-full max-w-[40rem] h-full max-h-[50vh] transition-all `}
      >
        <Swiper
          effect="coverflow"
          centeredSlides={true}
          slidesPerView={"auto"}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 100,
            depth: 150,
            modifier: 1,
          }}
          modules={[EffectCoverflow, Autoplay]}
          className={`cta-slider flex-1 relative h-full transition-all duration-500 ease-in-out active `}
        >
          {projects.map((project, index) => (
            <SwiperSlide
              key={index}
              className={` project-card-slide aspect-[1/1.21] h-full overflow-hidden flex rounded-[10px] relative
              `}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-top"
              />
              <Link
                href={project.link || ""}
                target="_blank"
                className={`absolute top-0 w-full h-full flex items-center justify-center transition-opacity duration-500 opacity-0 hover:opacity-100 bg-black/80 `}
              >
                <p className="text-[2rem] font-black">{project.title}</p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
