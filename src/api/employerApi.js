// src/api.js
// import axiosInstance from "./axios";
import axiosInstance from "../utils/axiosInterceptor";

export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/employers/register", userData);
    return {
      status: response.status,
      message: response.data.message,
      success: true,
    };
  } catch (error) {
    // Catching error from server or network
    const errMsg =
      error.response?.data?.message || error.message || "Registration failed";
    const status = error.response?.status || 500;

    return {
      status,
      message: errMsg,
      success: false,
    };
  }
};

// Login employer user
export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post("/employers/login", credentials);
    return {
      success: true,
      message: response.data.message,
      token: response.data.token,
      user: response.data.user,
    };
  } catch (error) {
    const errMsg =
      error.response?.data?.message || error.message || "Login failed";
    return {
      success: false,
      message: errMsg,
    };
  }
};

// Refresh token function
export const refreshToken = async () => {
  try {
    const response = await axiosInstance.post("/employers/refresh-token");
    return response.data.token;
  } catch (error) {
    throw error;
  }
};

// Logout function
export const logoutUser = async () => {
  try {
    await axiosInstance.post("/employers/logout");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Logout failed",
    };
  }
};

export const fetchAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/employers/users"); // match your backend route
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch users",
    };
  }
};
