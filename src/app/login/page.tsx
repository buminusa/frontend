import type { Metadata } from "next";
import Navbar from "../../components/navbar"
import LoginSection from "../../components/section/login-section"

export const metadata: Metadata = {
  title: "Login — BumiNusa.id",
  robots: { index: false, follow: false, noarchive: true },
};

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <LoginSection />
    </>
  )
}