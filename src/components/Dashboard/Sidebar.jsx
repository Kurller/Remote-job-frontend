import React from "react";
import tabs from "./tabs";

export default function Sidebar({ activeTab, setActiveTab, isAdmin, sidebarOpen, onClose }) {
  // Filter tabs for user/admin
  const visibleTabs = tabs.filter(tab => !tab.adminOnly || isAdmin);

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity md:hidden ${
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-40 bg-white w-64 p-4 shadow
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:flex-shrink-0
        `}
      >
        <ul className="space-y-2">
          {visibleTabs.map(tab => (
            <li
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                onClose?.();
              }}
              className={`cursor-pointer p-3 rounded font-medium truncate
                ${activeTab === tab.id ? "bg-blue-600 text-white" : "hover:bg-gray-200"}`}
            >
              {tab.label}
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}