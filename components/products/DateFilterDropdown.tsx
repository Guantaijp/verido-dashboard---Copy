import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DateFilterDropdownProps = {
  selectedDateRange: string;
  setSelectedDateRange: React.Dispatch<React.SetStateAction<string>>;
};

const DateFilterDropdown = ({
  selectedDateRange,
  setSelectedDateRange,
}: DateFilterDropdownProps) => {
  return (
    <Select onValueChange={setSelectedDateRange} value={selectedDateRange}>
      <SelectTrigger className="w-[150px] text-light-gray">
        <SelectValue placeholder="Select Date Range" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem className="text-sm text-light-gray" value="30">
          Last 30 days
        </SelectItem>
        <SelectItem className="text-sm text-light-gray" value="60">
          Last 60 days
        </SelectItem>
        <SelectItem className="text-sm text-light-gray" value="90">
          Last 90 days
        </SelectItem>
        <SelectItem className="text-sm text-light-gray" value="all">
          All Time
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default DateFilterDropdown;
