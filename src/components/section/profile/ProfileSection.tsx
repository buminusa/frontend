"use client"

import { useEffect, useState } from "react"
import { ProfileHeader } from "./ProfileHeader"
import { ProfileInfo } from "./ProfileInfo"
import { ProfileForm } from "./ProfileForm"
import { OrderHistoryContainer } from "./OrderHistoryContainer"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { AUTH_EVENT_NAME, getAuthToken, getUserFromToken } from "@/lib/auth"
import { useLanguage } from "@/lib/langue/provider"

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080"
).replace(/\/$/, "")

type ApiBuyerProfile = {
  id: number
  full_name: string
  address: string
  province: string
  country: string
  phone: string

  user: {
    id: number
    email: string
    role: {
      id: number
      name_role: string
    }
  }
}

type BuyerProfile = {
  id: number
  full_name: string
  address: string
  province: string
  country: string
  phone: string
  email: string
}

export function ProfileSection() {
  const router = useRouter()
  const { t } = useLanguage()

  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState<BuyerProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const controller = new AbortController()

    async function loadProfile() {
      const token = getAuthToken()
      const user = getUserFromToken()

      if (!token || !user?.userId) {
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setError("")

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/v1/buyers/${user.userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            signal: controller.signal,
          }
        )

        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.message || t("profile.loadError"))
        }

        const data: ApiBuyerProfile = result.data

        setProfile({
          id: data.id,
          full_name: data.full_name,
          address: data.address,
          province: data.province,
          country: data.country,
          phone: data.phone,
          email: data.user.email,
        })
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setError(
            error instanceof Error
              ? error.message
              : t("profile.loadError")
          )
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadProfile()

    window.addEventListener(AUTH_EVENT_NAME, loadProfile)

    return () => {
      controller.abort()
      window.removeEventListener(AUTH_EVENT_NAME, loadProfile)
    }
  }, [])

  const handleUpdateProfile = (data: Partial<BuyerProfile>) => {
    setProfile((prev) => (prev ? { ...prev, ...data } : prev))
    setIsEditing(false)
  }

  if (isLoading) {
    return (
      <div className="py-10">
        <p className="text-sm text-gray-500">
          {t("profile.loading")}
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-10">
        <p className="text-sm text-red-600">
          {error}
        </p>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="py-10">
        <p className="text-sm text-gray-500">
          {t("profile.notFound")}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("common.back")}
      </button>

      <ProfileHeader
        fullName={profile.full_name}
        isEditing={isEditing}
        onToggleEdit={() => setIsEditing(!isEditing)}
      />

      {isEditing ? (
        <ProfileForm
          profile={profile}
          onSubmit={handleUpdateProfile}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <ProfileInfo profile={profile} />
          <OrderHistoryContainer />
        </>
      )}
    </div>
  )
}