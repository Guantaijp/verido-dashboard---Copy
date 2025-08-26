import { useQuery } from "@tanstack/react-query";
import {
  getSubscriptionStat,
  getRevenue,
  getMoneyInMoneyOut,
  getMoneyInVsLabourVsMaterial,
  getSubscriptionTrend,
} from "@/lib/api/businessAnalytics.api";
import { IUserSubscriptionStat , IRevenueStat , ISubscriptionTrend, IMoneyInVsLabourVsMaterialTrend, IMoneyInLabourMaterialStats } from "@/types";

export const useSubscriptionStats = (params?: Record<string, any>) => {
  return useQuery<IUserSubscriptionStat, Error>({
    queryKey: ["subscription-stats", params],
    queryFn: async () => {
      const response = await getSubscriptionStat(params);
      return response;
    },
  });
};
export const useAdminRevenue = (params?: Record<string, any>) => {
  return useQuery<IRevenueStat, Error>({
    queryKey: ["admin-revenue", params],
    queryFn: async () => {
      const response = await getRevenue(params);
      return response;
    },
  });
};
export const useAdminMoneyInMoneyOut = (params?: Record<string, any>) => {
  return useQuery<IMoneyInLabourMaterialStats, Error>({
    queryKey: ["moneyIn-moneyOut", params],
    queryFn: async () => {
      const response = await getMoneyInMoneyOut(params);
      return response;
    },
  });
};
export const useAdminMoneyInVsLabour = (params?: Record<string, any>) => {
  return useQuery<IMoneyInVsLabourVsMaterialTrend, Error>({
    queryKey: ["moneyIn-laborIn", params],
    queryFn: async () => {
      const response = await getMoneyInVsLabourVsMaterial(params);
      return response;
    },
  });
};
export const useAdminSubscriptionTrend = (params?: Record<string, any>) => {
  return useQuery<ISubscriptionTrend[], Error>({
    queryKey: ["subscription-trend", params],
    queryFn: async () => {
      const response = await getSubscriptionTrend(params);
      return response;
    },
    enabled:!!params
  });
};
