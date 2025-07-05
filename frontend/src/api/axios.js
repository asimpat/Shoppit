import axios from "axios";

export const BASE_URL = "http://localhost:3000/"
 
const api = axios.create({
  baseURL: "http://localhost:3000/api/",
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
