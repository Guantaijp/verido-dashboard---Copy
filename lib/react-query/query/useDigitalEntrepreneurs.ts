import {
  getDigitalEntreprenuer,
  getDigitalEntreprenuerById,
  getDigitalEntreprenuerBuisness,
} from "@/lib/api/digitalEntreprenuer.api";
import { useQuery } from "@tanstack/react-query";

type UseDigitalEntrepreneurBusinessParams = {
  id: string;
  params?: Record<string, any>;
};

export const useDigitalEntrepreneurs = (params: Record<string, any>) => {
  return useQuery({
    queryKey: ["digital-entrepreneurs" , params],
    queryFn: async () => {
      const response = await getDigitalEntreprenuer(params);
      return response;
    },
    enabled:!!params
  });
};

export const useDigitalEntrepreneurById = (id: string) => {
  return useQuery({
    queryKey: ["digital-entrepreneur", id],
    queryFn: async () => {
      const response = await getDigitalEntreprenuerById(id);
      return response.data;
    },
    enabled: !!id,
  });
};
export const useDigitalEntrepreneurBusiness = ({
  id,
  params,
}: UseDigitalEntrepreneurBusinessParams) => {
  return useQuery({
    queryKey: ["digital-entrepreneur-business", id, params],
    queryFn: async () => {
      const response = await getDigitalEntreprenuerBuisness({ id, params });
      return response;
    },
    enabled: !!id,
  });
};
