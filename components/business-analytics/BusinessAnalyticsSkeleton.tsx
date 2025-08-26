import { Skeleton } from "../ui/skeleton";

const BusinessAnalyticsSkeleton = () => {
  return (
    <div className="w-full flex flex-col flex-1 p-3 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-5 md:gap-0">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64 mt-2" />
        </div>
        <div className="flex gap-3 items-center justify-between">
          <Skeleton className="h-10 w-[100px]" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>

      {/* User Metrics Section */}
      <div className="h-full flex flex-[2.5] flex-col gap-8">
        <Skeleton className="h-6 w-40" />
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-2 lg:gap-5">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-28 w-full" />
          ))}
        </div>

        {/* Number of Users Chart */}
        <div className="rounded-md bg-verido-white p-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-2 items-center justify-between w-full">
              <div className="flex flex-col gap-2">
                <Skeleton className="w-[10rem] h-4 rounded-md" />
                <Skeleton className="w-[16rem] h-2 rounded-md" />
              </div>
              <div className="flex flex-row gap-2">
                <Skeleton className="w-[8rem] h-10 rounded-md" />
              </div>
            </div>
            <Skeleton className="w-full h-[300px] rounded-md" />
          </div>
        </div>

        {/* Revenue Section */}
        <div className="flex flex-col gap-5">
          <Skeleton className="h-6 w-40" />
          <div className="flex w-full justify-between flex-wrap lg:flex-nowrap gap-1 lg:gap-2 items-center">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-20 w-full" />
            ))}
          </div>
        </div>

        {/* Total Subscription Chart */}
        <div className="rounded-md bg-verido-white p-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-2 items-center justify-between w-full">
              <div className="flex flex-col gap-2">
                <Skeleton className="w-[10rem] h-4 rounded-md" />
                <Skeleton className="w-[16rem] h-2 rounded-md" />
              </div>
              <div className="flex flex-row gap-2">
                <Skeleton className="w-[8rem] h-10 rounded-md" />
              </div>
            </div>
            <Skeleton className="w-full h-[300px] rounded-md" />
          </div>
        </div>

        {/* Money In Vs Labour Vs Material Chart */}
        <div className="rounded-md bg-verido-white p-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-2 items-center justify-between w-full">
              <div className="flex flex-col gap-2">
                <Skeleton className="w-[10rem] h-4 rounded-md" />
                <Skeleton className="w-[16rem] h-2 rounded-md" />
              </div>
              <div className="flex flex-row gap-2">
                <Skeleton className="w-[8rem] h-10 rounded-md" />
              </div>
            </div>
            <Skeleton className="w-full h-[300px] rounded-md" />
          </div>
        </div>

        {/* Total Money In Vs Money Out Chart */}
        <div className="rounded-md bg-verido-white p-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-2 items-center justify-between w-full">
              <div className="flex flex-col gap-2">
                <Skeleton className="w-[10rem] h-4 rounded-md" />
                <Skeleton className="w-[16rem] h-2 rounded-md" />
              </div>
              <div className="flex flex-row gap-2">
                <Skeleton className="w-[8rem] h-10 rounded-md" />
              </div>
            </div>
            <Skeleton className="w-full h-[300px] rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessAnalyticsSkeleton;
