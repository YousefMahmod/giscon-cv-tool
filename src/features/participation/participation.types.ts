// API Response Types
export interface StaffWithProjectsApiResponse {
  staff_id: number;
  staff_name: string;
  email: string;
  phone?: string;
  job_title?: string;
  profile_picture?: string;
  bio?: string;
  skills?: string;
  created_at?: string;
  updated_at?: string;
  projects: StaffProjectItem[];
}

export interface StaffProjectItem {
  project_id: number;
  project_name: string;
  role: string;
  responsibilities: string;
  client: string;
  description: string;
  location: string;
  start_date: string;
  end_date: string;
  technologies: string;
}

// Frontend Types
export interface StaffWithProjects {
  staffId: number;
  staffName: string;
  email?: string;
  phone?: string;
  jobTitle?: string;
  profilePicture?: string;
  bio?: string;
  skills?: string;
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
