import { useQuery } from "@tanstack/react-query";
import { getMe, getNumberOfUsers, getAdmin } from "@/lib/api/users.api";
import { CurrentUserProfile, INumberOfUsers } from "@/types";

export const useCurrentUser = () => {
  return useQuery<CurrentUserProfile | null, Error>({
    queryKey: ["currentUser"],

    queryFn: async () => {
      const response = await getMe();
      return response.admin;
    },
  });
};
export const useAdminUser = (id: string) => {
  return useQuery<any | null, Error>({
    queryKey: ["adminUser", id],

    queryFn: async () => {
      const response = await getAdmin(id);
      return response;
    },
    enabled: !!id,
  });
};

export const useNumberOfUsers = () => {
  return useQuery<INumberOfUsers, Error>({
    queryKey: ["numberOfUsers"],
    queryFn: async () => {
      const response = await getNumberOfUsers();
      return response;
    },
  });
};
