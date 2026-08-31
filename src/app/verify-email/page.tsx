import type { Metadata } from "next";
import Navbar from "../../components/navbar"
import VerifyEmailSection from "../../components/section/verify-email-section"

export const metadata: Metadata = {
  title: "Verifikasi Email — BumiNusa.id",
  robots: { index: false, follow: false, noarchive: true },
};

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>
}) {
  const { token } = await searchParams

  return (
    <>
      <Navbar />
      <VerifyEmailSection token={token ?? null} />
    </>
  )
}
