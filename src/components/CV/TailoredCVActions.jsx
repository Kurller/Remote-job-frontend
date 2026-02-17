import React from "react";

export default function TailoredCVActions({ tailoredCvId, filename }) {
  const token = localStorage.getItem("token");

  const viewUrl = `http://localhost:10000/tailored-cvs/download/${tailoredCvId}?token=${token}`;
  const downloadUrl = viewUrl;

  const handleView = () => {
    window.open(viewUrl, "_blank", "noopener,noreferrer");
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = filename || "tailored-cv.pdf";
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
