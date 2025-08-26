import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import clsx from "clsx";

type IDashboardCard = {
  title: string;
  value: number;
  icon: string;
  background: string;
};

const DashboardCard = ({
  title,
  icon,
  value,
  background,
}: IDashboardCard) => {
  return (
    <div
      style={{ backgroundColor: background }}
      className={`rounded-lg flex justify-between items-center p-3`}
    >
      <div>
        <p className="font-medium text-gray-700 text-[14px] mb-4">{title}</p>

        <div className="flex flex-col">
          <div className="flex items-center">
            <span className="text-[20px] font-bold">{value}</span>
          </div>
        </div>
      </div>
      <div>
        <Image
          className="object-contain"
          src={icon}
          alt={`${title} icon`}
          width={70}
          height={70}
        />
      </div>
    </div>
  );
};

export default DashboardCard;
