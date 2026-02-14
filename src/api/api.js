import axios from "axios";

// Create axios instance with base URL from Vite env
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // e.g., https://remote-job-application-manager.onrender.com
  withCredentials: true, // allow cookies if needed
});

// Queue for handling multiple failed requests during token refresh
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

// Request interceptor to attach access token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && !config.url.startsWith("/auth")) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle 401 and refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If Unauthorized and not already retried
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/login")
    ) {
      if (isRefreshing) {
        // Wait for the current refresh request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) return Promise.reject(error);

      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
          { refreshToken }
        );
        const newToken = data.accessToken;
        localStorage.setItem("token", newToken);
        api.defaults.headers.Authorization = `Bearer ${newToken}`;
        processQueue(null, newToken);
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
