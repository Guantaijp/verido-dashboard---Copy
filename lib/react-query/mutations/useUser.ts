import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IUpdateAdmin } from "@/lib/api/users.api";
import useCustomToast from "@/lib/hooks/useCustomToast";
import { updateAdmin, updateAdminProfile } from "@/lib/api/users.api";

import { useQueryClient } from "@tanstack/react-query";
import { createCompany } from "@/lib/api/company.api";
import { createCountryAdmin } from "@/lib/api/countryAdmin.api";
import { createSuperAgents } from "@/lib/api/superAgent.api";
import { ICreateCountryAdmin } from "@/components/AllUsers/CountryAdminForm";
import { ICreateSuperAgent } from "@/components/AllUsers/SuperAgentForm";
import { ICreateCompany } from "@/components/AllUsers/CompanyForm";

const useUser = () => {
  const queryClient = useQueryClient();
  const showToast = useCustomToast();

  const createCountryAdminMutation = useMutation({
    mutationFn: async (payload: ICreateCountryAdmin) => {
      const response = await createCountryAdmin(payload);
      return response.response;
    },
    onSuccess: (data) => {
      showToast("Success!", "Country Admin Created", "success");
    },
    onError: (error) => {
      let errDetail = error.message;
      if (error instanceof AxiosError) {
        errDetail =
          error?.response?.data?.message || error?.response?.data?.error;
        if (Array.isArray(errDetail)) {
          errDetail = errDetail[0];
        }
      }
      showToast("Something went wrong", errDetail, "error");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["country_admins"],
      });
    },
  });

  const createSuperAgentMutation = useMutation({
    mutationFn: async (payload: ICreateSuperAgent) => {
      const response = await createSuperAgents(payload);
      return response.response;
    },
    onSuccess: (data) => {
      showToast("Success!", "Super Agent Created", "success");
    },
    onError: (error) => {
      let errDetail = error.message;
      if (error instanceof AxiosError) {
        errDetail = error?.response?.data?.message;
        if (Array.isArray(errDetail)) {
          errDetail = errDetail[0];
        }
      }
      showToast("Something went wrong", errDetail || "Could not create Super agent, please try again", "error");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["consultants"],
      });
    },
  });
  const createCompanytMutation = useMutation({
    mutationFn: async (payload: ICreateCompany) => {
      const response = await createCompany(payload);
      return response.response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["companies"],
      });
      showToast("Success!", "Company Created", "success");
    },
    onError: (error) => {
      let errDetail = error.message;
      if (error instanceof AxiosError) {
        errDetail = error?.response?.data?.message;
        if (Array.isArray(errDetail)) {
          errDetail = errDetail[0];
        }
      }
      showToast(
        "Something went wrong",
        errDetail || "Could not create company, please try again",
        "error"
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["companies"],
      });
    },
  });
  const updateAdminMutation = useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: IUpdateAdmin;
    }) => {
      const response = await updateAdmin(id, payload);
      return response;
    },
    onError: (error) => {
      let errDetail = error.message;
      if (error instanceof AxiosError) {
        errDetail =
          error?.response?.data?.message || error?.response?.data?.error;
        if (Array.isArray(errDetail)) {
          errDetail = errDetail[0];
        }
      }
      showToast("Something went wrong", errDetail, "error");
    },
  });
  const updateAdminProfileMutation = useMutation({
    mutationFn: async ({ payload }: { payload: IUpdateAdmin }) => {
      const response = await updateAdminProfile(payload);
      return response;
    },
    onSuccess: () => {
      showToast("Success", "Profile updated successfully", "success");
      queryClient.invalidateQueries({
        queryKey: ["currentUser"],
      });
    },
    onError: (error) => {
      let errDetail = error.message;
      if (error instanceof AxiosError) {
        errDetail =
          error?.response?.data?.message || error?.response?.data?.error;
        if (Array.isArray(errDetail)) {
          errDetail = errDetail[0];
        }
      }
      showToast("Something went wrong", errDetail, "error");
    },
  });

  return {
    createCountryAdminMutation,
    createSuperAgentMutation,
    createCompanytMutation,
    updateAdminMutation,
    updateAdminProfileMutation,
  };
};

export default useUser;
