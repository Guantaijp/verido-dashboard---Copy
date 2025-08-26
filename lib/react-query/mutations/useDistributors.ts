import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import useCustomToast from "@/lib/hooks/useCustomToast";

import { ICreateNewUsers } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { createDistributors  , createDistributorBranch} from "@/lib/api/distributors.api";

const useDistributors = () => {
  const queryClient = useQueryClient();
  const showToast = useCustomToast();

  const createDistributorMutation = useMutation({
    mutationFn: async (payload: ICreateNewUsers) => {
      const response = await createDistributors(payload);
      return response;
    },
    onSuccess: (data) => {
      showToast("Success!", "Distributor Created.", "success");
      queryClient.invalidateQueries({
        queryKey: ["distributors"],
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
        queryKey: ["distributors"],
      });
    },
  });
  const createDistributorBranchMutation = useMutation({
    mutationFn: async ({id , payload}: {id:string , payload:any}) => {
      const response = await createDistributorBranch({id , payload});
      return response;
    },
    onSuccess: (data) => {
      showToast("Success!", "Branch Created.", "success");
      queryClient.invalidateQueries({
        queryKey: ["distributor-branches"],
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
        queryKey: ["distributor-branches"],
      });
    },
  });

  return {
    createDistributorMutation,
    createDistributorBranchMutation
  };
};

export default useDistributors;
