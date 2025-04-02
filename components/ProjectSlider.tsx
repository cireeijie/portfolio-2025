"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import data from "../constants/data";
import Link from "next/link";

import "swiper/css";
import { EffectCoverflow } from "swiper/modules";

export default function ProjectSlider({
  isActive,
  hideProjects,
}: {
  isActive: boolean;
  hideProjects: () => void;
}) {
  const [swiperActive, setSwiperActive] = useState(isActive);
  const { projects } = data;

  return (
    <div
      className={`relative w-full flex gap-10 sm:flex-row flex-col ${
        swiperActive ? "h-full" : "aspect-[1/1.02] h-[580px]"
      }`}
    >
      <button
        className={`cursor-pointer self-start ${!swiperActive && "hidden"}`}
        onClick={() => {
          setSwiperActive(false);
          hideProjects();
        }}
      >
        <svg
          width="111"
          height="38"
          viewBox="0 0 111 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="4"
            y1="20"
            x2="111"
            y2="20"
            stroke="white"
            strokeWidth="4"
          />
          <line
            x1="1.93934"
            y1="20.9393"
            x2="20.9393"
            y2="1.93934"
            stroke="white"
            strokeWidth="3"
          />
          <line
            x1="2.06066"
            y1="18.9393"
            x2="20.0607"
            y2="36.9393"
            stroke="white"
            strokeWidth="3"
          />
        </svg>
      </button>
      <Swiper
        effect="coverflow"
        centeredSlides={true}
        slidesPerView={"auto"}
        spaceBetween={30}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: swiperActive ? 100 : 0,
          depth: 150,
          modifier: swiperActive ? 1 : 0,
        }}
        breakpoints={{
          768: {
            centeredSlides: swiperActive,
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        modules={[EffectCoverflow]}
        className={`flex-1 relative h-full transition-all duration-500 ease-in-out w-full sm:w-auto ${
          swiperActive ? "active" : "in-active"
        }`}
      >
        {projects.map((project, index) => (
          <SwiperSlide
            key={index}
            className={`${
              swiperActive && "project-card-slide"
            } aspect-[1/1.21] h-full overflow-hidden flex rounded-[10px]  ${
              swiperActive
                ? "relative"
                : `!absolute ${
                    index === 0
                      ? "!w-[332px] bottom-0 right-[218px] z-40 !h-auto"
                      : "!w-[293px]"
                  } ${index === 1 && "!z-20 right-0 bottom-[78px] !h-auto"} ${
                    index === 2 && "top-0 right-[100px] !h-auto"
                  } ${index > 2 && "!hidden"}`
            }`}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top"
            />
            <Link
              href={project.link || ""}
              target="_blank"
              className={`absolute top-0 w-full h-full flex items-center justify-center transition-opacity duration-500 opacity-0 hover:opacity-100 bg-black/80 ${
                !swiperActive && "opacity-0 pointer-events-none"
              }`}
            >
              <p className="text-[2rem] font-black">{project.title}</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
