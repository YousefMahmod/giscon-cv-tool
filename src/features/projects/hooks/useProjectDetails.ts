import { useQuery } from "@tanstack/react-query";
import { QUERIES_KEYS } from "@app/constants/queriesKeys";
import { projectService } from "../projects.services";

const useProjectDetails = (id: string) => {
  return useQuery({
    queryKey: [QUERIES_KEYS.PROJECTS.PROJECT_DETAILS, id],
    queryFn: () => projectService.getProjectDetails(id),
    enabled: !!id,
  });
};

export default useProjectDetails;
