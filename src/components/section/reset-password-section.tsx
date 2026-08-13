"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Lock } from "lucide-react"
import { motion } from "framer-motion"
import { resetPasswordUser } from "@/lib/auth"
import AuthShell from "./auth-shell"
import AuthField from "./auth-field"
import { getErrorMessage } from "@/lib/api/errors"

export default function ResetPasswordSection({
  token,
}: {
  token: string | null
}) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    if (!token) {
      setMessage("Token reset tidak valid atau sudah kedaluwarsa")
      return
    }

    if (formData.password.length < 6) {
      setMessage("Password minimal 6 karakter")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage("Konfirmasi password tidak cocok")
      return
    }

    setIsSubmitting(true)

    try {
      await resetPasswordUser({
        token,
        newPassword: formData.password,
      })
      setMessage("Password berhasil diubah. Mengalihkan ke halaman login...")
      setIsSuccess(true)

      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch (error) {
      setMessage(getErrorMessage(error, "Gagal mereset password"))
      setIsSubmitting(false)
    }
  }

  return (
    <AuthShell
      eyebrow="Buat password baru"
      title="Reset Password"
      subtitle="Masukkan password baru untuk akun Anda"
      quote="Amankan kembali akses akun Anda dengan password baru yang kuat."
      footerLink={
        <>
          Sudah ingat kata sandi?{" "}
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
          label="Password Baru"
          value={formData.password}
          onChange={(v) => handleChange("password", v)}
          placeholder="Minimal 6 karakter"
          type="password"
          icon={Lock}
          error={message && !formData.password ? "Password wajib diisi" : null}
        />

        <AuthField
          label="Konfirmasi Password"
          value={formData.confirmPassword}
          onChange={(v) => handleChange("confirmPassword", v)}
          placeholder="Ulangi password baru"
          type="password"
          icon={Lock}
          error={message && !formData.confirmPassword ? "Konfirmasi password wajib diisi" : null}
        />

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
          {isSubmitting ? "Memproses..." : "Simpan Password Baru"}
        </motion.button>
      </motion.form>
    </AuthShell>
  )
}