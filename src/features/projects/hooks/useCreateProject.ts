import { QUERIES_KEYS } from "@app/constants/queriesKeys";
import { queryClient } from "@app/providers/ReactQueryProvider";
import { useMutation } from "@tanstack/react-query";
import { projectService } from "../projects.services";
import type { CreateProjectPayload } from "../projects.types";

const useCreateProject = () => {
  return useMutation({
    mutationFn: (payload: CreateProjectPayload) =>
      projectService.createProject(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERIES_KEYS.PROJECTS.PROJECT_LIST],
      });
    },
  });
};

export default useCreateProject;
