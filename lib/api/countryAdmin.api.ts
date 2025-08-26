import { ICreateCountryAdmin } from "@/components/AllUsers/CountryAdminForm";
import { VeridoAPI } from "./axios";
import { IEditAdmin } from "@/components/countryAdmin/EditCountryAdminProfile";

export const createCountryAdmin = async (payload: ICreateCountryAdmin) => {
  const { data } = await VeridoAPI.post("/admin/create-country-admin", payload);
  return data;
};
export const updateCountryAdmin = async (id: string, payload: IEditAdmin) => {
  const { data } = await VeridoAPI.patch(`/country-admins/${id}`, payload);
  return data;
};
export const fetchCountryAdmin = async (params?: Record<string, any>) => {
  const { data } = await VeridoAPI.get("/v2/country-admins", { params });

  return data;
};
export const fetchCountryAdminById = async (id: string) => {
  const { data } = await VeridoAPI.get(
    `/admin/fetch-single-country-admin/${id}`
  );
  return data;
};
