import { useState, useEffect } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await API.get("/candidates");
        setCandidates(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCandidates();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="p-6">
        <h1 className="text-3xl font-bold mb-4">Candidates</h1>

        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Phone</th>
              <th className="p-2 text-left">Resume</th>
              <th className="p-2 text-left">Applied On</th>
            </tr>
          </thead>

          <tbody>
            {candidates.map((c) => (
              <tr key={c.id} className="border-b">
                <td className="p-2">
                  {c.first_name} {c.last_name}
                </td>

                <td className="p-2">{c.email}</td>

                <td className="p-2">{c.phone || "N/A"}</td>

                <td className="p-2">
                  {c.resume_path ? (
                    <a
                      href={c.resume_path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View CV
                    </a>
                  ) : (
                    "No CV"
                  )}
                </td>

                <td className="p-2">
                  {new Date(c.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {candidates.length === 0 && (
          <p className="text-gray-500 mt-4">No candidates found.</p>
        )}
      </main>
    </div>
  );
}
