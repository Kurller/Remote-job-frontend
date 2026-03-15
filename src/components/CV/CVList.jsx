import React, { useState, useEffect } from "react";
import { fetchCVs, uploadCVs, deleteCV, downloadCV } from "../../api/cvApi";

export default function CVList() {
  const [cvs, setCVs] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadCVs = async () => {
    try {
      const res = await fetchCVs();
      setCVs(res.data || []);
    } catch (err) {
      console.error(err);
      setCVs([]);
    }
  };

  useEffect(() => {
    loadCVs();
  }, []);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first.");

    const formData = new FormData();
    formData.append("cv", file);

    try {
      setLoading(true);
      const res = await uploadCVs(formData);
      alert(res.data.message || "CV uploaded successfully!");
      setFile(null);
      loadCVs();
    } catch (err) {
      console.error(err);
      alert("Failed to upload CV: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (cvId, filename) => {
    try {
      const res = await downloadCV(cvId);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
    } catch (err) {
      console.error(err);
      alert("Failed to download CV");
    }
  };

  const handleDelete = async (cvId) => {
    if (!window.confirm("Delete this CV?")) return;

    try {
      await deleteCV(cvId);
      loadCVs();
    } catch (err) {
      console.error(err);
      alert("Failed to delete CV");
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {/* Upload Section */}
      <h2 className="text-lg font-semibold mb-2">Upload CV</h2>

      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 rounded w-full"
        />

        <button
          onClick={handleUpload}
          disabled={loading || !file}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>

      <hr className="my-6" />

      {/* CV List */}
      <h2 className="text-lg font-semibold mb-3">Uploaded CVs</h2>

      {cvs.length === 0 ? (
        <p className="text-gray-500">No CVs uploaded yet.</p>
      ) : (
        <div className="space-y-3">
          {cvs.map((cv) => (
            <div
              key={cv.id}
              className="border p-3 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >
              {/* Filename */}
              <span className="break-all font-medium">
                {cv.filename}
              </span>

              {/* Buttons */}
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={() => handleDownload(cv.id, cv.filename)}
                  className="flex-1 sm:flex-none bg-blue-500 text-white px-3 py-2 rounded"
                >
                  Download
                </button>

                <button
                  onClick={() => handleDelete(cv.id)}
                  className="flex-1 sm:flex-none bg-red-500 text-white px-3 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}