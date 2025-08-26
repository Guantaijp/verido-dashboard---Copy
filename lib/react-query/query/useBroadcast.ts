import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

import { getBroadcast, getBroadcastUsers } from "../../api/braodcast.api";

type UserResponse = {
  data: [];
  hasNextPage: boolean;
  nextPage: number;
  hasPrevPage: boolean;
  prevPage: number;
};

export const useNotificationBroadcast = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: ["notification-broadcast", params],
    queryFn: async () => {
      const response = await getBroadcast(params);
      return response;
    },
    enabled: !!params,
  });
};
export const useNotificationBroadcastUsers = (params?: Record<string, any>) => {
  return useInfiniteQuery<UserResponse>({
    queryKey: ["notification-broadcast-users", params],
    queryFn: ({ pageParam = 1 }) =>
      getBroadcastUsers({ ...params, page: pageParam }),

    getNextPageParam: (lastPage) => {
      if (lastPage?.hasNextPage) {
        return lastPage.nextPage;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled: !!params,
  });
};
