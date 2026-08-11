import Navbar from "@/components/navbar";
import CommodityPriceSection from "@/components/section/commodity-price-section";
import CommoditySection from "@/components/section/populer-commodity-section";
import Footer from "@/components/section/footer";
import HeroHome from "@/components/section/hero-home-section";
import HeroHomeV2 from "@/components/section/v2/hero-home-section";

export default function Home() {
  return (
    <>
    <Navbar />
    <HeroHomeV2 />
    <CommoditySection />
    {/* <CommodityPriceSection /> */}
    <Footer />
    </>
  )
}