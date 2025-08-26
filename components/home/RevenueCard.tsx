import React from "react";
import { Card } from "../ui/card";

interface RevenueItem {
  label: string;
  value: string | number;
}

interface RevenueCardProps {
  title: string;
  items: RevenueItem[];
}

const RevenueCard: React.FC<RevenueCardProps> = ({ title, items }) => {
  return (
    <Card className="bg-white flex flex-col gap-6  p-4 max-w-sm">
      <h2 className="text-[16px] font-semibold">{title}</h2>
      <ul className="flex flex-col gap-4">
        {items.map((item, index) => (
          <li key={index} className="flex justify-between ">
            <span className="text-[14px]">{item.label}</span>
            <span className="font-bold text-[14px]">{item.value}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default RevenueCard;
