// src/api.js
import axiosInstance from "./axios";

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
    console.log("Sending login credentials:", credentials);
    const response = await axiosInstance.post("/employers/login", credentials, {
      withCredentials: true, // for cookies if needed
    });
    return {
      success: true,
      message: response.data.message,
      token: response.data.token, // include token here
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

// Logout employer user

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
