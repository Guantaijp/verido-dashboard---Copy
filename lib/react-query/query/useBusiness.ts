import { useQuery } from "@tanstack/react-query";
import {
  fetchBusiness,
  fetchBusinessById,
  getBusinessOwners,
} from "@/lib/api/businessOwners.api";
import { AdminBusinessResponse, AdminBusinessFullResponse } from "@/types";

export const useBusiness = (params?: Record<string, any>) => {
  return useQuery<any, Error>({
    queryKey: ["businesses", params],
    queryFn: async () => {
      const response = await fetchBusiness(params);
      return response;
    },
    enabled: !!params,
  });
};
export const useBusinessOwners = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: ["business-owners", params],
    queryFn: async () => {
      const response = await getBusinessOwners(params);
      return response;
    },
    enabled: !!params,
  });
};

export const useBusinessById = (id: string) => {
  return useQuery<AdminBusinessFullResponse, Error>({
    queryKey: ["business", id],
    queryFn: async () => {
      const response = await fetchBusinessById(id);
      return response;
    },
    enabled: !!id,
  });
};
