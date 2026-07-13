// Re-export all API functions
export { apiGet, apiPatch, UnauthorizedError, getToken } from "./api";
export { dashboardApi } from "./dashboard";

// Re-export auth functions
export {
  getAuthToken,
  saveAuthToken,
  clearAuthToken,
  loginUser,
  registerBuyerUser,
  registerCompanyUser,
  logoutUser,
  AUTH_TOKEN_KEY,
  AUTH_EVENT_NAME,
} from "./auth";
