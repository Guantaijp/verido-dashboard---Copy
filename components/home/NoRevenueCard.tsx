import React from "react";
import { Card } from "../ui/card";

interface NoRevenueCardProps {
  title: string;
}

const NoRevenueCard: React.FC<NoRevenueCardProps> = ({ title }) => {
  return (
    <Card className="bg-white flex flex-col gap-6 p-4 max-w-sm h-[20rem]">
      <h2 className="text-[16px] font-semibold">{title}</h2>
      <div className="flex justify-center items-center h-full">
        <p className="text-[12px] font-bold text-gray-600 text-center">
          You do not have any revenue. Contact Verido to begin.
        </p>
      </div>
    </Card>
  );
};

export default NoRevenueCard;
