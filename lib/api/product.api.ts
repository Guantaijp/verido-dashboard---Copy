import { VeridoAPI } from "./axios";

export const getProducts = async (params?: Record<string, any>) => {
  const { data } = await VeridoAPI.get("/products/filter", { params });
  return data;
};
export const productStats = async () => {
  const { data } = await VeridoAPI.get("/products/stats");
  return data;
};
export const getAgentProducts = async (params?: Record<string, any>) => {
  const { data } = await VeridoAPI.get("/products/agents", { params });
  return data;
};
export const getUniqueCountries = async () => {
  const { data } = await VeridoAPI.get("/products/countries/unique");
  return data;
};
export const getUniqueProductState = async (params?: Record<string, any>) => {
  const { data } = await VeridoAPI.get("/products/states/unique", { params });
  return data;
};
export const getUniqueProductCity = async (params?: Record<string, any>) => {
  const { data } = await VeridoAPI.get("/products/cities/unique", { params });
  return data;
};
export const getUniqueProductName = async () => {
  const { data } = await VeridoAPI.get("/products/unique");
  return data;
};
export const getProductDownlineAgent = async ({id , params}: {
  id: string;
  params?: Record<string, any>;
}) => {
  const { data } = await VeridoAPI.get(`admins/${id}/downline-agents` , {params});
  return data
};
