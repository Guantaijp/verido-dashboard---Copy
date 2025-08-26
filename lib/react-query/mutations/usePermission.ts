import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";

import useCustomToast from "@/lib/hooks/useCustomToast";
import { updateUserPermission } from "@/lib/api/permission.api";

const usePermissions = () => {
  const showToast = useCustomToast();
  const queryClient = useQueryClient();

  const updateUserPermissionMutation = useMutation({
    mutationFn: async (payload: {userId: string, addPermission: string[], removePermission: string[]}) => {
    const response = await updateUserPermission(payload.userId, payload.addPermission, payload.removePermission);
      return response;
    },
    onSuccess: (data) => {
      showToast("Success!", "Permission Updated.", "success");
      queryClient.invalidateQueries({
        queryKey: ["specified-user-permission"],
      });
      queryClient.invalidateQueries({
        queryKey: ["permission-by-role"],
      });
      queryClient.invalidateQueries({
        queryKey: ["currentUser"],
      });
    },
    onError: (error) => {
      let errDetail = error.message;
      if (error instanceof AxiosError) {
        errDetail = error?.response?.data?.message;
        if (Array.isArray(errDetail)) {
          errDetail = errDetail[0];
        }
      }
      showToast("Something went wrong", errDetail, "error");
    },
  });

  return {
    updateUserPermissionMutation,
  };
};
export default usePermissions;
