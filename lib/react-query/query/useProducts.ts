import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import {
  getProducts,
  productStats,
  getAgentProducts,
  getUniqueCountries,
  getUniqueProductState,
  getUniqueProductCity,
  getUniqueProductName,
  getProductDownlineAgent,
} from "@/lib/api/product.api";
import { IProductStats } from "@/types";

export const useProducts = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: ["product", params],
    queryFn: async () => {
      const response = await getProducts(params);
      return response;
    },
  });
};

export const useProductStats = () => {
  return useQuery<IProductStats>({
    queryKey: ["product-stats"],
    queryFn: async () => {
      const response = await productStats();
      return response;
    },
  });
};

export const useAgentProducts = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: ["agent-products", params],
    queryFn: async () => {
      const response = await getAgentProducts(params);
      return response;
    },
    enabled: !!params,
  });
};

export const useUniqueCountries = () => {
  return useQuery({
    queryKey: ["unique-countries"],
    queryFn: async () => {
      const response = await getUniqueCountries();
      return response;
    },
  });
};

export const useUniqueProductNames = () => {
  return useQuery({
    queryKey: ["unique-product-names"],
    queryFn: async () => {
      const response = await getUniqueProductName();
      return response;
    },
  });
};

export const useUniqueStates = (country: string) => {
  return useQuery({
    queryKey: ["unique-states", country],
    queryFn: () => getUniqueProductState({ country }),
    enabled: !!country,
  });
};

export const useUniqueCities = (state: string, country: string) => {
  return useQuery({
    queryKey: ["unique-cities", state, country],
    queryFn: () => getUniqueProductCity({ state, country }),
    enabled: !!(state && country),
  });
};

type AgentResponse = {
  data: Array<{
    _id: string;
    role: string;
    email: string;
    phoneNumber: string;
    fullName: string;
  }>;
  hasNextPage: boolean;
  nextPage: number;
};

export const useProductDownlineAgent = ({
  id,
  params,
  enabled,
}: {
  id: string;
  params?: Record<string, any>;
  enabled?: boolean;
}) => {
  return useInfiniteQuery<AgentResponse>({
    queryKey: ["unique-agents", id, params],
    queryFn: ({ pageParam = 1 }) =>
      getProductDownlineAgent({
        id,
        params: { ...params, page: pageParam },
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage?.hasNextPage) {
        return lastPage.nextPage;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled: enabled && !!id,
  });
};
