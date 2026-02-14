import React from "react";

export default function Navbar({ onLogout }) {
  return (
    <nav className="relative bg-blue-600 text-white flex items-center px-6 py-4 shadow">
      
      {/* Centered Title */}
      <h1 className="absolute left-1/2 transform -translate-x-1/2 text-xl font-bold">
        Remote Job Application Manager
      </h1>

      {/* Logout Button (right side) */}
      <div className="ml-auto">
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
