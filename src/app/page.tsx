import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/section/footer"
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, OG_IMAGE } from "@/lib/seo";

// redesign landing-page
import HeroV2 from "@/components/section/v2/hero-section";
import ContentSection from "@/components/section/v2/contect-section";
import KomoditasSection from "@/components/section/v2/komoditas-section";
import HowWorkSection from "@/components/section/v2/how-work-section";

export const metadata: Metadata = {
  title: "BumiNusa.id — Jual Beli Rempah-rempah Terpercaya dari Petani Indonesia",
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: `${SITE_NAME} — Platform Rempah-rempah Terpercaya Indonesia`,
    description: SITE_DESCRIPTION,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  alternates: {
    canonical: "/",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Beranda",
      item: SITE_URL,
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
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