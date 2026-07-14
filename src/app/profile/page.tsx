// app/profile/page.tsx
import { ProfileSection } from "@/components/section/profile/ProfileSection";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <ProfileSection />
      </div>
    </main>
  );
}