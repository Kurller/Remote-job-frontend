import React from "react";
import tabs from "./tabs";

export default function Sidebar({ activeTab, setActiveTab, isAdmin }) {
  return (
    <aside className="w-64 bg-white shadow p-4">
      <ul className="space-y-2">
        {tabs
          .filter(tab => !tab.adminOnly || isAdmin) // only show admin tabs to admins
          .map(tab => (
            <li
  key={tab.id}
  onClick={() => setActiveTab(tab.id)} // tab.id here is "cvs"
  className={`cursor-pointer p-3 rounded font-medium
    ${activeTab === tab.id ? "bg-blue-600 text-white" : "hover:bg-gray-200"}`}
>
  {tab.label}
</li>

          ))}
      </ul>
    </aside>
  );
}
