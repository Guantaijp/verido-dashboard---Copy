"use client";
import Image from "next/image";

const ConsultantBusinessStat = () => {
  return (
    <div className="flex  flex-col md:flex-row gap-7 justify-between">
      <div className="flex flex-col gap-5">
        <div className="bg-white flex items-start justify-between p-5 rounded-md">
          <div className="flex flex-col gap-1">
            <p className="font-light">Top Businesses</p>
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
            <p className="font-light">Business Owners</p>
            <div className="flex gap-2 items-center">
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
            <p className="font-light">Cash Flow</p>
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
              <p className="text-[13px]">Overheads</p>
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

        <div className="bg-white flex items-start justify-between p-5 rounded-md">
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
            <div className="flex gap-2 items-center">
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

      <div className="flex-1">
        <div className="bg-white p-6 rounded-lg flex flex-col justify-between gap-3">
          <div className="flex justify-between items-center">
            <p className="flex gap-2 items-center">
              <span className="font-light">Cash Flow</span>
              <span className="text-gray-text text-[13px] font-extralight">
                Last 6 months
              </span>
            </p>
            <p className="">
              <Image
                src="/assets/icons/3dots.svg"
                alt="percent"
                width={20}
                height={20}
                className="object-contain"
              />
            </p>
          </div>
          <div className="self-center">
            <Image
              src="/assets/icons/hexagonchart.svg"
              alt="percent"
              width={270}
              height={270}
              className="object-contain"
            />
          </div>
          <div className="flex items-center gap-5 self-center">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-verido-green"></div>
              <p className="text-[13px]">Money In</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full  bg-verido-red"></div>
              <p className="text-[13px]">Money Out</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultantBusinessStat;
