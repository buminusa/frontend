"use client"

import { useState } from "react"
import Link from "next/link"
import { Mail } from "lucide-react"
import { motion } from "framer-motion"
import { forgotPasswordUser } from "@/lib/auth"
import AuthShell from "./auth-shell"
import AuthField from "./auth-field"
import { useRedirectIfAuthenticated } from "@/hooks/use-redirect-if-authenticated"
import { getErrorMessage } from "@/lib/api/errors"

export default function ForgotPasswordSection() {
  useRedirectIfAuthenticated()
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      await forgotPasswordUser({ email })
      setMessage("Link reset password telah dikirim ke email Anda.")
      setIsSent(true)
    } catch (error) {
      setMessage(getErrorMessage(error, "Gagal mengirim link reset password"))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthShell
      eyebrow="Pemulihan akun"
      title="Lupa Password"
      subtitle="Masukkan email terdaftar Anda dan kami akan mengirim link untuk mereset password"
      quote="Keamanan akun Anda adalah prioritas kami. Reset password dengan aman dan mudah."
      footerLink={
        <>
          Ingat kata sandi?{" "}
          <Link href="/login" className="font-semibold text-green-600 underline hover:text-green-700">
            Masuk di sini
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
          value={email}
          onChange={setEmail}
          placeholder="nama@email.com"
          type="email"
          icon={Mail}
          error={message && !email ? "Email wajib diisi" : null}
        />

        {message ? (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className={
              isSent
                ? "rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700"
                : "rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
            }
          >
            {message}
          </motion.p>
        ) : null}

        {isSent ? (
          <Link
            href="/login"
            className="block w-full h-11 rounded-full bg-green-600 font-semibold text-white text-center leading-[2.75rem] transition shadow-md shadow-green-600/20 hover:-translate-y-px hover:shadow-lg hover:shadow-green-600/30"
          >
            Kembali ke Login
          </Link>
        ) : (
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileTap={{ scale: 0.98 }}
            className="w-full h-11 rounded-full bg-green-600 font-semibold text-white transition shadow-md shadow-green-600/20 hover:-translate-y-px hover:shadow-lg hover:shadow-green-600/30 disabled:cursor-not-allowed disabled:bg-green-400 disabled:shadow-none disabled:transform-none"
          >
            {isSubmitting ? "Memproses..." : "Kirim Link Reset"}
          </motion.button>
        )}
      </motion.form>
    </AuthShell>
  )
}
