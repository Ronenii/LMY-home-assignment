import axios from "axios";

const taskApiUrl = import.meta.env.VITE_BACKEND_URL + import.meta.env.VITE_TASK_URL;

const axiosInstance = axios.create({
  baseURL: taskApiUrl,
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

export const fetchTasks = async (filters = {}) => {
  try {
    const response = await axiosInstance.get("", { params: filters });
    console.log("API Response:", response.data); // Debugging
    return response.data.data || []; // Access the `data` property directly
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error.response?.data || "Failed to fetch tasks";
  }
};

export const createTask = async (taskData) => {
  try {
    console.log("Submitted task data:", taskData);
    const response = await axiosInstance.post("", taskData);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error.response?.data || "Failed to create task";
  }
};

export const updateTaskDetails = async (id, updatedData) => {
  try {
    const response = await axiosInstance.put(`details/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error.response?.data || "Failed to update task details";
  }
};

export const updateTaskStatus = async (id, status) => {
  try {
    const response = await axiosInstance.put(`status/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error.response?.data || "Failed to update task details";
  }
};

export const deleteTask = async (id) => {
  try {
    await axiosInstance.delete(`/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error.response?.data || "Failed to delete task";
  }
};
