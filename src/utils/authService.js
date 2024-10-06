import { logoutUser, refershAccessToken } from "../api/auth/authApi";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

const AuthService = {
  setTokens: (accessToken, refreshToken) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },
  getAccessToken: () => {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },
  getRefreshToken: () => {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },
  clearTokens: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
  isLoggedIn: () => {
    return !!AuthService.getAccessToken();
  },
  refreshToken: async (refresh_token) => {
    try {
      const response = await refershAccessToken(refresh_token);
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      return accessToken;
    } catch (error) {
      throw new Error("Failed to refresh access token");
    }
  },
  logout: async () => {
    await logoutUser();
    localStorage.removeItem("user");
    AuthService.clearTokens();
    window.location.href = "/login";
  }
};

export default AuthService;