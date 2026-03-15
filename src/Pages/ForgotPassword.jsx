import { useState } from "react";
import API from "../api/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await API.post("/forgot-password", { email });
      setMessage("If this email exists, a reset link has been sent!");
    } catch (err) {
      console.error(err);
      setError("Failed to send reset link");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow w-full max-w-md">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Forgot Password
        </h1>

        {message && (
          <p className="text-green-600 mb-4 text-center sm:text-left">
            {message}
          </p>
        )}
        {error && (
          <p className="text-red-600 mb-4 text-center sm:text-left">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full border px-3 py-3 sm:py-4 rounded text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 sm:py-4 rounded text-base sm:text-lg hover:bg-blue-700 transition"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}