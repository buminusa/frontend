import type { Metadata } from "next";
import Navbar from "../../components/navbar"
import ResetPasswordSection from "../../components/section/reset-password-section"

export const metadata: Metadata = {
  title: "Reset Password — BumiNusa.id",
  robots: { index: false, follow: false, noarchive: true },
};

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>
}) {
  const { token } = await searchParams

  return (
    <>
      <Navbar />
      <ResetPasswordSection token={token ?? null} />
    </>
  )
}
