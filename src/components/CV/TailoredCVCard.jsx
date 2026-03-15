import React from "react";
import TailoredCVActions from "./TailoredCVActions";

export default function TailoredCVCard({ data }) {
  if (!data) return null;

  return (
    <div className="mt-6 bg-white shadow rounded-lg p-4 sm:p-6 border max-w-xl mx-auto">
      {/* Header */}
      <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-800">
        Tailored CV Ready ✅
      </h3>

      {/* CV Details */}
      <div className="space-y-2 text-sm sm:text-base text-gray-700">
        <p className="break-words">
          <strong>Job Title:</strong> {data.jobTitle || "Unknown"}
        </p>

        <p className="break-words">
          <strong>Filename:</strong> {data.filename || "N/A"}
        </p>

        <p className="break-words">
          <strong>AI Generated:</strong>{" "}
          <span
            className={`font-semibold ${
              data.ai_generated ? "text-green-600" : "text-yellow-600"
            }`}
          >
            {data.ai_generated ? "Yes" : "No"}
          </span>
        </p>

        <p className="mt-2 font-semibold">AI Summary:</p>
        <div className="bg-gray-50 border p-3 rounded text-sm sm:text-base break-words">
          {data.ai_summary || "Summary not generated yet."}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 sm:mt-6">
        <TailoredCVActions
          cv_id={data.tailoredcvid}
          job_id={data.jobId || data.job_id}
        />
      </div>
    </div>
  );
}