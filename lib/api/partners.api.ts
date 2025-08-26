import { ICreatePartner } from "@/types";
import { VeridoAPI } from "./axios";

export const fetchPartners = async (params: Record<string, any>) => {
  const { data } = await VeridoAPI.get("/v2/partners", { params });

  return data;
};
export const createPartners = async (payload: ICreatePartner) => {
  const { data } = await VeridoAPI.post("/partner/create", payload);

  return data;
};
export const suspendPartner = async (id: string) => {
  const { data } = await VeridoAPI.get(`/partner/suspend/${id}`);

  return data;
};
export const activatePartner = async (id: string) => {
  const { data } = await VeridoAPI.get(`/partner/activate/${id}`);

  return data;
};

export const fetchPartnerById = async (id: string) => {
  const { data } = await VeridoAPI.get(`/admin/partners/${id}`);
  return data;
};
