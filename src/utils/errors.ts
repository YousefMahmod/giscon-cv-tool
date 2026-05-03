import type { AxiosError } from "axios";

export const handleApiError = (error: AxiosError<ApiError>) => {
  if (error?.response) {
    const apiError = error.response.data;
    const errorObj = apiError.errors ? apiError.errors[0] : null;

    return errorObj?.message || "Something went wrong";
  }
  return "Network error. Please check your connection.";
};

export interface ApiError {
  error: string;
  errors?: {
    field: string;
    message: string;
  }[];
}
