const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data?.message || `Request failed with status ${response.status}`);
  }

  return data as T;
}

export async function loginUser(payload: { email: string; password: string }) {
  return request<{ success: boolean; message: string; token?: string }>('/api/v1/auth/login', {
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
