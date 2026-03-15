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

      <main className="p-4 sm:p-6 max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">Candidates</h1>

        {/* Responsive table wrapper */}
        <div className="overflow-x-auto bg-white shadow rounded">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Phone</th>
                <th className="p-2 text-left">Resume</th>
                <th className="p-2 text-left">Applied On</th>
              </tr>
            </thead>

            <tbody>
              {candidates.map((c) => (
                <tr key={c.id} className="border-b hover:bg-gray-50">
                  <td className="p-2 whitespace-nowrap">
                    {c.first_name} {c.last_name}
                  </td>
                  <td className="p-2 whitespace-nowrap">{c.email}</td>
                  <td className="p-2 whitespace-nowrap">{c.phone || "N/A"}</td>
                  <td className="p-2 whitespace-nowrap">
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
                  <td className="p-2 whitespace-nowrap">
                    {new Date(c.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {candidates.length === 0 && (
          <p className="text-gray-500 mt-4 text-center">No candidates found.</p>
        )}
      </main>
    </div>
  );
}