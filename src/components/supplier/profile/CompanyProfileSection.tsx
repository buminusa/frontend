"use client"

import { useEffect, useState } from "react"

import { CompanyHeader } from "@/components/supplier/profile/CompanyHeader"
import { CompanyInfo } from "@/components/supplier/profile/CompanyInfo"
import { CompanyForm } from "@/components/supplier/profile/CompanyForm"
import { BusinessDescription } from "@/components/supplier/profile/BusinessDescription"
import { VerificationStatus } from "@/components/supplier/profile/VerificationStatus"

import {
  AUTH_EVENT_NAME,
  getAuthToken,
  getUserFromToken,
} from "@/lib/auth"
import { companyProfileService } from "@/lib/api/services/company-profiles"
import { useLanguage } from "@/lib/langue/provider"

type ApiCompanyProfile = {
  id: number
  company_name: string
  slug: string
  npwp: string
  address: string
  province: string
  country: string
  phone: string
  logo_url: string | null
  business_description: string
  verificationStatus: "Pending" | "Verified" | "Rejected"

  user: {
    id: number
    email: string

    role?: {
      id: number
      name_role: string
    } | null
  } | null

  products: {
    id: number
    nama: string
    slug: string
    status: string
    createdAt: string
  }[]
}

type CompanyProfile = {
  id: number
  company_name: string
  slug: string
  npwp: string
  address: string
  province: string
  country: string
  phone: string
  logo_url?: string
  business_description: string

  email: string

  products: {
    id: number
    nama: string
    slug: string
    status: string
    createdAt: string
  }[]

  verificationStatus?: "Pending" | "Verified" | "Rejected"
}

export function CompanyProfileSection() {
  const { t } = useLanguage()

  const [company, setCompany] = useState<CompanyProfile | null>(null)

  const [isEditing, setIsEditing] = useState(false)

  const [isLoading, setIsLoading] = useState(true)

  const [error, setError] = useState("")

  useEffect(() => {
    const controller = new AbortController()

    async function loadCompanyProfile() {
      const token = getAuthToken()
      const user = getUserFromToken()

      if (!token || !user) {
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setError("")

      try {
        const response = await companyProfileService.getDetailByUserId(
          user.userId
        )

        const data: ApiCompanyProfile =
          response.data as unknown as ApiCompanyProfile

        setCompany({
          id: data.id,
          company_name: data.company_name,
          slug: data.slug,
          npwp: data.npwp,
          address: data.address,
          province: data.province,
          country: data.country,
          phone: data.phone,
          logo_url: data.logo_url ?? "",
          business_description: data.business_description,

          email: data.user?.email ?? "",

          products: data.products,

          verificationStatus: data.verificationStatus,
        })
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setError(
            error instanceof Error
              ? error.message
              : t("supplier.profile.loadFailed")
          )
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadCompanyProfile()

    window.addEventListener(
      AUTH_EVENT_NAME,
      loadCompanyProfile
    )

    return () => {
      controller.abort()

      window.removeEventListener(
        AUTH_EVENT_NAME,
        loadCompanyProfile
      )
    }
  }, [])

  const [saveError, setSaveError] = useState("")

  const [isSaving, setIsSaving] = useState(false)

  const handleUpdateCompany = async (
    data: Partial<CompanyProfile>
  ) => {
    const user = getUserFromToken()
    if (!user) return

    setIsSaving(true)
    setSaveError("")

    try {
      await companyProfileService.update(user.userId, {
        company_name: data.company_name,
        address: data.address,
        province: data.province,
        country: data.country,
        phone: data.phone,
        business_description: data.business_description,
      })

      setCompany((prev) =>
        prev ? { ...prev, ...data } : prev
      )
      setIsEditing(false)
    } catch (error) {
      setSaveError(
        error instanceof Error
          ? error.message
          : t("supplier.profile.saveFailed")
      )
    } finally {
      setIsSaving(false)
    }
  }

  const handleUpdateLogo = async (file: File) => {
    const user = getUserFromToken()
    if (!user) return

    setSaveError("")

    try {
      const response = await companyProfileService.updateLogo(
        user.userId,
        file
      )

      setCompany((prev) =>
        prev
          ? { ...prev, logo_url: response.data.logo_url ?? "" }
          : prev
      )
    } catch (error) {
      setSaveError(
        error instanceof Error
          ? error.message
          : t("supplier.profile.logoUploadFailed")
      )
    }
  }

  if (isLoading) {
    return (
      <p className="text-sm text-gray-500">
        {t("supplier.profile.loading")}
      </p>
    )
  }

  if (error) {
    return (
      <p className="text-sm text-red-600">
        {error}
      </p>
    )
  }

  if (!company) {
    return (
      <p className="text-sm text-gray-500">
        {t("supplier.profile.notFound")}
      </p>
    )
  }

  return (
    <div className="space-y-6">
      <CompanyHeader
        companyName={company.company_name}
        isEditing={isEditing}
        onToggleEdit={() =>
          setIsEditing(!isEditing)
        }
        verificationStatus={
          company.verificationStatus
        }
      />

      <VerificationStatus
        status={company.verificationStatus}
      />

      {isEditing ? (
        <CompanyForm
          company={company}
          onSubmit={handleUpdateCompany}
          onCancel={() =>
            setIsEditing(false)
          }
          onLogoUpload={handleUpdateLogo}
          isSaving={isSaving}
          saveError={saveError}
        />
      ) : (
        <>
          <CompanyInfo company={company} />

          <BusinessDescription
            description={
              company.business_description
            }
          />
        </>
      )}
    </div>
  )
}