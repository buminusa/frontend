import { apiGet, apiPatch } from "@/lib/api/api";
import type { ApiResponse, CompanyProfile } from "@/lib/types/api";

export const companyProfileService = {
  async getAll(): Promise<ApiResponse<CompanyProfile[]>> {
    return apiGet<CompanyProfile[]>("/api/v1/company-profiles");
  },

  async getDetailByUserId(userId: number): Promise<ApiResponse<CompanyProfile>> {
    return apiGet<CompanyProfile>(`/api/v1/company-profiles/${userId}`);
  },

  async getPending(): Promise<CompanyProfile[]> {
    const res = await apiGet<CompanyProfile[]>("/api/v1/company-profiles?status=Pending");
    return res.data || [];
  },

  async verify(id: number, status: "Verified" | "Rejected"): Promise<void> {
    await apiPatch(`/api/v1/company-profiles/${id}/verification-status`, {
      verificationStatus: status,
    });
  },
};
