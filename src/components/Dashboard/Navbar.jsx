import React from "react";

export default function Navbar({ onLogout, onMenuToggle }) {
  return (
    <nav className="relative bg-blue-600 text-white flex items-center px-4 sm:px-6 py-3 shadow">
      
      {/* Mobile Hamburger Menu */}
      {onMenuToggle && (
        <button
          onClick={onMenuToggle}
          className="md:hidden mr-3 p-2 rounded hover:bg-blue-500 transition"
        >
          ☰
        </button>
      )}

      {/* Title */}
      <h1 className="text-lg sm:text-xl font-bold flex-1 text-center md:text-left">
        Remote Job Application Manager
      </h1>

      {/* Logout Button */}
      <div className="ml-auto">
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm sm:text-base transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}