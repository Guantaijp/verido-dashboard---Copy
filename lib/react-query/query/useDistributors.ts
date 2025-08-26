import {
  getDistributors,
  getDistributorsBranches,
  getDistributorsById,
} from "@/lib/api/distributors.api";
import { useQuery } from "@tanstack/react-query";

type UseDigitalEntrepreneurBusinessParams = {
  id: string;
  params?: Record<string, any>;
};

export const useDistributors = (params: Record<string, any>) => {
  return useQuery({
    queryKey: ["distributors" , params],
    queryFn: async () => {
      const response = await getDistributors(params);
      return response;
    },
    enabled:!!params
  });
};

export const useDistributorsById = (id: string) => {
  return useQuery({
    queryKey: ["distributor", id],
    queryFn: async () => {
      const response = await getDistributorsById(id);
      return response.data;
    },
    enabled: !!id,
  });
};
export const useDistributorsBranches = (
  { id, params }: UseDigitalEntrepreneurBusinessParams,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ["distributor-branches", id, params],
    queryFn: async () => {
      const response = await getDistributorsBranches({ id, params });
      return response;
    },
    enabled: options?.enabled ?? !!id,
  });
};
