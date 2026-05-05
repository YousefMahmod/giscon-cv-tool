import { QUERIES_KEYS } from "@app/constants/queriesKeys";
import { queryClient } from "@app/providers/ReactQueryProvider";
import { useMutation } from "@tanstack/react-query";
import { staffService } from "../staff.services";
import type { CreateStaffPayload } from "../staff.types";

interface CreateStaffParams {
  payload: CreateStaffPayload | FormData;
  isFormData?: boolean;
}

const useCreateStaff = () => {
  return useMutation({
    mutationFn: ({ payload, isFormData = false }: CreateStaffParams) =>
      staffService.createStaff(payload, isFormData),
    onSuccess: () => {
      // Invalidate staff list to refetch
      queryClient.invalidateQueries({
        queryKey: [QUERIES_KEYS.STAFF.STAFF_LIST],
      });
    },
  });
};

export default useCreateStaff;
