import { ENDPOINTS } from "@app/constants/endpoints";
import { handleApiError, type ApiError } from "@app/utils/errors";
import type { AxiosError } from "axios";
import { HttpClient } from "../../HttpClient";
import { showToast } from "../../utils/toasts";
import type {
  CreateProjectPayload,
  ProjectApiResponse,
  ProjectDetails,
  ProjectListItem,
  ProjectListResponse,
  ProjectWithStaffsApiResponse,
  UpdateProjectPayload,
} from "./projects.types";

// Transform API response to frontend format
const transformProjectListItem = (
  apiProject: ProjectApiResponse,
): ProjectListItem => {
  return {
    id: apiProject.id.toString(),
    name: apiProject.name,
    client: apiProject.client,
    description: apiProject.description || "",
    location: apiProject.location || "",
    startDate: apiProject.start_date || "",
    endDate: apiProject.end_date || "",
    technologies: apiProject.technologies
      ? apiProject.technologies.split(",").map((t) => t.trim())
      : [],
  };
};

const transformProjectDetails = (
  apiProject: ProjectWithStaffsApiResponse,
): ProjectDetails => {
  return {
    id: apiProject.id.toString(),
    name: apiProject.name,
    client: apiProject.client,
    description: apiProject.description || "",
    location: apiProject.location || "",
    startDate: apiProject.start_date || "",
    endDate: apiProject.end_date || "",
    technologies: apiProject.technologies
      ? apiProject.technologies.split(",").map((t) => t.trim())
      : [],
    staffs: apiProject.staffs.map((staff) => ({
      id: staff.id.toString(),
      name: staff.name,
      email: staff.email,
      phone: staff.phone || "",
      jobTitle: staff.job_title || "",
      imageSrc: staff.profile_picture || "",
      role: staff.role,
      responsibilities: staff.responsibilities
        ? staff.responsibilities.split(",").map((r) => r.trim())
        : [],
    })),
  };
};

export const projectService = {
  // Get all projects
  getProjectList: async (): Promise<ProjectListResponse> => {
    try {
      const response = await HttpClient.get<ProjectApiResponse[]>(
        ENDPOINTS.PROJECTS.LIST,
      );
      const transformedData = response.data.map(transformProjectListItem);
      return {
        data: transformedData,
        total: transformedData.length,
      };
    } catch (error) {
      showToast({
        title: "Failed to fetch projects",
        subtitle: handleApiError(error as AxiosError<ApiError>),
        variant: "error",
      });
      return {
        data: [],
        total: 0,
      };
    }
  },

  // Get single project with staffs
  getProjectDetails: async (id: string): Promise<ProjectDetails | null> => {
    try {
      const response = await HttpClient.get<ProjectWithStaffsApiResponse>(
        ENDPOINTS.PROJECTS.DETAILS.replace(":id", id),
      );
      return transformProjectDetails(response.data);
    } catch (error) {
      showToast({
        title: "Failed to fetch project details",
        subtitle: handleApiError(error as AxiosError<ApiError>),
        variant: "error",
      });
      throw error;
    }
  },

  createProject: async (
    payload: CreateProjectPayload,
  ): Promise<ProjectApiResponse> => {
    return await HttpClient.post<ProjectApiResponse>(
      ENDPOINTS.PROJECTS.LIST,
      payload,
    ).then((response) => {
      showToast({
        title: "Success",
        subtitle: "Project created successfully",
        variant: "success",
      });
      return response.data;
    });
  },

  updateProject: async (
    id: string,
    payload: UpdateProjectPayload,
  ): Promise<ProjectApiResponse> => {
    try {
      const response = await HttpClient.put<ProjectApiResponse>(
        ENDPOINTS.PROJECTS.DETAILS.replace(":id", id),
        payload,
      );
      showToast({
        title: "Success",
        subtitle: "Project updated successfully",
        variant: "success",
      });
      return response.data;
    } catch (error) {
      showToast({
        title: "Failed to update project",
        subtitle: handleApiError(error as AxiosError<ApiError>),
        variant: "error",
      });
      throw error;
    }
  },

  deleteProject: async (id: string): Promise<void> => {
    return await HttpClient.delete(
      ENDPOINTS.PROJECTS.DETAILS.replace(":id", id),
    ).then(() => {
      showToast({
        title: "Success",
        subtitle: "Project deleted successfully",
        variant: "success",
      });
    });
  },
};
