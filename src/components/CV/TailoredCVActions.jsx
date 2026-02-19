import React, { useState } from "react";
import { generateTailoredCV } from "../api/tailorcvApi"; // import the service

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function TailoredCVActions({ tailoredCvId, filename, cv_id, job_id }) {
  const [loading, setLoading] = useState(false);

  const viewUrl = `${API_BASE_URL}/tailored-cvs/download/${tailoredCvId}`;

  // ================= VIEW =================
  const handleView = () => {
    window.open(`${viewUrl}?preview=true`, "_blank", "noopener,noreferrer");
  };

  // ================= DOWNLOAD =================
  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = viewUrl;
    a.setAttribute("download", filename || "tailored-cv.pdf");
    a.setAttribute("target", "_blank");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // ================= REGENERATE AI =================
  const handleRegenerate = async () => {
    try {
      setLoading(true);
      const res = await generateTailoredCV({
        cv_id,
        job_id,
        force: true, // force AI regeneration
      });
      console.log("♻️ CV regenerated:", res.data);
      alert("AI summary regenerated successfully!");
    } catch (err) {
      console.error("❌ Failed to regenerate CV:", err);
      alert("Failed to regenerate AI summary");
    } finally {
      setLoading(false);
    }
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

      <button
        onClick={handleRegenerate}
        disabled={loading}
        className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
      >
        {loading ? "Regenerating..." : "Regenerate AI Summary"}
      </button>
    </div>
  );
}
