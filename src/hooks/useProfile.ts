// hooks/useProfile.ts
import { useState, useEffect, useCallback } from "react";
import { getErrorMessage } from "@/lib/api/errors";

interface Profile {
  id: number;
  full_name: string;
  address: string;
  province: string;
  country: string;
  phone: string;
  orders: unknown[];
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      const response = await fetch("/api/profile");
      if (!response.ok) throw new Error("Gagal memuat profil");
      const data = await response.json();
      setProfile(data);
    } catch (err) {
      setError(getErrorMessage(err, "Gagal memuat profil"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await fetchProfile();
    };
    void init();
  }, [fetchProfile]);

  const updateProfile = async (data: Partial<Profile>) => {
    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Gagal memperbarui profil");
      const updated = await response.json();
      setProfile(updated);
    } catch (err) {
      throw err;
    }
  };

  return { profile, loading, error, updateProfile };
}