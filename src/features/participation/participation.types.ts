// API Response Types
export interface StaffWithProjectsApiResponse {
  staff_name: string;
  staff_id: number;
  projects: StaffProjectItem[];
}

export interface StaffProjectItem {
  project_id: number;
  project_name: string;
  role: string;
  responsibilities: string;
}

// Frontend Types
export interface StaffWithProjects {
  staffName: string;
  staffId: number;
  projects: StaffProjectItem[];
}

export interface ParticipationPayload {
  staff_id: number;
  staff_name: string;
  project_id: number;
  project_name: string;
  role: string;
  responsibilities?: string;
}

export interface ParticipationResponse {
  message: string;
  participation_id?: number;
}
