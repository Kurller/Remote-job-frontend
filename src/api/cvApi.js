import API from "./api"; // your axios instance

export const fetchCVs = () => API.get("/cvs");

export const uploadCVs = (formData) =>
  API.post("/cvs/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteCV = (cvId) => API.delete(`/cvs/delete/${cvId}`);

export const downloadCV = (cvId) =>
  API.get(`/cvs/download/${cvId}`, { responseType: "blob" });
