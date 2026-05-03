import { QUERIES_KEYS } from "@app/constants/queriesKeys";
import { queryClient } from "@app/providers/ReactQueryProvider";
import { useMutation } from "@tanstack/react-query";
import { projectService } from "../projects.services";

const useDeleteProject = () => {
  return useMutation({
    mutationFn: (id: string) => projectService.deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERIES_KEYS.PROJECTS.PROJECT_LIST],
      });
    },
  });
};

export default useDeleteProject;
