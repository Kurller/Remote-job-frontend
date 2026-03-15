// src/components/Applications/UserApplications.jsx
import { useEffect, useState } from "react";
import API from "../../api/api";

export default function UserApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const res = await API.get("/applications");
      setApplications(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading) return <p className="text-center">Loading applications...</p>;
  if (!applications.length)
    return <p className="text-center">No applications found.</p>;

  return (
    <div className="space-y-4 px-2 sm:px-4">
      {applications.map((app) => (
        <div
          key={app.application_id}
          className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row md:justify-between gap-3"
        >
          <div className="space-y-1">
            <h3 className="font-semibold text-lg break-words">
              {app.job_title}
            </h3>

            <p className="text-sm text-gray-600 break-all">
              CV: {app.tailored_cv}
            </p>

            <p className="text-sm">
              Status:{" "}
              <span className="font-medium text-blue-600">
                {app.status}
              </span>
            </p>

            <p className="text-xs text-gray-500">
              Applied: {new Date(app.applied_at).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}