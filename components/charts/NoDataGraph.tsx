import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
interface NoGraphProps {
  title: string;
  label: string;
  filterPlaceholder: string;
  labelOne: string;
  labelTwo?: string;
  labelThree?: string;
  className?: string;
}
import { Card } from "../ui/card";

const NoDataGraph = ({
  title,
  label,
  filterPlaceholder,
  labelOne,
  labelTwo,
  labelThree,
  className,
}: NoGraphProps) => {
  return (
    <Card
      className={cn(
        `w-full p-5 h-[31rem]  flex flex-col gap-10 justify-between`,
        className
      )}
    >
      <div className="flex justify-between items-center gap-2">
        <div className="flex flex-col">
          <div className="text-[17px] font-bold">{title}</div>
          <div className="text-sm text-gray-text-3">{label}</div>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Select>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder={`${filterPlaceholder}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <p className="text-sm text-gray-text-3 font-bold">
          No Data Availbale Yet
        </p>
      </div>
      <div className="flex flex-row items-center space-x-5 mt-10">
        <div className="flex flex-row gap-2 items-center">
          <div className="w-3 h-3 bg-verido-orange-2 rounded-sm"></div>
          <p className="text-[12px]">{labelOne}</p>
        </div>

        <div className="flex flex-row gap-2 items-center">
          <div className="w-3 h-2 bg-verido-blue-2 rounded-sm"></div>
          <p className="text-[12px]">{labelTwo}</p>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <div
            className={`${
              !labelThree ? "hidden" : "w-3 h-3 bg-verido-green-2 rounded-sm"
            }`}
          ></div>
          <p className="text-[12px]">{labelThree}</p>
        </div>
      </div>
    </Card>
  );
};

export default NoDataGraph;
