import { lazy } from "react";
import { Navigate } from "react-router-dom";

// Lazy load pages
const StaffListPage = lazy(() => import("@app/pages/staff/StaffListPage"));
const StaffDetailsPage = lazy(() => import("@app/pages/staff/StaffDetailsPage"));
const StaffFormPage = lazy(() => import("@app/pages/staff/StaffFormPage"));
const ProjectListPage = lazy(() => import("@app/pages/projects/ProjectListPage"));
const ProjectDetailsPage = lazy(
  () => import("@app/pages/projects/ProjectDetailsPage")
);
const ProjectFormPage = lazy(() => import("@app/pages/projects/ProjectFormPage"));
const ParticipationFormPage = lazy(
  () => import("@app/pages/participation/ParticipationFormPage")
);
const CVGeneratorPage = lazy(
  () => import("@app/pages/cv-generator/CVGeneratorPage")
);
const CVPreviewPage = lazy(() => import("@app/pages/cv-generator/CVPreviewPage"));

export const routes = [
  // Redirect root
  { path: "/", element: <Navigate to="/staff" replace /> },

  // Staff
  { path: "/staff", element: <StaffListPage /> },
  { path: "/staff/new", element: <StaffFormPage /> },
  { path: "/staff/:id", element: <StaffDetailsPage /> },
  { path: "/staff/:id/edit", element: <StaffFormPage /> },

  // Projects
  { path: "/projects", element: <ProjectListPage /> },
  { path: "/projects/new", element: <ProjectFormPage /> },
  { path: "/projects/:id", element: <ProjectDetailsPage /> },
  { path: "/projects/:id/edit", element: <ProjectFormPage /> },

  // Participation
  { path: "/participation/new", element: <ParticipationFormPage /> },

  // CV Generator
  { path: "/generator", element: <CVGeneratorPage /> },
  { path: "/cv-preview", element: <CVPreviewPage /> }, // No layout
];
