import type { Metadata } from "next";
import KeranjangSection from "@/components/section/keranjang-section";

export const metadata: Metadata = {
  title: "Keranjang — BumiNusa.id",
  robots: { index: false, follow: false, noarchive: true },
};

export default function KeranjangPage() {
  return <KeranjangSection />;
}