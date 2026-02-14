// src/components/Candidates/CandidatesList.jsx
import React, { useState, useEffect } from "react";
import API from "../../api/api";

export default function CandidatesList() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await API.get("/candidates");
        setCandidates(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch candidates");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  if (loading) return <p>Loading candidates...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!candidates.length) return <p>No candidates found.</p>;

  return (
    <div className="space-y-4">
      {candidates.map((candidate) => (
        <div
          key={candidate.id}
          className="bg-white p-4 rounded shadow"
        >
          <h3 className="font-bold text-lg">
            {candidate.first_name} {candidate.last_name}
          </h3>

          <p>
            <strong>Email:</strong> {candidate.email}
          </p>

          <p>
            <strong>Phone:</strong> {candidate.phone || "N/A"}
          </p>

          <p>
            <strong>Resume:</strong>{" "}
            {candidate.resume_path ? (
              <a
                href={candidate.resume_path}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View CV
              </a>
            ) : (
              "No CV uploaded"
            )}
          </p>

          <p className="text-sm text-gray-500">
            Applied on{" "}
            {new Date(candidate.created_at).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
