import { useQuery } from "@tanstack/react-query";
import { fetchCompany, fetchCompanyById } from "@/lib/api/company.api";

export const useCompany = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: ["companies", params],
    queryFn: async () => {
      const response = await fetchCompany(params);
      return response;
    },
    enabled: !!params,
  });
};

export const useCompanyById = (id: string) => {
  return useQuery<any>({
    queryKey: ["company", id],
    queryFn: async () => {
      const response = await fetchCompanyById(id);
      return response;
    },
    enabled: !!id,
  });
};
