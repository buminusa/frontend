import Navbar from "../../components/navbar"
import ResetPasswordSection from "../../components/section/reset-password-section"

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
