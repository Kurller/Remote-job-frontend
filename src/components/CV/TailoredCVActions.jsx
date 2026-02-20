import React, { useEffect, useState } from "react";
import { generateTailoredCV } from "../api/tailoredCvApi";

export default function TailoredCVActions({ cv_id, job_id }) {
  const [tailoredCV, setTailoredCV] = useState(null);
  const [loading, setLoading] = useState(false);

  /* =========================
     FETCH OR GENERATE TAILORED CV
  ========================= */
  const fetchLatestCV = async () => {
    try {
      setLoading(true);
      const res = await generateTailoredCV({
        cv_id,
        job_id,
        force: true, // force AI summary
      });

      // The backend now returns id, file_url, filename, ai_summary, job_title
      setTailoredCV(res.data);
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
     VIEW CV IN NEW TAB
  ========================= */
  const handleView = () => {
    if (!tailoredCV?.file_url) {
      alert("CV file not available");
      return;
    }
    window.open(tailoredCV.file_url, "_blank", "noopener,noreferrer");
  };

  /* =========================
     DOWNLOAD CV
     Redirects to backend route which redirects to Cloudinary
  ========================= */
  const handleDownload = async () => {
  if (!tailoredCV?.id) {
    alert("CV ID missing");
    return;
  }

  try {
    const response = await fetch(
      `/tailored-cvs/download/${tailoredCV.id}`,
      {
        method: "GET",
        credentials: "include", // IMPORTANT (cookies / auth)
      }
    );

    if (!response.ok) {
      throw new Error("Download failed");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = tailoredCV.filename || "tailoredCV.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error("❌ Failed to download tailored CV:", err);
    alert("Failed to download tailored CV");
  }
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
