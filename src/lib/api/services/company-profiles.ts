import { apiGet, apiPatch, apiPut } from "@/lib/api/api";
import type { ApiResponse, CompanyProfile } from "@/lib/types/api";

export const companyProfileService = {
  async getAll(): Promise<ApiResponse<CompanyProfile[]>> {
    return apiGet<CompanyProfile[]>("/api/v1/company-profiles");
  },

  async getDetailByUserId(userId: number): Promise<ApiResponse<CompanyProfile>> {
    return apiGet<CompanyProfile>(`/api/v1/company-profiles/${userId}`);
  },

  async update(
    userId: number,
    body: {
      company_name?: string;
      address?: string;
      province?: string;
      country?: string;
      phone?: string;
      business_description?: string;
    },
  ): Promise<ApiResponse<CompanyProfile>> {
    return apiPut<CompanyProfile>(`/api/v1/company-profiles/${userId}`, body);
  },

  async updateLogo(userId: number, file: File): Promise<ApiResponse<CompanyProfile>> {
    const formData = new FormData();
    formData.append("logo", file);
    return apiPut<CompanyProfile>(`/api/v1/company-profiles/${userId}/logo`, formData);
  },

  async getPending(): Promise<CompanyProfile[]> {
    const res = await apiGet<CompanyProfile[]>("/api/v1/company-profiles?status=Pending");
    return res.data || [];
  },

  async verify(id: number, status: "Pending" | "Verified" | "Rejected"): Promise<void> {
    await apiPatch(`/api/v1/company-profiles/${id}/verification-status`, {
      verificationStatus: status,
    });
  },
};
