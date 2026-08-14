import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/section/footer"
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/seo";

// redesign landing-page
import HeroV2 from "@/components/section/v2/hero-section";
import ContentSection from "@/components/section/v2/contect-section";
import KomoditasSection from "@/components/section/v2/komoditas-section";
import HowWorkSection from "@/components/section/v2/how-work-section";

export const metadata: Metadata = {
  title: "Jual Beli Rempah-rempah Online Terpercaya",
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: `${SITE_NAME} — Platform Rempah-rempah Indonesia`,
    description: SITE_DESCRIPTION,
  },
  alternates: {
    canonical: "/",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  description: SITE_DESCRIPTION,
};

export default function Home() {
  return (
   <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Navbar />
      <HeroV2 />
      <ContentSection />
      <KomoditasSection />
      <HowWorkSection />
      <Footer />
   </>
  );
}
