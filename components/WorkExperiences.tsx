"use client";

import React from "react";
import gsap from "gsap";
import data from "@/constants/data";
import WorkExperienceCard from "./WorkExperienceCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";

export default function WorkExperiences() {
  const { workExperience } = data;

  return (
    <div className="work-experiences relative h-full w-full">
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        loop={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 120,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        modules={[EffectCoverflow, Autoplay]}
        className="p-10 items-center"
      >
        {workExperience.map((item, index) => (
          <SwiperSlide key={index} className="flex justify-center">
            <WorkExperienceCard {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
