import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/api";

export default function ApplyJob() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  /* =========================
     Manual CV upload
  ========================= */
  const [cv, setCv] = useState(null);
  const [loading, setLoading] = useState(false);

  /* =========================
     User CVs
  ========================= */
  const [cvs, setCvs] = useState([]);
  const [selectedCvId, setSelectedCvId] = useState("");

  /* =========================
     Tailored CV
  ========================= */
  const [tailoredCV, setTailoredCV] = useState(null);
  const [generating, setGenerating] = useState(false);

  /* =========================
     Fetch user CVs
  ========================= */
  useEffect(() => {
    const fetchCVs = async () => {
      try {
        const res = await API.get("/cvs");
        setCvs(res.data || []);
      } catch (err) {
        console.error("Failed to fetch CVs", err);
      }
    };

    fetchCVs();
  }, []);

  /* =========================
     Generate Tailored CV
  ========================= */
  const generateTailoredCV = async () => {
    if (!selectedCvId) {
      alert("Please select a CV first");
      return;
    }

    setGenerating(true);
    try {
      const res = await API.post("/tailored-cvs", {
        job_id: Number(jobId),
        cv_id: Number(selectedCvId),
      });

      setTailoredCV(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to generate tailored CV");
    } finally {
      setGenerating(false);
    }
  };

  /* =========================
     Download Tailored CV
  ========================= */
  const downloadTailoredCV = async (id, filename = "tailored-cv.pdf") => {
  try {
    const res = await API.get(`/tailored-cvs/download/${id}`, {
      responseType: "blob", // 👈 IMPORTANT
    });

    const blob = new Blob([res.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    // 👉 Open in new tab (ADMIN / USER VIEW)
    window.open(url, "_blank");

    
    setTimeout(() => window.URL.revokeObjectURL(url), 10000);
  } catch (err) {
    console.error(err);
    alert("Failed to download tailored CV");
  }
};


  /* =========================
     Submit Job Application
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cv) {
      alert("Please upload your CV");
      return;
    }

    const formData = new FormData();
    formData.append("cv", cv);

    setLoading(true);
    try {
      await API.post(`/applications/apply/${jobId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Application submitted successfully");
      navigate("/dashboard/jobs");
    } catch (err) {
      alert(err.response?.data?.message || "Application failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">

      {/* ================= Tailored CV Section ================= */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Tailored CV (AI)</h2>

        {/* CV Selector */}
        <select
          value={selectedCvId}
          onChange={(e) => setSelectedCvId(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
        >
          <option value="">Select a CV</option>
          {cvs.map((cv) => (
            <option key={cv.id} value={cv.id}>
              {cv.filename}
            </option>
          ))}
        </select>

        {!tailoredCV ? (
          <button
            onClick={generateTailoredCV}
            disabled={generating}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {generating ? "Generating..." : "Generate Tailored CV"}
          </button>
        ) : (
          <div className="border rounded-lg p-4 space-y-2 bg-gray-50">
            <p>
              <span className="font-semibold">Job Title:</span>{" "}
              {tailoredCV.jobTitle}
            </p>

            <p>
              <span className="font-semibold">File:</span>{" "}
              {tailoredCV.filename}
            </p>

            <p className="text-sm text-gray-600">
              <span className="font-semibold">AI Summary:</span>{" "}
              {tailoredCV.ai_summary}
            </p>

            <button
              onClick={() => downloadTailoredCV(tailoredCV.tailoredcvid)}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Download Tailored CV
            </button>
          </div>
        )}
      </div>

      {/* ================= Manual CV Upload ================= */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Apply with Your CV</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Upload CV (PDF or DOC)
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setCv(e.target.files[0])}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>

    </div>
  );
}
