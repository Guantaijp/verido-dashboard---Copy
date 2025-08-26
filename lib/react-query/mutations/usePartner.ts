import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { ICreatePartner } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import {
  activatePartner,
  createPartners,
  suspendPartner,
} from "@/lib/api/partners.api";
import useCustomToast from "@/lib/hooks/useCustomToast";



const usePartner = () => {
  const queryClient = useQueryClient();
  const showToast = useCustomToast();

  const createPartnerMutation = useMutation({
    mutationFn: async (payload: ICreatePartner) => {
      const response = await createPartners(payload);
      return response.response;
    },
    onSuccess: (data) => {
      showToast("Success!", "Partner Created.", "success");
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
        queryKey: ["partners"],
      });
    },
  });



  const suspendPartnerMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await suspendPartner(id);
      return response.response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["partner"],
      });
      showToast("Success!", "Partner Suspended.", "success");
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

  const activatePartnerMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await activatePartner(id);
      return response.response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["partner"],
      });
      showToast("Success!", "Partner Activated.", "success");
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
    createPartnerMutation,
    suspendPartnerMutation,
    activatePartnerMutation,
  };
};

export default usePartner;
