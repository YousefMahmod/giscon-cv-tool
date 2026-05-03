export const ROUTES = {
  // Staff
  staffList: {
    name: "Staff List",
    path: "/staff",
  },
  staffNew: {
    name: "New Staff",
    path: "/staff/new",
  },
  staffDetails: {
    name: "Staff Details",
    path: "/staff/:id",
  },
  staffEdit: {
    name: "Edit Staff",
    path: "/staff/:id/edit",
  },

  // Projects
  projectList: {
    name: "Project List",
    path: "/projects",
  },
  projectNew: {
    name: "New Project",
    path: "/projects/new",
  },
  projectDetails: {
    name: "Project Details",
    path: "/projects/:id",
  },
  projectEdit: {
    name: "Edit Project",
    path: "/projects/:id/edit",
  },

  // Participation
  participationNew: {
    name: "New Participation",
    path: "/participation/new",
  },

  // CV Generator
  cvGenerator: {
    name: "CV Generator",
    path: "/generator",
  },
  cvPreview: {
    name: "CV Preview",
    path: "/cv-preview",
  },

  // Root
  root: {
    name: "Home",
    path: "/",
  },
};
