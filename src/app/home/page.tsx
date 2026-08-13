import Navbar from "@/components/navbar";
import CommoditySection from "@/components/section/populer-commodity-section";
import Footer from "@/components/section/footer";
import HeroHomeV2 from "@/components/section/v2/hero-home-section";

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