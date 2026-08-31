import type { Metadata } from "next";
import Navbar from "../../components/navbar"
import ForgotPasswordSection from "../../components/section/forgot-password-section"

export const metadata: Metadata = {
  title: "Lupa Password — BumiNusa.id",
  robots: { index: false, follow: false, noarchive: true },
};

export default function ForgotPasswordPage() {
  return (
    <>
      <Navbar />
      <ForgotPasswordSection />
    </>
  )
}