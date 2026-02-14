import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import tabs from "./tabs";

export default function Dashboard({ setToken }) {
  const [activeTab, setActiveTab] = useState("dashboard");
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
  const activeComponent = visibleTabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar onLogout={handleLogout} />
      <div className="flex flex-1">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} isAdmin={isAdmin} />
        <main className="flex-1 p-6 overflow-y-auto">
          {activeComponent || <p>Tab not found</p>}
        </main>
      </div>
    </div>
  );
}
