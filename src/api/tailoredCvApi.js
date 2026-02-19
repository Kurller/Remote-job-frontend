import API from "./api";

// Generate tailored CV
export const generateTailoredCV = async ({ cv_id, job_id, force = false }) => {
  return API.post("/tailored-cvs", {
    cv_id,
    job_id,
    force,
  });
};



// Submit tailored CV
export const submitTailoredCV = async (jobId, cvId) => {
  return API.post("/applications", {
    jobId,
    cvId,
  });
};

