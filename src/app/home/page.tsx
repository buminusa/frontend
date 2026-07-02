import Navbar from "@/components/navbar";
import CommodityPriceSection from "@/components/section/commodity-price-section";
import CommoditySection from "@/components/section/populer-commodity-section";
import Footer from "@/components/section/footer";
import HeroHome from "@/components/section/hero-home-section";

export default function Home() {
  return (
    <>
    <Navbar />
    <HeroHome />
    <CommoditySection />
    <CommodityPriceSection />
    <Footer />
    </>
  )
}