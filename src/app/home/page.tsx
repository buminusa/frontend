import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import CommoditySection from "@/components/section/populer-commodity-section";
import Footer from "@/components/section/footer";
import HeroHomeV2 from "@/components/section/v2/hero-home-section";

export const metadata: Metadata = {
  title: "Beranda — BumiNusa.id",
  robots: { index: false, follow: false, noarchive: true },
};

export default function Home() {
  return (
    <>
    <Navbar />
    <HeroHomeV2 />
    <CommoditySection />
    <Footer />
    </>
  )
}