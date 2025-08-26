import { useMutation, useQueryClient } from "@tanstack/react-query";
import useCustomToast from "@/lib/hooks/useCustomToast";
import { AxiosError } from "axios";
import { updateCountryAdmin } from "@/lib/api/countryAdmin.api";
import { IEditAdmin } from "@/components/countryAdmin/EditCountryAdminProfile";
const useCountryAdmin = () => {
  const queryClient = useQueryClient();
  const showToast = useCustomToast();
  // const updateCountryAdminMutation = useMutation({
  //   mutationFn: async ({
  //     id,
  //     payload,
  //   }: {
  //     id: string;
  //     payload: IEditAdmin;
  //   }) => {
  //     const response = await updateCountryAdmin(id, payload);
  //     return response;
  //   },
  //   onSuccess: (data) => {
  //     showToast("Success!", "Country Admin Updated.", "success");
  //   },
  //   onError: (error) => {
  //     let errDetail = error.message;
  //     if (error instanceof AxiosError) {
  //       errDetail = error?.response?.data?.message;
  //       if (Array.isArray(errDetail)) {
  //         errDetail = errDetail[0];
  //       }
  //     }
  //     showToast("Something went wrong", errDetail, "error");
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: ["country_admin"],
  //     });
  //   },
  // });
  return {
    // updateCountryAdminMutation,
  };
};
export default useCountryAdmin;
