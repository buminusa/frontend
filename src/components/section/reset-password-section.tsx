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
import { useLanguage } from "@/lib/langue/provider"

export default function ResetPasswordSection({
  token,
}: {
  token: string | null
}) {
  const router = useRouter()
  const { t } = useLanguage()
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
      setMessage(t("auth.reset.invalidToken"))
      return
    }

    if (formData.password.length < 6) {
      setMessage(t("auth.reset.passwordMinLength"))
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage(t("auth.reset.passwordMismatch"))
      return
    }

    setIsSubmitting(true)

    try {
      await resetPasswordUser({
        token,
        newPassword: formData.password,
      })
      setMessage(t("auth.reset.success"))
      setIsSuccess(true)

      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch (error) {
      setMessage(getErrorMessage(error, t("auth.reset.failed")))
      setIsSubmitting(false)
    }
  }

  return (
    <AuthShell
      eyebrow={t("auth.reset.eyebrow")}
      title={t("auth.reset.title")}
      subtitle={t("auth.reset.subtitle")}
      quote={t("auth.reset.quote")}
      footerLink={
        <>
          {t("auth.reset.rememberPassword")}{" "}
          <Link href="/login" className="font-semibold text-green-600 underline hover:text-green-700">
            {t("auth.reset.signInHere")}
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
          label={t("auth.field.newPassword")}
          value={formData.password}
          onChange={(v) => handleChange("password", v)}
          placeholder={t("auth.reset.newPasswordPlaceholder")}
          type="password"
          icon={Lock}
          error={message && !formData.password ? t("auth.field.passwordRequired") : null}
        />

        <AuthField
          label={t("auth.field.confirmPassword")}
          value={formData.confirmPassword}
          onChange={(v) => handleChange("confirmPassword", v)}
          placeholder={t("auth.reset.confirmPasswordPlaceholder")}
          type="password"
          icon={Lock}
          error={message && !formData.confirmPassword ? t("auth.field.confirmPasswordRequired") : null}
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
          {isSubmitting ? t("auth.reset.processing") : t("auth.reset.submit")}
        </motion.button>
      </motion.form>
    </AuthShell>
  )
}