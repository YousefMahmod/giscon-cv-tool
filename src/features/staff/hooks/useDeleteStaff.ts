import { QUERIES_KEYS } from "@app/constants/queriesKeys";
import { queryClient } from "@app/providers/ReactQueryProvider";
import { useMutation } from "@tanstack/react-query";
import { staffService } from "../staff.services";

const useDeleteStaff = () => {
  return useMutation({
    mutationFn: (id: string) => staffService.deleteStaff(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERIES_KEYS.STAFF.STAFF_LIST],
      });
    },
  });
};

export default useDeleteStaff;
