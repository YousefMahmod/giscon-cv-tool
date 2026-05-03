import { useQuery } from "@tanstack/react-query";
import { QUERIES_KEYS } from "@app/constants/queriesKeys";
import { staffService } from "../staff.services";

const useStaffDetails = (id: string) => {
  return useQuery({
    queryKey: [QUERIES_KEYS.STAFF.STAFF_DETAILS, id],
    queryFn: () => staffService.getStaffDetails(id),
    enabled: !!id,
  });
};

export default useStaffDetails;
