import { QUERIES_KEYS } from "@app/constants/queriesKeys";
import { queryClient } from "@app/providers/ReactQueryProvider";
import { useMutation } from "@tanstack/react-query";
import { staffService } from "../staff.services";
import type { UpdateStaffPayload } from "../staff.types";

interface UseUpdateStaffParams {
  id: string;
  payload: UpdateStaffPayload | FormData;
  isFormData?: boolean;
}

const useUpdateStaff = () => {
  return useMutation({
    mutationFn: ({ id, payload, isFormData = false }: UseUpdateStaffParams) =>
      staffService.updateStaff(id, payload, isFormData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERIES_KEYS.STAFF.STAFF_LIST],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERIES_KEYS.STAFF.STAFF_DETAILS, variables.id],
      });
    },
  });
};

export default useUpdateStaff;
