import CVUpload from "../components/CV/CVUploadWithProgress";

export default function CVUploadPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="max-w-md mx-auto bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
          Upload CVs
        </h1>

        <CVUpload onUploaded={() => console.log("CVs uploaded")} />
      </div>
    </div>
  );
}