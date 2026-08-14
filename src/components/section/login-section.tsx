"use client"

import { Suspense, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Mail, Lock } from "lucide-react"
import { motion } from "framer-motion"
import { loginUser, saveAuthToken, clearAuthToken, getUserRoleFromToken, isUserVerifiedFromToken } from "@/lib/auth"
import AuthShell from "./auth-shell"
import AuthField from "./auth-field"
import { redirectByRole } from "@/lib/redirect"
import { useRedirectIfAuthenticated } from "@/hooks/use-redirect-if-authenticated"
import { getErrorMessage } from "@/lib/api/errors"

function SessionExpiredNotice() {
  const searchParams = useSearchParams()

  if (searchParams.get("session") !== "expired") return null

  return (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-700"
    >
      Sesi Anda telah berakhir. Silakan masuk kembali untuk melanjutkan.
    </motion.p>
  )
}

export default function LoginSection() {
  useRedirectIfAuthenticated()
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [unverifiedNotice, setUnverifiedNotice] = useState<string | null>(null)

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)
    setIsSuccess(false)
    setUnverifiedNotice(null)

    try {
      const response = await loginUser(formData)

      if (response.data?.verified === false || !isUserVerifiedFromToken(response.token ?? null)) {
        clearAuthToken()
        setUnverifiedNotice(
          response.data?.warning ??
            "Email belum diverifikasi. Silakan verifikasi melalui link yang dikirim ke email Anda."
        )
        return
      }

      setMessage("Login berhasil. Mengalihkan ke halaman utama...")
      setIsSuccess(true)

      if (response.token) {
        saveAuthToken(response.token)
        const role = getUserRoleFromToken(response.token)

        redirectByRole(role, router)
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error, "Login gagal")

      if (/diverifikasi/i.test(errorMessage)) {
        setUnverifiedNotice(errorMessage)
      } else {
        setMessage(errorMessage)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthShell
      eyebrow="Masuk ke akun Anda"
      title="Masuk"
      subtitle="Kelola bisnis komoditas Anda dengan efisien dan terpercaya"
      quote="Jembatan perdagangan komoditas Indonesia yang menghubungkan petani dengan pasar secara langsung."
      footerLink={
        <>
          Belum punya akun?{" "}
          <Link href="/register" className="font-semibold text-green-600 underline hover:text-green-700">
            Daftar di sini
          </Link>
        </>
      }
    >
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-5"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <AuthField
          label="Email"
          value={formData.email}
          onChange={(v) => handleChange("email", v)}
          placeholder="nama@email.com"
          type="email"
          icon={Mail}
          error={message && !formData.email ? "Email wajib diisi" : null}
        />

        <AuthField
          label="Password"
          value={formData.password}
          onChange={(v) => handleChange("password", v)}
          placeholder="Masukkan password"
          type="password"
          icon={Lock}
          error={message && !formData.password ? "Password wajib diisi" : null}
        />

        <div className="text-right">
          <Link
            href="/forgot-password"
            className="text-xs font-semibold text-green-600 hover:text-green-700 hover:underline"
          >
            Lupa password?
          </Link>
        </div>

        <Suspense fallback={null}>
          <SessionExpiredNotice />
        </Suspense>

        {unverifiedNotice ? (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800"
          >
            <p>{unverifiedNotice}</p>
            <p className="mt-1 text-xs text-amber-700">
              Sudah klik link verifikasi di email? Coba{" "}
              <Link href="/verify-email" className="font-semibold underline hover:text-amber-900">
                buka halaman verifikasi
              </Link>{" "}
              lalu login kembali.
            </p>
          </motion.div>
        ) : null}

        {message ? (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className={
              isSuccess
                ? "rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700"
                : "rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
            }
          >
            {message}
          </motion.p>
        ) : null}

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileTap={{ scale: 0.98 }}
          className="w-full h-11 rounded-full bg-green-600 font-semibold text-white transition shadow-md shadow-green-600/20 hover:-translate-y-px hover:shadow-lg hover:shadow-green-600/30 disabled:cursor-not-allowed disabled:bg-green-400 disabled:shadow-none disabled:transform-none"
        >
          {isSubmitting ? "Memproses..." : "Masuk"}
        </motion.button>
      </motion.form>
    </AuthShell>
  )
}