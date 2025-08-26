import { Skeleton } from "../ui/skeleton";

const DashboardSkeleton = () => {
  return (
    <div className="w-full flex flex-col flex-1 p-3 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <div>
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-60 mt-2" />
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          <Skeleton className="h-10 w-full sm:w-40" />
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>

      <div className="w-full flex flex-col lg:flex-row justify-between gap-7">
        <div className="w-full flex flex-col lg:flex-row gap-10">
          <div className="flex-1 lg:flex-[2.5] flex flex-col gap-4">
            <Skeleton className="h-20 w-56" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 lg:gap-5">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-28 w-full" />
              ))}
            </div>
            <Skeleton className="h-56 w-full mt-5" />
            <div className="flex flex-col gap-5">
              <Skeleton className="h-6 w-56" />
              <div className="flex flex-col sm:flex-row w-full justify-between flex-wrap lg:flex-nowrap gap-2 items-center">
                <Skeleton className="h-[30rem] w-full" />
              </div>
            </div>
            <Skeleton className="h-56 w-full mt-5" />
            <div className="flex flex-col gap-5">
              <Skeleton className="h-6 w-56" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="h-20 w-full" />
                ))}
              </div>
            </div>
            <Skeleton className="h-56 w-full mt-5" />
          </div>
          <div className="flex-1 flex flex-col gap-6">
            <Skeleton className="h-[40rem] w-full" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="h-28 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
