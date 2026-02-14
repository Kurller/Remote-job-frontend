import CVUpload from "../components/CV/CVUploadWithProgress";

export default function CVUploadPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Upload CVs</h1>
      <CVUpload onUploaded={() => console.log("CVs uploaded")} />
    </div>
  );
}
