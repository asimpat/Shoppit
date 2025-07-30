import axios from "axios";

// Configuration for different environments
const getBackendUrl = () => {
  // Check if we're in development or production
  if (import.meta.env.DEV) {
    return "http://localhost:3000";
  }
  // For production, you would use your actual domain
  return import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
};

export const BASE_URL = getBackendUrl() + "/";
 
const api = axios.create({
  baseURL: getBackendUrl() + "/api/",
});

// Automatically attach token to every request if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
