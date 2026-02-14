import StatsCards from "./StatsCards";
import CVList from "../CV/CVList";
import JobsList from "../Jobs/JobList";
import CandidatesList from "../Candidates/CandidatesList";
import MyApplications from "./MyApplications";
import AdminApplications from "./AdminApplications";

const tabs = [
  { id: "dashboard", label: "Dashboard", component: <StatsCards /> },
  { id: "cvs", label: "CVs", component: <CVList /> },
  { id: "jobs", label: "Jobs", component: <JobsList /> },
  { id: "candidates", label: "Candidates", component: <CandidatesList /> },
  { id: "applications", label: "My Applications", component: <MyApplications /> },
  {
    id: "admin-applications",
    label: "All Applications",
    component: <AdminApplications />,
     // only visible to admins
  },
];

export default tabs;
