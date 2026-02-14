// src/Pages/JobsPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api.js";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchJobs = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await API.get("/jobs");
      setJobs(res.data.jobs);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) return <p className="text-center mt-6">Loading jobs...</p>;
  if (error) return <p className="text-red-600 text-center">{error}</p>;
  if (jobs.length === 0) return <p className="text-center">No jobs available.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Available Jobs</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col"
          >
            <div className="flex-1">
              <h2 className="font-bold text-xl">{job.title}</h2>
              <p className="text-gray-600 mt-1">
                {job.company || "Company not specified"}
              </p>

              <div className="mt-2 text-sm text-gray-500 space-y-1">
                <p>📍 Location: {job.location}</p>
                <p>💼 Type: {job.type || "N/A"}</p>
              </div>

              <p className="mt-4 text-gray-700 line-clamp-3">
                {job.description}
              </p>
            </div>

            <button
              onClick={() => navigate(`/apply/${job.id}`)}
              className="mt-6 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
