import type { Metadata } from "next";
import Navbar from "../../components/navbar"
import RegisterSection from "../../components/section/register-section"

export const metadata: Metadata = {
  title: "Daftar — BumiNusa.id",
  robots: { index: false, follow: false, noarchive: true },
};

export default function RegisterPage() {
  return (
    <>
      <Navbar />
      <RegisterSection />
    </>
  )
}