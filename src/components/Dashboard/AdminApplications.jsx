import React, { useEffect, useState } from "react";
import API from "../../api/api"; // axios instance
import { downloadCV } from "../../api/cvApi"; // for download

export default function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await API.get("/applications/all"); // admin endpoint
      setApplications(res.data || []);
    } catch (err) {
      console.error("Error fetching applications:", err);
    } finally {
      setLoading(false);
    }
  };

  // View CV in a new tab
  const viewCV = (cvId) => {
  const token = localStorage.getItem("token");
  window.open(
    `http://localhost:3000/cvs/download/${cvId}?token=${token}`,
    "_blank"
  );
};



  if (loading)
    return <p className="text-center mt-6">Loading applications...</p>;
  if (!applications.length)
    return <p className="text-center mt-6">No applications found.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">All Job Applications</h2>

      <div className="overflow-x-auto border rounded">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 border">User</th>
              <th className="px-4 py-2 border">Job</th>
              <th className="px-4 py-2 border">CV</th>
              <th className="px-4 py-2 border">Applied At</th>
              <th className="px-4 py-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => {
              const appliedDate = app.appliedAt || app.applied_at;
              return (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{app.user?.name || "N/A"}</td>
                  <td className="px-4 py-2 border">
                    {app.job?.title || "N/A"}{" "}
                    {app.job?.company ? `- ${app.job.company}` : ""}
                  </td>
                  <td className="px-4 py-2 border">
                    {app.cv?.name || "N/A"}
                    {app.cv?.id && (
                      <>
                        <button
                          onClick={() => viewCV(app.cv.id)}
                          className="ml-2 text-blue-600 underline"
                        >
                          View
                        </button>
                        
                      </>
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    {appliedDate ? new Date(appliedDate).toLocaleString() : "N/A"}
                  </td>
                  <td className="px-4 py-2 border">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        app.status === "accepted"
                          ? "bg-green-100 text-green-700"
                          : app.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {app.status || "pending"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
