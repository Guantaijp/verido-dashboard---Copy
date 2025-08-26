import { VeridoAPI } from "./axios";

export const fetchBusiness = async (params?: Record<string, any>) => {
  const { data } = await VeridoAPI.get("/v2/sub-agents", {
    params,
  });

  return data;
};

export const fetchBusinessById = async (id: string) => {
  const { data } = await VeridoAPI.get(`/admin-business/${id}`);
  return data;
};
export const changeBusinessStatus = async (
  subAgentId: string,
  status: string
) => {
  const { data } = await VeridoAPI.put(
    `/admin/update-subagent-status?subAgentId=${subAgentId}&status=${status}`
  );

  return data;
};
export const getBusinessOwners = async (params?: Record<string, any>) => {
  const { data } = await VeridoAPI.get("/business-owners", { params });
  return data;
};
