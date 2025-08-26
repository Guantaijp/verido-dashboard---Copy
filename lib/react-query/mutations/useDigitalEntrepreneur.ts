import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import useCustomToast from "@/lib/hooks/useCustomToast";

import { ICreateNewUsers} from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { createDigitalEntrepreneur } from "@/lib/api/digitalEntreprenuer.api";

const useDigitalEntrepreneur = () => {
  const queryClient = useQueryClient();
  const showToast = useCustomToast();

  const createDigitalEntrepreneurMutation = useMutation({
    mutationFn: async (payload: ICreateNewUsers) => {
      const response = await createDigitalEntrepreneur(payload);
      return response;
    },
    onSuccess: (data) => {
      showToast("Success!", "Digital Entrepreneur Created.", "success");
      queryClient.invalidateQueries({
        queryKey: ["digital-entrepreneurs"],
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
        queryKey: ["digital-entrepreneurs"],
      });
    },
  });
  



  return {
    createDigitalEntrepreneurMutation,
  };
};

export default useDigitalEntrepreneur;
