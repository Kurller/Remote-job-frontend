import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 60000, // helps with Render cold start
  withCredentials: true, // ✅ VERY IMPORTANT (cookies + auth)
});

// ================= REQUEST INTERCEPTOR =================
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // Debug (disable in production if needed)
    if (import.meta.env.DEV) {
      console.log("📱 TOKEN:", token);
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // ❗ DO NOT manually set Content-Type for FormData
    // Axios handles it automatically

    return config;
  },
  (error) => Promise.reject(error)
);

// ================= RESPONSE INTERCEPTOR =================
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // ✅ Handle no response (network / server down)
    if (!error.response) {
      console.error("🌐 Network error or server not reachable");
      return Promise.reject({
        message: "Network error. Please check your connection.",
      });
    }

    const { status, data } = error.response;

    // ✅ Handle unauthorized
    if (status === 401) {
      console.warn("🔒 Unauthorized - logging out");

      localStorage.removeItem("token");

      // Avoid breaking SPA navigation
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    // ✅ Handle server errors
    if (status >= 500) {
      console.error("🔥 Server error:", data);
    }

    // ✅ Handle validation / bad request
    if (status === 400) {
      console.warn("⚠️ Bad request:", data);
    }

    return Promise.reject(error);
  }
);

export default API;