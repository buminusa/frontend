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
import { useLanguage } from "@/lib/langue/provider"

function SessionExpiredNotice() {
  const searchParams = useSearchParams()
  const { t } = useLanguage()

  if (searchParams.get("session") !== "expired") return null

  return (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-700"
    >
      {t("auth.login.sessionExpired")}
    </motion.p>
  )
}

export default function LoginSection() {
  useRedirectIfAuthenticated()
  const router = useRouter()
  const { t } = useLanguage()
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
          response.data?.warning ?? t("auth.login.unverifiedEmail")
        )
        return
      }

      setMessage(t("auth.login.success"))
      setIsSuccess(true)

      if (response.token) {
        saveAuthToken(response.token)
        const role = getUserRoleFromToken(response.token)

        redirectByRole(role, router)
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error, t("auth.login.failed"))

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
      eyebrow={t("auth.login.eyebrow")}
      title={t("auth.login.title")}
      subtitle={t("auth.login.subtitle")}
      quote={t("auth.login.quote")}
      footerLink={
        <>
          {t("auth.login.noAccount")}{" "}
          <Link href="/register" className="font-semibold text-green-600 underline hover:text-green-700">
            {t("auth.login.signUpHere")}
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
          label={t("auth.field.email")}
          value={formData.email}
          onChange={(v) => handleChange("email", v)}
          placeholder="nama@email.com"
          type="email"
          icon={Mail}
          error={message && !formData.email ? t("auth.field.emailRequired") : null}
        />

        <AuthField
          label={t("auth.field.password")}
          value={formData.password}
          onChange={(v) => handleChange("password", v)}
          placeholder={t("auth.login.passwordPlaceholder")}
          type="password"
          icon={Lock}
          error={message && !formData.password ? t("auth.field.passwordRequired") : null}
        />

        <div className="text-right">
          <Link
            href="/forgot-password"
            className="text-xs font-semibold text-green-600 hover:text-green-700 hover:underline"
          >
            {t("auth.login.forgotPassword")}
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
              {t("auth.login.verifyPrompt")}{" "}
              <Link href="/verify-email" className="font-semibold underline hover:text-amber-900">
                {t("auth.login.verifyLink")}
              </Link>{" "}
              {t("auth.login.verifyAfter")}
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
          {isSubmitting ? t("auth.login.processing") : t("auth.login.submit")}
        </motion.button>
      </motion.form>
    </AuthShell>
  )
}