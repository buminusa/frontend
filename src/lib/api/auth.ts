import { UnauthorizedError } from "./api";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080").replace(/\/$/, "");
export const AUTH_TOKEN_KEY = "auth_token";
export const AUTH_EVENT_NAME = "auth:changed";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const headers = new Headers(options.headers);
  const isFormData = options.body instanceof FormData;

  if (!headers.has("Content-Type") && !isFormData) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (response.status === 401) {
    throw new UnauthorizedError(data?.message ?? "Sesi login sudah habis.");
  }

  if (!response.ok) {
    throw new Error(data?.message || `Request failed with status ${response.status}`);
  }

  return data as T;
}

export function getAuthToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(AUTH_TOKEN_KEY);
}

export function saveAuthToken(token: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(AUTH_TOKEN_KEY, token);
  window.dispatchEvent(new Event(AUTH_EVENT_NAME));
}

export function clearAuthToken() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(AUTH_TOKEN_KEY);
  window.dispatchEvent(new Event(AUTH_EVENT_NAME));
}

export async function loginUser(payload: { email: string; password: string }) {
  return request<{
    success: boolean;
    message: string;
    token?: string;
    data?: { verified?: boolean; warning?: string };
  }>('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function registerBuyerUser(payload: {
  email: string;
  password: string;
  full_name: string;
  address: string;
  province: string;
  country: string;
  phone: string;
}) {
  return request<{ success: boolean; message: string; data?: unknown }>('/api/v1/auth/register-buyer', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function registerCompanyUser(payload: {
  email: string;
  password: string;
  company_name: string;
  address: string;
  province: string;
  country: string;
  phone: string;
  business_description: string;
  npwp_file?: File | null;
  logo?: File | null;
}) {
  const formData = new FormData();

  formData.append('email', payload.email);
  formData.append('password', payload.password);
  formData.append('company_name', payload.company_name);
  formData.append('address', payload.address);
  formData.append('province', payload.province);
  formData.append('country', payload.country);
  formData.append('phone', payload.phone);
  formData.append('business_description', payload.business_description);

  if (payload.npwp_file) {
    formData.append('npwp', payload.npwp_file);
  }

  if (payload.logo) {
    formData.append('logo', payload.logo);
  }

  return request<{ success: boolean; message: string; data?: unknown }>('/api/v1/auth/register-company', {
    method: 'POST',
    body: formData,
  });
}

export async function logoutUser(token?: string) {
  const authToken = token ?? getAuthToken();

  if (!authToken) {
    return { success: true, message: "Logout successful" };
  }

  return request<{ success: boolean; message: string }>('/api/v1/auth/logout', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
}

export async function forgotPasswordUser(payload: { email: string }) {
  return request<{ success: boolean; message: string }>('/api/v1/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function resetPasswordUser(payload: { token: string; newPassword: string }) {
  return request<{ success: boolean; message: string }>('/api/v1/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function verifyEmailUser(token: string) {
  return request<{ success: boolean; message: string }>(
    `/api/v1/auth/verify-email?token=${encodeURIComponent(token)}`
  );
}
