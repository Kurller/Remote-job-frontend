import React, { useState } from "react";
import { generateTailoredCV } from "../api/tailorcvApi";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function TailoredCVActions({ tailoredCvId, filename, cv_id, job_id }) {
  const [loading, setLoading] = useState(false);

  const viewUrl = `${API_BASE_URL}/tailored-cvs/download/${tailoredCvId}`;

  // ✅ Regenerate AI summary if missing
  const ensureAISummary = async () => {
    try {
      setLoading(true);
      await generateTailoredCV({ cv_id, job_id, force: true });
    } catch (err) {
      console.error("❌ AI regeneration failed:", err);
      alert("Failed to regenerate AI summary");
    } finally {
      setLoading(false);
    }
  };

  const handleView = async () => {
    await ensureAISummary(); // regenerate if needed
    window.open(`${viewUrl}?preview=true`, "_blank", "noopener,noreferrer");
  };

  const handleDownload = async () => {
    await ensureAISummary(); // regenerate if needed
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
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? "Generating AI..." : "View CV"}
      </button>

      <button
        onClick={handleDownload}
        disabled={loading}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        {loading ? "Generating AI..." : "Download CV"}
      </button>
    </div>
  );
}
