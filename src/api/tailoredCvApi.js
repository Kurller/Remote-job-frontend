import API from "./api";

// Generate tailored CV
export const generateTailoredCV = async (jobId, userId, data) => {
  return API.post("/tailored-cvs", {
    jobId,
    userId,
    ...data,
  });
};


// Submit tailored CV
export const submitTailoredCV = async (jobId, cvId) => {
  return API.post("/applications", {
    jobId,
    cvId,
  });
};

