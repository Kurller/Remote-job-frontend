// src/components/Jobs/JobList.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get("/jobs");
        setJobs(res.data.jobs);
      } catch (err) {
        console.error(err);
        setError("Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <p className="text-center mt-6">Loading jobs...</p>;
  if (error) return <p className="text-red-600 text-center">{error}</p>;
  if (!jobs.length) return <p className="text-center">No jobs available</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Available Jobs</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col"
          >
            <div className="flex-1">
              <h2 className="font-bold text-xl">{job.title}</h2>

              <p className="text-gray-600 mt-1">
                📍 {job.location || "Location not specified"}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                💼 {job.type || "Job type not specified"}
              </p>

              <p className="mt-4 text-gray-700 line-clamp-3">
                {job.description}
              </p>

              <p className="text-xs text-gray-500 mt-4">
                Posted on{" "}
                {new Date(job.created_at).toLocaleDateString()}
              </p>
            </div>

            <button
              onClick={() => navigate(`/apply/${job.id}`)}
              className="mt-6 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
