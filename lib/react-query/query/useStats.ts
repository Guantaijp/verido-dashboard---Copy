import { useQuery } from "@tanstack/react-query";
import { IDashboardStatistics, IUserMetrics } from "@/types";
import {
  fetchDashboardStats,
  getnumberOfUsersLineGraph,
  getMetrics,
  getUserHierarchyCount,
} from "@/lib/api/stats.api";

export const useDashboardStats = () => {
  return useQuery<IDashboardStatistics | null, Error>({
    queryKey: ["dashboard-stats"],

    queryFn: async () => {
      const response = await fetchDashboardStats();
      return response;
    },
  });
};
export const useUserMetrics = (parentId?: string) => {
  return useQuery<IUserMetrics | null, Error>({
    queryKey: ["user-mertics", parentId],

    queryFn: async () => {
      const response = await getMetrics(parentId);
      return response;
    },
  });
};

export const useGetNumberOfUsersLineGraph = (year: string, month: string) => {
  return useQuery<any | null, Error>({
    queryKey: ["number-of-users-line-graph", year, month],
    queryFn: async () => {
      const response = await getnumberOfUsersLineGraph(year, month);
      return response;
    },
  });
};
export const useUserHierarchyCount = (params?: Record<string, any>) => {
  return useQuery<any | null, Error>({
    queryKey: ["hierarchy-count", params],
    queryFn: async () => {
      const response = await getUserHierarchyCount(params);
      return response;
    },
    enabled:!!params
  });
};
