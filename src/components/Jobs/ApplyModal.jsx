import { useEffect, useState } from "react";
import API from "../../api/api";

export default function ApplyModal({ job, close }) {
  const [cvs, setCVs] = useState([]);
  const [cvId, setCvId] = useState("");

  useEffect(() => {
    API.get("/cvs").then(res => setCVs(res.data));
  }, []);

  const apply = async () => {
    await API.post("/applications/apply", {
      job_id: job.id,
      cv_id: cvId
    });

    alert("Application submitted");
    close();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-96">
        <h3 className="font-bold mb-3">
          Apply for {job.title}
        </h3>

        <select
          className="w-full border p-2 mb-4"
          value={cvId}
          onChange={e => setCvId(e.target.value)}
        >
          <option value="">Select CV</option>
          {cvs.map(cv => (
            <option key={cv.id} value={cv.id}>
              {cv.originalname}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-2">
          <button onClick={close}>Cancel</button>
          <button
            disabled={!cvId}
            onClick={apply}
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
