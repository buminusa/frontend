import Navbar from "../../components/navbar"
import VerifyEmailSection from "../../components/section/verify-email-section"

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
