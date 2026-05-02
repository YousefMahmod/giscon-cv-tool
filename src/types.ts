// src/types/entities.ts

export interface Project {
  id: string;
  name: string;
  client: string;
  description: string;
  technologies: string[]; // e.g., ["React", "PostgreSQL"]
  startDate: string;
  endDate?: string; // Optional if ongoing
}

export interface Staff {
  id: string;
  name: string;
  jobTitle: string;
  bio: string;
  email: string;
  skills: string[];
  // This links to the bridge table/interface below
  projectHistory: StaffLinkedProject[];
}

export interface StaffLinkedProject {
  projectId: string; // Foreign Key to Project
  role: string; // e.g., "Lead Frontend Developer"
  responsibilities: string[]; // Specific bullet points for this person
}

export interface CVProject {
  name: string;
  client: string;
  role: string;
  period: string; // e.g., "Jan 2023 - Present"
  description: string; // General project desc
  contributions: string[]; // The staff member's specific responsibilities
  techStack: string[];
}

export interface FinalCVData {
  templateKey: string; // To know which UI to render
  personalInfo: {
    name: string;
    title: string;
    bio: string;
    skills: string[];
  };
  selectedProjects: CVProject[];
}
// we can add enum for templateKey
export interface TemplateMetadata {
  id: string;
  title: string;
  subtitle: string;
  thumbnail: string; // Path to your WebP in /public
  componentKey: "classic" | "minimalist" | "modern"; // Strict keys for your Registry
}
