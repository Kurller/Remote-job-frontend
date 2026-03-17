import { useState } from "react";
import { uploadCVs } from "../../api/cvApi";

export default function CVUpload({ onUploaded, user, job }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("cv", file);
    formData.append("userId", user?.id);
    formData.append("jobId", job?.id);

    try {
      setLoading(true);
      await uploadCVs(formData);
      onUploaded?.();
      alert("CV uploaded successfully");
      setFile(null);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-lg font-semibold">Upload CV</h2>

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={(e) => setFile(e.target.files[0])}
        className="w-full border p-2 rounded"
      />

      {file && (
        <p className="text-sm text-gray-600 break-all">
          {file.name}
        </p>
      )}

      <button
        disabled={loading}
        className="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload CV"}
      </button>
    </form>
  );
}