// API Response Types (matches actual backend structure)
export interface ProjectApiResponse {
  id: number;
  name: string;
  client: string;
  description?: string;
  location?: string;
  start_date?: string;
  end_date?: string;
  technologies?: string; // comma-separated string from API
}

export interface ProjectWithStaffsApiResponse extends ProjectApiResponse {
  staffs: StaffInProject[];
}

export interface StaffInProject {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  job_title: string | null;
  profile_picture: string | null;
  role: string;
  responsibilities: string | null;
}

// Frontend Types (transformed for UI consumption)
export interface ProjectListItem {
  id: string;
  name: string;
  client: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  technologies: string[];
}

export interface ProjectDetails {
  id: string;
  name: string;
  client: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  technologies: string[];
  staffs: ProjectStaff[];
}

export interface ProjectStaff {
  id: string;
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  imageSrc: string;
  role: string;
  responsibilities: string[];
}

// API Request Types
export interface CreateProjectPayload {
  name: string;
  client: string;
  description?: string;
  location?: string;
  start_date?: string;
  end_date?: string;
  technologies?: string; // comma-separated string for API
}

export interface UpdateProjectPayload {
  name?: string;
  client?: string;
  description?: string;
  location?: string;
  start_date?: string;
  end_date?: string;
  technologies?: string; // comma-separated string for API
}

// List Response (no pagination in actual API)
export interface ProjectListResponse {
  data: ProjectListItem[];
  total: number;
}
