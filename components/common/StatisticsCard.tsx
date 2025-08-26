import React from "react";

interface StatisticsCardProps {
  value: string | number;
  label: string;
  bgColor: string
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({
  value,
  label,
  bgColor,
}) => {
  return (
    <div style={{backgroundColor: bgColor}} className={` rounded-lg flex flex-col gap-2 w-[48%] lg:w-[23%] h-[6rem]  pl-3 pr-11 py-3`}>
      <p className="text-[12px] font-medium text-gray-text">{label}</p>
      <div className="flex items-center gap-2">
        <p className="text-[15px] lg:text-[20px] font-bold">{value}</p>
      </div>
    </div>
  );
};

export default StatisticsCard;
