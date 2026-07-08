"use client"

import { useState } from "react"
import Link from "next/link"
import { loginUser } from "@/lib/auth"

export default function LoginSection() {
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
        localStorage.setItem("auth_token", response.token)
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Login failed")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-14">
      <div className="mx-auto max-w-md px-4">

        <h1 className="mb-2 text-3xl font-bold">
          Masuk
        </h1>

        <p className="mb-8 text-sm text-gray-500">
          Belum punya akun?{" "}
          <Link href="/register" className="font-semibold text-green-600 underline">
            Daftar di sini
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black"
              placeholder="nama@email.com"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black"
              placeholder="Masukkan password"
            />
          </div>


          {message ? (
            <p className="text-sm text-gray-600">{message}</p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-green-600 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-400"
          >
            {isSubmitting ? "Memproses..." : "Masuk"}
          </button>

        </form>

      </div>
    </section>
  )
}