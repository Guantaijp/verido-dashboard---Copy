import { VeridoAPI } from "./axios";
import { ICreateNewUsers } from "@/types";

export const getDigitalEntreprenuer = async (params: Record<string, any>) => {
  const { data } = await VeridoAPI.get("/digital-entrepreneurs", { params });
  return data;
};
export const getDigitalEntreprenuerBuisness = async ({
  id,
  params,
}: {
  id: string;
  params?: Record<string, any>;
}) => {
  const {data} = await VeridoAPI.get(
    `/digital-entrepreneurs/${id}/businesses`,
    { params }
  );
  return data;
};

export const getDigitalEntreprenuerById = async (id: string) => {
  const response = await VeridoAPI.get(`/digital-entrepreneurs/${id}`);
  return response;
};

export const createDigitalEntrepreneur = async (payload: ICreateNewUsers) => {
  const { data } = await VeridoAPI.post("/digital-entrepreneurs", payload);
  return data;
};
