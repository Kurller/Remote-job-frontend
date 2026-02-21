import React, { useEffect, useState } from "react";
import { generateTailoredCV } from "../api/tailoredCVApi";
import API from "../api/api"; // ✅ use Axios baseURL

export default function TailoredCVActions({ cv_id, job_id }) {
  const [tailoredCV, setTailoredCV] = useState(null);
  const [loading, setLoading] = useState(false);

  /* =========================
     FETCH OR GENERATE TAILORED CV
  ========================= */
  const fetchLatestCV = async () => {
    if (!cv_id || !job_id) return;

    try {
      setLoading(true);

      const res = await generateTailoredCV({
        cv_id,
        job_id,
        force: true,
      });

      // normalize backend response
      const cv = res.data?.tailoredCV ?? res.data;

      if (!cv?.id) {
        console.error("❌ Invalid CV payload:", res.data);
        return;
      }

      setTailoredCV(cv);
    } catch (err) {
      console.error("❌ Failed to fetch/generate CV:", err);
      alert("Failed to generate AI summary. Check backend logs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestCV();
  }, [cv_id, job_id]);

  if (loading) return <div>Generating AI summary...</div>;
  if (!tailoredCV) return <div>No tailored CV available.</div>;

  /* =========================
     VIEW CV
  ========================= */
  const handleView = () => {
    if (!tailoredCV.file_url) {
      alert("CV file not available");
      return;
    }
    window.open(tailoredCV.file_url, "_blank", "noopener,noreferrer");
  };

  /* =========================
     DOWNLOAD CV (FIXED)
  ========================= */
  const handleDownload = async () => {
  const cvId = tailoredCV?.id;

  if (!cvId) {
    alert("CV ID missing — cannot download.");
    return;
  }

  try {
    const response = await API.get(`/tailored-cvs/download/${cvId}`, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = tailoredCV.filename || "tailoredCV.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error("❌ Failed to download CV:", err);
    alert("Failed to download tailored CV. Check backend logs.");
  }
};

  return (
    <div className="flex flex-col gap-2">
      <p><strong>Job Title:</strong> {tailoredCV.job_title || "Unknown"}</p>
      <p><strong>File:</strong> {tailoredCV.filename || "N/A"}</p>
      <p>
        <strong>AI Summary:</strong>{" "}
        {tailoredCV.ai_summary || "Professional summary not generated."}
      </p>

      <div className="flex gap-3 mt-2">
        <button
          onClick={handleView}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          View CV
        </button>

        <button
          onClick={handleDownload}
          disabled={!tailoredCV?.id}
          className={`px-4 py-2 text-white rounded ${
            tailoredCV?.id
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Download CV
        </button>
      </div>
    </div>
  );
}