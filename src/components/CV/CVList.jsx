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
    const res = await downloadCV(cvId); // send id
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = filename; // filename from cv object
    a.click();
  } catch (err) {
    console.error(err);
    alert("Failed to download CV");
  }
};

const handleDelete = async (cvId) => {
  if (!window.confirm("Delete this CV?")) return;
  try {
    await deleteCV(cvId); // send id
    loadCVs();
  } catch (err) {
    console.error(err);
    alert("Failed to delete CV");
  }
};


  return (
    <div className="p-4">
      <h2>Upload CV</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} disabled={loading || !file}>
        {loading ? "Uploading..." : "Upload"}
      </button>

      <hr className="my-4" />

      <h2>Uploaded CVs</h2>
      {cvs.length === 0 ? (
        <p>No CVs uploaded yet.</p>
      ) : (
        cvs.map((cv) => (
          <div key={cv.filename} className="border p-2 mb-2 rounded flex justify-between">
            <span>{cv.filename}</span>
            <div className="space-x-2">
              <button onClick={() => handleDownload(cv.id)} className="px-2 py-1 bg-blue-500 text-white rounded">
                Download
              </button>
              <button onClick={() => handleDelete(cv.id)} className="px-2 py-1 bg-red-500 text-white rounded">
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
