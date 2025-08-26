import { VeridoAPI } from "./axios";
import { ICreateNewUsers } from "@/types";

export const getMultibranchBusiness = async (params?: Record<string, any>) => {
  const { data } = await VeridoAPI.get("/multibranch-businesses", { params });
  return data;
};
export const getMultibranchBuisnessBranches = async ({
  id,
  params,
}: {
  id: string;
  params?: Record<string, any>;
}) => {
  const {data} = await VeridoAPI.get(
    `/multibranch-businesses/${id}/branches`,
    { params }
  );
  return data;
};
export const createMultibranchBusinessBranch = async ({
  id,
  payload,
}: {
  id: string;
  payload: any;
}) => {
  const { data } = await VeridoAPI.post(
    `/multibranch-businesses/${id}/branches`,
    payload
  );
  return data;
};

export const getMultibranchBusinessById = async (id: string) => {
  const { data } = await VeridoAPI.get(`/multibranch-businesses/${id}`);
  return data;
};

export const createMultibranch = async (payload: ICreateNewUsers) => {
  const { data } = await VeridoAPI.post("/multibranch-businesses", payload);
  return data;
};
