"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/section/footer"

// redesign landing-page
import HeroV2 from "@/components/section/v2/hero-section";
import ContentSection from "@/components/section/v2/contect-section";
import KomoditasSection from "@/components/section/v2/komoditas-section";
import HowWorkSection from "@/components/section/v2/how-work-section";

export default function Home() {
  return (
   <>
      <Navbar />
      <HeroV2 />
      <ContentSection />
      <KomoditasSection />
      <HowWorkSection />
      <Footer />
   </>
  );
}
