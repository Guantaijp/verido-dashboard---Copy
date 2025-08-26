import { VeridoAPI } from "./axios";
import { ICreateSuperAgent } from "@/components/AllUsers/SuperAgentForm";

export const createSuperAgents = async (payload: ICreateSuperAgent) => {
  const { data } = await VeridoAPI.post("/superagent/create", payload);

  return data;
};

export const sendSuperAgentInvite = async (payload: {
  invitees: Array<{
    inviteeReferenceId: string;
    inviteeRole: string;
  }>;
}) => {
  const { data } = await VeridoAPI.post("/invitations/batch", payload);

  return data;
};

export const confrimAgentDetails = async (referenceId: string) => {
  const { data } = await VeridoAPI.get(`/admins/by-reference/${referenceId}`);

  return data;
};

export const acceptSuperAgentInvite = async (inviteId: string) => {
  const { data } = await VeridoAPI.post(
    `/super-agents/invitations/${inviteId}/accept`
  );

  return data;
};
