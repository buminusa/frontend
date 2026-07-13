const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// Token disimpan di localStorage dengan key "auth_token"
export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("auth_token");
}

// Dilempar khusus saat backend membalas 401 (token tidak ada/invalid/expired),
// supaya UI bisa membedakan "sesi habis" dari error lain (mis. 403 role salah).
export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
  }
}

function authHeaders(): HeadersInit {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function apiGet<T>(path: string): Promise<{ data: T; meta?: { total: number } }> {
  const res = await fetch(`${API_URL}${path}`, { headers: authHeaders() });
  const json = await res.json();
  if (res.status === 401) {
    throw new UnauthorizedError(json.message || "Sesi login sudah habis.");
  }
  if (!res.ok) throw new Error(json.message || `Request gagal (${res.status})`);
  return json;
}

export async function apiPatch<T>(path: string, body: unknown): Promise<{ data: T }> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (res.status === 401) {
    throw new UnauthorizedError(json.message || "Sesi login sudah habis.");
  }
  if (!res.ok) throw new Error(json.message || `Request gagal (${res.status})`);
  return json;
}
