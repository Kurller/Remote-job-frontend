import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/api";

export default function ApplyJob() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [cv, setCv] = useState(null);
  const [loading, setLoading] = useState(false);

  const [cvs, setCvs] = useState([]);
  const [selectedCvId, setSelectedCvId] = useState("");

  const [tailoredCV, setTailoredCV] = useState(null);
  const [generating, setGenerating] = useState(false);

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

  const generateTailoredCV = async () => {
    if (!selectedCvId) return alert("Please select a CV first");
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

  const downloadTailoredCV = async (id) => {
    try {
      const res = await API.get(`/tailored-cvs/download/${id}`, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
      window.open(url, "_blank");
      setTimeout(() => window.URL.revokeObjectURL(url), 10000);
    } catch (err) {
      console.error(err);
      alert("Failed to download tailored CV");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cv) return alert("Please upload your CV");
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
    <div className="max-w-md sm:max-w-lg md:max-w-2xl mx-auto p-4 sm:p-6 space-y-6">

      {/* Tailored CV Section */}
      <div className="bg-white shadow rounded-lg p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold mb-3">Tailored CV (AI)</h2>

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
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {generating ? "Generating..." : "Generate Tailored CV"}
          </button>
        ) : (
          <div className="bg-gray-50 border rounded-lg p-3 sm:p-4 space-y-2">
            <p><strong>Job Title:</strong> {tailoredCV.jobTitle}</p>
            <p><strong>File:</strong> {tailoredCV.filename}</p>
            <p className="text-sm text-gray-600"><strong>AI Summary:</strong> {tailoredCV.ai_summary}</p>
            <button
              onClick={() => downloadTailoredCV(tailoredCV.tailoredcvid)}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Download Tailored CV
            </button>
          </div>
        )}
      </div>

      {/* Manual CV Upload */}
      <div className="bg-white shadow rounded-lg p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold mb-3">Apply with Your CV</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Upload CV (PDF or DOC)</label>
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