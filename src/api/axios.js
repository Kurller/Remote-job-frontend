import axios from "axios";

// Use Vite environment variable for the base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // e.g., https://remote-job-application-manager.onrender.com
  withCredentials: true, // send cookies if needed
});

export default api;
