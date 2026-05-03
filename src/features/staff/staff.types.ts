// API Response Types (matches actual backend structure)
export interface StaffApiResponse {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  bio: string | null;
  job_title?: string;
  skills: string; // comma-separated string from API
  profile_picture: string | null;
  created_at: string;
  updated_at: string;
}

export interface StaffWithProjectsApiResponse extends StaffApiResponse {
  projects: ProjectParticipation[];
}

export interface ProjectParticipation {
  participation_id: number;
  project_id: number;
  project_name: string;
  client: string;
  role: string;
  responsibilities: string | null;
  start_date: string;
  end_date: string;
}

// Frontend Types (transformed for UI consumption)
export interface StaffListItem {
  id: string;
  imageSrc: string;
  name: string;
  jobTitle: string;
  email: string;
  skills: string[];
}

export interface StaffDetails {
  id: string;
  name: string;
  email: string;
  jobTitle?: string;
  phone: string;
  bio: string;
  skills: string[];
  imageSrc: string;
  projects: StaffProject[];
}

export interface StaffProject {
  participationId: string;
  projectId: string;
  projectName: string;
  client: string;
  role: string;
  responsibilities: string[];
  startDate: string;
  endDate: string;
}

// API Request Types
export interface CreateStaffPayload {
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  skills?: string; // comma-separated string for API
  profile_picture?: string;
}

export interface UpdateStaffPayload {
  name?: string;
  email?: string;
  phone?: string;
  bio?: string;
  skills?: string; // comma-separated string for API
  profile_picture?: string;
}

// List Response (no pagination in actual API)
export interface StaffListResponse {
  data: StaffListItem[];
  total: number;
}
