import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function RegisterPage({ setToken }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateInput = () => {
    if (!name) { setError("Name is required"); return false; }
    if (!email) { setError("Email is required"); return false; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) { setError("Enter a valid email"); return false; }
    if (!password || password.length < 6) { setError("Password must be at least 6 characters"); return false; }
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateInput()) return;

    setLoading(true);
    try {
      const res = await API.post("/auth/register", { name, email, password });
      const { accessToken, refreshToken } = res.data;

      if (!accessToken || !refreshToken) throw new Error("No tokens returned from backend");

      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      setToken(accessToken);

      setName(""); setEmail(""); setPassword("");
      navigate("/dashboard");
    } catch (err) {
      const msg = err.response?.data?.message
                  || err.response?.data?.errors?.[0]?.msg
                  || err.message
                  || "Registration failed";
      setError(msg);
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow w-full max-w-md">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Register</h2>

        {error && (
          <p className="text-red-600 mb-4 text-center sm:text-left">{error}</p>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="w-full border px-3 py-3 sm:py-4 rounded text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full border px-3 py-3 sm:py-4 rounded text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full border px-3 py-3 sm:py-4 rounded text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 sm:py-4 rounded text-base sm:text-lg hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}