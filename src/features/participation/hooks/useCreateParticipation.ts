import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@app/providers/ReactQueryProvider";
import { QUERIES_KEYS } from "@app/constants/queriesKeys";
import { participationService } from "../participation.services";
import type { ParticipationPayload } from "../participation.types";

const useCreateParticipation = () => {
  return useMutation({
    mutationFn: (payload: ParticipationPayload) =>
      participationService.createParticipation(payload),
    onSuccess: (_, variables) => {
      // Invalidate related queries
      queryClient.invalidateQueries({
        queryKey: [QUERIES_KEYS.PARTICIPATION.STAFF_WITH_PROJECTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERIES_KEYS.STAFF.STAFF_DETAILS, variables?.staff_id],
      });
      queryClient.invalidateQueries({
        queryKey: [
          QUERIES_KEYS.PROJECTS.PROJECT_DETAILS,
          variables?.project_id,
        ],
      });
    },
  });
};

export default useCreateParticipation;
