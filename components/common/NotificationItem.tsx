import React, { useState } from "react";
import Image from "next/image";
import { INotificationData, INotificationItems } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/utils";
import useConsultant from "@/lib/react-query/mutations/useConsultant";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "../ui/loading-spinner";

interface INotification {
  notifications: INotificationData[];
  isLoading: boolean;
}

const NotificationItem = ({ notifications, isLoading }: INotification) => {
  const { acceptSuperAgentInviteMutation } = useConsultant();
  const [loadingInviteId, setLoadingInviteId] = useState<string | null>(null);

  const handleAcceptInvite = (inviteId: string) => {
    setLoadingInviteId(inviteId);
    acceptSuperAgentInviteMutation.mutate(inviteId, {
      onSettled: () => {
        setLoadingInviteId(null);
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 p-4">
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className="flex items-center gap-4 py-2 border-b-2 border-b-button-disabled"
          >
            <Skeleton className="w-5 h-5 rounded-full" />
            <div className="flex flex-col gap-1 flex-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/4" />
            </div>
            <Skeleton className="w-2 h-2 rounded-full ml-auto" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <div
            key={notification.content?.id}
            className="flex items-center gap-4 py-2 border-b-2 border-b-button-disabled"
          >
            <Image
              src="/assets/icons/notification.svg"
              width={20}
              height={20}
              alt="bell-icon"
            />
            <div className="flex flex-col gap-1 flex-1">
              <p className="text-sm font-bold">{notification.content?.title}</p>
              <p className="text-sm text-gray-500">
                {notification.content?.body}
              </p>
              <p className="text-xs text-gray-500">
                {formatDate(notification?.createdAt)}
              </p>
              {notification.metadata?.invitation?.status === "pending" && (
                <Button
                  onClick={() =>
                    handleAcceptInvite(notification.metadata?.inviteId ?? "")
                  }
                  disabled={loadingInviteId === notification.metadata?.inviteId}
                  className="mt-2 w-[5rem] md:w-[7rem] h-8 bg-verido-green text-white"
                >
                  {loadingInviteId === notification.metadata?.inviteId ? (
                    <LoadingSpinner />
                  ) : (
                    "Accept Invite"
                  )}
                </Button>
              )}
            </div>
            <div className="w-2 h-2 bg-verido-green rounded-full ml-auto"></div>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center">
          <p className="font-bold">No Notifications</p>
        </div>
      )}
    </div>
  );
};

export default NotificationItem;
