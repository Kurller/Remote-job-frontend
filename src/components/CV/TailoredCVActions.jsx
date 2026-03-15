import React, { useEffect, useState } from "react";
import { generateTailoredCV } from "../api/tailoredCVApi";
import API from "../api/api";

export default function TailoredCVActions({ cv_id, job_id }) {
  const [tailoredCV, setTailoredCV] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchLatestCV = async () => {
    if (!cv_id || !job_id) return;

    try {
      setLoading(true);
      const res = await generateTailoredCV({ cv_id, job_id, force: true });
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

  const handleView = () => {
    if (!tailoredCV.file_url) return alert("CV file not available");
    window.open(tailoredCV.file_url, "_blank", "noopener,noreferrer");
  };

  const handleDownload = async () => {
    const cvId = tailoredCV?.id;
    if (!cvId) return alert("CV ID missing — cannot download.");

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
    <div className="p-4 bg-white rounded shadow max-w-xl mx-auto space-y-3">
      {/* Job & CV Info */}
      <p className="text-sm break-words">
        <strong>Job Title:</strong> {tailoredCV.job_title || "Unknown"}
      </p>
      <p className="text-sm break-words">
        <strong>File:</strong> {tailoredCV.filename || "N/A"}
      </p>
      <p className="text-sm break-words">
        <strong>AI Summary:</strong>{" "}
        {tailoredCV.ai_summary || "Professional summary not generated."}
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 mt-2">
        <button
          onClick={handleView}
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          View CV
        </button>

        <button
          onClick={handleDownload}
          disabled={!tailoredCV?.id}
          className={`w-full sm:w-auto px-4 py-2 text-white rounded ${
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