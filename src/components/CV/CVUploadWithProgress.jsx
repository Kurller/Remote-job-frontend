import { useState } from "react";
import { uploadCVs } from "../../api/cvApi";

export default function CVUpload({ onUploaded }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!files.length) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    for (let file of files) {
      formData.append("cv", file);
    }

    try {
      setLoading(true);
      await uploadCVs(formData);
      onUploaded?.();
      alert("CV uploaded successfully");
      setFiles([]);
    } catch (err) {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto p-4 bg-white rounded shadow"
    >
      <h2 className="text-lg font-semibold">Upload CV</h2>

      {/* File Input */}
      <input
        type="file"
        multiple
        onChange={(e) => setFiles(Array.from(e.target.files))}
        className="w-full border p-2 rounded"
      />

      {/* Show Selected Files */}
      {files.length > 0 && (
        <div className="text-sm text-gray-600 space-y-1">
          {files.map((file, index) => (
            <p key={index} className="break-all">
              {file.name}
            </p>
          ))}
        </div>
      )}

      {/* Upload Button */}
      <button
        disabled={loading}
        className="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload CV"}
      </button>
    </form>
  );
}