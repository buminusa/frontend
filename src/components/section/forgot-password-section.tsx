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
import { useLanguage } from "@/lib/langue/provider"

export default function ForgotPasswordSection() {
  useRedirectIfAuthenticated()
  const { t } = useLanguage()
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
      setMessage(t("auth.forgot.sent"))
      setIsSent(true)
    } catch (error) {
      setMessage(getErrorMessage(error, t("auth.forgot.failed")))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthShell
      eyebrow={t("auth.forgot.eyebrow")}
      title={t("auth.forgot.title")}
      subtitle={t("auth.forgot.subtitle")}
      quote={t("auth.forgot.quote")}
      footerLink={
        <>
          {t("auth.forgot.rememberPassword")}{" "}
          <Link href="/login" className="font-semibold text-green-600 underline hover:text-green-700">
            {t("auth.forgot.signInHere")}
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
          value={email}
          onChange={setEmail}
          placeholder="nama@email.com"
          type="email"
          icon={Mail}
          error={message && !email ? t("auth.field.emailRequired") : null}
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
            {t("auth.forgot.backToLogin")}
          </Link>
        ) : (
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileTap={{ scale: 0.98 }}
            className="w-full h-11 rounded-full bg-green-600 font-semibold text-white transition shadow-md shadow-green-600/20 hover:-translate-y-px hover:shadow-lg hover:shadow-green-600/30 disabled:cursor-not-allowed disabled:bg-green-400 disabled:shadow-none disabled:transform-none"
          >
            {isSubmitting ? t("auth.forgot.processing") : t("auth.forgot.submit")}
          </motion.button>
        )}
      </motion.form>
    </AuthShell>
  )
}
