import React, { useState } from "react";
import { generateTailoredCV } from "../api/tailoredVvApi";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function TailoredCVActions({ cv_id, job_id, filename }) {
  const [tailoredCv, setTailoredCv] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch or regenerate the latest tailored CV
  const ensureLatestTailoredCV = async () => {
    try {
      setLoading(true);

      const res = await generateTailoredCV({
        cv_id,
        job_id,
        force: true, // always regenerate AI summary if needed
      });

      setTailoredCv(res.data);
      return res.data;
    } catch (err) {
      console.error("❌ Failed to fetch or generate tailored CV:", err);
      alert("Failed to generate AI summary. Check your backend.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleView = async () => {
    const cv = tailoredCv || (await ensureLatestTailoredCV());
    if (!cv) return;

    // Add cache-busting to force fresh PDF
    const viewUrl = `${API_BASE_URL}/tailored-cvs/download/${cv.id}?preview=true&t=${Date.now()}`;
    window.open(viewUrl, "_blank", "noopener,noreferrer");
  };

  const handleDownload = async () => {
    const cv = tailoredCv || (await ensureLatestTailoredCV());
    if (!cv) return;

    const downloadUrl = `${API_BASE_URL}/tailored-cvs/download/${cv.id}?t=${Date.now()}`;
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.setAttribute("download", cv.filename || filename || "tailored-cv.pdf");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={handleView}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Generating AI..." : "View CV"}
      </button>

      <button
        onClick={handleDownload}
        disabled={loading}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Generating AI..." : "Download CV"}
      </button>
    </div>
  );
}
