import React from "react";
import TailoredCVActions from "./TailoredCVActions";

export default function TailoredCVCard({ data }) {
  if (!data) return null;

  return (
    <div className="mt-8 bg-white shadow rounded-lg p-6 border">
      <h3 className="text-xl font-bold mb-4 text-gray-800">
        Tailored CV Ready ✅
      </h3>

      <div className="space-y-2 text-sm text-gray-700">
        <p>
          <strong>Job Title:</strong> {data.jobTitle}
        </p>

        <p>
          <strong>Filename:</strong> {data.filename}
        </p>

        <p>
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
        <div className="bg-gray-50 border p-3 rounded">
          {data.ai_summary}
        </div>
      </div>

      <div className="mt-6">
        <TailoredCVActions
          tailoredCvId={data.tailoredcvid}
          filename={data.filename}
        />
      </div>
    </div>
  );
}
