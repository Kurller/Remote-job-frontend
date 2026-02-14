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

  if (loading) {
    return <p className="text-center mt-6">Loading applications...</p>;
  }

  if (error) {
    return <p className="text-center mt-6 text-red-600">{error}</p>;
  }

  if (!applications.length) {
    return <p className="text-center mt-6">No applications found.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Job Applications</h2>

      <div className="space-y-4">
        {applications.map(app => (
          <div
            key={app.id}
            className="bg-white border rounded-lg p-4 shadow-sm flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold">{app.title}</h3>

              {app.company && (
                <p className="text-sm text-gray-600">{app.company}</p>
              )}

              <p className="text-sm mt-1">
                <span className="font-medium">CV:</span> {app.cv_name}
              </p>

              <p className="text-xs text-gray-500">
                Applied on{" "}
                {new Date(app.applied_at).toLocaleDateString()}
              </p>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-sm font-medium capitalize
                ${
                  app.status === "accepted"
                    ? "bg-green-100 text-green-700"
                    : app.status === "rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
            >
              {app.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
