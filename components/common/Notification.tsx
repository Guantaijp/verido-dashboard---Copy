import React from "react";

import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNotifications } from "@/lib/react-query/query/useNotifications";
import NotificationItem from "./NotificationItem";
import { INotificationData } from "@/types";

const Notification = () => {
  const { data, isPending: isNotificationPending } = useNotifications();
  const notificationData = data?.data ?? [];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative cursor-pointer">
          <Image
            src="/assets/icons/notification.svg"
            width={20}
            height={20}
            alt="bell-icon"
          />
          <div className="absolute top-0 right-0 bg-verido-red rounded-full w-2 h-2"></div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[20rem] md:w-[30rem] h-[40rem] overflow-y-auto bg-[#f5f5f5] p-0 mr-0 md:mr-10">
        <div className="">
          <DropdownMenuLabel className="text-[20px] font-bold py-4">
            Notifications
          </DropdownMenuLabel>
        </div>
        <div className="bg-white w-full min-h-full rounded-2xl">
          <NotificationItem
            isLoading={isNotificationPending}
            notifications={notificationData}
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notification;
