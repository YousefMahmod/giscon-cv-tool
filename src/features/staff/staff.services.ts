import { ENDPOINTS } from "@app/constants/endpoints";
import { handleApiError, type ApiError } from "@app/utils/errors";
import type { AxiosError } from "axios";
import { HttpClient } from "../../HttpClient";
import { showToast } from "../../utils/toasts";
import type {
  CreateStaffPayload,
  StaffApiResponse,
  StaffDetails,
  StaffListItem,
  StaffListResponse,
  StaffWithProjectsApiResponse,
  UpdateStaffPayload,
} from "./staff.types";

// Transform API response to frontend format
const transformStaffListItem = (apiStaff: StaffApiResponse): StaffListItem => {
  return {
    id: apiStaff.id.toString(),
    imageSrc: apiStaff.profile_picture || "",
    name: apiStaff.name,
    jobTitle: apiStaff.job_title || "N/A", // Use job title if available, otherwise default
    email: apiStaff.email,
    skills: apiStaff.skills
      ? apiStaff.skills.split(",").map((s) => s.trim())
      : [],
  };
};

const transformStaffDetails = (
  apiStaff: StaffWithProjectsApiResponse,
): StaffDetails => {
  return {
    id: apiStaff.id.toString(),
    name: apiStaff.name,
    email: apiStaff.email,
    jobTitle: apiStaff.job_title || "",
    phone: apiStaff.phone || "",
    bio: apiStaff.bio || "",
    skills: apiStaff.skills
      ? apiStaff.skills.split(",").map((s) => s.trim())
      : [],
    imageSrc: apiStaff.profile_picture || "",
    projects: apiStaff.projects.map((project) => ({
      participationId: project.participation_id.toString(),
      projectId: project.project_id.toString(),
      projectName: project.project_name,
      client: project.client,
      role: project.role,
      responsibilities: project.responsibilities
        ? project.responsibilities.split(",").map((r) => r.trim())
        : [],
      startDate: project.start_date,
      endDate: project.end_date,
    })),
  };
};

export const staffService = {
  // Get all staff
  getStaffList: async (): Promise<StaffListResponse> => {
    try {
      const response = await HttpClient.get<StaffApiResponse[]>(
        ENDPOINTS.STAFF.LIST,
      );
      const transformedData = response.data.map(transformStaffListItem);
      return {
        data: transformedData,
        total: transformedData.length,
      };
    } catch (error) {
      showToast({
        title: "Failed to fetch staff",
        subtitle: handleApiError(error as AxiosError<ApiError>),
        variant: "error",
      });
      return {
        data: [],
        total: 0,
      };
    }
  },

  // Get single staff with projects
  getStaffDetails: async (id: string): Promise<StaffDetails | null> => {
    try {
      const response = await HttpClient.get<StaffWithProjectsApiResponse>(
        ENDPOINTS.STAFF.DETAILS.replace(":id", id),
      );
      return transformStaffDetails(response.data);
    } catch (error) {
      showToast({
        title: "Failed to fetch staff details",
        subtitle: handleApiError(error as AxiosError<ApiError>),
        variant: "error",
      });
      return null;
    }
  },

  createStaff: async (
    payload: CreateStaffPayload | FormData,
    isFormData = false,
  ): Promise<StaffApiResponse> => {
    return await HttpClient.post<StaffApiResponse>(
      ENDPOINTS.STAFF.LIST,
      payload,
      isFormData ? { headers: { isForm: true } } : undefined,
    ).then((response) => {
      showToast({
        title: "Success",
        subtitle: "Staff member created successfully",
        variant: "success",
      });
      return response.data;
    });
  },

  updateStaff: async (
    id: string,
    payload: UpdateStaffPayload | FormData,
    isFormData = false,
  ): Promise<StaffApiResponse> => {
    try {
      const response = await HttpClient.put<StaffApiResponse>(
        ENDPOINTS.STAFF.DETAILS.replace(":id", id),
        payload,
        isFormData ? { headers: { isForm: true } } : undefined,
      );
      showToast({
        title: "Success",
        subtitle: "Staff member updated successfully",
        variant: "success",
      });
      return response.data;
    } catch (error) {
      showToast({
        title: "Failed to update staff",
        subtitle: handleApiError(error as AxiosError<ApiError>),
        variant: "error",
      });
      throw error;
    }
  },

  deleteStaff: async (id: string): Promise<void> => {
    return await HttpClient.delete(
      ENDPOINTS.STAFF.DETAILS.replace(":id", id),
    ).then(() => {
      showToast({
        title: "Success",
        subtitle: "Staff member deleted successfully",
        variant: "success",
      });
    });
  },
};
