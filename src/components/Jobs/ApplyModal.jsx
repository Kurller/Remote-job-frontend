import { useEffect, useState } from "react";
import API from "../../api/api";

export default function ApplyModal({ job, close }) {
  const [cvs, setCVs] = useState([]);
  const [cvId, setCvId] = useState("");

  useEffect(() => {
    API.get("/cvs").then(res => setCVs(res.data));
  }, []);

  const apply = async () => {
    try {
      await API.post("/applications/apply", {
        job_id: job.id,
        cv_id: cvId,
      });
      alert("Application submitted");
      close();
    } catch (err) {
      console.error(err);
      alert("Failed to submit application");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 overflow-y-auto max-h-[90vh]">
        <h3 className="font-bold text-lg mb-4 text-center">
          Apply for {job.title}
        </h3>

        <select
          className="w-full border rounded p-2 mb-4"
          value={cvId}
          onChange={(e) => setCvId(e.target.value)}
        >
          <option value="">Select CV</option>
          {cvs.map((cv) => (
            <option key={cv.id} value={cv.id}>
              {cv.originalname}
            </option>
          ))}
        </select>

        <div className="flex flex-col sm:flex-row justify-end gap-2">
          <button
            onClick={close}
            className="px-3 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            disabled={!cvId}
            onClick={apply}
            className={`px-3 py-2 rounded text-white ${
              cvId ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}