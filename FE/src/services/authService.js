import axios from "axios";

const authApiUrl = import.meta.env.VITE_BACKEND_URL + import.meta.env.VITE_AUTH_URL;

const axiosInstance = axios.create({
  baseURL: authApiUrl,
  headers: {
    "Content-Type": "application/json"
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post("/login", credentials);
    console.log("Login Response:", response.data);

    // Store the token in localStorage
    localStorage.setItem("token", response.data.token);

    return response.data; // Returns the response data
  } catch (error) {
    console.error("Error during login:", error);
    throw error.response?.data || "Login failed. Please try again.";
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/register", userData);
    console.log("Register Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error.response?.data || "Registration failed. Please try again.";
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  console.log("User logged out.");
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};
