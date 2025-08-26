"use client";
import Image from "next/image";

const BusinessStatistics = () => {
  return (
    <div className="flex flex-col md:flex-col lg:flex-row gap-6 justify-between">
      <div className="flex flex-col gap-5 w-full">
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

        <div className="bg-white gap-10 lg:gap-0 flex items-start justify-between p-5 rounded-md">
          <div className="flex flex-col gap-1">
            <p className="font-light">Top Partners</p>
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
            <p className="font-light">Partners</p>
            <div className="flex flex-wrap lg:flex-nowrap gap-2 items-center">
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

      {/* <div className="flex flex-col gap-5 flex-1">
        <div className="bg-white rounded-lg flex gap-4 items-start p-5 pt-6 h-[15.6rem]">
          <div className="flex flex-col gap-7">
            <p>Labour</p>
            <div className="flex flex-col gap-5">
              <p className="flex gap-2 items-center">
                <span className="h-2 w-2 rounded-full  bg-verido-faint-blue"></span>
                <span className="text-[13px]">John Doe</span>
                <span className="text-gray-text text-[9px]">%35</span>
              </p>
              <p className="flex gap-2 items-center">
                <span className="h-2 w-2 rounded-full  bg-verido-blue"></span>
                <span className="text-[13px]">Mary Ann</span>
                <span className="text-gray-text text-[9px]">%25</span>
              </p>
              <p className="flex gap-2 items-center">
                <span className="h-2 w-2 rounded-full  bg-verido-light-green"></span>
                <span className="text-[13px]">Oluwatobi</span>
                <span className="text-gray-text text-[9px]">%45</span>
              </p>
            </div>
          </div>
          <div className="mt-5">
            <Image
              src="/assets/icons/namecirclechart1.svg"
              alt="chart"
              width={200}
              height={200}
              className="object-contain"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg flex gap-4 items-start p-5 pt-6 h-[15.6rem]">
          <div className="flex flex-col gap-7">
            <p>Materials</p>
            <div className="flex flex-col gap-5">
              <p className="flex gap-2 items-center">
                <span className="h-2 w-2 rounded-full  bg-verido-faint-blue"></span>
                <span className="text-[13px]">Pencils</span>
                <span className="text-gray-text text-[9px]">%35</span>
              </p>
              <p className="flex gap-2 items-center">
                <span className="h-2 w-2 rounded-full  bg-verido-blue"></span>
                <span className="text-[13px]">Biro</span>
                <span className="text-gray-text text-[9px]">%25</span>
              </p>
              <p className="flex gap-2 items-center">
                <span className="h-2 w-2 rounded-full  bg-verido-light-green"></span>
                <span className="text-[13px]">Notebooks</span>
                <span className="text-gray-text text-[9px]">%45</span>
              </p>
            </div>
          </div>
          <div className="mt-5">
            <Image
              src="/assets/icons/namecirclechart2.svg"
              alt="chart"
              width={200}
              height={200}
              className="object-contain"
            />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default BusinessStatistics;
