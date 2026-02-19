// src/api/tailorcvApi.js
import API from "./api"; // your central Axios instance

// Generate or regenerate tailored CV
export const generateTailoredCV = async ({ cv_id, job_id, force = false }) => {
  return API.post("/tailored-cvs", { cv_id, job_id, force });
};

// Submit CV application
export const submitTailoredCV = async (jobId, cvId) => {
  return API.post("/applications", { jobId, cvId });
};
