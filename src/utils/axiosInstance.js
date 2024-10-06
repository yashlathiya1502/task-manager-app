import axios from "axios";
import AuthService from "./authService";
const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = AuthService.getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = AuthService.getRefreshToken();
        const newAccessToken = await AuthService.refreshToken(refreshToken||'');
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        AuthService.logout();
        return Promise.reject(refreshError);
      }
    }
    if (error.response.status === 403 && !originalRequest._retry) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
