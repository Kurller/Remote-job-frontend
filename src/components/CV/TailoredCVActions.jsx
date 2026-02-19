import React, { useEffect, useState } from "react";
import { generateTailoredCV } from "../api/tailoredCvApi";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function TailoredCVActions({ cv_id, job_id }) {
  const [tailoredCV, setTailoredCV] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch or regenerate the latest tailored CV
  const fetchLatestCV = async () => {
    try {
      setLoading(true);
      const res = await generateTailoredCV({
        cv_id,
        job_id,
        force: true, // ensure AI summary is generated
      });
      setTailoredCV(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch/generate CV:", err);
      alert("Failed to generate AI summary. Check backend logs.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch latest CV on mount
  useEffect(() => {
    fetchLatestCV();
  }, [cv_id, job_id]);

  if (loading) return <div>Generating AI summary...</div>;
  if (!tailoredCV) return <div>No tailored CV available.</div>;

  const handleView = () => {
    const url = `${tailoredCV.file_url}?preview=true&t=${Date.now()}`; // cache-busting
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleDownload = () => {
    const url = `${tailoredCV.file_url}?t=${Date.now()}`; // cache-busting
    const a = document.createElement("a");
    a.href = url;
    a.setAttribute("download", tailoredCV.filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="flex flex-col gap-2">
      <p><strong>Job Title:</strong> {tailoredCV.job_title || "Unknown"}</p>
      <p><strong>File:</strong> {tailoredCV.filename}</p>
      <p><strong>AI Summary:</strong> {tailoredCV.ai_summary || "Professional summary not generated."}</p>

      <div className="flex gap-3 mt-2">
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
    </div>
  );
}
