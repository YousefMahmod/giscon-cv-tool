import { useQuery } from "@tanstack/react-query";
import { QUERIES_KEYS } from "../../../constants/queriesKeys";
import { staffService } from "../staff.services";

const useStaffList = () => {
  return useQuery({
    queryKey: [QUERIES_KEYS.STAFF.STAFF_LIST],
    queryFn: () => staffService.getStaffList(),
  });
};

export default useStaffList;
