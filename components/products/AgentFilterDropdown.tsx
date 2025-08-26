import React, { useEffect, useState, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { LoadingSpinner } from "../ui/loading-spinner";
import useCustomToast from "@/lib/hooks/useCustomToast";
import useDebounce from "@/lib/hooks/useDebounce";

type Agent = {
  _id: string;
  role: string;
  email: string;
  phoneNumber: string;
  fullName: string;
};

type AgentFilterDropdownProps = {
  selectedAgent: string;
  setSelectedAgent: React.Dispatch<React.SetStateAction<string>>;
  agents: Agent[];
  isLoading: boolean;
  isError: boolean;
  onAgentPageChange: () => void;
  onSearchChange: (search: string) => void;
};

const AgentFilterDropdown = ({
  selectedAgent,
  setSelectedAgent,
  agents,
  isLoading,
  isError,
  onAgentPageChange,
  onSearchChange,
}: AgentFilterDropdownProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const contentRef = useRef<HTMLDivElement>(null);
  const showToast = useCustomToast();
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    onSearchChange(debouncedSearch);
  }, [debouncedSearch, onSearchChange]);

  useEffect(() => {
    if (isError) {
      showToast("Error", "Failed to load agents", "error");
    }
  }, [isError, showToast]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop - clientHeight < 20) {
      onAgentPageChange();
    }
  };

  return (
    <Select onValueChange={setSelectedAgent} value={selectedAgent}>
      <SelectTrigger className="w-[200px] text-light-gray">
        <SelectValue placeholder="Select Agent" />
      </SelectTrigger>
      <SelectContent>
        <div className="relative mb-2 mt-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search Agent"
            className="pl-8 pr-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div
          ref={contentRef}
          onScroll={handleScroll}
          className="max-h-[300px] overflow-y-auto"
        >
          {isLoading ? (
            <div className="flex justify-center items-center py-2">
              <LoadingSpinner />
            </div>
          ) : (
            agents.map((agent) => (
              <SelectItem key={agent._id} value={agent._id}>
                {agent.fullName}
              </SelectItem>
            ))
          )}
          {agents.length === 0 && (
            <p className="p-2 text-sm text-gray-500">No agents found.</p>
          )}
        </div>
      </SelectContent>
    </Select>
  );
};

export default AgentFilterDropdown;
