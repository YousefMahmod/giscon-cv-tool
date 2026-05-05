import { QUERIES_KEYS } from "@app/constants/queriesKeys";
import { useQuery } from "@tanstack/react-query";
import { cvService } from "../cv.services";

const useTemplates = (enabled = true) => {
  return useQuery({
    queryKey: [QUERIES_KEYS.TEMPLATES],
    queryFn: cvService.getTemplates,
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled,
  });
};

export default useTemplates;
