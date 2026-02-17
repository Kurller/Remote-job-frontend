import React from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function TailoredCVActions({ tailoredCvId, filename }) {
  const token = localStorage.getItem("token");

  const viewUrl = `${API_BASE_URL}/tailored-cvs/download/${tailoredCvId}`;

  const handleView = () => {
    window.open(
      `${viewUrl}?preview=true`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = viewUrl;
    a.setAttribute("download", filename || "tailored-cv.pdf");
    a.setAttribute("target", "_blank");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={handleView}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        View CV
      </button>

      <button
        onClick={handleDownload}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Download CV
      </button>
    </div>
  );
}
