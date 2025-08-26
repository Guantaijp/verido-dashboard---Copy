import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import useCustomToast from "@/lib/hooks/useCustomToast";

import { ICreateNewUsers } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { createMultibranch , createMultibranchBusinessBranch } from "@/lib/api/multibranchBusiness.api";

const useMultibranch = () => {
  const queryClient = useQueryClient();
  const showToast = useCustomToast();

  const createMultibranchMutation = useMutation({
    mutationFn: async (payload: ICreateNewUsers) => {
      const response = await createMultibranch(payload);
      return response;
    },
    onSuccess: (data) => {
      showToast("Success!", "Multibrnach business Created.", "success");
      queryClient.invalidateQueries({
        queryKey: ["multibranch-business-branch"],
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
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["multibranch-businesses"],
      });
    },
  });
  const createMultibranchBusinessBranchMutation = useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: any }) => {
      const response = await createMultibranchBusinessBranch({ id, payload });
      return response;
    },
    onSuccess: (data) => {
      showToast("Success!", "Branch Created.", "success");
      queryClient.invalidateQueries({
        queryKey: ["multibranch-business-branch"],
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
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["multibranch-business-branch"],
      });
    },
  });

  return {
    createMultibranchMutation,
    createMultibranchBusinessBranchMutation
  };
};

export default useMultibranch;
