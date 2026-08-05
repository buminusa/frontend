"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Mail, Lock } from "lucide-react"
import { motion } from "framer-motion"
import { loginUser, saveAuthToken, getUserRoleFromToken } from "@/lib/auth"
import AuthShell from "./auth-shell"
import AuthField from "./auth-field"
import { redirectByRole } from "@/lib/redirect"
import { useRedirectIfAuthenticated } from "@/hooks/use-redirect-if-authenticated"

export default function LoginSection() {
  useRedirectIfAuthenticated()
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      const response = await loginUser(formData)
      setMessage(response.message)

      if (response.token) {
        saveAuthToken(response.token)
        const role = getUserRoleFromToken(response.token)

        redirectByRole(role, router)
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Login gagal")
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

        {message ? (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2"
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