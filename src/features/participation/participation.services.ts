import { HttpClient } from "@app/HttpClient";
import type {
  StaffWithProjectsApiResponse,
  ParticipationPayload,
  ParticipationResponse,
} from "./participation.types";
import { ENDPOINTS } from "@app/constants/endpoints";

export const participationService = {
  getStaffWithProjects: async (): Promise<StaffWithProjectsApiResponse[]> => {
    const response = await HttpClient.get<StaffWithProjectsApiResponse[]>(
      ENDPOINTS.STAFF.WITH_PROJECTS,
    );
    return response.data;
  },

  createParticipation: async (
    payload: ParticipationPayload,
  ): Promise<ParticipationResponse> => {
    const response = await HttpClient.post<ParticipationResponse>(
      ENDPOINTS.PARTICIPATION.CREATE,
      payload,
    );
    return response.data;
  },
};
