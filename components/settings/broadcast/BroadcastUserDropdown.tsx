// components/broadcast/BroadcastUserDropdown.tsx
import React, { useState } from "react";
import { useNotificationBroadcastUsers } from "@/lib/react-query/query/useBroadcast";
import UserSelectorDropdown from "./UserSelectorDropdown";

type BroadcastUserDropdownProps = {
  role: string;
  selectedUserIds: string[];
  onChange: (userIds: string[]) => void;
};

const BroadcastUserDropdown = ({
  role,
  selectedUserIds,
  onChange,
}: BroadcastUserDropdownProps) => {
  const [search, setSearch] = useState("");

  const { data, fetchNextPage, isError, isLoading } =
    useNotificationBroadcastUsers({
      role,
      search,
      limit:5
    });

  const users = data?.pages?.flatMap((page) => page.data) || [];

  return (
    <UserSelectorDropdown
      label={role.replace("_", " ")}
      users={users}
      selectedUserIds={selectedUserIds}
      onChange={onChange}
      onSearchChange={setSearch}
      onLoadMore={fetchNextPage}
      isLoading={isLoading}
      isError={isError}
    />
  );
};

export default BroadcastUserDropdown;
