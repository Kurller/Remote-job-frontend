import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // e.g. http://localhost:10000
  withCredentials: true,
});

API.interceptors.request.use(
  (config) => {
    // Disable caching (prevents 304 issues)
    config.headers["Cache-Control"] = "no-cache";
    config.headers["Pragma"] = "no-cache";

    // Do NOT attach token to auth routes
    const isAuthRoute =
      config.url.includes("/auth/login") ||
      config.url.includes("/auth/register") ||
      config.url.includes("/auth/refresh");

    if (!isAuthRoute) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
