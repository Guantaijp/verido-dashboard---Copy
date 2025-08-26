import { useQuery } from "@tanstack/react-query";
import { fetchPartners, fetchPartnerById } from "@/lib/api/partners.api";
import { Partner, PartnerStatData } from "@/types";

export const usePartners = (params: Record<string, any>) => {
  return useQuery<any, Error>({
    queryKey: ["partners", params],
    queryFn: async () => {
      const response = await fetchPartners(params);
      return response;
    },
    enabled: !!params,
  });
};

export const usePartnerById = (id: string) => {
  return useQuery<Partner, Error>({
    queryKey: ["partner", id],
    queryFn: async () => {
      const response = await fetchPartnerById(id);
      // return {
      //   response: response.response,
      //   data: response.data,
      // };
      return response.data;
    },
    enabled: !!id,
  });
};
