import React from "react";
import Image from "next/image";

const PartnerCashStatistics = () => {
  return (
    <div>
      <div className="flex flex-col gap-5">
        <div className="bg-white flex items-start gap-10 lg:gap-0  justify-between p-5 rounded-md">
          <div className="flex flex-col gap-1">
            <p className="font-bold text-sm">Top Businesses</p>
            <p className="text-gray-text text-[13px] font-extralight">
              Highest earnings this month
            </p>
            <div className="flex items-center gap-2">
              <p>$442.98</p>
              <p className="text-gray-text text-[13px] font-extralight">
                $22 more than last month
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-2">
            <p className="font-bold text-sm">Business Owners</p>
            <div className="flex  flex-wrap lg:flex-nowrap gap-2 items-center">
              <Image
                src="/assets/icons/starface.svg"
                alt="percent"
                width={32}
                height={32}
                className="object-contain"
              />
              <Image
                src="/assets/icons/sweatface.svg"
                alt="percent"
                width={32}
                height={32}
                className="object-contain"
              />
              <Image
                src="/assets/icons/angryface.svg"
                alt="percent"
                width={32}
                height={32}
                className="object-contain"
              />
              <Image
                src="/assets/icons/winkface.svg"
                alt="percent"
                width={32}
                height={32}
                className="object-contain"
              />
              <Image
                src="/assets/icons/loveface.svg"
                alt="percent"
                width={32}
                height={32}
                className="object-contain"
              />
              <Image
                src="/assets/icons/tongueface.svg"
                alt="percent"
                width={32}
                height={32}
                className="object-contain"
              />
              <Image
                src="/assets/icons/arrowright.svg"
                alt="percent"
                width={20}
                height={20}
                className="object-contain"
              />
            </div>
          </div>
        </div>
        <div className="bg-white flex gap-5 justify-between items-center p-5 rounded-md">
          <div className="flex flex-col gap-1">
            <p className="font-bold text-sm">Cash Flow</p>
            <p className="text-gray-text text-[13px] font-extralight">
              This month
            </p>
            <p>$6.340.42</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-verido-green"></div>
              <p className="text-[13px]">Money In</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-300"></div>
              <p className="text-[13px]">Overhead</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full  bg-verido-red"></div>
              <p className="text-[13px]">Money Out</p>
            </div>
          </div>
          <div>
            <Image
              src="/assets/icons/percent2.svg"
              alt="percent"
              width={300}
              height={300}
              className="object-contain"
            />
          </div>
        </div>

        <div className="bg-white flex items-start gap-10 lg:gap-0  justify-between p-5 rounded-md">
          <div className="flex flex-col gap-1">
            <p className="font-light">Top Consultants</p>
            <p className="text-gray-text text-[13px] font-extralight">
              Earnings this month
            </p>
            <div className="flex items-center gap-2">
              <p>$442.98</p>
              <p className="text-gray-text text-[13px] font-extralight">
                $22 more than last month
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-2">
            <p className="font-light">Consultants</p>
            <div className="flex gap-2 items-center flex-wrap lg:flex-nowrap">
              <Image
                src="/assets/icons/starface.svg"
                alt="percent"
                width={32}
                height={32}
                className="object-contain"
              />
              <Image
                src="/assets/icons/sweatface.svg"
                alt="percent"
                width={32}
                height={32}
                className="object-contain"
              />
              <Image
                src="/assets/icons/angryface.svg"
                alt="percent"
                width={32}
                height={32}
                className="object-contain"
              />
              <Image
                src="/assets/icons/winkface.svg"
                alt="percent"
                width={32}
                height={32}
                className="object-contain"
              />
              <Image
                src="/assets/icons/loveface.svg"
                alt="percent"
                width={32}
                height={32}
                className="object-contain"
              />
              <Image
                src="/assets/icons/tongueface.svg"
                alt="percent"
                width={32}
                height={32}
                className="object-contain"
              />
              <Image
                src="/assets/icons/arrowright.svg"
                alt="percent"
                width={20}
                height={20}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerCashStatistics;
