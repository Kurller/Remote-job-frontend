import { useState } from "react";
import { uploadCVs } from "../../api/cvApi";

export default function CVUpload({ onUploaded }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let file of files) {
      formData.append("cv", file);
    }

    try {
      setLoading(true);
      await uploadCVs(formData);
      onUploaded?.();
      alert("CV uploaded successfully");
    } catch (err) {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="file"
        multiple
        onChange={(e) => setFiles(e.target.files)}
      />

      <button
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Uploading..." : "Upload CV"}
      </button>
    </form>
  );
}
