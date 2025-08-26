import { useQuery } from "@tanstack/react-query";
import {
  fetchCountryAdmin,
  fetchCountryAdminById,
} from "@/lib/api/countryAdmin.api";

export const useCountryAdmin = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: ["country_admins", params],
    queryFn: async () => {
      const response = await fetchCountryAdmin(params);
      return response;
    },
    enabled: !!params,
  });
};

export const useCountryAdminById = (id: string) => {
  return useQuery<any>({
    queryKey: ["country_admin", id],
    queryFn: async () => {
      const response = await fetchCountryAdminById(id);
      return response;
    },
    enabled: !!id,
  });
};
