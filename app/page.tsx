"use client";

import HeroSection from "@/components/HeroSection";
import data from "@/constants/data";
import { Suspense } from "react";
import WhoAmI from "@/components/WhoAmI";
import WorkExperience from "@/components/WorkExperience";
import CTA from "@/components/CTA";
import Header from "@/components/Header";
import Preloader from "@/components/Preloader";
import Loading from "./loading";
import Footer from "@/components/Footer";

export default function Home() {
  const { heroSection } = data;

  return (
    <>
      <Preloader />

      <Suspense fallback={<Loading />}>
        <Header />
        <main className="z-10 relative snap-y snap-mandatory text-white">
          <HeroSection {...heroSection} />
          <WhoAmI />
          <WorkExperience />
          <CTA />
          <Footer />
        </main>
      </Suspense>
    </>
  );
}
