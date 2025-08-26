import { useQuery } from "@tanstack/react-query";
import { IVideo } from "@/types";
import { fetchVideos } from "@/lib/api/video.api";
import { useAuthenticatedUser } from "@/context/AuthContext";

export const useVideos = (params?: Record<string, any>) => {
  return useQuery<any, Error>({
    queryKey: ["videos", params],
    queryFn: async () => {
      const response = await fetchVideos(params);
      return response;
    },
  });
};
