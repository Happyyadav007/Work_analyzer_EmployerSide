import axiosInstance from "./axios";
export const addItem = async (itemData) => {
  console.log(itemData);
  try {
    const response = await axiosInstance.post("/items/add", itemData);
    return {
      success: true,
      data: response.data,
      message: response.data.message || "Item added successfully",
    };
  } catch (error) {
    console.log(error);

    // Extract error message safely from Axios error object
    let message = "Failed to add item";

    if (error.response) {
      // Server responded with a status code out of 2xx range
      message =
        error.response.data?.error ||
        error.response.data?.message ||
        `Server Error: ${error.response.status}`;
    } else if (error.request) {
      // Request was made but no response received
      message = "No response from server. Please try again later.";
    } else if (error.message) {
      // Something else happened
      message = error.message;
    }

    return {
      success: false,
      message,
    };
  }
};

// Get all items
export const fetchAllItems = async () => {
  try {
    const response = await axiosInstance.get("/items");
    return {
      success: true,
      data: response.data.data, // Assuming API returns { success, data: [...] }
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch items",
    };
  }
};
