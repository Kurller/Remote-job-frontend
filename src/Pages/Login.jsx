import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";

export default function LoginPage({ setToken }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/auth/login", { email, password });

const { accessToken, refreshToken, user } = res.data;

if (!accessToken) throw new Error("Access token not returned by backend");

setToken(accessToken);

// ✅ SAVE USER (THIS IS WHAT YOU MISSED)
localStorage.setItem("user", JSON.stringify(user));

localStorage.setItem("token", accessToken);
localStorage.setItem("refreshToken", refreshToken);

navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow w-full max-w-md">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        {error && (
          <p className="text-red-600 mb-4 text-center sm:text-left">{error}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full border px-3 py-3 sm:py-4 rounded text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full border px-3 py-3 sm:py-4 rounded text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 sm:py-4 rounded text-base sm:text-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex flex-col sm:flex-row justify-between mt-4 text-sm">
          <Link to="/forgot-password" className="text-blue-600 hover:underline mb-2 sm:mb-0">
            Forgot Password?
          </Link>

          <Link to="/register" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}