import { useQuery } from "@tanstack/react-query";
import {
  getMultibranchBusiness,
  getMultibranchBusinessById,
  getMultibranchBuisnessBranches,
} from "@/lib/api/multibranchBusiness.api";
type UseDigitalEntrepreneurBusinessParams = {
  id: string;
  params?: Record<string, any>;
};

export const useMultibranchBusiness = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: ["multibranch-businesses" , params],
    queryFn: async () => {
      const response = await getMultibranchBusiness(params);
      return response;
    },
    enabled:!!params
  });
};

export const useMultibranchBusinessById = (id: string) => {
  return useQuery({
    queryKey: ["multibranch-business", id],
    queryFn: async () => {
      const response = getMultibranchBusinessById(id);
      return response;
    },
    enabled: !!id,
  });
};
export const useMultibrancBusinessBranches = (
  { id, params }: UseDigitalEntrepreneurBusinessParams,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ["multibranch-business-branch", id, params],
    queryFn: async () => {
      const response = await getMultibranchBuisnessBranches({ id, params });
      return response;
    },
    enabled: options?.enabled ?? !!id,
  });
};
