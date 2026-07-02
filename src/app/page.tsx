"use client";

import Navbar from "@/components/navbar";
import Hero from "@/components/section/hero-section"
import ContectSection from "@/components/section/contect-section"
import Footer from "@/components/section/footer"

export default function Home() {
  return (
   <>
      <Navbar />
      <Hero />
      <ContectSection />
      <Footer />
   </>
  );
}
