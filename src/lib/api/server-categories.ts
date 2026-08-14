import type { Category } from "@/lib/types/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function fetchCategories(limit = 6): Promise<Category[]> {
  try {
    const res = await fetch(`${API_URL}/api/v1/categories?limit=${limit}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return (json.data || []) as Category[];
  } catch {
    return [];
  }
}