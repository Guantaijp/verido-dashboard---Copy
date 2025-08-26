import { getNotifications } from "@/lib/api/notifications.api";
import { useQuery } from "@tanstack/react-query";
import { INotificationItems } from "@/types";

export const useNotifications = () =>  {
    return useQuery<INotificationItems, Error>({
      queryKey: ["inapp-notifications"],
      queryFn: async () => {
        const response = await getNotifications();
        return response;
      },
    });
}