import { ICreateCompany } from "@/components/AllUsers/CompanyForm";
import { VeridoAPI } from "./axios";
import { IEditCompany } from "@/components/company/EditCompanyProfile";

export const createCompany = async (payload: ICreateCompany) => {
  const { data } = await VeridoAPI.post("/partner/create-company", payload);
  return data;
};

export const fetchCompany = async (params?: Record<string, any>) => {
  const { data } = await VeridoAPI.get("/v2/companies", {
    params,
  });

  return data;
};
export const fetchCompanyById = async (id: string) => {
  const { data } = await VeridoAPI.get(`/partner/fetch-single-company/${id}`);
  return data;
};

export const suspendActivateCompany = async (id: string) => {
  const { data } = await VeridoAPI.put(`/partner/toggle-company-status/${id}`);

  return data;
};
