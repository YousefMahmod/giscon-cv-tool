import type { StaffWithProjectsApiResponse } from "../participation/participation.types";

// Template API Types
export interface TemplateApiResponse {
  id: number;
  template_name: string;
  title: string;
  subtitle: string;
  img: string;
  version: string;
  created_at: string;
  updated_at: string;
}

// Download CV API Types
export interface DownloadCVPayload {
  template_name: string;
  project_ids: string; // comma-separated project IDs
}

export interface CVGeneratorState {
  selectedStaff: StaffWithProjectsApiResponse | null;
  selectedProjects: number[];
  selectedTemplate: string | null;
  currentStep: number;
}
