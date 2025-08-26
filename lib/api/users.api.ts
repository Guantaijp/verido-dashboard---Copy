import { VeridoAPI } from "./axios";
export interface IUpdateAdmin {
  name?: string;
  phoneNumber?: string;
  email?: string;
  password?: string;
  status?: boolean;
  photoUrl?: string;
  username?: string;
  agreementExpires?: string;
  businessType?: string;
  address?: string;
  country?: string;
  companyName?: string;
  sector?: string;
  currency?: string;
  subscriptionTimeline?: string;
  countryName?: string;
}

export const getMe = async () => {
  const { data } = await VeridoAPI.get("/admin/me");

  return data;
};
export const getAdmin = async (id: string) => {
  const { data } = await VeridoAPI.get(`/admins/${id}`);
  return data;
};
export const getNumberOfUsers = async () => {
  const { data } = await VeridoAPI.get("/admin/get-number-of-admins");

  return data;
};
export const updateAdmin = async (id: string, payload: IUpdateAdmin) => {
  const { data } = await VeridoAPI.patch(`/admins/${id}`, payload);
  return data;
};
export const updateAdminProfile = async (payload: IUpdateAdmin) => {
  const { data } = await VeridoAPI.patch(`/admins/profile`, payload);
  return data;
};
