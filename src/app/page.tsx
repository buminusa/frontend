import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/section/footer"
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, OG_IMAGE, HOWTO_STEPS } from "@/lib/seo";

import HeroV2 from "@/components/section/v2/hero-section";
import ContentSection from "@/components/section/v2/contect-section";
import KomoditasSection from "@/components/section/v2/komoditas-section";
import HowWorkSection from "@/components/section/v2/how-work-section";

export const metadata: Metadata = {
  title: "BumiNusa.id — Jual Beli Rempah-rempah Terpercaya dari Petani Indonesia",
  description: SITE_DESCRIPTION,
  keywords: ["jual rempah", "beli rempah", "supplier rempah Indonesia", "ekspor rempah", "platform rempah"],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: `${SITE_NAME} — Platform Rempah-rempah Terpercaya Indonesia`,
    description: SITE_DESCRIPTION,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Platform Rempah-rempah Terpercaya Indonesia`,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: "/",
    languages: { "id-ID": "/", "x-default": "/" },
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Cara membeli rempah di BumiNusa.id",
  inLanguage: "id-ID",
  totalTime: "PT5M",
  step: HOWTO_STEPS.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.name,
    text: s.text,
    url: `${SITE_URL}/komoditas`,
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
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
