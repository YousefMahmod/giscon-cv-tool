import { useQuery } from "@tanstack/react-query";
import { QUERIES_KEYS } from "@app/constants/queriesKeys";
import { participationService } from "../participation.services";

const useStaffWithProjects = () => {
  return useQuery({
    queryKey: [QUERIES_KEYS.PARTICIPATION.STAFF_WITH_PROJECTS],
    queryFn: () => participationService.getStaffWithProjects(),
  });
};

export default useStaffWithProjects;
