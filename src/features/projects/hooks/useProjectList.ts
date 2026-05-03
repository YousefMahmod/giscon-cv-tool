import { useQuery } from "@tanstack/react-query";
import { QUERIES_KEYS } from "@app/constants/queriesKeys";
import { projectService } from "../projects.services";

const useProjectList = () => {
  return useQuery({
    queryKey: [QUERIES_KEYS.PROJECTS.PROJECT_LIST],
    queryFn: () => projectService.getProjectList(),
  });
};

export default useProjectList;
