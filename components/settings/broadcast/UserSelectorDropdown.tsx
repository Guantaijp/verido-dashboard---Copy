// components/shared/UserSelectorDropdown.tsx

import React, { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, Check } from "lucide-react";
import useDebounce from "@/lib/hooks/useDebounce";
import useCustomToast from "@/lib/hooks/useCustomToast";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

type User = {
  _id: string;
  username: string;
  name: string;
  email?: string;
  role?: string;
};

type Props = {
  users: User[];
  isLoading: boolean;
  isError: boolean;
  label?: string;
  selectedUserIds: string[];
  onChange: (selectedIds: string[]) => void;
  onSearchChange: (value: string) => void;
  onLoadMore: () => void;
  isMulti?: boolean;
};

const UserSelectorDropdown = ({
  users,
  isLoading,
  isError,
  label,
  selectedUserIds,
  onChange,
  onSearchChange,
  onLoadMore,
  isMulti = true,
}: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 400);
  const showToast = useCustomToast();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onSearchChange(debouncedSearch);
  }, [debouncedSearch, onSearchChange]);

  useEffect(() => {
    if (isError) {
      showToast("Error", `Failed to load ${label} users`, "error");
    }
  }, [isError, showToast, label]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop - clientHeight < 20) {
      onLoadMore();
    }
  };

  return (
    <div className="mb-4">
      <p className="text-xs font-bold mb-1 capitalize">{label}</p>
      <Select
        onValueChange={(value) => {
          if (isMulti) {
            if (selectedUserIds.includes(value)) {
              onChange(selectedUserIds.filter((uid) => uid !== value));
            } else {
              onChange([...selectedUserIds, value]);
            }
          } else {
            onChange([value]);
          }
        }}
        value={isMulti ? undefined : selectedUserIds[0] || undefined}
      >
        <SelectTrigger className="max-w-fit max-h-10 text-clip">
          <SelectValue placeholder={`Select ${label}${isMulti ? "s" : ""}`} />
        </SelectTrigger>
        <SelectContent className="w-full">
          <div className="relative p-2 flex items-center">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted" />
            <Input
              placeholder={`Search ${label}`}
              className="pl-8 "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div
            className="max-h-[100px] overflow-y-auto"
            onScroll={handleScroll}
            ref={containerRef}
          >
            {isLoading ? (
              <div className="flex justify-center py-2">
                <LoadingSpinner />
              </div>
            ) : users?.length === 0 ? (
              <p className="text-sm text-muted p-2">No users found</p>
            ) : (
              users?.map((user) => (
                <SelectItem showCheck={false} key={user._id} value={user._id}>
                  <div className="flex justify-between items-center text-xs">
                    {user.name}
                    {selectedUserIds.includes(user._id) && isMulti && (
                      <Check className="w-4 h-4 text-green-600 ml-2" />
                    )}
                  </div>
                </SelectItem>
              ))
            )}
          </div>
        </SelectContent>
      </Select>
    </div>
  );
};

export default UserSelectorDropdown;
