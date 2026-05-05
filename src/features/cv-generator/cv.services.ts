import { HttpClient } from "@app/HttpClient";
import type { DownloadCVPayload, TemplateApiResponse } from "./cv.types";

// CV generation services (placeholder for future PDF export)
export const cvService = {
  // GET /templates - Get all CV templates
  getTemplates: async (): Promise<TemplateApiResponse[]> => {
    const response = await HttpClient.get<TemplateApiResponse[]>("/templates");
    return response.data;
  },

  // POST /download-cv/:id - Download staff CV as PDF
  downloadCV: async (
    staffId: number,
    payload: DownloadCVPayload,
  ): Promise<Blob> => {
    const response = await HttpClient.post<Blob>(
      `/download-cv/${staffId}`,
      payload,
      {
        responseType: "blob", // Important: tells axios to handle binary data
      },
    );
    return response.data;
  },
};
