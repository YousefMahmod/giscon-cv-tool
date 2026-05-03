import { QUERIES_KEYS } from "@app/constants/queriesKeys";
import { queryClient } from "@app/providers/ReactQueryProvider";
import { useMutation } from "@tanstack/react-query";
import { projectService } from "../projects.services";
import type { UpdateProjectPayload } from "../projects.types";

interface UpdateProjectParams {
  id: string;
  payload: UpdateProjectPayload;
}

const useUpdateProject = () => {
  return useMutation({
    mutationFn: ({ id, payload }: UpdateProjectParams) =>
      projectService.updateProject(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERIES_KEYS.PROJECTS.PROJECT_LIST],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERIES_KEYS.PROJECTS.PROJECT_DETAILS, variables.id],
      });
    },
  });
};

export default useUpdateProject;
