import axios from "axios";
import { refreshToken } from "../api/employerApi";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});


// Request interceptor to add token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Check for 401 and avoid infinite loops
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log("Interceptor caught 401:", error.response?.status);
      originalRequest._retry = true; // Mark request to avoid retry loop
      
      try {
        // Step 1: Get new access token via refresh token
        const newToken = await refreshToken();
        
        // Step 2: Store the new token
        localStorage.setItem("token", newToken);
        
        // Step 3: Retry the original request
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
        
      } catch (refreshError) {
        // If refresh fails, logout and redirect
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/users/login";
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;