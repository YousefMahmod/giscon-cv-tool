import { Navigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { lazy } from "react";

// Lazy load pages
const StaffList = lazy(() => import("@app/features/staff/StaffList"));
const StaffDetails = lazy(
  () => import("@app/features/staff/views/StaffDetails"),
);
const StaffForm = lazy(() => import("@app/features/staff/views/StaffForm"));
const ProjectList = lazy(() => import("@app/features/projects/ProjectList"));
const ProjectDetailsPage = lazy(
  () => import("@app/features/projects/views/ProjectDetails"),
);
const ProjectFormPage = lazy(
  () => import("@app/features/projects/views/ProjectForm"),
);
const ParticipationFormPage = lazy(
  () => import("@app/features/participation/ParticipationForm"),
);
const CVGeneratorPage = lazy(
  () => import("@app/features/cv-generator/CVGenerator"),
);
const CVPreviewPage = lazy(
  () => import("@app/features/cv-generator/views/CVPreviewPage"),
);

export const routes = [
  // Redirect root
  {
    path: ROUTES.root.path,
    element: <Navigate to={ROUTES.staffList.path} replace />,
  },

  // Staff
  { path: ROUTES.staffList.path, element: <StaffList /> },
  { path: ROUTES.staffNew.path, element: <StaffForm /> },
  { path: ROUTES.staffDetails.path, element: <StaffDetails /> },
  { path: ROUTES.staffEdit.path, element: <StaffForm /> },

  // Projects
  { path: ROUTES.projectList.path, element: <ProjectList /> },
  { path: ROUTES.projectNew.path, element: <ProjectFormPage /> },
  { path: ROUTES.projectDetails.path, element: <ProjectDetailsPage /> },
  { path: ROUTES.projectEdit.path, element: <ProjectFormPage /> },

  // Participation
  { path: ROUTES.participationNew.path, element: <ParticipationFormPage /> },

  // CV Generator
  { path: ROUTES.cvGenerator.path, element: <CVGeneratorPage /> },
  { path: ROUTES.cvPreview.path, element: <CVPreviewPage /> }, // No layout
];
