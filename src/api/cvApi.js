import API from "./api";

// Get all CVs
export const fetchCVs = () => API.get("/cvs");

// Upload CV (FIXED)
export const uploadCVs = (formData) =>
  API.post("/cvs/upload", formData);

// Delete CV
export const deleteCV = (cvId) =>
  API.delete(`/cvs/delete/${cvId}`);

// Download CV
export const downloadCV = (cvId) =>
  API.get(`/cvs/download/${cvId}`, {
    responseType: "blob",
  });