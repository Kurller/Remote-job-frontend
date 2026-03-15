import { useEffect, useState } from "react";
import API from "../../api/api";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await API.get("/applications");
        setApplications(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading)
    return <p className="text-center mt-6">Loading applications...</p>;
  if (error)
    return <p className="text-center mt-6 text-red-600">{error}</p>;
  if (!applications.length)
    return <p className="text-center mt-6">No applications found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-4 sm:mb-6">My Job Applications</h2>

      <div className="space-y-4">
        {applications.map((app) => (
          <div
            key={app.id}
            className="bg-white border rounded-lg p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4"
          >
            {/* Left: Job Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold truncate">{app.title}</h3>

              {app.company && (
                <p className="text-sm text-gray-600 truncate">{app.company}</p>
              )}

              <p className="text-sm mt-1 truncate">
                <span className="font-medium">CV:</span> {app.cv_name || "N/A"}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                Applied on {new Date(app.applied_at).toLocaleDateString()}
              </p>
            </div>

            {/* Right: Status */}
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium capitalize flex-shrink-0 ${
                app.status === "accepted"
                  ? "bg-green-100 text-green-700"
                  : app.status === "rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {app.status || "pending"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}