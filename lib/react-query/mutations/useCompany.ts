import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { suspendActivateCompany } from "@/lib/api/company.api";
import useCustomToast from "@/lib/hooks/useCustomToast";
import { IEditCompany } from "@/components/company/EditCompanyProfile";

const useCompany = () => {
  const queryClient = useQueryClient();
  const showToast = useCustomToast();

  const suspendActiviateCompanyMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await suspendActivateCompany(id);
      return response.response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["companies"],
      });
      queryClient.invalidateQueries({
        queryKey: ["company"],
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
    suspendActiviateCompanyMutation,
  };
};

export default useCompany;
