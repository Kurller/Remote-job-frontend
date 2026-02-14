// src/components/Applications/UserApplications.jsx
import { useEffect, useState } from "react";
import API from "../../api/api";

export default function UserApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const res = await API.get("/applications"); // your route for getUserApplications
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

  if (loading) return <p>Loading applications...</p>;
  if (!applications.length) return <p>No applications found.</p>;

  return (
    <div className="space-y-4">
      {applications.map((app) => (
        <div
          key={app.application_id}
          className="bg-white p-4 rounded shadow flex justify-between"
        >
          <div>
            <h3 className="font-bold">{app.job_title}</h3>
            <p>CV: {app.tailored_cv}</p>
            <p>Status: {app.status}</p>
            <p>Applied: {new Date(app.applied_at).toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
