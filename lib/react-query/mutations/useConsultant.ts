import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import useCustomToast from "@/lib/hooks/useCustomToast";

import { IChangeConsultant, ICreateConsultantCreate } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import {
  createConsultants,
  changeConsultant,
  suspendConsultant,
  activateConsultant,
} from "@/lib/api/consultants.api";
import {
  acceptSuperAgentInvite,
  sendSuperAgentInvite,
} from "@/lib/api/superAgent.api";

const useConsultant = () => {
  const queryClient = useQueryClient();
  const showToast = useCustomToast();

  const createConsultantMutation = useMutation({
    mutationFn: async (payload: ICreateConsultantCreate) => {
      const response = await createConsultants(payload);
      return response.response;
    },
    onSuccess: (data) => {
      showToast("Success!", "Consultant Created.", "success");
      queryClient.invalidateQueries({
        queryKey: ["consultants"],
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
        queryKey: ["consultants"],
      });
    },
  });
  const changeConsultantMutation = useMutation({
    mutationFn: async (payload: IChangeConsultant) => {
      const response = await changeConsultant(payload);
      return response.response;
    },
    onSuccess: (data) => {
      showToast("Success!", "Consultant Changes.", "success");
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
        queryKey: ["change-consultants"],
      });
    },
  });
  const suspendConsultantMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await suspendConsultant(id);
      return response.response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["consultants"],
      });
      showToast("Success!", "Consultant Suspended.", "success");
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
        queryKey: ["consultants"],
      });
    },
  });
  const activateConsultantMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await activateConsultant(id);
      return response.response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["consultants"],
      });
      showToast("Success!", "Consultant Activated.", "success");
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
        queryKey: ["consultants"],
      });
    },
  });
  const sendSuperAgentInviteMutation = useMutation({
    mutationFn: async (payload: {
      invitees: Array<{
        inviteeReferenceId: string;
        inviteeRole: string;
      }>;
    }) => {
      const response = await sendSuperAgentInvite(payload);
      return response.response;
    },
    onSuccess: (data) => {
      showToast("Success!", "Super Agent Invite Sent.", "success");
    },
    onError: (error) => {
      let errDetail = error.message;
      if (error instanceof AxiosError) {
        errDetail =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.response?.data?.errors;
        if (Array.isArray(errDetail)) {
          errDetail = errDetail[0];
        }
      }
      showToast("Something went wrong", errDetail, "error");
    },
  });
  const acceptSuperAgentInviteMutation = useMutation({
    mutationFn: async (inviteId: string) => {
      const response = await acceptSuperAgentInvite(inviteId);
      return response.response;
    },
    onSuccess: (data) => {
      showToast("Success!", "Super Agent Invite Accepted.", "success");
      queryClient.invalidateQueries({
        queryKey: ["inapp-notifications"],
      });
    },
    onError: (error) => {
      showToast("Something went wrong", error.message, "error");
    },
  });
  return {
    createConsultantMutation,
    changeConsultantMutation,
    suspendConsultantMutation,
    activateConsultantMutation,
    sendSuperAgentInviteMutation,
    acceptSuperAgentInviteMutation,
  };
};

export default useConsultant;
