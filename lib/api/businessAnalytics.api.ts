import { VeridoAPI } from "./axios";
export const getSubscriptionStat = async (params?: Record<string, any>) => {
  const { data } = await VeridoAPI.get("/admins/users/subscription-stats", {
    params,
  });
  return data;
};

export const getRevenue = async (params?: Record<string, any>) => {
  const { data } = await VeridoAPI.get("/admins/users/revenue-stats", params);
  return data;
};
export const getMoneyInMoneyOut = async (params?: Record<string, any>) => {
  const { data } = await VeridoAPI.get(
    "/admins/users/moneyin-moneyout-trends",
    { params }
  );
  return data;
};
export const getMoneyInVsLabourVsMaterial = async (
  params?: Record<string, any>
) => {
  const { data } = await VeridoAPI.get(
    "/admins/users/moneyin-labour-material-trends",
    { params }
  );
  return data;
};
export const getSubscriptionTrend = async (params?: Record<string, any>) => {
  const { data } = await VeridoAPI.get("/admins/users/subscription-trends", {
    params,
  });
  return data;
};
