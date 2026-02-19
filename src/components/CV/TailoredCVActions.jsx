import React, { useState } from "react";
import { generateTailoredCV } from "../api/tailorcvApi";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function TailoredCVActions({ cv_id, job_id, filename }) {
  const [tailoredCvId, setTailoredCvId] = useState(null);
  const [loading, setLoading] = useState(false);

  const ensureAISummary = async () => {
    try {
      setLoading(true);
      // regenerate and get latest tailored CV
      const res = await generateTailoredCV({ cv_id, job_id, force: true });
      setTailoredCvId(res.data.id); // update to latest CV ID
      return res.data.id;
    } catch (err) {
      console.error("❌ AI regeneration failed:", err);
      alert("Failed to generate AI summary");
    } finally {
      setLoading(false);
    }
  };

  const handleView = async () => {
    const id = tailoredCvId || (await ensureAISummary());
    if (!id) return;
    window.open(`${API_BASE_URL}/tailored-cvs/download/${id}?preview=true`, "_blank");
  };

  const handleDownload = async () => {
    const id = tailoredCvId || (await ensureAISummary());
    if (!id) return;
    const a = document.createElement("a");
    a.href = `${API_BASE_URL}/tailored-cvs/download/${id}`;
    a.setAttribute("download", filename || "tailored-cv.pdf");
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
