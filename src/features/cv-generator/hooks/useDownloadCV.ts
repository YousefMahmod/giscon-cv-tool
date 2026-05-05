import { useMutation } from "@tanstack/react-query";
import { cvService } from "../cv.services";
import type { DownloadCVPayload } from "../cv.types";
import { showToast } from "@app/utils/toasts";

interface DownloadCVParams {
  staffId: number;
  payload: DownloadCVPayload;
  staffName: string;
}

const useDownloadCV = () => {
  return useMutation({
    mutationFn: ({ staffId, payload }: DownloadCVParams) =>
      cvService.downloadCV(staffId, payload),

    onSuccess: (blob, variables) => {
      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const staffName = variables.staffName.replace(/\s+/g, "_").toLowerCase();
      const timestamp = new Date().toISOString().split("T")[0];
      link.download = `CV_${staffName}_${timestamp}.pdf`;

      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      showToast({
        title: "PDF Downloaded",
        subtitle: "Your CV has been downloaded successfully!",
        variant: "success",
      });
    },
    onError: (error: any) => {
      console.error("Error downloading CV:", error);
      showToast({
        title: "Download Failed",
        subtitle:
          error?.response?.data?.error ||
          "Failed to download CV. Please try again.",
        variant: "error",
      });
    },
  });
};

export default useDownloadCV;
