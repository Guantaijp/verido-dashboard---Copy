import { VeridoAPI } from "./axios";
import { ICreateNewUsers } from "@/types";

export const getDistributors = async (params?: Record<string, any>) => {
  const { data } = await VeridoAPI.get("/distributors", { params });
  return data;
};
export const getDistributorsBranches = async ({
  id,
  params,
}: {
  id: string;
  params?: Record<string, any>;
}) => {
  const { data } = await VeridoAPI.get(`/distributors/${id}/branches`, {
    params,
  });
  return data;
};

export const getDistributorsById = async (id: string) => {
  const response = await VeridoAPI.get(`/distributors/${id}`);
  return response;
};

export const createDistributors = async (payload: ICreateNewUsers) => {
  const { data } = await VeridoAPI.post("/distributors", payload);
  return data;
};
export const createDistributorBranch = async ({
  id,
  payload,
}: {
  id: string;
  payload: any;
}) => {
  const { data } = await VeridoAPI.post(
    `/distributors/${id}/branches`,
    payload
  );
  return data;
};
