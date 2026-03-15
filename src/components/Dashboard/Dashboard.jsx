import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import tabs from "./tabs";

export default function Dashboard({ setToken }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setToken(null);
    navigate("/login");
  };

  const visibleTabs = tabs.filter(tab => !tab.adminOnly || isAdmin);
  const activeComponent =
    visibleTabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* Navbar */}
      <Navbar onLogout={handleLogout} />

      <div className="flex flex-1 relative">

        {/* Mobile Sidebar Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden fixed top-20 left-4 z-50 bg-blue-600 text-white px-3 py-2 rounded shadow"
        >
          ☰ Menu
        </button>

        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setSidebarOpen(false); // close sidebar on mobile after click
          }}
          isAdmin={isAdmin}
          sidebarOpen={sidebarOpen}    // pass sidebarOpen for overlay
          onClose={() => setSidebarOpen(false)} // pass onClose to handle overlay click
        />

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {activeComponent || <p>Tab not found</p>}
        </main>
      </div>
    </div>
  );
}