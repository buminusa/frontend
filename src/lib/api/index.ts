// Re-export all API functions
export { apiGet, apiPost, apiPut, apiPatch, apiDelete, UnauthorizedError, getToken } from "./api";

// Re-export auth functions
export {
  getAuthToken,
  saveAuthToken,
  clearAuthToken,
  loginUser,
  registerBuyerUser,
  registerCompanyUser,
  logoutUser,
  forgotPasswordUser,
  resetPasswordUser,
  verifyEmailUser,
  AUTH_TOKEN_KEY,
  AUTH_EVENT_NAME,
} from "./auth";

// Re-export JWT decode helpers (canonical: src/lib/auth.ts)
export { isUserVerifiedFromToken } from "@/lib/auth";
