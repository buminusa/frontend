import type { Metadata } from "next";
import { ProfileSection } from "@/components/section/profile/ProfileSection";

export const metadata: Metadata = {
  title: "Profil — BumiNusa.id",
  robots: { index: false, follow: false, noarchive: true },
};

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <ProfileSection />
      </div>
    </main>
  );
}