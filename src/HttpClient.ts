import axios, { type InternalAxiosRequestConfig } from "axios";

// ---------------------- Axios Instance ----------------------

export const HttpClient = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 60 * 1000,
  withCredentials: false,
});

HttpClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const { isForm } = config?.headers;

    config.headers.set("Accept", "application/json");
    config.headers.set(
      "Content-Type",
      isForm ? "multipart/form-data" : "application/json",
    );

    // Clean up custom header flags after use
    try {
      (config.headers as any).delete?.("isForm");

      delete (config.headers as any)["isForm"];
    } catch {
      // Ignore cleanup errors
    }

    return config;
  },
);

// ---------------------- Response Interceptor ----------------------
HttpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(error);
  },
);
