"use client"

import { useState } from "react"
import Link from "next/link"

import RoleSelector from "./register/role-selector"
import BuyerFields from "./register/buyer-fields"
import CompanyFields from "./register/company-fields"

export default function RegisterSection() {
  const [role, setRole] = useState<"buyer" | "supplier">("buyer")

  const [account, setAccount] = useState({
    email: "",
    password: "",
  })

  const [buyerData, setBuyerData] = useState({
    full_name: "",
    address: "",
    province: "",
    country: "",
    phone: "",
  })

  const [companyData, setCompanyData] = useState({
    company_name: "",
    npwp: "",
    address: "",
    province: "",
    country: "",
    phone: "",
    business_description: "",
  })

  const handleAccountChange = (field: string, value: string) => {
    setAccount((prev) => ({ ...prev, [field]: value }))
  }

  const handleBuyerChange = (field: string, value: string) => {
    setBuyerData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCompanyChange = (field: string, value: string) => {
    setCompanyData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const payload =
      role === "buyer"
        ? { role, ...account, ...buyerData }
        : { role, ...account, ...companyData }

    console.log(payload)
    // TODO: kirim payload ke API register
  }

  return (
    <section className="py-14">
      <div className="mx-auto max-w-xl px-4">

        <h1 className="mb-2 text-3xl font-bold">
          Daftar Akun
        </h1>

        <p className="mb-8 text-sm text-gray-500">
          Sudah punya akun?{" "}
          <Link href="/login" className="font-semibold text-green-600 underline">
            Masuk di sini
          </Link>
        </p>

        <RoleSelector role={role} onChange={setRole} />

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="space-y-4">

            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                value={account.email}
                onChange={(e) => handleAccountChange("email", e.target.value)}
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
                value={account.password}
                onChange={(e) =>
                  handleAccountChange("password", e.target.value)
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black"
                placeholder="Minimal 8 karakter"
              />
            </div>

          </div>

          <div className="border-t border-gray-200 pt-6">
            {role === "buyer" ? (
              <BuyerFields formData={buyerData} onChange={handleBuyerChange} />
            ) : (
              <CompanyFields
                formData={companyData}
                onChange={handleCompanyChange}
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-green-600 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            Daftar
          </button>

        </form>

      </div>
    </section>
  )
}