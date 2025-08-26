"use client";
import Image from "next/image";

const MoneyInOutStats = () => {
  return (
    <div className="bg-white p-10 rounded-md flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <p className="font-light">Cash Movement</p>
        <div className="flex items-center gap-3 p-2 border border-solid border-gray-text rounded-md">
          <span className="text-gray-text text-[13px] font-extralight">
            2019
          </span>
          <span>
            <Image
              src="/assets/icons/calendericon.svg"
              alt="percent"
              width={20}
              height={20}
              className="object-contain"
            />
          </span>
        </div>
      </div>
      <div className="self-center">
        <Image
          src="/assets/icons/moneyinoutchart.svg"
          alt="percent"
          width={900}
          height={900}
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default MoneyInOutStats;
