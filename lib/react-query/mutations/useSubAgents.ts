import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { changeBusinessStatus } from "@/lib/api/businessOwners.api";
import useCustomToast from "@/lib/hooks/useCustomToast";
import { AxiosError } from "axios";
const useSubAgents = () => {
  const showToast = useCustomToast();
  const queryClient = useQueryClient();


  const changeBusinessStatusMutation = useMutation({
    mutationFn: async ({ subAgentId, status }: { subAgentId: string; status: string }) => {
      const response = await changeBusinessStatus(subAgentId, status);
      return response;
    },
    onSuccess: (data) => {
      showToast("Success!", "Subagent status changed successfully.", "success");
      queryClient.invalidateQueries({
        queryKey: ["businesses , business"],
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
    changeBusinessStatusMutation,
  };
};

export default useSubAgents;
