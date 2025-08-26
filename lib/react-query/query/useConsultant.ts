import { useQuery } from "@tanstack/react-query";
import {
  fetchConsultants,
  fetchConsultantById,
} from "@/lib/api/consultants.api";
import { Consultant, ConsultantStatData } from "@/types";

export const useConsultants = (params?: Record<string, any>) => {
  return useQuery<any, Error>({
    queryKey: ["consultants", params],
    queryFn: async () => {
      const response = await fetchConsultants(params);
      return response;
    },
    enabled: !!params,
  });
};
export const useConsultantById = (id: string) => {
  return useQuery<Consultant, Error>({
    queryKey: ["consultant", id],
    queryFn: async () => {
      const response = await fetchConsultantById(id);
      return response.response;
    },
    enabled: !!id,
  });
};
