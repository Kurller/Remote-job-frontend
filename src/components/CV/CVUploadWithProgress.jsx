import { useState } from "react";
import { uploadCVs } from "../../api/cvApi";

export default function CVUpload({ onUploaded }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    // ✅ Validate size (mobile-safe)
    if (selectedFile.size > 5 * 1024 * 1024) {
      alert("File must be less than 5MB");
      return;
    }

    // ✅ Validate type (mobile-safe)
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Only PDF or Word files allowed");
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ must be first

    if (!file) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("cv", file);

    try {
      setLoading(true);

      // ❗ DO NOT manually set Content-Type
      await uploadCVs(formData);

      alert("CV uploaded successfully");
      onUploaded?.();

      // ✅ Reset properly (important for mobile)
      setFile(null);
      e.target.reset();

    } catch (err) {
      console.error("Upload error:", err);

      alert(
        err?.response?.data?.message ||
        err.message ||
        "Upload failed"
      );
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

      {/* ✅ Mobile-friendly file input */}
      <input
        type="file"
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={handleFileChange}
        className="w-full border p-2 rounded"
      />

      {/* ✅ File preview */}
      {file && (
        <p className="text-sm text-gray-600 break-all">
          Selected: {file.name}
        </p>
      )}

      {/* ✅ Button with explicit type */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white px-4 py-2 rounded active:scale-95 hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload CV"}
      </button>
    </form>
  );
}